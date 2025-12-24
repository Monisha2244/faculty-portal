# Faculty Portal

A comprehensive Faculty/Trainer Management Portal built with Angular 17, featuring course management, student analytics, scheduling, and notifications.

## Features

### Core Features
- ✅ **Trainer Dashboard** - Overview with metrics, recent courses, and quick actions
- ✅ **Course Management** - Create and manage courses with form validation
- ✅ **Student Analytics** - Track student performance with detailed analytics
- ✅ **Schedule Calendar** - Manage training sessions with list and calendar views
- ✅ **Notification Panel** - Stay updated with activities and updates

### Angular Concepts Implemented
- ✅ **Forms & Validations** - Reactive forms with custom validators
- ✅ **Lazy-loaded Admin Module** - Optimized loading for admin features
- ✅ **Role-based Rendering** - Custom directive for role-based UI rendering
- ✅ **Reusable Components** - Shared components for consistency
- ✅ **Interceptors** - HTTP interceptor for authentication (mock)

### UI/UX Features
- ✅ **Productivity-first Design** - Clean, efficient interface
- ✅ **Quick Actions** - Fast access to common tasks
- ✅ **Clear Metrics** - Visual representation of key data
- ✅ **Consistent Layouts** - Unified design system

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open your browser and navigate to `http://localhost:4200`

## Project Structure

```
src/
├── app/
│   ├── admin/              # Lazy-loaded admin module
│   │   ├── courses/        # Course management
│   │   ├── analytics/      # Student analytics
│   │   ├── schedule/       # Session scheduling
│   │   └── notifications/ # Notification panel
│   ├── core/               # Core functionality
│   │   ├── components/     # Shared components (header, sidebar)
│   │   ├── directives/     # Custom directives (role-based)
│   │   ├── interceptors/   # HTTP interceptors
│   │   └── services/       # Core services
│   ├── features/           # Feature modules
│   │   └── dashboard/      # Main dashboard
│   └── shared/             # Shared components
├── styles.css              # Global styles
└── main.ts                 # Application entry point
```

## Key Components

### Dashboard
- Overview metrics (students, courses, scores, completion rate)
- Recent courses list
- Upcoming sessions
- Quick action cards

### Course Management
- Course list with filtering
- Course creation form with validation
- Course status management

### Analytics
- Student performance tracking
- Score distribution charts
- Course engagement metrics

### Schedule
- List view of sessions
- Calendar view (7-day)
- Session creation form

### Notifications
- Real-time notification list
- Mark as read functionality
- Unread count badge

## Services

- **AuthService** - Authentication and role management
- **CourseService** - Course CRUD operations
- **AnalyticsService** - Student performance data
- **ScheduleService** - Session management
- **NotificationService** - Notification handling

## Development

### Build
```bash
npm run build
```

### Watch Mode
```bash
npm run watch
```

## Technologies

- Angular 17 (Standalone Components)
- TypeScript
- RxJS
- CSS3 (Custom Properties)

## Notes

- This is a demo application with mock data
- HTTP interceptor includes mock API responses
- All services use Observable patterns with mock data
- Role-based rendering is implemented via custom directive

