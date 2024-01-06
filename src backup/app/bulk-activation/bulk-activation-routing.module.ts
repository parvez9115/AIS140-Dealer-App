import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BulkActivationPage } from './bulk-activation.page';

const routes: Routes = [
  {
    path: '',
    component: BulkActivationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BulkActivationPageRoutingModule {}
