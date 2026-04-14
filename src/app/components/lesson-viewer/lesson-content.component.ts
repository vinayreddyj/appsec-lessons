import {
  Component,
  OnInit,
  OnDestroy,
  signal,
  inject,
  ViewChild,
  ElementRef,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import {
  Lesson,
  Module,
  getLessonByNum,
  getModuleForLesson,
  getPrevLesson,
  getNextLesson,
} from '../../lessons';
import { ProgressService } from '../../services/progress.service';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe';

@Component({
  selector: 'app-lesson-content',
  standalone: true,
  imports: [CommonModule, RouterModule, SafeUrlPipe],
  templateUrl: './lesson-content.component.html',
  styleUrls: ['./lesson-viewer.component.scss'],
})
export class LessonContentComponent implements OnInit, OnDestroy {
  @ViewChild('frame') frameRef!: ElementRef<HTMLIFrameElement>;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private progress = inject(ProgressService);
  private destroy$ = new Subject<void>();

  lesson = signal<Lesson | null>(null);
  currentModule = signal<Module | null>(null);
  prevLesson = signal<Lesson | null>(null);
  nextLesson = signal<Lesson | null>(null);
  isLoading = signal(true);

  lessonUrl = computed(() => {
    const l = this.lesson();
    return l ? `assets/lessons/${l.file}` : '';
  });

  isCompleted = computed(() => {
    const l = this.lesson();
    return l ? this.progress.isCompleted(l.num) : false;
  });

  isLessonDone(num: number): boolean {
    return this.progress.isCompleted(num);
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const num = parseInt(params.get('num') ?? '1', 10);
      this.loadLesson(num);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadLesson(num: number): void {
    const found = getLessonByNum(num);
    if (!found) {
      this.router.navigate(['/lesson', 1]);
      return;
    }
    this.isLoading.set(true);
    this.lesson.set(found);
    this.currentModule.set(getModuleForLesson(num) ?? null);
    this.prevLesson.set(getPrevLesson(num) ?? null);
    this.nextLesson.set(getNextLesson(num) ?? null);
  }

  onFrameLoad(): void {
    this.isLoading.set(false);
    try {
      const doc = this.frameRef?.nativeElement?.contentDocument;
      if (doc) {
        const style = doc.createElement('style');
        style.id = 'shell-override';
        style.textContent = `
          .sidebar, nav.sidebar, aside.sidebar { display: none !important; }
          .main { margin-left: 0 !important; }
          .topbar { display: none !important; }
          body { padding-top: 0 !important; }
        `;
        doc.head.appendChild(style);
      }
    } catch {
      // Cross-origin frame — silently ignore
    }
  }

  toggleComplete(): void {
    const l = this.lesson();
    if (l) this.progress.toggleComplete(l.num);
  }

  goToPrev(): void {
    const prev = this.prevLesson();
    if (prev) this.router.navigate(['/lesson', prev.num]);
  }

  goToNext(): void {
    const next = this.nextLesson();
    if (!next) return;
    const l = this.lesson();
    if (l && !this.progress.isCompleted(l.num)) {
      this.progress.markComplete(l.num);
    }
    this.router.navigate(['/lesson', next.num]);
  }
}
