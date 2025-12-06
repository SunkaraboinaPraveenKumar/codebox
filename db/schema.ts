import { pgTable, serial, varchar, integer, timestamp, json } from 'drizzle-orm/pg-core';

// Users table
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  name: varchar('name', { length: 255 }),
  points: integer('points').default(0),
  subscription: varchar('subscription', { length: 50 }),
});

// Courses table
export const courses = pgTable('courses', {
  id: serial('id').primaryKey(),
  courseId: integer('course_id').unique().notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: varchar('description', { length: 1000 }).notNull(),
  bannerImage: varchar('banner_image', { length: 500 }).notNull(),
  level: varchar('level', { length: 50 }).default('beginner'),
  tags: varchar('tags', { length: 255 }),
  editorType: varchar('editor_type', { length: 50 }),
});

// Course Chapters table
export const courseChapters = pgTable('course_chapters', {
  id: serial('id').primaryKey(),
  courseId: integer('course_id').notNull(),
  chapterId: integer('chapter_id').notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  description: varchar('description', { length: 1000 }),
  exercises: json('exercises'),
});

// Exercises table
export const exercises = pgTable('exercises', {
  id: serial('id').primaryKey(),
  courseId: integer('course_id').notNull(),
  chapterId: integer('chapter_id').notNull(),
  exerciseId: varchar('exercise_id', { length: 255 }).notNull(),
  exerciseName: varchar('exercise_name', { length: 255 }).notNull(),
  exerciseContent: json('exercise_content'),
});

// Enroll Course table
export const enrollCourse = pgTable('enroll_course', {
  id: serial('id').primaryKey(),
  courseId: integer('course_id').notNull(),
  userId: varchar('user_id', { length: 255 }).notNull(),
  enrollDate: timestamp('enroll_date').defaultNow(),
  xpEarn: integer('xp_earn').default(0),
});

// Completed Exercise table
export const completedExercise = pgTable('completed_exercise', {
  id: serial('id').primaryKey(),
  courseId: integer('course_id').notNull(),
  chapterId: integer('chapter_id').notNull(),
  exerciseId: integer('exercise_id').notNull(),
  userId: varchar('user_id', { length: 255 }).notNull(),
});
