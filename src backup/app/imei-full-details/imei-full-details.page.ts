import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Platform } from '@ionic/angular';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { AjaxService } from '../services/ajax.service';
import { CommonService } from '../services/common.service';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';

@Component({
  selector: 'app-imei-full-details',
  templateUrl: './imei-full-details.page.html',
  styleUrls: ['./imei-full-details.page.scss'],
})
export class ImeiFullDetailsPage implements OnInit {
  imeidetailsForm: FormGroup;
  resultForm: FormGroup;
  imeidetails: any;
  myPlatform: any;
  show: boolean = false;
  @ViewChild('myGrid', { static: false }) myGrid: jqxGridComponent;
  renderer: (row: number, column: any, value: string) => string;
  page: any[];
  source: { localdata: any };
  dataAdapter: any;
  tableData: any;
  value: string;
  columns: {
    text: string;
    datafield: string;
    cellsrenderer: (row: number, column: any, value: string) => string;
    cellsalign: string;
    align: string;
    width: number;
    editable: boolean;
  }[];
  scanData: any;

  constructor(
    public platform: Platform,
    private formBuilder: FormBuilder,
    private ajaxService: AjaxService,
    private commonService: CommonService,
    private barcodeScanner: BarcodeScanner
  ) {}

  async qrscan() {
    this.barcodeScanner
      .scan()
      .then((barcodeData) => {
        this.value = barcodeData.text;
        this.getdetails();
      })
      .catch((err) => {
        console.log('Error', err);
      });
  }

  getdetails() {
    if (this.value && this.value !== '') {
      this.scanData = this.value.split(',');
      const url =
        'https://mvt.apmkingstrack.com/fleettracking/global/getAllImeiNoDetails?imeiNo=' +
        this.scanData[0] +
        '&dealer=' +
        localStorage.getItem('userId');
      this.ajaxService.ajaxGet(url).subscribe((res) => {
        if (res.message == 'Invalid IMEI No.') {
          this.show = false;
          this.commonService.dismissLoader();
          this.commonService.showConfirm('Invalid IMEI No');
        } else {
          this.imeidetails = res;
          this.SearchData();
        }
      });
    }
  }

  submit() {
    if (this.imeidetailsForm.value.imeino.toString().length != 15) {
      this.commonService.showConfirm('Enter the 15 Digit Imei Number');
      this.show = false;
    } else {
      const url =
        'https://mvt.apmkingstrack.com/fleettracking/global/getAllImeiNoDetails?imeiNo=' +
        this.imeidetailsForm.value.imeino +
        '&dealer=' +
        localStorage.getItem('userId');
      this.ajaxService.ajaxGet(url).subscribe((res) => {
        if (res.message == 'Invalid IMEI No.') {
          this.show = false;
          this.commonService.dismissLoader();
          this.commonService.showConfirm('Invalid IMEI No');
        } else {
          this.imeidetails = res;
          this.SearchData();
        }
      });
    }
  }
  SearchData() {
    this.commonService.presentLoader();
    var url =
      'https://mvt.apmkingstrack.com/fleettracking/esim/getEsimActivationDetails?imei=' +
      this.imeidetailsForm.value.imeino;
    this.ajaxService.ajaxGet(url).subscribe((res) => {
      this.tableData = res;
      this.commonService.dismissLoader();
      this.show = true;
      console.log(this.myGrid);
      this.renderer = (row: number, column: any, value: string) => {
        if (value == '' || null || undefined || value == ',') {
          return '---';
        } else {
          return (
            '<span  style="line-height:32px;font-size:11px;color:darkblue;margin:auto;">' +
            value +
            '</span>'
          );
        }
      };

      this.source = { localdata: this.tableData };
      this.dataAdapter = new jqx.dataAdapter(this.source);
      this.columns = [
        {
          text: 'Request No',
          datafield: 'requestid',
          cellsrenderer: this.renderer,
          cellsalign: 'center',
          align: 'center',
          width: 110,
          editable: true,
        },
        {
          text: 'Request Date',
          datafield: 'requestdate',
          cellsrenderer: this.renderer,
          cellsalign: 'center',
          align: 'center',
          width: 130,
          editable: true,
        },
        {
          text: 'Request Dealer',
          datafield: 'requesteddealer',
          cellsrenderer: this.renderer,
          cellsalign: 'center',
          align: 'center',
          width: 130,
          editable: true,
        },
        {
          text: 'Invoice No',
          datafield: 'invoiceno',
          cellsrenderer: this.renderer,
          cellsalign: 'center',
          align: 'center',
          width: 110,
          editable: true,
        },
        {
          text: 'IMEI No',
          datafield: 'imei',
          cellsrenderer: this.renderer,
          cellsalign: 'center',
          align: 'center',
          width: 140,
          editable: true,
        },
        {
          text: 'Card Activated Date',
          datafield: 'commercialactivationdate',
          cellsrenderer: this.renderer,
          cellsalign: 'center',
          align: 'center',
          width: 180,
          editable: true,
        },
        {
          text: 'Card End Date',
          datafield: 'cardenddate',
          cellsrenderer: this.renderer,
          cellsalign: 'center',
          align: 'center',
          width: 130,
          editable: true,
        },
        {
          text: 'Card Status',
          datafield: 'cardstatus',
          cellsrenderer: this.renderer,
          cellsalign: 'center',
          align: 'center',
          width: 120,
          editable: true,
        },

        {
          text: 'Comment',
          datafield: 'latestcomment',
          cellsrenderer: this.renderer,
          cellsalign: 'center',
          align: 'center',
          width: 120,
          editable: true,
        },
      ];
    });
  }

  clear() {
    this.imeidetailsForm.patchValue({
      imeino: '',
    });
    this.show = false;
  }
  // ngAfterViewInit() {
  //   this.myGrid.pagesizeoptions(["100", "200", "500", "1000"]);
  // }

  ngOnInit() {
    this.myPlatform = this.platform.platforms()[0];
    if (this.myPlatform == 'tablet') {
      this.myPlatform = 'desktop';
    }
    this.imeidetailsForm = this.formBuilder.group({
      imeino: ['', Validators.required],
    });
  }
  ionViewWillEnter() {
    this.imeidetailsForm.reset();
    this.clear();
  }
}
