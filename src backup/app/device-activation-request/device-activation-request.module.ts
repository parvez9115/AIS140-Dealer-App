import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeviceActivationRequestPageRoutingModule } from './device-activation-request-routing.module';

import { DeviceActivationRequestPage } from './device-activation-request.page';
import { jqxGridModule } from 'jqwidgets-ng/jqxgrid';
import { SafePipe } from '../services/safe.pipe';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    jqxGridModule,
    DeviceActivationRequestPageRoutingModule,
  ],

  providers: [SafePipe, BarcodeScanner],
  declarations: [DeviceActivationRequestPage],
})
export class DeviceActivationRequestPageModule {}
