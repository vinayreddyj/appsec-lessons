// src/app/app.component.ts
import {
  Component,
  signal,
  inject,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private router = inject(Router);

  currentLessonNum = signal(1);
  sidebarOpen = signal(true);
  isMobile = signal(window.innerWidth < 900);

  constructor() {
    // Track active lesson from router
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e) => {
        const match = (e as NavigationEnd).url.match(/\/lesson\/(\d+)/);
        if (match) {
          this.currentLessonNum.set(parseInt(match[1], 10));
        }
        // Auto-close sidebar on mobile after navigation
        if (this.isMobile()) {
          this.sidebarOpen.set(false);
        }
      });
  }

  @HostListener('window:resize')
  onResize(): void {
    this.isMobile.set(window.innerWidth < 900);
    if (!this.isMobile()) {
      this.sidebarOpen.set(true);
    }
  }

  toggleSidebar(): void {
    this.sidebarOpen.update((v) => !v);
  }

  onLessonSelected(num: number): void {
    this.currentLessonNum.set(num);
  }
}
