import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  students: number;
  status: 'active' | 'draft' | 'completed';
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private mockCourses: Course[] = [
    {
      id: '1',
      title: 'Angular Fundamentals',
      description: 'Learn the basics of Angular framework',
      category: 'Web Development',
      students: 45,
      status: 'active',
      createdAt: new Date('2024-01-15')
    },
    {
      id: '2',
      title: 'Advanced TypeScript',
      description: 'Master TypeScript advanced features',
      category: 'Programming',
      students: 32,
      status: 'active',
      createdAt: new Date('2024-02-01')
    },
    {
      id: '3',
      title: 'React Hooks',
      description: 'Deep dive into React Hooks',
      category: 'Web Development',
      students: 28,
      status: 'draft',
      createdAt: new Date('2024-02-10')
    }
  ];

  getCourses(): Observable<Course[]> {
    return of(this.mockCourses).pipe(delay(500));
  }

  createCourse(course: Partial<Course>): Observable<Course> {
    const newCourse: Course = {
      id: Date.now().toString(),
      title: course.title || '',
      description: course.description || '',
      category: course.category || '',
      students: 0,
      status: 'draft',
      createdAt: new Date()
    };
    this.mockCourses.push(newCourse);
    return of(newCourse).pipe(delay(500));
  }

  updateCourse(id: string, course: Partial<Course>): Observable<Course> {
    const index = this.mockCourses.findIndex(c => c.id === id);
    if (index !== -1) {
      this.mockCourses[index] = { ...this.mockCourses[index], ...course };
      return of(this.mockCourses[index]).pipe(delay(500));
    }
    throw new Error('Course not found');
  }
}

