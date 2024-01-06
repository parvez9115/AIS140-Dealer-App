import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RenewalRequestPage } from './renewal-request.page';
import { jqxGridModule } from 'jqwidgets-ng/jqxgrid';
import { SafePipe } from '../services/safe.pipe';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { RouterModule, Routes } from '@angular/router';
import { ReqImeiComponent } from './req-imei/req-imei.component';
import { renewalFilterPipe } from '../services/renewal-filter.pipe';

const routes: Routes = [
  {
    path: '',
    component: RenewalRequestPage,
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
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    jqxGridModule,
  ],

  providers: [SafePipe, BarcodeScanner],
  declarations: [RenewalRequestPage, renewalFilterPipe, ReqImeiComponent],
})
export class RenewalRequestPageModule {}
