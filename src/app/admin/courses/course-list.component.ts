import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CourseService, Course } from '../../core/services/course.service';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="course-list-page">
      <div class="page-header">
        <div>
          <h2>Courses</h2>
          <p class="subtitle">Manage your courses and content</p>
        </div>
        <a routerLink="/admin/courses/create" class="btn btn-primary">
          ➕ Create Course
        </a>
      </div>

      <div class="courses-grid">
        <div *ngFor="let course of courses" class="course-card">
          <div class="course-header">
            <h3>{{ course.title }}</h3>
            <span class="badge" [ngClass]="'badge-' + course.status">
              {{ course.status }}
            </span>
          </div>
          <p class="course-description">{{ course.description }}</p>
          <div class="course-meta">
            <span class="meta-item">📁 {{ course.category }}</span>
            <span class="meta-item">👥 {{ course.students }} students</span>
            <span class="meta-item">📅 {{ course.createdAt | date:'MMM d, y' }}</span>
          </div>
          <div class="course-actions">
            <button class="btn btn-outline">Edit</button>
            <button class="btn btn-primary">View Details</button>
          </div>
        </div>
      </div>

      <div *ngIf="courses.length === 0" class="empty-state">
        <p>No courses yet. Create your first course to get started!</p>
        <a routerLink="/admin/courses/create" class="btn btn-primary">Create Course</a>
      </div>
    </div>
  `,
  styles: [`
    .course-list-page {
      max-width: 1400px;
    }
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
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
    .courses-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 1.5rem;
    }
    .course-card {
      background: var(--card-bg);
      border-radius: var(--radius);
      padding: 1.5rem;
      box-shadow: var(--shadow-sm);
      border: 1px solid var(--border-color);
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .course-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .course-header h3 {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-primary);
      flex: 1;
    }
    .course-description {
      color: var(--text-secondary);
      font-size: 0.875rem;
      line-height: 1.6;
    }
    .course-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      padding-top: 0.5rem;
      border-top: 1px solid var(--border-color);
    }
    .meta-item {
      font-size: 0.875rem;
      color: var(--text-secondary);
    }
    .course-actions {
      display: flex;
      gap: 0.75rem;
      margin-top: auto;
    }
    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
      background: var(--card-bg);
      border-radius: var(--radius);
      border: 1px solid var(--border-color);
    }
    .empty-state p {
      color: var(--text-secondary);
      margin-bottom: 1.5rem;
    }
  `]
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getCourses().subscribe(courses => {
      this.courses = courses;
    });
  }
}

