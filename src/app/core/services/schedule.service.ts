import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Session {
  id: string;
  title: string;
  course: string;
  date: Date;
  startTime: string;
  endTime: string;
  location: string;
  students: number;
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
}

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private mockSessions: Session[] = [
    {
      id: '1',
      title: 'Angular Components Deep Dive',
      course: 'Angular Fundamentals',
      date: new Date('2024-02-20'),
      startTime: '10:00',
      endTime: '12:00',
      location: 'Room A101',
      students: 25,
      status: 'scheduled'
    },
    {
      id: '2',
      title: 'TypeScript Generics',
      course: 'Advanced TypeScript',
      date: new Date('2024-02-21'),
      startTime: '14:00',
      endTime: '16:00',
      location: 'Room B205',
      students: 18,
      status: 'scheduled'
    },
    {
      id: '3',
      title: 'Project Review Session',
      course: 'Angular Fundamentals',
      date: new Date('2024-02-22'),
      startTime: '09:00',
      endTime: '11:00',
      location: 'Online',
      students: 30,
      status: 'scheduled'
    }
  ];

  getSessions(): Observable<Session[]> {
    return of(this.mockSessions).pipe(delay(500));
  }

  createSession(session: Partial<Session>): Observable<Session> {
    const newSession: Session = {
      id: Date.now().toString(),
      title: session.title || '',
      course: session.course || '',
      date: session.date || new Date(),
      startTime: session.startTime || '',
      endTime: session.endTime || '',
      location: session.location || '',
      students: 0,
      status: 'scheduled'
    };
    this.mockSessions.push(newSession);
    return of(newSession).pipe(delay(500));
  }
}

