import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.routes').then(m => m.WELCOME_ROUTES) },
  { path: 'product', loadChildren: () => import('./pages/product/product.routes').then(m => m.PRODUCT_ROUTES) },
  { path: 'login', loadChildren: () => import('./pages/login/login.routes').then(m => m.LOGIN_ROUTES) },
  { path: 'manage-product', loadChildren: () => import('./pages/manage-product/manage-product.routes').then(m => m.MANAGE_PRODUCT_ROUTES) },
  { path: 'manage-user', loadChildren: () => import('./pages/manage-user/manage-user.routes').then(m => m.MANAGE_USER_ROUTES) },
];
