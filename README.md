# Todo app to learn Redux

## Core Features

### Task Management

- [x] Add new tasks with title and description
- [x] Mark tasks as complete/incomplete
- [x] Edit existing tasks
- [x] Delete tasks
- [x] Set due dates for tasks

### Category System

- [x] Create, edit, and delete categories
- [x] Assign tasks to categories
- [x] Each category should have a name and color
- [ ] Default "General" category for uncategorized tasks

### Filtering & Sorting

- [ ] Filter tasks by category
- [ ] Filter by completion status (all, completed, pending)
- [ ] Filter by due date (overdue, today, this week)
- [ ] Sort tasks by due date, creation date, or alphabetically

### Bulk Operations

- [ ] Select multiple tasks with checkboxes
- [ ] Bulk delete selected tasks
- [ ] Bulk mark as complete/incomplete
- [ ] Bulk move to different category

### Advanced Redux Features

- [ ] Undo/redo functionality for task operations
- [ ] Search tasks by title or description
- [ ] Task counters (total, completed, pending per category)

## Technical Requirements

### State Structure

- [x] Add ids to tasks
- [ ] Normalized state (separate entities for tasks and categories)
- [ ] Use Redux Toolkit for cleaner code
- [ ] Implement proper selectors for derived data

### UI Requirements

- [ ] Responsive design
- [ ] Visual indicators for overdue tasks
- [ ] Category color coding
- [ ] Loading states for any async operations
- [ ] Empty states when no tasks exist

### Optional Enhancements

- [x] Local storage persistence
- [ ] Import/export functionality
- [ ] Task priority levels
- [ ] Subtasks or task dependencies
