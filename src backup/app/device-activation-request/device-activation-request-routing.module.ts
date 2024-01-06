import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeviceActivationRequestPage } from './device-activation-request.page';

const routes: Routes = [
  {
    path: '',
    component: DeviceActivationRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeviceActivationRequestPageRoutingModule {}
