# CSS Exercises HTML Template Fix

## Issue
All CSS exercises need the complete HTML template with `<link rel="stylesheet" href="styles.css"/>` tag to properly load CSS files in Sandpack.

## Current Problem
Exercises only have `<body>` content or partial HTML without the `<link>` tag, so CSS styles don't apply.

## Required Template
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Exercise Title</title>
  <link rel="stylesheet" href="styles.css"/>
</head>
<body>
  <!-- Exercise content here -->
</body>
</html>
```

## Exercises That Need Fixing

### Course 2 (CSS) - All exercises need complete HTML template:
1. ✅ css-selectors - FIXED
2. ❌ colors-backgrounds - needs fix
3. ❌ text-styling - needs fix
4. ❌ box-model - needs fix
5. ❌ margins-padding - needs fix
6. ❌ display-properties - needs fix
7. ❌ positioning - needs fix
8. ❌ flexbox-basics - needs fix
9. ❌ flexbox-layout - needs fix
10. ❌ css-grid-basics - needs fix
11. ❌ media-queries - needs fix
12. ❌ mobile-first - needs fix
13. ❌ css-animations - needs fix

## Manual Fix Instructions

For each CSS exercise in sample-data.json:

1. Find the exercise by `exerciseId`
2. Locate the `starterCode` section
3. Replace the `/index.html` code with complete template
4. Wrap existing body content inside the template
5. Ensure `/styles.css` file exists in starterCode

## Quick Fix Command (if using script)
```bash
# This would need to be a Node.js script to properly parse and update JSON
node scripts/fix-css-html-templates.js
```

## Recommendation
Since there are 13 CSS exercises to fix and manual editing is error-prone, it's better to:
1. Generate complete content using the COURSE-CONTENT-GENERATION-PROMPT.md
2. Or manually fix each one carefully in the JSON file
3. Or create a Node.js script to automate the fix

The key is: **Every CSS exercise MUST have the complete HTML template with the stylesheet link tag!**