import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { AuthService } from '../../services/auth.service';
import { HasRoleDirective } from '../../directives/role-based.directive';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, HasRoleDirective],
  template: `
    <header class="header">
      <div class="header-content">
        <div class="header-left">
          <h1 class="logo">Faculty Portal</h1>
        </div>
        <div class="header-right">
          <button class="icon-btn" (click)="toggleNotifications()" [class.has-notifications]="unreadCount > 0">
            <span class="icon">🔔</span>
            <span class="badge" *ngIf="unreadCount > 0">{{ unreadCount }}</span>
          </button>
          <div class="user-menu">
            <span class="user-name">{{ userRole }}</span>
            <button class="icon-btn" (click)="logout()">
              <span class="icon">👤</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background: var(--card-bg);
      border-bottom: 1px solid var(--border-color);
      padding: 1rem 2rem;
      box-shadow: var(--shadow-sm);
    }
    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .logo {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--primary-color);
      margin: 0;
    }
    .header-right {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .icon-btn {
      position: relative;
      background: none;
      border: none;
      padding: 0.5rem;
      cursor: pointer;
      border-radius: var(--radius);
      transition: background-color 0.2s;
    }
    .icon-btn:hover {
      background-color: var(--bg-color);
    }
    .icon {
      font-size: 1.25rem;
    }
    .badge {
      position: absolute;
      top: 0;
      right: 0;
      background: var(--danger-color);
      color: white;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.625rem;
      font-weight: 600;
    }
    .user-menu {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .user-name {
      font-size: 0.875rem;
      color: var(--text-secondary);
      text-transform: capitalize;
    }
  `]
})
export class HeaderComponent implements OnInit {
  unreadCount = 0;
  userRole = '';

  constructor(
    private notificationService: NotificationService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
    this.notificationService.getUnreadCount().subscribe(count => {
      this.unreadCount = count;
    });
  }

  toggleNotifications(): void {
    this.router.navigate(['/admin/notifications']);
  }

  logout(): void {
    this.authService.logout();
    // In real app, navigate to login
  }
}

