import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface StudentPerformance {
  studentId: string;
  name: string;
  course: string;
  progress: number;
  score: number;
  lastActivity: Date;
}

export interface AnalyticsData {
  totalStudents: number;
  activeCourses: number;
  averageScore: number;
  completionRate: number;
  studentPerformance: StudentPerformance[];
}

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  getAnalytics(): Observable<AnalyticsData> {
    const mockData: AnalyticsData = {
      totalStudents: 125,
      activeCourses: 8,
      averageScore: 87.5,
      completionRate: 78,
      studentPerformance: [
        { studentId: '1', name: 'John Doe', course: 'Angular Fundamentals', progress: 95, score: 92, lastActivity: new Date('2024-02-15') },
        { studentId: '2', name: 'Jane Smith', course: 'Angular Fundamentals', progress: 88, score: 89, lastActivity: new Date('2024-02-14') },
        { studentId: '3', name: 'Bob Johnson', course: 'Advanced TypeScript', progress: 75, score: 82, lastActivity: new Date('2024-02-13') },
        { studentId: '4', name: 'Alice Williams', course: 'Advanced TypeScript', progress: 92, score: 94, lastActivity: new Date('2024-02-15') },
        { studentId: '5', name: 'Charlie Brown', course: 'Angular Fundamentals', progress: 60, score: 68, lastActivity: new Date('2024-02-12') }
      ]
    };
    return of(mockData).pipe(delay(500));
  }
}

