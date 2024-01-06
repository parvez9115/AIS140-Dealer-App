import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'main-menu',
    loadChildren: () =>
      import('./main-menu/main-menu.module').then((m) => m.MainMenuPageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'device-activation-request',
    loadChildren: () =>
      import(
        './device-activation-request/device-activation-request.module'
      ).then((m) => m.DeviceActivationRequestPageModule),
  },
  {
    path: 'renewal-request',
    loadChildren: () =>
      import('./renewal-request/renewal-request.module').then(
        (m) => m.RenewalRequestPageModule
      ),
  },
  {
    path: 'topup-request',
    loadChildren: () =>
      import('./topup-request/topup-request.module').then(
        (m) => m.TopupRequestPageModule
      ),
  },
  {
    path: 'ext-one-year',
    loadChildren: () =>
      import('./ext-one-year/ext-one-year.module').then(
        (m) => m.ExtOneYearPageModule
      ),
  },

  {
    path: 'imei-full-details',
    loadChildren: () =>
      import('./imei-full-details/imei-full-details.module').then(
        (m) => m.ImeiFullDetailsPageModule
      ),
  },
  {
    path: 'bulk-activation',
    loadChildren: () => import('./bulk-activation/bulk-activation.module').then( m => m.BulkActivationPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
