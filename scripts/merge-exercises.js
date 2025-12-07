/**
 * Script to merge generated exercise content with existing sample-data.json
 * Usage: node scripts/merge-exercises.js <path-to-generated-exercises.json>
 */

const fs = require('fs');
const path = require('path');

// Expected exercise slugs from sample-data.json chapters
const EXPECTED_EXERCISES = {
  1: { // HTML Course
    1: ['your-first-html-page', 'html-document-structure', 'html-headings', 'paragraphs-and-text'],
    2: ['links-and-anchors', 'images-in-html', 'lists', 'tables'],
    3: ['basic-form', 'form-inputs', 'form-validation'],
    4: ['semantic-elements', 'html5-layout']
  },
  2: { // CSS Course
    1: ['your-first-css', 'css-selectors', 'colors-backgrounds', 'text-styling'],
    2: ['box-model', 'margins-padding', 'display-properties', 'positioning'],
    3: ['flexbox-basics', 'flexbox-layout', 'css-grid-basics'],
    4: ['media-queries', 'mobile-first', 'css-animations']
  },
  3: { // JavaScript Course
    1: ['your-first-javascript', 'variables-data-types', 'operators', 'console-debugging'],
    2: ['if-statements', 'loops', 'functions', 'arrow-functions'],
    3: ['selecting-elements', 'changing-content', 'event-listeners'],
    4: ['objects-arrays', 'array-methods', 'async-javascript']
  },
  4: { // React Course
    1: ['first-react-component', 'jsx-syntax', 'props', 'rendering-lists'],
    2: ['usestate-hook', 'event-handling', 'conditional-rendering', 'forms-react'],
    3: ['useeffect-hook', 'custom-hooks', 'context-api'],
    4: ['todo-app', 'weather-app', 'react-router']
  }
};

function validateExercise(exercise, index) {
  const errors = [];
  
  // Check required fields
  if (!exercise.courseId) errors.push(`Exercise ${index}: Missing courseId`);
  if (!exercise.chapterId) errors.push(`Exercise ${index}: Missing chapterId`);
  if (!exercise.exerciseId) errors.push(`Exercise ${index}: Missing exerciseId`);
  if (!exercise.exerciseName) errors.push(`Exercise ${index}: Missing exerciseName`);
  if (!exercise.exerciseContent) errors.push(`Exercise ${index}: Missing exerciseContent`);
  
  if (exercise.exerciseContent) {
    const content = exercise.exerciseContent;
    if (!content.content) errors.push(`Exercise ${index}: Missing content`);
    if (!content.task) errors.push(`Exercise ${index}: Missing task`);
    if (!content.hint) errors.push(`Exercise ${index}: Missing hint`);
    if (content.hintXp !== 5) errors.push(`Exercise ${index}: hintXp should be 5`);
    if (!content.starterCode) errors.push(`Exercise ${index}: Missing starterCode`);
    if (!content.output) errors.push(`Exercise ${index}: Missing output`);
    if (!content.xp) errors.push(`Exercise ${index}: Missing xp`);
    
    // Check XP range
    if (content.xp < 15 || content.xp > 90) {
      errors.push(`Exercise ${index}: XP should be between 15-90, got ${content.xp}`);
    }
    
    // Check starterCode format
    if (content.starterCode) {
      const files = Object.keys(content.starterCode);
      if (files.length === 0) {
        errors.push(`Exercise ${index}: starterCode has no files`);
      }
      files.forEach(file => {
        if (!file.startsWith('/')) {
          errors.push(`Exercise ${index}: File path should start with /, got ${file}`);
        }
        if (!content.starterCode[file].code) {
          errors.push(`Exercise ${index}: File ${file} missing code property`);
        }
      });
    }
  }
  
  return errors;
}

function checkCoverage(exercises) {
  const coverage = {};
  const missing = {};
  
  // Initialize coverage tracking
  Object.keys(EXPECTED_EXERCISES).forEach(courseId => {
    coverage[courseId] = {};
    missing[courseId] = {};
    Object.keys(EXPECTED_EXERCISES[courseId]).forEach(chapterId => {
      coverage[courseId][chapterId] = [];
      missing[courseId][chapterId] = [...EXPECTED_EXERCISES[courseId][chapterId]];
    });
  });
  
  // Track what we have
  exercises.forEach(ex => {
    const courseId = ex.courseId.toString();
    const chapterId = ex.chapterId.toString();
    if (coverage[courseId] && coverage[courseId][chapterId]) {
      coverage[courseId][chapterId].push(ex.exerciseId);
      const idx = missing[courseId][chapterId].indexOf(ex.exerciseId);
      if (idx > -1) {
        missing[courseId][chapterId].splice(idx, 1);
      }
    }
  });
  
  return { coverage, missing };
}

