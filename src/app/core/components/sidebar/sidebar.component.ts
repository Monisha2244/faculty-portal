import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface NavItem {
  label: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <aside class="sidebar">
      <nav class="nav">
        <a *ngFor="let item of navItems" 
           [routerLink]="item.route" 
           routerLinkActive="active"
           class="nav-item">
          <span class="nav-icon">{{ item.icon }}</span>
          <span class="nav-label">{{ item.label }}</span>
        </a>
      </nav>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: 250px;
      background: var(--card-bg);
      border-right: 1px solid var(--border-color);
      padding: 1.5rem 0;
      height: 100%;
      overflow-y: auto;
    }
    .nav {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .nav-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.875rem 1.5rem;
      color: var(--text-secondary);
      text-decoration: none;
      transition: all 0.2s;
      border-left: 3px solid transparent;
    }
    .nav-item:hover {
      background-color: var(--bg-color);
      color: var(--text-primary);
    }
    .nav-item.active {
      background-color: rgba(37, 99, 235, 0.1);
      color: var(--primary-color);
      border-left-color: var(--primary-color);
      font-weight: 500;
    }
    .nav-icon {
      font-size: 1.25rem;
      width: 24px;
      text-align: center;
    }
    .nav-label {
      font-size: 0.875rem;
    }
  `]
})
export class SidebarComponent {
  navItems: NavItem[] = [
    { label: 'Dashboard', route: '/dashboard', icon: '📊' },
    { label: 'Courses', route: '/admin/courses', icon: '📚' },
    { label: 'Analytics', route: '/admin/analytics', icon: '📈' },
    { label: 'Schedule', route: '/admin/schedule', icon: '📅' },
    { label: 'Notifications', route: '/admin/notifications', icon: '🔔' }
  ];
}

