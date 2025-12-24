import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CourseService } from '../../core/services/course.service';
import { AnalyticsService } from '../../core/services/analytics.service';
import { ScheduleService } from '../../core/services/schedule.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dashboard">
      <div class="dashboard-header">
        <h2>Dashboard</h2>
        <p class="subtitle">Welcome back! Here's what's happening today.</p>
      </div>

      <div class="metrics-grid">
        <div class="metric-card" *ngFor="let metric of metrics">
          <div class="metric-icon">{{ metric.icon }}</div>
          <div class="metric-content">
            <div class="metric-value">{{ metric.value }}</div>
            <div class="metric-label">{{ metric.label }}</div>
          </div>
        </div>
      </div>

      <div class="dashboard-grid">
        <div class="dashboard-section">
          <div class="section-header">
            <h3>Recent Courses</h3>
            <a routerLink="/admin/courses" class="view-all">View All</a>
          </div>
          <div class="card">
            <div class="course-list">
              <div *ngFor="let course of recentCourses" class="course-item">
                <div class="course-info">
                  <h4>{{ course.title }}</h4>
                  <p>{{ course.category }} • {{ course.students }} students</p>
                </div>
                <span class="badge" [ngClass]="'badge-' + course.status">
                  {{ course.status }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="dashboard-section">
          <div class="section-header">
            <h3>Upcoming Sessions</h3>
            <a routerLink="/admin/schedule" class="view-all">View All</a>
          </div>
          <div class="card">
            <div class="session-list">
              <div *ngFor="let session of upcomingSessions" class="session-item">
                <div class="session-time">
                  <div class="time">{{ session.startTime }}</div>
                  <div class="date">{{ session.date | date:'MMM d' }}</div>
                </div>
                <div class="session-info">
                  <h4>{{ session.title }}</h4>
                  <p>{{ session.course }} • {{ session.location }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="quick-actions">
        <h3>Quick Actions</h3>
        <div class="actions-grid">
          <a routerLink="/admin/courses/create" class="action-card">
            <span class="action-icon">➕</span>
            <span class="action-label">Create Course</span>
          </a>
          <a routerLink="/admin/schedule/create" class="action-card">
            <span class="action-icon">📅</span>
            <span class="action-label">Schedule Session</span>
          </a>
          <a routerLink="/admin/analytics" class="action-card">
            <span class="action-icon">📊</span>
            <span class="action-label">View Analytics</span>
          </a>
          <a routerLink="/admin/notifications" class="action-card">
            <span class="action-icon">🔔</span>
            <span class="action-label">Notifications</span>
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard {
      max-width: 1400px;
    }
    .dashboard-header {
      margin-bottom: 2rem;
    }
    .dashboard-header h2 {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      color: var(--text-primary);
    }
    .subtitle {
      color: var(--text-secondary);
      font-size: 1rem;
    }
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }
    .metric-card {
      background: var(--card-bg);
      border-radius: var(--radius);
      padding: 1.5rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      box-shadow: var(--shadow-sm);
      border: 1px solid var(--border-color);
    }
    .metric-icon {
      font-size: 2.5rem;
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--bg-color);
      border-radius: var(--radius);
    }
    .metric-value {
      font-size: 2rem;
      font-weight: 700;
      color: var(--text-primary);
    }
    .metric-label {
      font-size: 0.875rem;
      color: var(--text-secondary);
    }
    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 2rem;
      margin-bottom: 2rem;
    }
    .dashboard-section {
      display: flex;
      flex-direction: column;
    }
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    .section-header h3 {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-primary);
    }
    .view-all {
      color: var(--primary-color);
      text-decoration: none;
      font-size: 0.875rem;
      font-weight: 500;
    }
    .view-all:hover {
      text-decoration: underline;
    }
    .course-list, .session-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .course-item, .session-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      border-bottom: 1px solid var(--border-color);
    }
    .course-item:last-child, .session-item:last-child {
      border-bottom: none;
    }
    .course-info h4, .session-info h4 {
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: 0.25rem;
      color: var(--text-primary);
    }
    .course-info p, .session-info p {
      font-size: 0.875rem;
      color: var(--text-secondary);
    }
    .session-time {
      text-align: center;
      padding-right: 1rem;
      border-right: 1px solid var(--border-color);
      min-width: 80px;
    }
    .time {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--primary-color);
    }
    .date {
      font-size: 0.75rem;
      color: var(--text-secondary);
    }
    .quick-actions {
      margin-top: 2rem;
    }
    .quick-actions h3 {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: var(--text-primary);
    }
    .actions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }
    .action-card {
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: var(--radius);
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
      text-decoration: none;
      color: var(--text-primary);
      transition: all 0.2s;
      box-shadow: var(--shadow-sm);
    }
    .action-card:hover {
      border-color: var(--primary-color);
      box-shadow: var(--shadow-md);
      transform: translateY(-2px);
    }
    .action-icon {
      font-size: 2rem;
    }
    .action-label {
      font-size: 0.875rem;
      font-weight: 500;
    }
  `]
})
export class DashboardComponent implements OnInit {
  metrics: any[] = [];
  recentCourses: any[] = [];
  upcomingSessions: any[] = [];

  constructor(
    private courseService: CourseService,
    private analyticsService: AnalyticsService,
    private scheduleService: ScheduleService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.analyticsService.getAnalytics().subscribe(data => {
      this.metrics = [
        { icon: '👥', label: 'Total Students', value: data.totalStudents },
        { icon: '📚', label: 'Active Courses', value: data.activeCourses },
        { icon: '⭐', label: 'Average Score', value: data.averageScore + '%' },
        { icon: '✅', label: 'Completion Rate', value: data.completionRate + '%' }
      ];
    });

    this.courseService.getCourses().subscribe(courses => {
      this.recentCourses = courses.slice(0, 3);
    });

    this.scheduleService.getSessions().subscribe(sessions => {
      this.upcomingSessions = sessions.slice(0, 3);
    });
  }
}

