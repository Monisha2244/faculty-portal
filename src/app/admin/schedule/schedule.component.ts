import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ScheduleService, Session } from '../../core/services/schedule.service';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="schedule-page">
      <div class="page-header">
        <div>
          <h2>Schedule</h2>
          <p class="subtitle">Manage your training sessions and classes</p>
        </div>
        <button class="btn btn-primary" (click)="showCreateForm = !showCreateForm">
          ➕ Schedule Session
        </button>
      </div>

      <div *ngIf="showCreateForm" class="card create-session-form">
        <h3>Create New Session</h3>
        <form [formGroup]="sessionForm" (ngSubmit)="onSubmit()">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Session Title *</label>
              <input type="text" formControlName="title" class="form-control" placeholder="Enter session title" />
              <div class="error-message" *ngIf="isFieldInvalid('title')">Title is required</div>
            </div>
            <div class="form-group">
              <label class="form-label">Course *</label>
              <select formControlName="course" class="form-control">
                <option value="">Select course</option>
                <option value="Angular Fundamentals">Angular Fundamentals</option>
                <option value="Advanced TypeScript">Advanced TypeScript</option>
                <option value="React Hooks">React Hooks</option>
              </select>
              <div class="error-message" *ngIf="isFieldInvalid('course')">Course is required</div>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Date *</label>
              <input type="date" formControlName="date" class="form-control" />
              <div class="error-message" *ngIf="isFieldInvalid('date')">Date is required</div>
            </div>
            <div class="form-group">
              <label class="form-label">Start Time *</label>
              <input type="time" formControlName="startTime" class="form-control" />
              <div class="error-message" *ngIf="isFieldInvalid('startTime')">Start time is required</div>
            </div>
            <div class="form-group">
              <label class="form-label">End Time *</label>
              <input type="time" formControlName="endTime" class="form-control" />
              <div class="error-message" *ngIf="isFieldInvalid('endTime')">End time is required</div>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Location *</label>
            <input type="text" formControlName="location" class="form-control" placeholder="Room number or Online" />
            <div class="error-message" *ngIf="isFieldInvalid('location')">Location is required</div>
          </div>

          <div class="form-actions">
            <button type="button" class="btn btn-outline" (click)="onCancel()">Cancel</button>
            <button type="submit" class="btn btn-primary" [disabled]="sessionForm.invalid">Create Session</button>
          </div>
        </form>
      </div>

      <div class="schedule-view">
        <div class="calendar-header">
          <h3>Upcoming Sessions</h3>
          <div class="view-toggle">
            <button class="btn btn-outline" [class.active]="viewMode === 'list'" (click)="viewMode = 'list'">List</button>
            <button class="btn btn-outline" [class.active]="viewMode === 'calendar'" (click)="viewMode = 'calendar'">Calendar</button>
          </div>
        </div>

        <div *ngIf="viewMode === 'list'" class="sessions-list">
          <div *ngFor="let session of sessions" class="session-card">
            <div class="session-date">
              <div class="date-day">{{ session.date | date:'d' }}</div>
              <div class="date-month">{{ session.date | date:'MMM' }}</div>
            </div>
            <div class="session-details">
              <h4>{{ session.title }}</h4>
              <p class="session-meta">
                <span>📚 {{ session.course }}</span>
                <span>🕐 {{ session.startTime }} - {{ session.endTime }}</span>
                <span>📍 {{ session.location }}</span>
                <span>👥 {{ session.students }} students</span>
              </p>
            </div>
            <div class="session-status">
              <span class="badge" [ngClass]="'badge-' + session.status">
                {{ session.status }}
              </span>
            </div>
          </div>
        </div>

        <div *ngIf="viewMode === 'calendar'" class="calendar-view">
          <div class="calendar-grid">
            <div class="calendar-day" *ngFor="let day of calendarDays">
              <div class="day-header">
                <div class="day-name">{{ day.name }}</div>
                <div class="day-number">{{ day.number }}</div>
              </div>
              <div class="day-sessions">
                <div *ngFor="let session of getSessionsForDay(day.date)" class="calendar-session">
                  <div class="session-time-small">{{ session.startTime }}</div>
                  <div class="session-title-small">{{ session.title }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .schedule-page {
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
    .create-session-form {
      margin-bottom: 2rem;
    }
    .create-session-form h3 {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
    }
    .form-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
    }
    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 1.5rem;
      padding-top: 1.5rem;
      border-top: 1px solid var(--border-color);
    }
    .schedule-view {
      background: var(--card-bg);
      border-radius: var(--radius);
      padding: 1.5rem;
      box-shadow: var(--shadow-sm);
      border: 1px solid var(--border-color);
    }
    .calendar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    .calendar-header h3 {
      font-size: 1.25rem;
      font-weight: 600;
    }
    .view-toggle {
      display: flex;
      gap: 0.5rem;
    }
    .view-toggle .btn.active {
      background: var(--primary-color);
      color: white;
    }
    .sessions-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .session-card {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      padding: 1.5rem;
      background: var(--bg-color);
      border-radius: var(--radius);
      border: 1px solid var(--border-color);
    }
    .session-date {
      text-align: center;
      padding: 0.75rem 1rem;
      background: var(--card-bg);
      border-radius: var(--radius);
      min-width: 70px;
    }
    .date-day {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--primary-color);
    }
    .date-month {
      font-size: 0.75rem;
      color: var(--text-secondary);
      text-transform: uppercase;
    }
    .session-details {
      flex: 1;
    }
    .session-details h4 {
      font-size: 1.125rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }
    .session-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      font-size: 0.875rem;
      color: var(--text-secondary);
    }
    .calendar-view {
      margin-top: 1.5rem;
    }
    .calendar-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 0.5rem;
    }
    .calendar-day {
      min-height: 120px;
      border: 1px solid var(--border-color);
      border-radius: var(--radius);
      padding: 0.5rem;
      background: var(--bg-color);
    }
    .day-header {
      margin-bottom: 0.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid var(--border-color);
    }
    .day-name {
      font-size: 0.75rem;
      color: var(--text-secondary);
      text-transform: uppercase;
    }
    .day-number {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--text-primary);
    }
    .day-sessions {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .calendar-session {
      background: var(--primary-color);
      color: white;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.75rem;
    }
    .session-time-small {
      font-weight: 600;
    }
    .session-title-small {
      font-size: 0.625rem;
      opacity: 0.9;
    }
    @media (max-width: 768px) {
      .calendar-grid {
        grid-template-columns: repeat(1, 1fr);
      }
      .session-card {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  `]
})
export class ScheduleComponent implements OnInit {
  sessions: Session[] = [];
  showCreateForm = false;
  viewMode: 'list' | 'calendar' = 'list';
  sessionForm: FormGroup;
  calendarDays: any[] = [];

  constructor(
    private scheduleService: ScheduleService,
    private fb: FormBuilder
  ) {
    this.sessionForm = this.fb.group({
      title: ['', Validators.required],
      course: ['', Validators.required],
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      location: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadSessions();
    this.generateCalendarDays();
  }

  loadSessions(): void {
    this.scheduleService.getSessions().subscribe(sessions => {
      this.sessions = sessions;
    });
  }

  generateCalendarDays(): void {
    const today = new Date();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.calendarDays = [];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      this.calendarDays.push({
        name: days[date.getDay()],
        number: date.getDate(),
        date: date
      });
    }
  }

  getSessionsForDay(date: Date): Session[] {
    return this.sessions.filter(s => {
      const sessionDate = new Date(s.date);
      return sessionDate.toDateString() === date.toDateString();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.sessionForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit(): void {
    if (this.sessionForm.valid) {
      const formValue = this.sessionForm.value;
      const session: Partial<Session> = {
        ...formValue,
        date: new Date(formValue.date)
      };
      
      this.scheduleService.createSession(session).subscribe(() => {
        this.loadSessions();
        this.sessionForm.reset();
        this.showCreateForm = false;
      });
    }
  }

  onCancel(): void {
    this.sessionForm.reset();
    this.showCreateForm = false;
  }
}

