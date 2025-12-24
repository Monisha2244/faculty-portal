import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card" [class.card-elevated]="elevated">
      <div class="card-header" *ngIf="title">
        <h3 class="card-title">{{ title }}</h3>
        <ng-content select="[card-actions]"></ng-content>
      </div>
      <div class="card-content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .card {
      background: var(--card-bg);
      border-radius: var(--radius);
      padding: 1.5rem;
      box-shadow: var(--shadow-sm);
      border: 1px solid var(--border-color);
    }
    .card-elevated {
      box-shadow: var(--shadow-md);
    }
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--border-color);
    }
    .card-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0;
    }
    .card-content {
      color: var(--text-primary);
    }
  `]
})
export class CardComponent {
  @Input() title?: string;
  @Input() elevated = false;
}

