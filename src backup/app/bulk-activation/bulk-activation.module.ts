import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BulkActivationPageRoutingModule } from './bulk-activation-routing.module';

import { BulkActivationPage } from './bulk-activation.page';
import { jqxGridModule } from 'jqwidgets-ng/jqxgrid';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    jqxGridModule,
    FormsModule,
    IonicModule,
    BulkActivationPageRoutingModule,
  ],
  declarations: [BulkActivationPage],
})
export class BulkActivationPageModule {}
