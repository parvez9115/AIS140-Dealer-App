import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExtOneYearPage } from './ext-one-year.page';

const routes: Routes = [
  {
    path: '',
    component: ExtOneYearPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExtOneYearPageRoutingModule {}
