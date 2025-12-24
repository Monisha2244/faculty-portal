import { Routes } from '@angular/router';
import { CourseListComponent } from './courses/course-list.component';
import { CourseCreateComponent } from './courses/course-create.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { NotificationsComponent } from './notifications/notifications.component';

export const adminRoutes: Routes = [
  {
    path: 'courses',
    component: CourseListComponent
  },
  {
    path: 'courses/create',
    component: CourseCreateComponent
  },
  {
    path: 'analytics',
    component: AnalyticsComponent
  },
  {
    path: 'schedule',
    component: ScheduleComponent
  },
  {
    path: 'notifications',
    component: NotificationsComponent
  }
];

