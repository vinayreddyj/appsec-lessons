// src/app/services/progress.service.ts
import { Injectable, signal, computed } from '@angular/core';

const STORAGE_KEY = 'appsec_progress';

@Injectable({ providedIn: 'root' })
export class ProgressService {
  private _completed = signal<Set<number>>(this.loadFromStorage());

  readonly completed = this._completed.asReadonly();

  readonly completedCount = computed(() => this._completed().size);

  readonly progressPercent = computed(() =>
    Math.round((this._completed().size / 20) * 100)
  );

  isCompleted(lessonNum: number): boolean {
    return this._completed().has(lessonNum);
  }

  markComplete(lessonNum: number): void {
    const next = new Set(this._completed());
    next.add(lessonNum);
    this._completed.set(next);
    this.saveToStorage(next);
  }

  markIncomplete(lessonNum: number): void {
    const next = new Set(this._completed());
    next.delete(lessonNum);
    this._completed.set(next);
    this.saveToStorage(next);
  }

  toggleComplete(lessonNum: number): void {
    if (this.isCompleted(lessonNum)) {
      this.markIncomplete(lessonNum);
    } else {
      this.markComplete(lessonNum);
    }
  }

  resetAll(): void {
    this._completed.set(new Set());
    localStorage.removeItem(STORAGE_KEY);
  }

  private loadFromStorage(): Set<number> {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return new Set();
      const arr = JSON.parse(raw) as number[];
      return new Set(arr);
    } catch {
      return new Set();
    }
  }

  private saveToStorage(completed: Set<number>): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...completed]));
    } catch {
      // storage unavailable — silently ignore
    }
  }
}
