const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const Complaint = require('../models/Complaint');

const uploadsDir = path.join(__dirname, '../../uploads');

const isCloudinaryReady = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
);

if (isCloudinaryReady) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
  });
}

const checkUrlAccessible = async (url) => {
  try {
    const res = await fetch(url, { method: 'HEAD' });
    return res.status >= 200 && res.status < 400;
  } catch (err) {
    return false;
  }
};

async function migrateTwoComplaints() {
  console.log('================================================================');
  console.log('  CRP INDIA: TARGETED MIGRATION (CRP-2026-00102 & CRP-2026-00110)');
  console.log('================================================================\n');

  // 1. Credentials Check
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    throw new Error('VERIFICATION FAILED: MONGO_URI environment variable is missing.');
  }

  if (!isCloudinaryReady) {
    throw new Error('VERIFICATION FAILED: Cloudinary credentials (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET) are missing.');
  }

  // 2. Local Files Check
  const garbageFile = path.join(uploadsDir, 'demo-garbage-before.jpg');
  const streetlightFile = path.join(uploadsDir, 'demo-streetlight-before.jpg');

  if (!fs.existsSync(garbageFile)) {
    throw new Error(`VERIFICATION FAILED: Local file not found: ${garbageFile}`);
  }
  if (!fs.existsSync(streetlightFile)) {
    throw new Error(`VERIFICATION FAILED: Local file not found: ${streetlightFile}`);
  }
  console.log('[Check 1/4] Both local image files exist on disk.');

  // 3. Connect to Database
  console.log('[Check 2/4] Connecting to MongoDB Atlas...');
  await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 10000 });
  console.log(`[Connected] Host: ${mongoose.connection.host}, DB: ${mongoose.connection.name}`);

  // 4. Verify Target Complaints State
  console.log('[Check 3/4] Verifying database documents...');
  const comp102 = await Complaint.findOne({ referenceId: 'CRP-2026-00102' }).lean();
  const comp110 = await Complaint.findOne({ referenceId: 'CRP-2026-00110' }).lean();

  if (!comp102) {
    throw new Error('VERIFICATION FAILED: Complaint CRP-2026-00102 does not exist in MongoDB.');
  }
  if (!comp110) {
    throw new Error('VERIFICATION FAILED: Complaint CRP-2026-00110 does not exist in MongoDB.');
  }

  console.log(` - CRP-2026-00102 current images: ${JSON.stringify(comp102.images)}`);
  console.log(` - CRP-2026-00110 current images: ${JSON.stringify(comp110.images)}`);

  const has102Uploads = (comp102.images || []).includes('/uploads/demo-garbage-before.jpg');
  const has110Uploads = (comp110.images || []).includes('/uploads/demo-streetlight-before.jpg');

  if (!has102Uploads) {
    throw new Error('VERIFICATION FAILED: CRP-2026-00102 does not reference /uploads/demo-garbage-before.jpg or was already migrated.');
  }
  if (!has110Uploads) {
    throw new Error('VERIFICATION FAILED: CRP-2026-00110 does not reference /uploads/demo-streetlight-before.jpg or was already migrated.');
  }
  console.log('[Check 4/4] Both complaints exist and reference the expected local paths.\n');

  // 5. Upload to Cloudinary
  console.log('--- EXECUTING UPLOADS TO CLOUDINARY ---');
  const garbagePublicId = `demo-garbage-before-${Date.now()}`;
  console.log(` -> Uploading demo-garbage-before.jpg to crp-india/complaints...`);
  const garbageRes = await cloudinary.uploader.upload(garbageFile, {
    folder: 'crp-india/complaints',
    public_id: garbagePublicId,
    quality: 'auto',
    fetch_format: 'auto'
  });
  const garbageCloudUrl = garbageRes.secure_url;
  console.log(`    Result URL: ${garbageCloudUrl}`);

  const streetlightPublicId = `demo-streetlight-before-${Date.now()}`;
  console.log(` -> Uploading demo-streetlight-before.jpg to crp-india/complaints...`);
  const streetlightRes = await cloudinary.uploader.upload(streetlightFile, {
    folder: 'crp-india/complaints',
    public_id: streetlightPublicId,
    quality: 'auto',
    fetch_format: 'auto'
  });
  const streetlightCloudUrl = streetlightRes.secure_url;
  console.log(`    Result URL: ${streetlightCloudUrl}\n`);

  // Verify URLs are reachable
  console.log('--- VERIFYING CLOUDINARY URLS ---');
  const isGarbageOk = await checkUrlAccessible(garbageCloudUrl);
  const isStreetlightOk = await checkUrlAccessible(streetlightCloudUrl);

  if (!isGarbageOk || !isStreetlightOk) {
    throw new Error('UPLOAD FAILED: One or more uploaded Cloudinary URLs returned non-200 status. Aborting database update.');
  }
  console.log(' -> Both Cloudinary URLs returned HTTP 200 OK.\n');

  // 6. Update ONLY the Two Specific MongoDB Documents
  console.log('--- UPDATING MONGODB DOCUMENTS (NO DELETIONS) ---');
  await Complaint.updateOne(
    { referenceId: 'CRP-2026-00102' },
    { $set: { images: [garbageCloudUrl] } }
  );
  console.log(` -> Updated CRP-2026-00102 images to: [${garbageCloudUrl}]`);

  await Complaint.updateOne(
    { referenceId: 'CRP-2026-00110' },
    { $set: { images: [streetlightCloudUrl] } }
  );
  console.log(` -> Updated CRP-2026-00110 images to: [${streetlightCloudUrl}]\n`);

  // 7. Post-Migration Verification
  console.log('--- POST-MIGRATION VERIFICATION ---');
  const totalCount = await Complaint.countDocuments({});
  const remainingUploadsCount = await Complaint.countDocuments({
    images: { $regex: '^/uploads/' }
  });

  console.log(` - Total complaints in DB: ${totalCount} (Expected: exactly 15)`);
  console.log(` - Complaints still referencing /uploads/: ${remainingUploadsCount} (Expected: exactly 0)`);

  const verify102 = await Complaint.findOne({ referenceId: 'CRP-2026-00102' }).lean();
  const verify110 = await Complaint.findOne({ referenceId: 'CRP-2026-00110' }).lean();

  console.log(` - CRP-2026-00102 verified images: ${JSON.stringify(verify102.images)}`);
  console.log(` - CRP-2026-00110 verified images: ${JSON.stringify(verify110.images)}`);

  console.log('\n================================================================');
  console.log('       TARGETED MIGRATION COMPLETED SUCCESSFULLY                ');
  console.log('================================================================\n');
}

if (require.main === module) {
  migrateTwoComplaints()
    .then(async () => {
      await mongoose.disconnect();
      console.log('[Done] Database disconnected cleanly.');
      process.exit(0);
    })
    .catch(async (err) => {
      console.error('\n[FATAL ERROR]', err.message);
      try { await mongoose.disconnect(); } catch (_) {}
      process.exit(1);
    });
}

module.exports = { migrateTwoComplaints };
