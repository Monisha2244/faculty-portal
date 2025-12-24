import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService, Notification } from '../../core/services/notification.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="notifications-page">
      <div class="page-header">
        <div>
          <h2>Notifications</h2>
          <p class="subtitle">Stay updated with your activities and updates</p>
        </div>
        <button class="btn btn-outline" (click)="markAllAsRead()" *ngIf="unreadCount > 0">
          Mark All as Read
        </button>
      </div>

      <div class="notifications-stats">
        <div class="stat-item">
          <div class="stat-value">{{ notifications.length }}</div>
          <div class="stat-label">Total Notifications</div>
        </div>
        <div class="stat-item">
          <div class="stat-value unread">{{ unreadCount }}</div>
          <div class="stat-label">Unread</div>
        </div>
      </div>

      <div class="notifications-list">
        <div *ngFor="let notification of notifications" 
             class="notification-item"
             [class.unread]="!notification.read"
             (click)="markAsRead(notification.id)">
          <div class="notification-icon" [ngClass]="'icon-' + notification.type">
            <span *ngIf="notification.type === 'success'">✅</span>
            <span *ngIf="notification.type === 'info'">ℹ️</span>
            <span *ngIf="notification.type === 'warning'">⚠️</span>
            <span *ngIf="notification.type === 'error'">❌</span>
          </div>
          <div class="notification-content">
            <div class="notification-header">
              <h4>{{ notification.title }}</h4>
              <span class="notification-time">{{ getTimeAgo(notification.timestamp) }}</span>
            </div>
            <p class="notification-message">{{ notification.message }}</p>
          </div>
          <div class="notification-status" *ngIf="!notification.read">
            <span class="unread-dot"></span>
          </div>
        </div>
      </div>

      <div *ngIf="notifications.length === 0" class="empty-state">
        <p>No notifications yet. You're all caught up!</p>
      </div>
    </div>
  `,
  styles: [`
    .notifications-page {
      max-width: 1000px;
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
    .notifications-stats {
      display: flex;
      gap: 1.5rem;
      margin-bottom: 2rem;
    }
    .stat-item {
      background: var(--card-bg);
      border-radius: var(--radius);
      padding: 1.5rem;
      text-align: center;
      box-shadow: var(--shadow-sm);
      border: 1px solid var(--border-color);
      min-width: 150px;
    }
    .stat-value {
      font-size: 2rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 0.5rem;
    }
    .stat-value.unread {
      color: var(--primary-color);
    }
    .stat-label {
      font-size: 0.875rem;
      color: var(--text-secondary);
    }
    .notifications-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .notification-item {
      background: var(--card-bg);
      border-radius: var(--radius);
      padding: 1.5rem;
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      box-shadow: var(--shadow-sm);
      border: 1px solid var(--border-color);
      cursor: pointer;
      transition: all 0.2s;
    }
    .notification-item:hover {
      box-shadow: var(--shadow-md);
      transform: translateY(-2px);
    }
    .notification-item.unread {
      border-left: 4px solid var(--primary-color);
      background: rgba(37, 99, 235, 0.02);
    }
    .notification-icon {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      font-size: 1.25rem;
      flex-shrink: 0;
    }
    .icon-success {
      background: #d1fae5;
    }
    .icon-info {
      background: #dbeafe;
    }
    .icon-warning {
      background: #fef3c7;
    }
    .icon-error {
      background: #fee2e2;
    }
    .notification-content {
      flex: 1;
    }
    .notification-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 0.5rem;
    }
    .notification-header h4 {
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-primary);
    }
    .notification-time {
      font-size: 0.75rem;
      color: var(--text-secondary);
      white-space: nowrap;
    }
    .notification-message {
      font-size: 0.875rem;
      color: var(--text-secondary);
      line-height: 1.6;
    }
    .notification-status {
      flex-shrink: 0;
    }
    .unread-dot {
      width: 10px;
      height: 10px;
      background: var(--primary-color);
      border-radius: 50%;
      display: block;
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
      font-size: 1.125rem;
    }
  `]
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[] = [];
  unreadCount = 0;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.loadNotifications();
    this.notificationService.getUnreadCount().subscribe(count => {
      this.unreadCount = count;
    });
  }

  loadNotifications(): void {
    this.notificationService.getNotifications().subscribe(notifications => {
      this.notifications = notifications;
      this.unreadCount = notifications.filter(n => !n.read).length;
    });
  }

  markAsRead(id: string): void {
    this.notificationService.markAsRead(id);
    this.loadNotifications();
  }

  markAllAsRead(): void {
    this.notificationService.markAllAsRead();
    this.loadNotifications();
  }

  getTimeAgo(timestamp: Date): string {
    const now = new Date();
    const diff = now.getTime() - new Date(timestamp).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      return `${days}d ago`;
    }
  }
}

