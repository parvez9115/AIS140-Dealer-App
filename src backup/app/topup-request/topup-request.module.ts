import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TopupRequestPageRoutingModule } from './topup-request-routing.module';

import { TopupRequestPage } from './topup-request.page';
import { SafePipe } from '../services/safe.pipe';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { jqxGridModule } from 'jqwidgets-ng/jqxgrid';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    jqxGridModule,
    TopupRequestPageRoutingModule,
  ],
  providers: [SafePipe, BarcodeScanner],
  declarations: [TopupRequestPage],
})
export class TopupRequestPageModule {}
