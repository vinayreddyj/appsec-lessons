import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/lesson-viewer/lesson-viewer.component').then(
        (m) => m.LessonViewerComponent
      ),
    children: [
      {
        path: 'lesson/:num',
        loadComponent: () =>
          import('./components/lesson-viewer/lesson-content.component').then(
            (m) => m.LessonContentComponent
          ),
      },
      { path: '', redirectTo: 'lesson/1', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: 'lesson/1' },
];
