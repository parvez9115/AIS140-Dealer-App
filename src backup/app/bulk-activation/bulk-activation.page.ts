import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, Platform } from '@ionic/angular';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { AjaxService } from '../services/ajax.service';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-bulk-activation',
  templateUrl: './bulk-activation.page.html',
  styleUrls: ['./bulk-activation.page.scss'],
})
export class BulkActivationPage implements OnInit {
  bulkactivate: FormGroup;
  selectedRowIndex: number = -1;
  @ViewChild('myGrid', { static: false }) myGrid: jqxGridComponent;
  columns: any;
  source: { localdata: any };
  dataAdapter: any;
  renderer: (row: number, column: any, value: string) => string;
  isshow: boolean = false;
  tableData = [];
  myPlatform: any;
  imeires: any;

  constructor(
    private platform: Platform,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private ajaxService: AjaxService,
    private commonService: CommonService
  ) {}

  createform() {
    this.bulkactivate = this.formBuilder.group({
      slotno: ['', Validators.required],
      boxno: ['', Validators.required],
      validityperiod: [''],
    });
  }

  clear() {
    this.bulkactivate.patchValue({
      slotno: '',
      boxno: '',
    });
  }

  add() {
    this.commonService.presentLoader();
    const url =
      'https://mvt.apmkingstrack.com/fleettracking/esim/getBoxNoValidation?slotno=' +
      this.bulkactivate.value.slotno +
      '&boxno=' +
      this.bulkactivate.value.boxno +
      '&dealer=m3gpsmh-sa';
    this.commonService.dismissLoader();
    this.ajaxService.ajaxGetPerference(url).subscribe((res) => {
      if (res.message == '') {
        this.imeires = res.imei;
        for (let index = 0; index < this.imeires.length; index++) {
          const newIMEI = this.imeires[index].imei;
          if (!this.isImeiDuplicate(newIMEI)) {
            var gridvalue = {
              imei: newIMEI,
            };
            this.tableData.push(gridvalue);
          }
        }
        this.updateGridData();
      } else {
        this.commonService.showConfirm(res.message);
      }
    });
  }

  isImeiDuplicate(imei: string): boolean {
    return this.tableData.some((item) => item.imei === imei);
  }

  updateGridData() {
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
    ];
  }

  async deleteMode() {
    if (this.selectedRowIndex !== -1) {
      const alert = await this.alertController.create({
        header: 'Delete',
        backdropDismiss: false,
        message: 'Are you sure you want to delete?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              this.myGrid.clearselection();
              this.selectedRowIndex = -1;
            },
          },
          {
            text: 'Ok',
            handler: () => {
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

  deleteAnalogRow() {
    if (this.selectedRowIndex !== -1) {
      this.tableData.splice(this.selectedRowIndex, 1);
      this.updateGridData();
      this.myGrid.clearselection();
      this.selectedRowIndex = -1;
    }
  }

  myGridOnRowSelect(event: any): void {
    this.selectedRowIndex = event.args.rowindex;
  }

  isAddButtonDisabled(): boolean {
    const slotNo = this.bulkactivate.get('slotno').value;
    const boxNo = this.bulkactivate.get('boxno').value;
    return !(slotNo && boxNo);
  }

  isSubmitDisabled(): boolean {
    return (
      this.tableData.length === 0 ||
      this.bulkactivate.value.validityperiod == ''
    );
  }

  submit() {
    let selectdata = this.tableData;
    let arr = [];
    for (let i = 0; i < selectdata.length; i++) {
      arr.push({
        carequestid: '',
        imei: this.myGrid['attrSource']['originaldata'][i].imei,
        createdby: localStorage.getItem('userId'),
        updatedby: localStorage.getItem('userId'),
        updateddate: null,
        validityperiod: this.bulkactivate.value.validityperiod,
      });
    }

    const url =
      'https://mvt.apmkingstrack.com/fleettracking/esim/saveMobileEsimCARequest?companyid=apm&branchid=apm&dealerid=' +
      localStorage.getItem('userId');
    this.ajaxService.ajaxPostWithBody(url, arr).subscribe((res) => {
      if (res.message == 'CA Request Saved Successfully') {
        this.commonService.showConfirm('Device Request Saved Successfully');
        this.clear1();
      } else {
        this.commonService.showConfirm(res.message);
      }
    });
  }

  clear1() {
    this.bulkactivate.patchValue({
      validityperiod: '',
      boxno: '',
      slotno: '',
    });
    this.isshow = false;
    this.tableData = [];
  }

  ngOnInit() {
    this.myPlatform = this.platform.platforms()[0];
    if (this.myPlatform == 'tablet') {
      this.myPlatform = 'desktop';
    }
    this.createform();
  }
}
