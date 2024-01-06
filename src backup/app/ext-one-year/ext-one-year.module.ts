import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExtOneYearPageRoutingModule } from './ext-one-year-routing.module';

import { ExtOneYearPage } from './ext-one-year.page';
import { jqxGridModule } from 'jqwidgets-ng/jqxgrid';
import { SafePipe } from '../services/safe.pipe';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    jqxGridModule,
    ExtOneYearPageRoutingModule,
  ],
  providers: [SafePipe, BarcodeScanner],
  declarations: [ExtOneYearPage],
})
export class ExtOneYearPageModule {}
