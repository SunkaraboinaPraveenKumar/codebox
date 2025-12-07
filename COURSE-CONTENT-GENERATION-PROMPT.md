# Course Content Generation Prompt for Codebox E-Learning Platform

## Overview
Generate complete exercise content for an interactive coding education platform. Each exercise needs theory, tasks, hints, and starter code that will render in a Sandpack code editor.

## Critical Requirements

### 1. JSON Structure
All content must be valid JSON that matches this exact structure:

```json
{
  "exercises": [
    {
      "courseId": 1,
      "chapterId": 1,
      "exerciseId": "exercise-slug-here",
      "exerciseName": "Exercise Name Here",
      "exerciseContent": {
        "content": "HTML string with theory",
        "task": "HTML string with task instructions",
        "hint": "HTML string with helpful hint",
        "hintXp": 5,
        "starterCode": {
          "/index.html": {
            "code": "starter code here"
          }
        },
        "output": "Description of expected output",
        "xp": 20
      }
    }
  ]
}
```

### 2. HTML Content Rules
- Use **HTML tags** in content, task, and hint fields (NOT markdown)
- Allowed tags: `<h2>`, `<h3>`, `<p>`, `<ul>`, `<li>`, `<code>`, `<pre>`, `<strong>`, `<em>`
- Escape special characters: `<` becomes `&lt;`, `>` becomes `&gt;`
- Use `\n` for newlines in code blocks
- Keep content concise and beginner-friendly

### 3. Starter Code Format
- For HTML/CSS/JS courses: Use `/index.html`, `/styles.css`, `/script.js`
- For React courses: Use `/App.js`, `/index.js`, `/styles.css`
- Include helpful comments like `<!-- Write your code here -->`
- Provide enough structure so beginners aren't lost

### 4. XP and Difficulty Guidelines
- Easy exercises: 15-25 XP
- Medium exercises: 25-40 XP
- Hard exercises: 40-70 XP
- Hint XP cost: Always 5 XP

---

## Course 1: HTML Beginner (courseId: 1)

### Chapter 1: Introduction to HTML (chapterId: 1)
Generate content for these exercises:

1. **your-first-html-page** (20 XP, easy) ✅ ALREADY EXISTS
2. **html-document-structure** (25 XP, easy) ✅ ALREADY EXISTS
3. **html-headings** (15 XP, easy)
   - Teach: h1-h6 tags, heading hierarchy, semantic importance
   - Task: Create a page with different heading levels
   - Starter: Basic HTML template
4. **paragraphs-and-text** (15 XP, easy)
   - Teach: `<p>`, `<br>`, `<strong>`, `<em>`, text formatting
   - Task: Create formatted text content
   - Starter: HTML with body tag

### Chapter 2: HTML Elements & Content (chapterId: 2)
Generate content for:

1. **links-and-anchors** (20 XP, easy)
   - Teach: `<a>` tag, href attribute, target, internal/external links
   - Task: Create navigation with multiple links
2. **images-in-html** (20 XP, easy)
   - Teach: `<img>` tag, src, alt attributes, image best practices
   - Task: Add images with proper alt text
3. **lists** (25 XP, medium)
   - Teach: `<ul>`, `<ol>`, `<li>`, nested lists
   - Task: Create both ordered and unordered lists
4. **tables** (30 XP, medium)
   - Teach: `<table>`, `<tr>`, `<td>`, `<th>`, table structure
   - Task: Create a data table with headers

### Chapter 3: HTML Forms (Pro) (chapterId: 3)
Generate content for:

1. **basic-form** (30 XP, medium)
   - Teach: `<form>`, `<input>`, `<label>`, form structure
   - Task: Create a simple contact form
2. **form-inputs** (35 XP, medium)
   - Teach: Different input types (text, email, password, number, date)
   - Task: Create form with various input types
3. **form-validation** (40 XP, hard)
   - Teach: required, pattern, min/max attributes
   - Task: Create validated form with constraints

### Chapter 4: Semantic HTML (Pro) (chapterId: 4)
Generate content for:

