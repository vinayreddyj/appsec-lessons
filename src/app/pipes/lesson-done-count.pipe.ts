// src/app/pipes/lesson-done-count.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { Lesson } from '../lessons';

@Pipe({
  name: 'lessonDoneCount',
  standalone: true,
})
export class LessonDoneCountPipe implements PipeTransform {
  transform(lessons: Lesson[], completed: Set<number>): string {
    const done = lessons.filter((l) => completed.has(l.num)).length;
    return done > 0 ? `${done}/${lessons.length}` : '';
  }
}
