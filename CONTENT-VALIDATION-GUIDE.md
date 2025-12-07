# Content Validation Guide

## Quick Checklist for Generated Content

### 1. Structure Validation
```bash
# Check if JSON is valid
node -e "JSON.parse(require('fs').readFileSync('generated-exercises.json', 'utf8'))"
```

### 2. Required Fields Check
Each exercise MUST have:
- ✅ `courseId` (number: 1-4)
- ✅ `chapterId` (number: 1-4)
- ✅ `exerciseId` (string: slug format)
- ✅ `exerciseName` (string: display name)
- ✅ `exerciseContent` (object with 6 fields)
  - ✅ `content` (HTML string)
  - ✅ `task` (HTML string)
  - ✅ `hint` (HTML string)
  - ✅ `hintXp` (number: always 5)
  - ✅ `starterCode` (object with file paths)
  - ✅ `output` (string: description)
  - ✅ `xp` (number: 15-90)

### 3. Exercise Count Verification

**Expected Exercise Counts:**
- Course 1 (HTML): 15 exercises
  - Chapter 1: 4 exercises
  - Chapter 2: 4 exercises
  - Chapter 3: 3 exercises
  - Chapter 4: 2 exercises

- Course 2 (CSS): 15 exercises
  - Chapter 1: 4 exercises
  - Chapter 2: 4 exercises
  - Chapter 3: 3 exercises
  - Chapter 4: 3 exercises

- Course 3 (JavaScript): 15 exercises
  - Chapter 1: 4 exercises
  - Chapter 2: 4 exercises
  - Chapter 3: 3 exercises
  - Chapter 4: 3 exercises

- Course 4 (React): 15 exercises
  - Chapter 1: 4 exercises
  - Chapter 2: 4 exercises
  - Chapter 3: 3 exercises
  - Chapter 4: 3 exercises

**Total: 60 exercises**

### 4. Exercise ID Mapping

Must match these exact slugs from sample-data.json:

**Course 1 - HTML:**
- your-first-html-page ✅ (exists)
- html-document-structure ✅ (exists)
- html-headings
- paragraphs-and-text
- links-and-anchors
- images-in-html
- lists
- tables
- basic-form
- form-inputs
- form-validation
- semantic-elements
- html5-layout

**Course 2 - CSS:**
- your-first-css
- css-selectors
- colors-backgrounds
- text-styling
- box-model
- margins-padding
- display-properties
- positioning
- flexbox-basics
- flexbox-layout
- css-grid-basics
- media-queries
- mobile-first
- css-animations

**Course 3 - JavaScript:**
- your-first-javascript
- variables-data-types
- operators
- console-debugging
- if-statements
- loops
- functions
- arrow-functions
- selecting-elements
- changing-content
- event-listeners
- objects-arrays
- array-methods
- async-javascript

**Course 4 - React:**
- first-react-component
- jsx-syntax
- props
- rendering-lists
- usestate-hook
- event-handling
- conditional-rendering
- forms-react
- useeffect-hook
- custom-hooks
- context-api
- todo-app
- weather-app
- react-router

### 5. Common Issues to Check

❌ **Wrong:** Using markdown syntax
```json
"content": "## Heading\n**Bold text**"
```

✅ **Correct:** Using HTML tags
```json
"content": "<h2>Heading</h2><p><strong>Bold text</strong></p>"
```

---

❌ **Wrong:** Unescaped HTML in JSON
```json
"content": "<p>Use <code> tag</p>"
```

✅ **Correct:** Properly escaped
```json
"content": "<p>Use &lt;code&gt; tag</p>"
```

---

❌ **Wrong:** Missing newlines in code
```json
"code": "<!DOCTYPE html><html><head></head></html>"
```

✅ **Correct:** Proper formatting
```json
"code": "<!DOCTYPE html>\n<html>\n<head>\n</head>\n</html>"
```

---

❌ **Wrong:** Inconsistent file structure
```json
"starterCode": {
  "index.html": { "code": "..." }  // Missing leading slash
}
```

✅ **Correct:** Consistent paths
```json
"starterCode": {
  "/index.html": { "code": "..." }  // With leading slash
}
```

### 6. How to Merge with Existing Data

Once you receive the generated content:

1. **Backup current data:**
```bash
cp sample-data.json sample-data.backup.json
```

2. **Merge the exercises:**
   - Keep the existing 2 exercises (your-first-html-page, html-document-structure)
   - Add all new exercises to the array
   - Ensure no duplicates

3. **Validate the merged file:**
```bash
node -e "const data = require('./sample-data.json'); console.log('Total exercises:', data.exercises.length); console.log('Expected: 60');"
```

4. **Test with seed script:**
```bash
npm run db:seed
```

### 7. Quick Test After Seeding

Visit these URLs to verify:
- http://localhost:3000/courses/1/1/html-headings
- http://localhost:3000/courses/2/1/your-first-css
- http://localhost:3000/courses/3/1/your-first-javascript
- http://localhost:3000/courses/4/1/first-react-component

All should load without "Exercise Not Found" error.

### 8. Database Verification Queries

After seeding, check the database:

```sql
-- Count exercises per course
SELECT courseId, COUNT(*) as count 
FROM exercises 
GROUP BY courseId;

-- Should return:
-- courseId | count
-- 1        | 15
-- 2        | 15
-- 3        | 15
-- 4        | 15

-- Check for missing exercises
SELECT * FROM exercises 
WHERE exerciseId IN ('html-headings', 'your-first-css', 'your-first-javascript', 'first-react-component');
```

### 9. Content Quality Checklist

For each exercise, verify:
- [ ] Content is educational and clear
- [ ] Task is specific and achievable
- [ ] Hint is helpful but not a complete solution
- [ ] Starter code provides good foundation
- [ ] XP matches difficulty (easy: 15-25, medium: 25-40, hard: 40-90)
- [ ] Emojis used appropriately for engagement
- [ ] No typos or grammatical errors
- [ ] Code examples are correct and runnable

### 10. Final Integration Steps

1. Receive generated JSON file
2. Validate structure and count
3. Merge with existing sample-data.json
4. Backup database
5. Run seed script: `npm run db:seed`
6. Test random exercises in browser
7. Check dashboard stats update correctly
8. Verify exercise completion flow works

---

## Emergency Rollback

If something goes wrong:

```bash
# Restore backup
cp sample-data.backup.json sample-data.json

# Clear database and reseed
npm run db:push
npm run db:seed
```

## Success Criteria

✅ All 60 exercises load without errors
✅ Sandpack editor displays correctly
✅ Code runs in preview panel
✅ Exercise completion awards XP
✅ Dashboard stats update properly
✅ Navigation between exercises works
✅ No console errors in browser