1. **semantic-elements** (35 XP, medium)
   - Teach: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`
   - Task: Create semantic page structure
2. **html5-layout** (40 XP, hard)
   - Teach: Complete HTML5 semantic layout, accessibility
   - Task: Build full semantic webpage

---

## Course 2: CSS Fundamentals (courseId: 2)

### Chapter 1: CSS Basics (chapterId: 1)
Generate content for:

1. **your-first-css** (20 XP, easy)
   - Teach: CSS syntax, selectors, how to link CSS
   - Task: Style text with colors and fonts
   - Starter: HTML + empty CSS file
2. **css-selectors** (25 XP, easy)
   - Teach: Element, class, ID selectors, specificity
   - Task: Style different elements using various selectors
3. **colors-backgrounds** (20 XP, easy)
   - Teach: color, background-color, background-image, gradients
   - Task: Create colorful styled sections
4. **text-styling** (20 XP, easy)
   - Teach: font-family, font-size, font-weight, text-align, line-height
   - Task: Style typography beautifully

### Chapter 2: CSS Layout & Box Model (chapterId: 2)
Generate content for:

1. **box-model** (30 XP, medium)
   - Teach: content, padding, border, margin, box-sizing
   - Task: Create boxes with proper spacing
2. **margins-padding** (25 XP, medium)
   - Teach: Margin/padding values, shorthand, auto centering
   - Task: Layout elements with proper spacing
3. **display-properties** (30 XP, medium)
   - Teach: block, inline, inline-block, none
   - Task: Control element display behavior
4. **positioning** (35 XP, hard)
   - Teach: static, relative, absolute, fixed, sticky
   - Task: Position elements precisely

### Chapter 3: Flexbox & Grid (Pro) (chapterId: 3)
Generate content for:

1. **flexbox-basics** (40 XP, medium)
   - Teach: display: flex, flex-direction, justify-content, align-items
   - Task: Create flexible layouts
2. **flexbox-layout** (45 XP, hard)
   - Teach: flex-wrap, flex-grow, flex-shrink, complex layouts
   - Task: Build responsive card layout
3. **css-grid-basics** (50 XP, hard)
   - Teach: display: grid, grid-template-columns, grid-gap
   - Task: Create grid-based layout

### Chapter 4: Responsive Design (Pro) (chapterId: 4)
Generate content for:

1. **media-queries** (40 XP, medium)
   - Teach: @media, breakpoints, responsive design principles
   - Task: Make layout responsive
2. **mobile-first** (45 XP, hard)
   - Teach: Mobile-first approach, viewport meta tag
   - Task: Build mobile-first responsive page
3. **css-animations** (50 XP, hard)
   - Teach: transition, transform, @keyframes, animation
   - Task: Create animated elements

---

## Course 3: JavaScript Basics (courseId: 3)

### Chapter 1: JavaScript Fundamentals (chapterId: 1)
Generate content for:

1. **your-first-javascript** (25 XP, easy)
   - Teach: console.log, script tag, JavaScript basics
   - Task: Write first JavaScript program
   - Starter: HTML with script tag
2. **variables-data-types** (30 XP, easy)
   - Teach: let, const, var, strings, numbers, booleans
   - Task: Declare and use variables
3. **operators** (25 XP, easy)
   - Teach: Arithmetic, comparison, logical operators
   - Task: Perform calculations and comparisons
4. **console-debugging** (20 XP, easy)
   - Teach: console methods, debugging basics
   - Task: Debug code using console

### Chapter 2: Control Flow & Functions (chapterId: 2)
Generate content for:

1. **if-statements** (30 XP, medium)
   - Teach: if, else if, else, ternary operator
   - Task: Write conditional logic
2. **loops** (35 XP, medium)
   - Teach: for, while, do-while loops, break, continue
   - Task: Iterate and process data
3. **functions** (40 XP, medium)
   - Teach: Function declaration, parameters, return values
   - Task: Create reusable functions
4. **arrow-functions** (35 XP, medium)
   - Teach: Arrow function syntax, implicit return
   - Task: Refactor to arrow functions

### Chapter 3: DOM Manipulation (Pro) (chapterId: 3)
Generate content for:

1. **selecting-elements** (40 XP, medium)
   - Teach: querySelector, getElementById, getElementsByClassName
   - Task: Select and log DOM elements
2. **changing-content** (45 XP, medium)
   - Teach: innerHTML, textContent, setAttribute, classList
   - Task: Modify page content dynamically
3. **event-listeners** (50 XP, hard)
   - Teach: addEventListener, event types, event object
   - Task: Create interactive buttons

### Chapter 4: Advanced JavaScript (Pro) (chapterId: 4)
Generate content for:

1. **objects-arrays** (45 XP, hard)
   - Teach: Object literals, array methods, destructuring
   - Task: Work with complex data structures
2. **array-methods** (50 XP, hard)
   - Teach: map, filter, reduce, forEach
   - Task: Transform and process arrays
3. **async-javascript** (60 XP, hard)
   - Teach: Promises, async/await, fetch API
   - Task: Make API calls

---

## Course 4: React for Beginners (courseId: 4)

### Chapter 1: React Basics (chapterId: 1)
Generate content for:

1. **first-react-component** (30 XP, medium)
   - Teach: Components, JSX, function components
   - Task: Create first React component
   - Starter: React template with App.js
2. **jsx-syntax** (35 XP, medium)
   - Teach: JSX rules, expressions, attributes
   - Task: Write JSX with dynamic content
3. **props** (40 XP, medium)
   - Teach: Props, passing data, prop types
   - Task: Create component with props
4. **rendering-lists** (45 XP, medium)
   - Teach: map(), keys, rendering arrays
   - Task: Render list of items

### Chapter 2: State & Events (chapterId: 2)
Generate content for:

1. **usestate-hook** (50 XP, medium)
   - Teach: useState, state updates, re-rendering
   - Task: Create stateful counter
2. **event-handling** (45 XP, medium)
   - Teach: onClick, onChange, event handling in React
   - Task: Handle user interactions
3. **conditional-rendering** (40 XP, medium)
   - Teach: Conditional rendering patterns, ternary, &&
   - Task: Show/hide content conditionally
4. **forms-react** (55 XP, hard)
   - Teach: Controlled components, form handling
   - Task: Build controlled form

### Chapter 3: Advanced React (Pro) (chapterId: 3)
Generate content for:

1. **useeffect-hook** (60 XP, hard)
   - Teach: useEffect, side effects, cleanup, dependencies
   - Task: Fetch data on mount
2. **custom-hooks** (65 XP, hard)
   - Teach: Creating custom hooks, reusable logic
   - Task: Build custom hook
3. **context-api** (70 XP, hard)
   - Teach: Context, Provider, Consumer, useContext
   - Task: Share state globally

### Chapter 4: React Projects (Pro) (chapterId: 4)
Generate content for:

1. **todo-app** (80 XP, hard)
   - Teach: CRUD operations, state management
   - Task: Build complete todo app
2. **weather-app** (90 XP, hard)
   - Teach: API integration, async state
   - Task: Build weather app with API
3. **react-router** (75 XP, hard)
   - Teach: React Router, navigation, routes
   - Task: Add routing to app

---

## Example Exercise Format

Here's a complete example showing the exact format needed:

```json
{
  "courseId": 1,
  "chapterId": 1,
  "exerciseId": "html-headings",
  "exerciseName": "HTML Headings",
  "exerciseContent": {
    "content": "<h2>HTML Headings 📝</h2><p>HTML provides six levels of headings, from <code>&lt;h1&gt;</code> to <code>&lt;h6&gt;</code>. Headings help structure your content and improve accessibility.</p><h3>Heading Hierarchy</h3><ul><li><code>&lt;h1&gt;</code> - Main page title (use only once per page)</li><li><code>&lt;h2&gt;</code> - Major sections</li><li><code>&lt;h3&gt;</code> - Subsections</li><li><code>&lt;h4&gt;</code> to <code>&lt;h6&gt;</code> - Further subdivisions</li></ul><p><strong>Best Practices:</strong></p><ul><li>Don't skip heading levels (don't jump from h1 to h3)</li><li>Use headings for structure, not just styling</li><li>Screen readers use headings for navigation</li></ul>",
    "task": "<p><strong>Your Task:</strong></p><p>Create a blog post structure with:</p><ul><li>An <code>&lt;h1&gt;</code> for the blog title</li><li>Two <code>&lt;h2&gt;</code> headings for main sections</li><li>At least one <code>&lt;h3&gt;</code> for a subsection</li><li>Add a paragraph under each heading</li></ul>",
    "hint": "<p>💡 <strong>Hint:</strong> Start with &lt;h1&gt;My Blog&lt;/h1&gt;, then add &lt;h2&gt; sections like 'About Me' and 'My Projects'. Use &lt;h3&gt; for subsections like 'Skills' under 'About Me'.</p>",
    "hintXp": 5,
    "starterCode": {
      "/index.html": {
        "code": "<!DOCTYPE html>\n<html>\n<head>\n  <title>Blog Post</title>\n</head>\n<body>\n  <!-- Create your heading structure here -->\n  \n</body>\n</html>"
      }
    },
    "output": "A properly structured HTML page with hierarchical headings and content",
    "xp": 15
  }
}
```

---

## Important Notes

1. **Escape HTML in JSON**: When HTML tags appear in content/task/hint strings, they should be properly escaped in JSON
2. **Newlines in Code**: Use `\n` for line breaks in starter code
3. **Progressive Difficulty**: Each exercise should build on previous concepts
4. **Practical Tasks**: Make tasks realistic and immediately useful
5. **Encouraging Tone**: Use emojis and friendly language to keep learners motivated
6. **Clear Instructions**: Tasks should be specific and achievable
7. **Helpful Hints**: Hints should guide without giving away the complete solution

## Output Format

Generate a single JSON file with this structure:

```json
{
  "exercises": [
    // All 60+ exercises here
  ]
}
```

## Validation Checklist

Before submitting, verify:
- ✅ All exerciseId values match the slugs in the chapters array
- ✅ All HTML is properly escaped in JSON strings
- ✅ All starter code uses `\n` for newlines
- ✅ XP values match the difficulty guidelines
- ✅ Each exercise has content, task, hint, starterCode, output, and xp
- ✅ File paths in starterCode match the course type (HTML/CSS/JS vs React)
- ✅ JSON is valid and properly formatted

Generate complete, beginner-friendly content that will help students learn to code through hands-on practice!