import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./tabs/tabs.page').then((m) => m.TabsPage),
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'browse',
        loadComponent: () =>
          import('./browse/browse.page').then((m) => m.BrowsePage),
      },
      {
        path: 'landlords',
        loadComponent: () =>
          import('./landlords/landlords.page').then((m) => m.LandlordsPage),
      },
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
    ],
  },
];
