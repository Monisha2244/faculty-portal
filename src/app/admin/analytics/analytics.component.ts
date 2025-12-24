import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsService, AnalyticsData } from '../../core/services/analytics.service';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="analytics-page">
      <div class="page-header">
        <h2>Student Analytics</h2>
        <p class="subtitle">Track student performance and engagement</p>
      </div>

      <div class="analytics-overview">
        <div class="stat-card" *ngFor="let stat of overviewStats">
          <div class="stat-icon">{{ stat.icon }}</div>
          <div class="stat-content">
            <div class="stat-value">{{ stat.value }}</div>
            <div class="stat-label">{{ stat.label }}</div>
            <div class="stat-change" [class.positive]="stat.change > 0" [class.negative]="stat.change < 0">
              {{ stat.change > 0 ? '↑' : '↓' }} {{ Math.abs(stat.change) }}% from last month
            </div>
          </div>
        </div>
      </div>

      <div class="analytics-section">
        <h3>Student Performance</h3>
        <div class="card">
          <div class="performance-table">
            <div class="table-header">
              <div class="col-name">Student Name</div>
              <div class="col-course">Course</div>
              <div class="col-progress">Progress</div>
              <div class="col-score">Score</div>
              <div class="col-activity">Last Activity</div>
            </div>
            <div class="table-row" *ngFor="let student of analyticsData?.studentPerformance">
              <div class="col-name">{{ student.name }}</div>
              <div class="col-course">{{ student.course }}</div>
              <div class="col-progress">
                <div class="progress-bar">
                  <div class="progress-fill" [style.width.%]="student.progress"></div>
                </div>
                <span class="progress-text">{{ student.progress }}%</span>
              </div>
              <div class="col-score">
                <span class="score-badge" [ngClass]="getScoreClass(student.score)">
                  {{ student.score }}%
                </span>
              </div>
              <div class="col-activity">{{ student.lastActivity | date:'MMM d, y' }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="analytics-grid">
        <div class="analytics-section">
          <h3>Performance Distribution</h3>
          <div class="card">
            <div class="distribution-chart">
              <div class="chart-bar" *ngFor="let range of scoreRanges">
                <div class="bar-label">{{ range.label }}</div>
                <div class="bar-container">
                  <div class="bar-fill" [style.width.%]="range.percentage" [ngClass]="range.class"></div>
                </div>
                <div class="bar-value">{{ range.count }} students</div>
              </div>
            </div>
          </div>
        </div>

        <div class="analytics-section">
          <h3>Course Engagement</h3>
          <div class="card">
            <div class="engagement-list">
              <div class="engagement-item" *ngFor="let course of courseEngagement">
                <div class="engagement-info">
                  <div class="course-name">{{ course.name }}</div>
                  <div class="engagement-stats">{{ course.students }} students • {{ course.avgProgress }}% avg progress</div>
                </div>
                <div class="engagement-bar">
                  <div class="engagement-fill" [style.width.%]="course.avgProgress"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .analytics-page {
      max-width: 1400px;
    }
    .page-header {
      margin-bottom: 2rem;
    }
    .page-header h2 {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }
    .subtitle {
      color: var(--text-secondary);
    }
    .analytics-overview {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }
    .stat-card {
      background: var(--card-bg);
      border-radius: var(--radius);
      padding: 1.5rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      box-shadow: var(--shadow-sm);
      border: 1px solid var(--border-color);
    }
    .stat-icon {
      font-size: 2.5rem;
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--bg-color);
      border-radius: var(--radius);
    }
    .stat-value {
      font-size: 2rem;
      font-weight: 700;
      color: var(--text-primary);
    }
    .stat-label {
      font-size: 0.875rem;
      color: var(--text-secondary);
      margin-bottom: 0.25rem;
    }
    .stat-change {
      font-size: 0.75rem;
      font-weight: 500;
    }
    .stat-change.positive {
      color: var(--success-color);
    }
    .stat-change.negative {
      color: var(--danger-color);
    }
    .analytics-section {
      margin-bottom: 2rem;
    }
    .analytics-section h3 {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: var(--text-primary);
    }
    .analytics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 2rem;
    }
    .performance-table {
      display: flex;
      flex-direction: column;
    }
    .table-header, .table-row {
      display: grid;
      grid-template-columns: 2fr 2fr 2fr 1fr 1.5fr;
      gap: 1rem;
      padding: 1rem;
      align-items: center;
    }
    .table-header {
      font-weight: 600;
      color: var(--text-secondary);
      border-bottom: 2px solid var(--border-color);
      font-size: 0.875rem;
    }
    .table-row {
      border-bottom: 1px solid var(--border-color);
    }
    .table-row:last-child {
      border-bottom: none;
    }
    .progress-bar {
      width: 100%;
      height: 8px;
      background: var(--bg-color);
      border-radius: 4px;
      overflow: hidden;
      margin-bottom: 0.25rem;
    }
    .progress-fill {
      height: 100%;
      background: var(--primary-color);
      transition: width 0.3s;
    }
    .progress-text {
      font-size: 0.75rem;
      color: var(--text-secondary);
    }
    .score-badge {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.875rem;
      font-weight: 600;
    }
    .score-excellent {
      background: #d1fae5;
      color: #065f46;
    }
    .score-good {
      background: #dbeafe;
      color: #1e40af;
    }
    .score-average {
      background: #fef3c7;
      color: #92400e;
    }
    .score-poor {
      background: #fee2e2;
      color: #991b1b;
    }
    .distribution-chart {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem 0;
    }
    .chart-bar {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .bar-label {
      min-width: 80px;
      font-size: 0.875rem;
      font-weight: 500;
    }
    .bar-container {
      flex: 1;
      height: 24px;
      background: var(--bg-color);
      border-radius: 4px;
      overflow: hidden;
    }
    .bar-fill {
      height: 100%;
      transition: width 0.3s;
    }
    .bar-value {
      min-width: 80px;
      text-align: right;
      font-size: 0.875rem;
      color: var(--text-secondary);
    }
    .engagement-list {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    .engagement-item {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .course-name {
      font-weight: 600;
      color: var(--text-primary);
    }
    .engagement-stats {
      font-size: 0.875rem;
      color: var(--text-secondary);
    }
    .engagement-bar {
      width: 100%;
      height: 8px;
      background: var(--bg-color);
      border-radius: 4px;
      overflow: hidden;
    }
    .engagement-fill {
      height: 100%;
      background: var(--primary-color);
      transition: width 0.3s;
    }
    @media (max-width: 768px) {
      .table-header, .table-row {
        grid-template-columns: 1fr;
        gap: 0.5rem;
      }
      .analytics-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class AnalyticsComponent implements OnInit {
  analyticsData: AnalyticsData | null = null;
  overviewStats: any[] = [];
  scoreRanges: any[] = [];
  courseEngagement: any[] = [];
  Math = Math;

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit(): void {
    this.loadAnalytics();
  }

  loadAnalytics(): void {
    this.analyticsService.getAnalytics().subscribe(data => {
      this.analyticsData = data;
      
      this.overviewStats = [
        { icon: '👥', label: 'Total Students', value: data.totalStudents, change: 12 },
        { icon: '📚', label: 'Active Courses', value: data.activeCourses, change: 5 },
        { icon: '⭐', label: 'Average Score', value: data.averageScore + '%', change: 3 },
        { icon: '✅', label: 'Completion Rate', value: data.completionRate + '%', change: 8 }
      ];

      // Calculate score distribution
      const scores = data.studentPerformance.map(s => s.score);
      this.scoreRanges = [
        { label: '90-100%', count: scores.filter(s => s >= 90).length, percentage: 0, class: 'score-excellent' },
        { label: '80-89%', count: scores.filter(s => s >= 80 && s < 90).length, percentage: 0, class: 'score-good' },
        { label: '70-79%', count: scores.filter(s => s >= 70 && s < 80).length, percentage: 0, class: 'score-average' },
        { label: '<70%', count: scores.filter(s => s < 70).length, percentage: 0, class: 'score-poor' }
      ];
      const maxCount = Math.max(...this.scoreRanges.map(r => r.count), 1);
      this.scoreRanges.forEach(range => {
        range.percentage = (range.count / maxCount) * 100;
      });

      // Mock course engagement
      this.courseEngagement = [
        { name: 'Angular Fundamentals', students: 45, avgProgress: 85 },
        { name: 'Advanced TypeScript', students: 32, avgProgress: 78 },
        { name: 'React Hooks', students: 28, avgProgress: 72 }
      ];
    });
  }

  getScoreClass(score: number): string {
    if (score >= 90) return 'score-excellent';
    if (score >= 80) return 'score-good';
    if (score >= 70) return 'score-average';
    return 'score-poor';
  }
}

