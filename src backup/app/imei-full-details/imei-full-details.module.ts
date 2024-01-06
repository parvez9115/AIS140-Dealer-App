import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImeiFullDetailsPageRoutingModule } from './imei-full-details-routing.module';

import { ImeiFullDetailsPage } from './imei-full-details.page';
import { jqxGridModule } from 'jqwidgets-ng/jqxgrid';
import { SafePipe } from '../services/safe.pipe';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    jqxGridModule,
    FormsModule,
    IonicModule,
    ImeiFullDetailsPageRoutingModule,
  ],
  providers: [SafePipe, BarcodeScanner],
  declarations: [ImeiFullDetailsPage],
})
export class ImeiFullDetailsPageModule {}
