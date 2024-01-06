import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TopupRequestPage } from './topup-request.page';
import { SafePipe } from '../services/safe.pipe';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { jqxGridModule } from 'jqwidgets-ng/jqxgrid';
import { RouterEvent, RouterModule, Routes } from '@angular/router';
import { ReqImeiComponent } from './req-imei/req-imei.component';
import { topupFilterPipe } from '../services/topup-filter.pipe';

const routes: Routes = [
  {
    path: '',
    component: TopupRequestPage,
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
  declarations: [TopupRequestPage, topupFilterPipe, ReqImeiComponent],
})
export class TopupRequestPageModule {}
