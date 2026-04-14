// src/app/components/sidebar/sidebar.component.ts
import {
  Component,
  computed,
  inject,
  signal,
  Output,
  EventEmitter,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MODULES, Module, Lesson } from '../../lessons';
import { ProgressService } from '../../services/progress.service';
import { LessonDoneCountPipe } from '../../pipes/lesson-done-count.pipe';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, LessonDoneCountPipe],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  currentLessonNum = input<number>(1);

  @Output() lessonSelected = new EventEmitter<number>();

  // Expose progress service to the template for the pipe call
  readonly progress = inject(ProgressService);

  private _searchQuery = signal('');
  readonly searchQuery = this._searchQuery.asReadonly();

  private _expandedModules = signal<Set<string>>(
    new Set(MODULES.map((m) => m.id))
  );

  readonly completedCount = this.progress.completedCount;
  readonly progressPercent = this.progress.progressPercent;

  readonly filteredModules = computed(() => {
    const q = this._searchQuery().toLowerCase().trim();
    if (!q) return MODULES;
    return MODULES.map((mod) => ({
      ...mod,
      lessons: mod.lessons.filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          l.tags.some((t) => t.includes(q)) ||
          String(l.num) === q
      ),
    })).filter((mod) => mod.lessons.length > 0);
  });

  isModuleExpanded(moduleId: string): boolean {
    return this._expandedModules().has(moduleId);
  }

  toggleModule(moduleId: string): void {
    const next = new Set(this._expandedModules());
    if (next.has(moduleId)) {
      next.delete(moduleId);
    } else {
      next.add(moduleId);
    }
    this._expandedModules.set(next);
  }

  isCompleted(num: number): boolean {
    return this.progress.isCompleted(num);
  }

  isActive(num: number): boolean {
    return this.currentLessonNum() === num;
  }

  onLessonClick(num: number): void {
    this.lessonSelected.emit(num);
  }

  setSearch(value: string): void {
    this._searchQuery.set(value);
    // Auto-expand all modules while searching
    if (value) {
      this._expandedModules.set(new Set(MODULES.map((m) => m.id)));
    }
  }

  trackByModule(_: number, mod: Module): string {
    return mod.id;
  }

  trackByLesson(_: number, lesson: Lesson): number {
    return lesson.num;
  }
}
