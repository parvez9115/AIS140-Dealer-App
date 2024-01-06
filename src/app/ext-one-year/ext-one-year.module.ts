import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExtOneYearPage } from './ext-one-year.page';
import { jqxGridModule } from 'jqwidgets-ng/jqxgrid';
import { SafePipe } from '../services/safe.pipe';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { ReqImeiComponent } from './req-imei/req-imei.component';
import { RouterModule, Routes } from '@angular/router';
import { extendFilterPipe } from '../services/extend-filter.pipe';

const routes: Routes = [
  {
    path: '',
    component: ExtOneYearPage,
  },
  {
    path: 'req-imei',
    component: ReqImeiComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    jqxGridModule,
    RouterModule.forChild(routes),
  ],
  providers: [SafePipe, BarcodeScanner],
  declarations: [ExtOneYearPage, extendFilterPipe, ReqImeiComponent],
})
export class ExtOneYearPageModule {}
