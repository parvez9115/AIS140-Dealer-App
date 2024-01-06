import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  AlertController,
  IonSelect,
  ModalController,
  Platform,
} from '@ionic/angular';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { AjaxService } from '../services/ajax.service';
import { CommonService } from '../services/common.service';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { ReqImeiComponent } from './req-imei/req-imei.component';

@Component({
  selector: 'app-renewal-request',
  templateUrl: './renewal-request.page.html',
  styleUrls: ['./renewal-request.page.scss'],
})
export class RenewalRequestPage implements OnInit {
  imeidetail: FormGroup;
  @ViewChild('myGrid', { static: false })
  myGrid: jqxGridComponent;
  columns: any;
  source: { localdata: any };
  dataAdapter: any;
  renderer: (row: number, column: any, value: string) => string;
  tableData = [];
  selectedRow: any;
  imeires: any;
  value: string;
  scanData: string;
  isshow: boolean = false;
  activation: any;

  constructor(
    private platform: Platform,
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private ajaxService: AjaxService,
    private alertController: AlertController,
    private commonService: CommonService,
    private barcodeScanner: BarcodeScanner
  ) {}

  createform() {
    this.imeidetail = this.formBuilder.group({
      imei: [''],
      validityperiod: ['', Validators.required],
    });
  }

  isSubmitDisabled(): boolean {
    return this.tableData.length === 0 || !this.imeidetail.valid;
  }

  clear() {
    this.imeidetail.patchValue({
      imei: '',
      validityperiod: '',
    });
    this.isshow = false;
    this.tableData = [];
    this.selectedRow = '';
  }

  imeiclear() {
    this.imeidetail.patchValue({
      imei: '',
    });
  }

  async reqimei() {
    const modal = await this.modalController.create({
      component: ReqImeiComponent,
      cssClass: '',
    });
    modal.onDidDismiss().then(() => {});
    return await modal.present();
  }

  addimei() {
    if (this.imeidetail.value.imei != '') {
      this.commonService.presentLoader();
      const url = `https://mvt.apmkingstrack.com/fleettracking/esim/getImeiNoValidation?imeino=${
        this.imeidetail.value.imei
      }&Status=RENEWAL&dealer=${localStorage.getItem('userId')}`;
      this.ajaxService.ajaxGet(url).subscribe((res) => {
        this.commonService.dismissLoader();
        if (res.message == 'Valid IMEI No') {
          this.imeires = this.imeidetail.value.imei.toString();
          this.imeiclear();
          if (!this.isImeiDuplicate(this.imeires)) {
            // Check for duplicate before adding
            var gridvalue = {
              imei: this.imeires,
            };
            this.tableData.push(gridvalue);
            this.getdata();
          } else {
            this.commonService.showConfirm('IMEI No Already Added');
          }
        } else {
          this.commonService.showConfirm(res.message);
        }
      });
    } else {
      this.commonService.showConfirm('Please Enter the IMEI');
    }
  }

  async qrscan() {
    this.barcodeScanner
      .scan()
      .then((barcodeData) => {
        this.value = barcodeData.text;
        this.splitAndSave();
      })
      .catch((err) => {
        console.log('Error', err);
      });
  }

  splitAndSave() {
    if (this.value && this.value !== '') {
      // Split the QR code values by comma (,)
      const qrCodeValues = this.value.split(',');

      this.commonService.presentLoader();
      const url = `https://mvt.apmkingstrack.com/fleettracking/esim/getImeiNoValidation?imeino=${
        qrCodeValues[0]
      }&Status=RENEWAL&dealer=${localStorage.getItem('userId')}`;
      this.ajaxService.ajaxGetPerference(url).subscribe((res) => {
        this.commonService.dismissLoader();
        if (res.message == 'Valid IMEI No') {
          if (!this.isImeiDuplicate(qrCodeValues[0])) {
            // Check for duplicate before adding
            var data = {
              imei: qrCodeValues[0],
            };
            this.tableData.push(data);
            this.getdata();
          } else {
            this.commonService.showConfirm('IMEI No Already Added');
          }
        } else {
          this.commonService.showConfirm(res.message);
        }
      });
    }
  }

  isImeiDuplicate(imei: string): boolean {
    return this.tableData.some((item) => item.imei === imei);
  }

  getdata() {
    this.isshow = true;
    this.renderer = (row: number, column: any, value: string) => {
      if (
        value == '' ||
        value === null ||
        value === undefined ||
        value === ','
      ) {
        return '--';
      } else {
        return (
          '<span style="line-height:32px;font-size:11px;color:darkblue;margin:auto;">' +
          value +
          '</span>'
        );
      }
    };
    this.source = { localdata: this.tableData };
    this.dataAdapter = new jqx.dataAdapter(this.source);
    this.columns = [
      {
        text: 'IMEI Number',
        datafield: 'imei',
        cellsrenderer: this.renderer,
        cellsalign: 'center',
        align: 'center',
      },
      // {
      //   text: 'Delete',
      //   datafield: 'Delete',
      //   columntype: 'button',
      //   cellsalign: 'center',
      //   align: 'center',
      //   width: '23%',
      //   cellsrenderer: (): string => {
      //     return 'Delete';
      //   },
      //   buttonclick: (row): void => {
      //     this.deleteAnalogRow(row);
      //   },
      // },
    ];
  }

  async deleteMode() {
    if (this.selectedRow) {
      const alert = await this.alertController.create({
        header: 'Delete ',
        backdropDismiss: false,
        message: 'Are you sure you want to delete?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: (data) => {
              this.myGrid.clearselection();
              this.selectedRow = '';
            },
          },
          {
            text: 'Ok',
            handler: (data) => {
              this.deleteAnalogRow();
            },
          },
        ],
      });
      await alert.present();
    } else {
      this.commonService.showConfirm('Please select a row to delete');
    }
  }
  deleteAnalogRow(row?: any) {
    this.tableData.splice(row, 1);
    this.source = { localdata: this.tableData };
    this.dataAdapter = new jqx.dataAdapter(this.source);
    this.myGrid.clearselection();
    this.selectedRow = '';
  }

  submit() {
    let selectdata = this.tableData;
    let arr = [];
    for (let i = 0; i < selectdata.length; i++) {
      arr.push({
        renewalrequestid: '',
        imei: this.myGrid['attrSource']['originaldata'][i].imei,
        createdby: localStorage.getItem('userId'),
        createddate: null,
        updatedby: localStorage.getItem('userId'),
        updateddate: null,
        validityperiod: this.imeidetail.value.validityperiod,
      });
    }
    this.commonService.presentLoader();

    const url =
      'https://mvt.apmkingstrack.com/fleettracking/esim/saveMobileEsimRenewalRequest?companyid=apm&branchid=apm&dealerid=' +
      localStorage.getItem('userId');
    this.ajaxService.ajaxPostWithBody(url, arr).subscribe((res) => {
      this.commonService.dismissLoader();
      if (res.message == 'Renewal Request Saved Successfully') {
        this.commonService.showConfirm(res.message);
        this.clear();
      } else {
        this.commonService.showConfirm(res.message);
      }
    });
  }

  myGridOnRowSelect(event: any): void {
    this.selectedRow = event.args.row.bounddata;
  }
  ionViewWillEnter() {
    this.clear();
    this.imeiclear();
    this.createform();
  }

  ngOnInit() {
    this.createform();
  }
}
