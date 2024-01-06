import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeviceActivationRequestPage } from './device-activation-request.page';
import { jqxGridModule } from 'jqwidgets-ng/jqxgrid';
import { SafePipe } from '../services/safe.pipe';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { RouterModule, Routes } from '@angular/router';
import { ReqImeiComponent } from './req-imei/req-imei.component';
import { activationFilterPipe } from '../services/activation-filter.pipe';

const routes: Routes = [
  {
    path: '',
    component: DeviceActivationRequestPage,
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
    ReactiveFormsModule,
    IonicModule,
    jqxGridModule,
    RouterModule.forChild(routes),
  ],

  providers: [SafePipe, BarcodeScanner],
  declarations: [
    DeviceActivationRequestPage,
    activationFilterPipe,
    ReqImeiComponent,
  ],
})
export class DeviceActivationRequestPageModule {}