function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.error('❌ Usage: node scripts/merge-exercises.js <path-to-generated-exercises.json>');
    process.exit(1);
  }
  
  const generatedPath = args[0];
  const sampleDataPath = path.join(__dirname, '..', 'sample-data.json');
  
  console.log('📖 Reading files...\n');
  
  // Read generated exercises
  let generatedData;
  try {
    const generatedContent = fs.readFileSync(generatedPath, 'utf8');
    generatedData = JSON.parse(generatedContent);
  } catch (error) {
    console.error(`❌ Error reading generated file: ${error.message}`);
    process.exit(1);
  }
  
  // Read existing sample-data.json
  let sampleData;
  try {
    const sampleContent = fs.readFileSync(sampleDataPath, 'utf8');
    sampleData = JSON.parse(sampleContent);
  } catch (error) {
    console.error(`❌ Error reading sample-data.json: ${error.message}`);
    process.exit(1);
  }
  
  console.log('✅ Files loaded successfully\n');
  
  // Validate generated exercises
  console.log('🔍 Validating generated exercises...\n');
  const allErrors = [];
  generatedData.exercises.forEach((exercise, index) => {
    const errors = validateExercise(exercise, index);
    allErrors.push(...errors);
  });
  
  if (allErrors.length > 0) {
    console.error('❌ Validation errors found:\n');
    allErrors.forEach(error => console.error(`  - ${error}`));
    console.error('\n❌ Please fix these errors before merging\n');
    process.exit(1);
  }
  
  console.log('✅ All exercises validated successfully\n');
  
  // Check coverage
  console.log('📊 Checking exercise coverage...\n');
  const { coverage, missing } = checkCoverage(generatedData.exercises);
  
  let hasMissing = false;
  Object.keys(missing).forEach(courseId => {
    Object.keys(missing[courseId]).forEach(chapterId => {
      if (missing[courseId][chapterId].length > 0) {
        hasMissing = true;
        console.log(`⚠️  Course ${courseId}, Chapter ${chapterId} missing:`);
        missing[courseId][chapterId].forEach(slug => {
          console.log(`    - ${slug}`);
        });
      }
    });
  });
  
  if (hasMissing) {
    console.log('\n⚠️  Warning: Some exercises are missing. Continue anyway? (y/n)');
    // In a real script, you'd wait for user input here
  } else {
    console.log('✅ All expected exercises are present!\n');
  }
  
  // Count exercises
  const totalExercises = generatedData.exercises.length;
  console.log(`📈 Statistics:`);
  console.log(`   Total exercises: ${totalExercises}`);
  console.log(`   Expected: 60`);
  console.log(`   Status: ${totalExercises === 60 ? '✅ Perfect!' : '⚠️  Count mismatch'}\n`);
  
  // Create backup
  const backupPath = path.join(__dirname, '..', 'sample-data.backup.json');
  console.log('💾 Creating backup...');
  fs.writeFileSync(backupPath, JSON.stringify(sampleData, null, 2));
  console.log(`✅ Backup saved to: ${backupPath}\n`);
  
  // Merge exercises (keep existing, add new)
  console.log('🔄 Merging exercises...');
  const existingIds = new Set(sampleData.exercises.map(ex => ex.exerciseId));
  const newExercises = generatedData.exercises.filter(ex => !existingIds.has(ex.exerciseId));
  
  sampleData.exercises = [...sampleData.exercises, ...newExercises];
  
  console.log(`   Existing exercises: ${sampleData.exercises.length - newExercises.length}`);
  console.log(`   New exercises: ${newExercises.length}`);
  console.log(`   Total after merge: ${sampleData.exercises.length}\n`);
  
  // Write merged data
  console.log('💾 Writing merged data...');
  fs.writeFileSync(sampleDataPath, JSON.stringify(sampleData, null, 2));
  console.log(`✅ Merged data saved to: ${sampleDataPath}\n`);
  
  console.log('🎉 Merge completed successfully!\n');
  console.log('Next steps:');
  console.log('  1. Review the merged sample-data.json');
  console.log('  2. Run: npm run db:seed');
  console.log('  3. Test exercises in browser');
  console.log('  4. If issues occur, restore from backup:\n');
  console.log(`     cp ${backupPath} ${sampleDataPath}\n`);
}

main();