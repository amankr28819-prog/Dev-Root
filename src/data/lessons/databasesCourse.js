/**
 * Dev-root Course 11: Databases and MongoDB - Deep Learning Curriculum (Phase 4 4x Depth Standard)
 * Comprehensive lessons covering Database fundamentals, Relational vs NoSQL,
 * MongoDB document architecture, Mongoose schemas, and CRUD query operations.
 */

export const DATABASES_LESSONS = {
  'database-concepts-and-mongodb': {
    id: 'lesson-11-1',
    slug: 'database-concepts-and-mongodb',
    courseId: 'course-11',
    courseSlug: 'mongodb-and-mongoose',
    courseTitle: 'Course 11: Databases and MongoDB',
    title: 'Database Foundations & MongoDB Collections',
    category: 'Database',
    estimatedTime: '45 min read & practice',
    objectives: [
      'Understand why databases are required for data persistence and data integrity.',
      'Differentiate Relational SQL databases (PostgreSQL, MySQL) from Document NoSQL databases (MongoDB).',
      'Explain the MongoDB data hierarchy: Database -> Collections -> BSON Documents.',
      'Understand MongoDB ObjectIDs (_id) and how timestamps are encoded within them.',
      'Design efficient document schemas: Embedding (denormalization) vs Referencing (normalization).'
    ],
    sections: [
      {
        heading: 'Why Applications Need Databases: Persistence Beyond RAM',
        content: `When a Node.js server executes, variables (such as an array of complaints) live inside the server process's **Random Access Memory (RAM)**.

If the server restarts (due to a power outage, code deployment, or crash), **all data in RAM is permanently wiped out**.

A **Database** is a dedicated, highly optimized software system designed to:
1. **Persist Data:** Store records reliably on non-volatile solid-state drives (SSDs) or disks.
2. **Handle Concurrency:** Allow thousands of citizens and administrators to read and write records simultaneously without data corruption.
3. **Execute High-Speed Queries:** Index millions of records so searching by ticket ID or date executes in single-digit milliseconds.`
      },
      {
        heading: 'SQL (Relational) vs. NoSQL (Document): The Paradigm Choice',
        content: `Modern software engineering utilizes two primary database paradigms:

\`\`\`
   RELATIONAL (SQL) - Rigid Tables           DOCUMENT (NoSQL) - Flexible JSON
   +----+---------------+----------+        {
   | ID | Citizen       | Ward     |          "_id": "671e...",
   +----+---------------+----------+   vs     "citizen": "Anita Roy",
   | 1  | Anita Roy     | Ward 14  |          "ward": 14,
   | 2  | Sunita Sen    | Ward 4   |          "timeline": [ { "step": "Filed" } ]
   +----+---------------+----------+        }
\`\`\`

| Criteria | Relational SQL (PostgreSQL, MySQL) | Document NoSQL (MongoDB) |
| :--- | :--- | :--- |
| **Data Format** | Tables, Columns, Rows | Collections of BSON (Binary JSON) Documents |
| **Schema Rigidity**| Strict; altering columns requires migrations | Flexible; fields can vary dynamically per document |
| **Relationships** | Foreign Keys and complex \`JOIN\` operations | Embedded subdocuments or object references |
| **Horizontal Scale**| Complex sharding; best for vertical scaling | Built-in horizontal sharding across cloud clusters |
| **Ideal For** | Banking ledgers, complex enterprise accounting | Rapid product iteration, rich documents, citizen portals |`
      },
      {
        heading: 'MongoDB Architecture: Databases, Collections, and Documents',
        content: `MongoDB organizes data hierarchically:

1. **Database:** The high-level container holding all collections for an application (e.g., \`crp_india_db\`).
2. **Collection:** A grouping of related MongoDB documents (equivalent to a table in SQL), e.g., \`complaints\`, \`users\`, \`wards\`.
3. **Document:** An individual record stored as **BSON** (Binary JSON). Documents can contain strings, numbers, booleans, dates, arrays, and nested subdocuments.

\`\`\`json
// Example MongoDB Complaint Document
{
  "_id": ObjectId("671e98218146700c082823a1"),
  "title": "Water pipeline rupture near Community Hall",
  "department": "Water Works",
  "ward": 14,
  "status": "In Progress",
  "citizen": {
    "name": "Ramesh Kumar",
    "phone": "+91-98765-43210"
  },
  "tags": ["water", "emergency", "monsoon"],
  "createdAt": ISODate("2026-10-28T02:30:00Z")
}
\`\`\`

### Anatomy of an \`_id\` (ObjectId):
Every MongoDB document automatically receives a unique 12-byte identifier called an **ObjectId**. This 24-character hexadecimal string contains:
* **4 bytes:** Unix timestamp of document creation (meaning you can extract the exact second a record was created without a separate \`createdAt\` field!).
* **5 bytes:** Random machine/process identifier.
* **3 bytes:** Incrementing counter.`
      },
      {
        heading: 'Schema Design Strategy: Embedding vs. Referencing',
        content: `When modeling relationships between data in MongoDB, developers choose between two strategies:

### 1. Embedding (Denormalization - "Data that changes together stays together"):
Nesting related data directly inside the parent document as a subdocument or array:
\`\`\`json
// Embedded Comments inside a Complaint Document
{
  "_id": ObjectId("..."),
  "title": "Pothole repair",
  "auditLog": [
    { "officer": "Er. Verma", "action": "Inspected site", "date": "2026-10-25" },
    { "officer": "Er. Sharma", "action": "Assigned asphalt crew", "date": "2026-10-26" }
  ]
}
\`\`\`
*Advantage:* A single read query retrieves the ticket and its entire history instantly with zero database joins. Maximum read performance.

### 2. Referencing (Normalization - "Data that grows unboundedly"):
Storing IDs pointing to documents in another collection:
\`\`\`json
{
  "_id": ObjectId("..."),
  "title": "Pothole repair",
  "citizenId": ObjectId("671e984400192a0018f921bc") // Points to 'users' collection
}
\`\`\`
*Advantage:* Prevents documents from exceeding MongoDB's strict **16MB maximum document size limit** and prevents duplicating large user profiles across thousands of tickets.`
      }
    ],
    exercise: {
      instruction: 'Design a BSON document structure for a municipal public notice. Include fields for _id (ObjectId), title (string), department (string), active (boolean), affectedWards (array of numbers), and metadata (subdocument with authorName and publishedAt).',
      starterCode: `// Write your JSON/BSON document schema below
{
  
}
`,
      hints: [
        'Use ObjectId("...") for the _id field.',
        'Set title to a descriptive string.',
        'affectedWards should be an array of integers like [4, 7, 12].',
        'metadata should be a nested object with authorName and publishedAt.'
      ],
      tasks: [
        'Include standard _id ObjectId',
        'Use array for affectedWards',
        'Use nested subdocument for metadata',
        'Ensure valid JSON syntax'
      ],
      solution: `{
  "_id": "671e9a110022334455667788",
  "title": "Scheduled Water Pipeline Maintenance in Ward 14",
  "department": "Water Supply & Drainage",
  "active": true,
  "affectedWards": [12, 14, 15],
  "metadata": {
    "authorName": "Er. Vikram Singh",
    "publishedAt": "2026-10-28T09:00:00Z"
  }
}`,
      solutionExplanation: 'This document design effectively models municipal notice data. It embeds ward numbers as a native array and groups author information into a structured metadata subdocument, optimizing read throughput without requiring joins.'
    },
    quiz: [
      {
        question: 'What is the maximum allowed size for a single BSON document in MongoDB?',
        options: [
          '500 Kilobytes',
          '16 Megabytes',
          '4 Gigabytes',
          'Unlimited'
        ],
        correctIndex: 1,
        explanation: 'MongoDB limits individual BSON documents to 16MB to prevent runaway memory consumption on database servers and encourage proper referencing architectures.'
      },
      {
        question: 'What information is embedded within the first 4 bytes of every standard MongoDB ObjectId?',
        options: [
          'The server IP address.',
          'The Unix epoch timestamp representing when the document was created.',
          'The size of the document in kilobytes.',
          'The user password hash.'
        ],
        correctIndex: 1,
        explanation: 'The first 4 bytes of any ObjectId store a 32-bit Unix timestamp, allowing MongoDB documents to be sorted chronologically by default using their _id.'
      }
    ],
    takeaways: [
      'Databases guarantee data persistence and concurrency that memory variables in RAM cannot provide.',
      'MongoDB is a Document NoSQL database that stores data as flexible BSON records within Collections.',
      'ObjectIds automatically encode document creation timestamps within their first 4 bytes.',
      'Embed subdocuments for tightly coupled, bounded data; use references when data grows unboundedly.'
    ],
    caseStudyReference: {
      title: 'Database Schema & Collections in CRP India',
      description: 'Examine the MongoDB database connection string configuration and collection references in the CRP India backend.',
      files: [
        'reference-projects/CRP-India/backend/config/db.js',
        'reference-projects/CRP-India/backend/models/Complaint.js'
      ]
    }
  },

  'mongoose-schemas-and-crud': {
    id: 'lesson-11-2',
    slug: 'mongoose-schemas-and-crud',
    courseId: 'course-11',
    courseSlug: 'mongodb-and-mongoose',
    courseTitle: 'Course 11: Databases and MongoDB',
    title: 'Mongoose Schemas, Validation & CRUD Queries',
    category: 'Database',
    estimatedTime: '45 min read & practice',
    objectives: [
      'Understand the role of Mongoose as an Object Data Modeling (ODM) library for Node.js.',
      'Define strongly-typed Mongoose Schemas with built-in validators, default values, and enums.',
      'Execute all CRUD operations (Create, Read, Update, Delete) using Mongoose model methods.',
      'Implement query filters, sorting, field projection, and pagination with skip() and limit().',
      'Understand pre-save middleware hooks (such as hashing passwords before saving).'
    ],
    sections: [
      {
        heading: 'What is Mongoose and Why Do We Use an ODM?',
        content: `While MongoDB's native driver allows you to insert arbitrary documents without any structure, in production enterprise software (like CRP India), **uncontrolled schema-less data leads to bugs**. If one developer inserts a complaint with \`status: "Open"\` and another inserts \`status: 1\`, queries will fail unpredictably.

**Mongoose** is an **Object Data Modeling (ODM)** library for MongoDB and Node.js. It provides:
1. **Schema Definition:** Enforcing strict data types, required fields, and acceptable enum values.
2. **Built-in Validation:** Validating strings, numbers, and regex patterns before sending queries to MongoDB.
3. **Query Building:** Providing ergonomic, chainable Promise-based methods (\`Complaint.find().sort().limit()\`).
4. **Middleware (Hooks):** Intercepting lifecycle events (like hashing user passwords automatically before saving).`
      },
      {
        heading: 'Defining a Production Mongoose Schema and Model',
        content: `A **Schema** defines the structure of documents within a collection. A **Model** is the compiled constructor compiled from the schema that provides the interface to query the database:

\`\`\`javascript
import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Grievance title is mandatory"],
    trim: true,
    minlength: [5, "Title must be at least 5 characters"]
  },
  department: {
    type: String,
    required: true,
    enum: {
      values: ["Public Works", "Sanitation", "Water Supply", "Electricity"],
      message: "{VALUE} is not an authorized municipal department"
    }
  },
  ward: {
    type: Number,
    required: true,
    min: 1,
    max: 50
  },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Resolved", "Rejected"],
    default: "Pending"
  },
  evidenceUrl: {
    type: String,
    default: null
  }
}, {
  timestamps: true // Automatically manages createdAt and updatedAt fields!
});

// Compile the schema into a reusable Model
export const Complaint = mongoose.model('Complaint', complaintSchema);
\`\`\``
      },
      {
        heading: 'Mastering the CRUD Operations in Mongoose',
        content: `CRUD stands for Create, Read, Update, and Delete:

### 1. CREATE: Inserting New Documents
\`\`\`javascript
// Method A: Model.create()
const newTicket = await Complaint.create({
  title: "Broken streetlight near Ward 4 Gate",
  department: "Electricity",
  ward: 4
});

// Method B: Instantiating and calling .save()
const ticket = new Complaint({ title: "Drainage overflow", department: "Sanitation", ward: 7 });
await ticket.save();
\`\`\`

### 2. READ: Querying Records with Filtering, Sorting, and Pagination
\`\`\`javascript
// Find all active water complaints in Ward 14, sorted newest first
const activeWaterTickets = await Complaint.find({
  department: "Water Supply",
  status: { $ne: "Resolved" }, // $ne = Not Equal
  ward: 14
})
.select('title status createdAt') // Field projection: only return these fields
.sort({ createdAt: -1 })          // -1 for descending (newest first)
.limit(10);                       // Limit results to 10 records

// Find single document by its unique ID
const ticket = await Complaint.findById("671e98218146700c082823a1");
\`\`\`

### 3. UPDATE: Modifying Existing Records
\`\`\`javascript
// findByIdAndUpdate: Updates record and returns the modified document
const updatedTicket = await Complaint.findByIdAndUpdate(
  ticketId,
  { 
    status: "Resolved",
    resolutionNotes: "Repair completed by nodal squad."
  },
  { new: true, runValidators: true } // Return updated doc, enforce schema validation!
);
\`\`\`

### 4. DELETE: Removing Records
\`\`\`javascript
// Hard Delete (permanently deletes from database)
await Complaint.findByIdAndDelete(ticketId);
\`\`\`
*Production Best Practice:* In enterprise platforms, **Soft Deletion** is preferred: rather than permanently deleting complaints from disk, set a field \`isDeleted: true\` so audit trails are preserved for regulatory compliance.`
      },
      {
        heading: 'Mongoose Pre-Save Middleware: Automatic Password Hashing',
        content: `Mongoose **Hooks (Middleware)** execute custom logic during document lifecycle events. The most famous use case is hashing passwords before saving a user record:

\`\`\`javascript
import bcrypt from 'bcryptjs';

userSchema.pre('save', async function(next) {
  // Only hash the password if it was legitimately modified or is new
  if (!this.isModified('password')) return next();

  // Generate secure cryptographic salt and hash
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
\`\`\``
      }
    ],
    exercise: {
      instruction: 'Write an asynchronous Express route controller updateComplaintStatus(req, res) that takes id from req.params and status from req.body, calls Complaint.findByIdAndUpdate with runValidators: true and new: true, and returns HTTP 200 with the updated document, or HTTP 404 if not found.',
      starterCode: `// Write your controller function below
async function updateComplaintStatus(req, res) {
  // Update complaint status safely
}
`,
      hints: [
        'Extract const { id } = req.params; and const { status } = req.body;',
        'Use const ticket = await Complaint.findByIdAndUpdate(id, { status }, { new: true, runValidators: true });',
        'If (!ticket) return res.status(404).json({ error: "Ticket not found" });',
        'Return res.status(200).json({ success: true, data: ticket });'
      ],
      tasks: [
        'Extract route params and body',
        'Call findByIdAndUpdate with runValidators',
        'Handle 404 Not Found error state',
        'Return 200 OK with modified record'
      ],
      solution: `async function updateComplaintStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedTicket = await Complaint.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedTicket) {
      return res.status(404).json({
        success: false,
        error: "Grievance ticket not found."
      });
    }

    return res.status(200).json({
      success: true,
      data: updatedTicket
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err.message
    });
  }
}`,
      solutionExplanation: 'This demonstrates an idiomatic Mongoose update controller. It enables runValidators: true so illegal status enum values are rejected, handles the case where the ID does not exist with HTTP 404, and returns the newly updated document with HTTP 200.'
    },
    quiz: [
      {
        question: 'Why is the option "{ new: true }" important when calling Mongoose findByIdAndUpdate()?',
        options: [
          'It forces Mongoose to create a new database collection.',
          'By default, findByIdAndUpdate returns the original document BEFORE the update was applied. Setting new: true instructs Mongoose to return the modified document.',
          'It deletes the old document from memory.',
          'It bypasses schema validation.'
        ],
        correctIndex: 1,
        explanation: 'By default, MongoDB and Mongoose return the original document snapshot as it existed prior to the update. Passing { new: true } returns the updated record.'
      },
      {
        question: 'What is the purpose of Mongoose pre-save middleware hooks in a User schema?',
        options: [
          'To verify the user has a valid internet connection.',
          'To automatically execute tasks (such as cryptographically hashing a plaintext password with bcrypt) immediately before the document is written to MongoDB.',
          'To send an email to the user automatically.',
          'To compress the document into a ZIP file.'
        ],
        correctIndex: 1,
        explanation: 'pre("save", fn) hooks intercept the save workflow, allowing developers to hash passwords, generate slugs, or compute derived properties automatically.'
      }
    ],
    takeaways: [
      'Mongoose enforces schemas, data types, and validation rules over MongoDB collections.',
      'Use timestamps: true in schema options to automatically track createdAt and updatedAt.',
      'Always pass { runValidators: true, new: true } to findByIdAndUpdate.',
      'Use pre-save middleware hooks for data transformations like password hashing.'
    ],
    caseStudyReference: {
      title: 'Complaint Mongoose Model in CRP India',
      description: 'Review the official Complaint Mongoose model in CRP India that specifies citizen references, department enums, geo-coordinates, and status tracking.',
      files: [
        'reference-projects/CRP-India/backend/models/Complaint.js',
        'reference-projects/CRP-India/backend/controllers/complaintController.js'
      ]
    }
  }
};
