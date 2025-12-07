# Complete Workflow: Generating and Integrating Course Content

## 📋 Overview
This guide walks you through the complete process of generating all course content using another AI model and integrating it into your Codebox platform.

---

## Step 1: Generate Content with AI Model

### 1.1 Prepare the Prompt
Use the file: **`COURSE-CONTENT-GENERATION-PROMPT.md`**

This prompt contains:
- ✅ Complete structure requirements
- ✅ All 60 exercises across 4 courses
- ✅ Detailed examples and formatting rules
- ✅ Validation checklist

### 1.2 Send to AI Model
Copy the entire content of `COURSE-CONTENT-GENERATION-PROMPT.md` and send it to another AI model (like Claude, GPT-4, etc.)

### 1.3 Expected Output
You should receive a JSON file with this structure:
```json
{
  "exercises": [
    // 58 new exercises (we already have 2)
  ]
}
```

Save this as: **`generated-exercises.json`**

---

## Step 2: Validate Generated Content

### 2.1 Basic JSON Validation
```bash
# Check if JSON is valid
node -e "JSON.parse(require('fs').readFileSync('generated-exercises.json', 'utf8'))"
```

If this command runs without errors, your JSON is valid ✅

### 2.2 Count Exercises
```bash
node -e "const data = require('./generated-exercises.json'); console.log('Total exercises:', data.exercises.length);"
```

Expected output: **58 exercises** (since we already have 2)

### 2.3 Manual Spot Check
Open `generated-exercises.json` and verify a few random exercises have:
- ✅ All required fields (courseId, chapterId, exerciseId, exerciseName, exerciseContent)
- ✅ HTML content (not markdown)
- ✅ Proper starter code with `/index.html` format
- ✅ Reasonable XP values (15-90)

---

## Step 3: Merge with Existing Data

### 3.1 Automatic Merge (Recommended)
```bash
node scripts/merge-exercises.js generated-exercises.json
```

This script will:
- ✅ Validate all exercises
- ✅ Check for missing exercises
- ✅ Create backup of current data
- ✅ Merge new exercises with existing ones
- ✅ Save to sample-data.json

### 3.2 Manual Merge (Alternative)
If you prefer manual control:

1. **Backup current data:**
   ```bash
   cp sample-data.json sample-data.backup.json
   ```

2. **Open both files:**
   - `sample-data.json` (existing)
   - `generated-exercises.json` (new)

3. **Copy exercises array:**
   - Copy all exercises from `generated-exercises.json`
   - Paste into the `exercises` array in `sample-data.json`
   - Keep the existing 2 exercises (your-first-html-page, html-document-structure)

4. **Save and validate:**
   ```bash
   node -e "const data = require('./sample-data.json'); console.log('Total:', data.exercises.length);"
   ```
   Should show: **60 exercises**

---

## Step 4: Seed Database

### 4.1 Backup Database (Optional but Recommended)
If you have important data, backup your database first.

### 4.2 Run Seed Script
```bash
npm run db:seed
```

Expected output:
```
✅ Seeded 4 courses
✅ Seeded 16 chapters
✅ Seeded 60 exercises
```

### 4.3 Check for Errors
If you see errors like:
- "No database connection" → Check your `.env.local` file
- "Duplicate key" → Database already has data, might need to clear first
- "Invalid JSON" → Check the exercise content format

---

## Step 5: Test in Browser

### 5.1 Start Development Server
```bash
npm run dev
```

### 5.2 Test Random Exercises
Visit these URLs and verify they load correctly:

**HTML Course:**
- http://localhost:3000/courses/1/1/html-headings
- http://localhost:3000/courses/1/2/links-and-anchors

**CSS Course:**
- http://localhost:3000/courses/2/1/your-first-css
- http://localhost:3000/courses/2/2/box-model

**JavaScript Course:**
- http://localhost:3000/courses/3/1/your-first-javascript
- http://localhost:3000/courses/3/3/event-listeners

**React Course:**
- http://localhost:3000/courses/4/1/first-react-component
- http://localhost:3000/courses/4/2/usestate-hook

### 5.3 Verify Exercise Features
For each exercise, check:
- ✅ Content displays correctly (no HTML tags showing)
- ✅ Task section is clear and formatted
- ✅ Hint button works
- ✅ Code editor loads with starter code
- ✅ Preview panel shows output
- ✅ "Mark Complete" button works
- ✅ XP is awarded on completion

