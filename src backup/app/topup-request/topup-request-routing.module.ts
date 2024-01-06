import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopupRequestPage } from './topup-request.page';

const routes: Routes = [
  {
    path: '',
    component: TopupRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopupRequestPageRoutingModule {}
