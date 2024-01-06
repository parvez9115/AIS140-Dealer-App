import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImeiFullDetailsPage } from './imei-full-details.page';

const routes: Routes = [
  {
    path: '',
    component: ImeiFullDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImeiFullDetailsPageRoutingModule {}
