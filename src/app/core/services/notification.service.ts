import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationsSubject = new BehaviorSubject<Notification[]>([]);
  public notifications$ = this.notificationsSubject.asObservable();

  constructor() {
    this.loadMockNotifications();
  }

  private loadMockNotifications(): void {
    const mockNotifications: Notification[] = [
      {
        id: '1',
        title: 'New Student Enrollment',
        message: '5 new students enrolled in Angular Fundamentals',
        type: 'success',
        timestamp: new Date('2024-02-15T10:30:00'),
        read: false
      },
      {
        id: '2',
        title: 'Assignment Submitted',
        message: 'John Doe submitted assignment for review',
        type: 'info',
        timestamp: new Date('2024-02-15T09:15:00'),
        read: false
      },
      {
        id: '3',
        title: 'Session Reminder',
        message: 'You have a session scheduled in 2 hours',
        type: 'warning',
        timestamp: new Date('2024-02-15T08:00:00'),
        read: true
      },
      {
        id: '4',
        title: 'Course Update',
        message: 'Course content updated successfully',
        type: 'success',
        timestamp: new Date('2024-02-14T16:45:00'),
        read: true
      }
    ];
    this.notificationsSubject.next(mockNotifications);
  }

  getNotifications(): Observable<Notification[]> {
    return this.notifications$;
  }

  markAsRead(id: string): void {
    const notifications = this.notificationsSubject.value;
    const index = notifications.findIndex(n => n.id === id);
    if (index !== -1) {
      notifications[index].read = true;
      this.notificationsSubject.next([...notifications]);
    }
  }

  markAllAsRead(): void {
    const notifications = this.notificationsSubject.value.map(n => ({ ...n, read: true }));
    this.notificationsSubject.next(notifications);
  }

  getUnreadCount(): Observable<number> {
    return new Observable(observer => {
      this.notifications$.subscribe(notifications => {
        const count = notifications.filter(n => !n.read).length;
        observer.next(count);
      });
    });
  }
}

