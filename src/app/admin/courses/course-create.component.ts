import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from '../../core/services/course.service';

@Component({
  selector: 'app-course-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="course-create-page">
      <div class="page-header">
        <h2>Create New Course</h2>
        <p class="subtitle">Fill in the details to create a new course</p>
      </div>

      <form [formGroup]="courseForm" (ngSubmit)="onSubmit()" class="course-form">
        <div class="form-group">
          <label class="form-label" for="title">Course Title *</label>
          <input
            type="text"
            id="title"
            formControlName="title"
            class="form-control"
            [class.error]="isFieldInvalid('title')"
            placeholder="Enter course title"
          />
          <div class="error-message" *ngIf="isFieldInvalid('title')">
            {{ getFieldError('title') }}
          </div>
        </div>

        <div class="form-group">
          <label class="form-label" for="description">Description *</label>
          <textarea
            id="description"
            formControlName="description"
            class="form-control"
            rows="4"
            [class.error]="isFieldInvalid('description')"
            placeholder="Enter course description"
          ></textarea>
          <div class="error-message" *ngIf="isFieldInvalid('description')">
            {{ getFieldError('description') }}
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="category">Category *</label>
            <select
              id="category"
              formControlName="category"
              class="form-control"
              [class.error]="isFieldInvalid('category')"
            >
              <option value="">Select category</option>
              <option value="Web Development">Web Development</option>
              <option value="Programming">Programming</option>
              <option value="Data Science">Data Science</option>
              <option value="Design">Design</option>
              <option value="Business">Business</option>
            </select>
            <div class="error-message" *ngIf="isFieldInvalid('category')">
              {{ getFieldError('category') }}
            </div>
          </div>

          <div class="form-group">
            <label class="form-label" for="status">Status *</label>
            <select
              id="status"
              formControlName="status"
              class="form-control"
              [class.error]="isFieldInvalid('status')"
            >
              <option value="draft">Draft</option>
              <option value="active">Active</option>
            </select>
            <div class="error-message" *ngIf="isFieldInvalid('status')">
              {{ getFieldError('status') }}
            </div>
          </div>
        </div>

        <div class="form-actions">
          <button type="button" class="btn btn-outline" (click)="onCancel()">Cancel</button>
          <button type="submit" class="btn btn-primary" [disabled]="courseForm.invalid || isSubmitting">
            {{ isSubmitting ? 'Creating...' : 'Create Course' }}
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .course-create-page {
      max-width: 800px;
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
    .course-form {
      background: var(--card-bg);
      border-radius: var(--radius);
      padding: 2rem;
      box-shadow: var(--shadow-sm);
      border: 1px solid var(--border-color);
    }
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
    }
    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 2rem;
      padding-top: 2rem;
      border-top: 1px solid var(--border-color);
    }
    textarea.form-control {
      resize: vertical;
      min-height: 100px;
    }
    button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    @media (max-width: 768px) {
      .form-row {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class CourseCreateComponent {
  courseForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private router: Router
  ) {
    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      category: ['', Validators.required],
      status: ['draft', Validators.required]
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.courseForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.courseForm.get(fieldName);
    if (field?.hasError('required')) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    }
    if (field?.hasError('minlength')) {
      const minLength = field.errors?.['minlength'].requiredLength;
      return `Minimum ${minLength} characters required`;
    }
    return '';
  }

  onSubmit(): void {
    if (this.courseForm.valid) {
      this.isSubmitting = true;
      this.courseService.createCourse(this.courseForm.value).subscribe({
        next: () => {
          this.router.navigate(['/admin/courses']);
        },
        error: () => {
          this.isSubmitting = false;
        }
      });
    } else {
      Object.keys(this.courseForm.controls).forEach(key => {
        this.courseForm.get(key)?.markAsTouched();
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/admin/courses']);
  }
}

