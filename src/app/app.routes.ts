import { Routes } from '@angular/router';
import { TestComponent } from './test-component/test-component.component';

export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TestComponent,
  },
];
