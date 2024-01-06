import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RenewalRequestPage } from './renewal-request.page';

const routes: Routes = [
  {
    path: '',
    component: RenewalRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RenewalRequestPageRoutingModule {}