---

## Step 6: Verify Dashboard Stats

### 6.1 Complete Some Exercises
1. Enroll in a course
2. Complete 2-3 exercises
3. Go to dashboard

### 6.2 Check Stats Update
Verify:
- ✅ Total XP increases
- ✅ Badges are earned (if thresholds met)
- ✅ Course progress shows correctly
- ✅ Exercise count updates

---

## Troubleshooting

### Issue: "Exercise Not Found"
**Cause:** Exercise slug doesn't match database
**Fix:** 
1. Check the URL slug matches exerciseId in database
2. Verify exercise was seeded: Check database or run seed again

### Issue: HTML Tags Showing in Content
**Cause:** Content is markdown instead of HTML
**Fix:** 
1. Regenerate that exercise with proper HTML
2. Manually convert markdown to HTML tags

### Issue: Code Editor Not Loading
**Cause:** Starter code format is wrong
**Fix:**
1. Check file paths start with `/` (e.g., `/index.html`)
2. Verify `code` property exists in starterCode
3. Check for proper `\n` newlines in code

### Issue: Preview Panel Empty
**Cause:** Sandpack template mismatch
**Fix:**
1. HTML/CSS/JS courses should use `editorType: "static"`
2. React course should use `editorType: "react"`
3. Check course table in database

### Issue: XP Not Awarded
**Cause:** Completion API error
**Fix:**
1. Check browser console for errors
2. Verify user is enrolled in course
3. Check database connection

---

## Rollback Procedure

If something goes wrong:

### Option 1: Restore Data File
```bash
cp sample-data.backup.json sample-data.json
npm run db:seed
```

### Option 2: Clear Database and Start Fresh
```bash
# Clear all data
npm run db:push

# Reseed with backup
npm run db:seed
```

---

## Success Criteria Checklist

Before considering the integration complete:

- [ ] All 60 exercises load without errors
- [ ] Content displays properly (no raw HTML)
- [ ] Code editor works for all exercises
- [ ] Preview panel shows output
- [ ] Exercise completion awards XP
- [ ] Dashboard stats update correctly
- [ ] Navigation between exercises works
- [ ] Hints display when clicked
- [ ] No console errors in browser
- [ ] Mobile responsive (test on phone)

---

## File Reference

**Generated Files:**
- `COURSE-CONTENT-GENERATION-PROMPT.md` - Send this to AI model
- `CONTENT-VALIDATION-GUIDE.md` - Use for validation
- `CONTENT-GENERATION-WORKFLOW.md` - This file (workflow guide)
- `scripts/merge-exercises.js` - Automated merge script

**Data Files:**
- `sample-data.json` - Main data file (will be updated)
- `sample-data.backup.json` - Backup (created automatically)
- `generated-exercises.json` - Output from AI model (you create this)

**Database:**
- Exercises stored in `exercises` table
- Chapters stored in `course_chapters` table
- Courses stored in `courses` table

---

## Timeline Estimate

- **Generate Content:** 10-30 minutes (depends on AI model)
- **Validate Content:** 5-10 minutes
- **Merge Data:** 2-5 minutes
- **Seed Database:** 1-2 minutes
- **Test Exercises:** 10-20 minutes
- **Total:** ~30-60 minutes

---

## Tips for Best Results

1. **Review Sample Exercises:** Look at the 2 existing exercises in sample-data.json to understand the format
2. **Test Incrementally:** Don't wait to test all 60 at once - test after seeding
3. **Keep Backups:** Always backup before making changes
4. **Check Console:** Browser console will show helpful error messages
5. **Use Validation Script:** The merge script catches most issues automatically
6. **Start with One Course:** If nervous, generate just Course 1 first, test it, then do the rest

---

## Next Steps After Integration

Once all exercises are working:

1. **Add More Courses:** Create new courses following the same pattern
2. **Enhance Exercises:** Add more complex projects and challenges
3. **Add Tests:** Implement automated testing for exercise solutions
4. **Add Achievements:** Create more badges and milestones
5. **Add Leaderboard:** Show top learners by XP
6. **Add Certificates:** Award certificates for course completion

---

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review the validation guide
3. Check browser console for errors
4. Verify database connection
5. Test with a fresh database seed

Good luck with your content generation! 🚀