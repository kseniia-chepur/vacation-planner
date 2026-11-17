import { Routes } from '@angular/router';
import { LayoutComponent } from '../core/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'new-destination',
        loadComponent: () =>
          import('../core/features/destinations/add-destination/add-destination.component').then(
            (m) => m.AddDestinationComponent
          ),
      },
    ],
  },
];
