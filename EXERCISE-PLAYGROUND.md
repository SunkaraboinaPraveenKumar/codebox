# Exercise Playground - Interactive Coding Environment

## Overview
The exercise playground is the core interactive coding feature of Codebox. It provides a full-featured code editor with live preview, allowing students to practice coding in a real environment.

## Features

### 🎯 Interactive Code Editor
- **Sandpack Integration**: Powered by CodeSandbox's Sandpack for reliable code execution
- **Live Preview**: Code runs automatically with real-time updates
- **Syntax Highlighting**: Full syntax highlighting for HTML, CSS, JavaScript, and React
- **Error Detection**: Inline error detection and debugging support
- **Multiple Templates**: Support for static HTML/CSS/JS and React projects

### 📚 Learning Content
- **Theory Section**: Comprehensive explanations and examples
- **Task Instructions**: Clear, step-by-step tasks to complete
- **Hints System**: Optional hints with XP rewards for guidance
- **Progress Tracking**: XP system and completion tracking

### 🛠️ Editor Features
- **Reset Code**: Reset to starter template anytime
- **Live Console**: View console output and errors
- **Responsive Layout**: Split-pane layout with resizable panels
- **Navigation**: Easy navigation between exercises

## How It Works

### 1. Exercise Structure
Each exercise contains:
```json
{
  "content": "HTML theory and explanations",
  "task": "What the student needs to accomplish",
  "hint": "Optional guidance with XP cost",
  "starterCode": {
    "/index.html": {
      "code": "<!DOCTYPE html>..."
    }
  },
  "xp": 20
}
```

### 2. Navigation Flow
1. **Course Page** → Browse available courses
2. **Course Detail** → View chapters and exercises
3. **Exercise Playground** → Interactive coding environment
4. **Completion** → Mark complete and earn XP

### 3. Exercise Types
- **Static**: HTML, CSS, JavaScript exercises
- **React**: Component-based React exercises
- **Progressive**: Builds on previous concepts

## Technical Implementation

### Frontend Components
- `app/courses/[courseId]/[chapterId]/[exerciseSlug]/page.tsx` - Main playground
- Sandpack integration for code execution
- Real-time preview and console output

### Backend APIs
- `app/api/exercise/route.ts` - Fetch exercise data
- `app/api/exercise/complete/route.ts` - Mark exercises complete
- Database integration with PostgreSQL + Drizzle ORM

### Database Schema
- `exercises` table stores exercise content and starter code
- `completed_exercise` tracks user progress
- `enroll_course` manages XP and enrollment

## Usage Instructions

### For Students
1. **Enroll in Course**: Click "Enroll Now" on course page
2. **Navigate to Exercise**: Click on any unlocked exercise
3. **Read Theory**: Review the content and task instructions
4. **Code**: Write code in the editor (left panel)
5. **Preview**: See results in real-time (right panel)
6. **Get Help**: Use hints if needed (costs XP)
7. **Complete**: Mark exercise complete to earn XP

### For Instructors
1. **Create Exercises**: Add to `sample-data.json` or database
2. **Set Difficulty**: Configure XP rewards and hint costs
3. **Provide Starter Code**: Include helpful starting templates
4. **Write Clear Tasks**: Make objectives specific and achievable

## Example Exercise Flow

### HTML Beginner Course
1. **Your First HTML Page** (20 XP)
   - Learn basic HTML structure
   - Create simple heading and paragraph
   - Starter: Basic HTML template

2. **HTML Document Structure** (15 XP)
   - Understand DOCTYPE, head, body
   - Practice with different heading levels
   - Starter: Empty HTML document

### React Course
1. **Your First React Component** (30 XP)
   - Learn JSX syntax
   - Create functional component
   - Starter: React app template

## Benefits

### For Students
- **Hands-on Learning**: Practice coding immediately
- **Instant Feedback**: See results in real-time
- **Gamification**: XP system motivates progress
- **Progressive Difficulty**: Builds skills step-by-step

### For Platform
- **Engagement**: Interactive content keeps users active
- **Retention**: Gamification encourages completion
- **Scalability**: Easy to add new exercises and courses
- **Analytics**: Track user progress and identify pain points

## Future Enhancements
- **Code Sharing**: Share solutions with community
- **Automated Testing**: Unit tests for exercise validation
- **Video Integration**: Embedded tutorial videos
- **Collaborative Coding**: Pair programming features
- **Mobile Support**: Touch-friendly mobile editor

The exercise playground is the heart of the Codebox learning experience, providing an engaging, interactive environment where students can learn by doing.