const fs = require('fs');
const path = require('path');

const lessonsDir = path.join(__dirname, '..', 'src', 'data', 'lessons');
const files = fs.readdirSync(lessonsDir).filter(f => f.endsWith('.js'));

console.log('====================================');
console.log('DEV-ROOT PHASE 4 CONTENT AUDIT');
console.log('====================================\n');

let grandTotalLessons = 0;
let grandTotalWords = 0;
const report = [];

for (const file of files) {
  const filePath = path.join(lessonsDir, file);
  const text = fs.readFileSync(filePath, 'utf-8');
  
  // Extract lesson IDs
  const lessonIds = [];
  const regex = /id:\s*['"]([a-zA-Z0-9_-]+)['"]/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (!lessonIds.includes(match[1])) {
      lessonIds.push(match[1]);
    }
  }

  // Count sections
  const sectionMatches = text.match(/title:\s*['"][^'"]+['"],\s*content:/g) || [];
  const words = text.split(/\s+/).filter(Boolean).length;
  
  report.push({
    file,
    lessonCount: lessonIds.length,
    lessons: lessonIds,
    sections: sectionMatches.length,
    approxWords: words,
  });
  
  grandTotalLessons += lessonIds.length;
  grandTotalWords += words;
}

report.forEach(r => {
  console.log(`File: ${r.file}`);
  console.log(`  Lessons (${r.lessonCount}): ${r.lessons.join(', ')}`);
  console.log(`  Sections: ~${r.sections} | Total Raw Words: ~${r.approxWords}`);
  console.log(`  Avg Words/Lesson: ~${Math.round(r.approxWords / (r.lessonCount || 1))}`);
  console.log('------------------------------------');
});

console.log(`\nGRAND TOTAL: ${grandTotalLessons} lessons across ${files.length} modules, ~${grandTotalWords} total words.`);
