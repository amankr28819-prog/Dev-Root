/**
 * LOCAL-ONLY CITIZEN PASSWORD RESET UTILITY
 *
 * Safely resets the password for a test citizen account.
 * Uses the existing Mongoose User model and bcryptjs pre-save hook.
 *
 * SAFETY RULES:
 * - Read/Write ONLY the citizen's password field.
 * - Restricts resets strictly to accounts with role === 'citizen'.
 * - Rejects any authority or admin accounts.
 * - Requires explicit confirmation before making changes.
 * - Validates passwords against standard registration constraints.
 * - Never logs plaintext passwords or password hashes.
 * - No API routes or external exposure.
 *
 * USAGE:
 *   node src/utils/resetCitizenPassword.js <citizen-email> <new-password> [--confirm]
 *
 * Or interactive mode:
 *   node src/utils/resetCitizenPassword.js
 */

const path = require('path');
const readline = require('readline');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const { connectDB, disconnectDB } = require('../config/db');
const User = require('../models/User');

/**
 * Validates password using the exact same constraints as authController.register
 */
function validatePassword(password) {
  if (!password || typeof password !== 'string') {
    return 'Password is required and must be text.';
  }

  if (password.length < 8 || password.length > 128) {
    return 'Password must be between 8 and 128 characters long.';
  }

  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  if (!hasUpper || !hasNumber || !hasSpecial) {
    return 'Password must contain at least 1 uppercase letter, 1 number, and 1 special character.';
  }

  return null;
}

/**
 * Helper to prompt the user in terminal via readline
 */
function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

async function runPasswordReset() {
  console.log('====================================================');
  console.log('       CRP INDIA - CITIZEN PASSWORD RESET UTILITY   ');
  console.log('====================================================\n');

  const args = process.argv.slice(2);
  let email = null;
  let newPassword = null;
  let autoConfirm = false;

  // Parse CLI args
  for (const arg of args) {
    if (arg === '--confirm' || arg === '--yes' || arg === '-y') {
      autoConfirm = true;
    } else if (!email) {
      email = arg;
    } else if (!newPassword) {
      newPassword = arg;
    }
  }

  // Interactive input fallback if arguments were not passed
  if (!email) {
    email = await askQuestion('Enter citizen email address: ');
  }

  if (!email || !email.trim()) {
    console.error('[ERROR] An email address is required.');
    process.exit(1);
  }

  const cleanEmail = email.trim().toLowerCase();

  if (!newPassword) {
    newPassword = await askQuestion('Enter new password (min 8 chars, 1 uppercase, 1 number, 1 special): ');
  }

  // Validate password before doing any database operations
  const validationError = validatePassword(newPassword);
  if (validationError) {
    console.error(`[VALIDATION FAILED] ${validationError}`);
    process.exit(1);
  }
  console.log('[RESET] Password validation passed (meets length, uppercase, numeric, and special character criteria).');

  // Connect to Database
  await connectDB();

  try {
    // 1. Locate citizen account
    const user = await User.findOne({ email: cleanEmail });

    if (!user) {
      console.error(`[ERROR] Account not found: No user exists with email "${cleanEmail}".`);
      await disconnectDB();
      process.exit(1);
    }

    console.log(`[RESET] Account found: "${user.name}" (<${user.email}>, ID: ${user._id})`);

    // 2. Role verification
    if (user.role !== 'citizen') {
      console.error(
        `[SECURITY ERROR] Role mismatch: Account has role "${user.role}". ` +
        `This utility strictly resets accounts with role === "citizen". Authority accounts cannot be modified.`
      );
      await disconnectDB();
      process.exit(1);
    }
    console.log(`[RESET] Role verified: citizen.`);

    // 3. Confirmation step
    if (!autoConfirm) {
      const confirmation = await askQuestion(
        `\nCONFIRMATION: Are you sure you want to reset the password for citizen "${user.name}" (${user.email})? (yes/no): `
      );

      if (confirmation.toLowerCase() !== 'yes' && confirmation.toLowerCase() !== 'y') {
        console.log('\n[ABORTED] Operation cancelled by user. No database changes were made.');
        await disconnectDB();
        process.exit(0);
      }
    }

    // 4. Update ONLY password using User model pre-save hook
    // Setting user.password triggers userSchema.pre('save'), which hashes with bcryptjs (10 salt rounds)
    user.password = newPassword;
    await user.save();

    console.log('\n====================================================');
    console.log(`[SUCCESS] Password successfully changed for citizen: ${user.email}`);
    console.log(`Account ID:     ${user._id}`);
    console.log(`Citizen Name:   ${user.name}`);
    console.log(`Citizen Role:   ${user.role}`);
    console.log(`Updated At:     ${user.updatedAt}`);
    console.log('All other user fields, complaints, and relations remain untouched.');
    console.log('====================================================\n');

  } catch (err) {
    console.error('[ERROR] Failed to reset citizen password:', err.message);
  } finally {
    await disconnectDB();
  }
}

// Execute if run directly from CLI
if (require.main === module) {
  runPasswordReset()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('[FATAL]', err);
      process.exit(1);
    });
}

module.exports = { runPasswordReset, validatePassword };
