import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  AlertController,
  IonContent,
  ModalController,
  Platform,
} from '@ionic/angular';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-req-imei',
  templateUrl: './req-imei.component.html',
  styleUrls: ['./req-imei.component.scss'],
})
export class ReqImeiComponent implements OnInit {
  dealerlist = [];
  filterBy: any;
  renewallist = [];
  arrow = false;

  constructor(
    private platform: Platform,
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private ajaxService: AjaxService,
    private alertController: AlertController,
    private commonService: CommonService
  ) {}
  @ViewChild(IonContent, { static: false }) content: any;

  scrollToTop() {
    this.content.scrollToTop(500);
  }

  scrollToBottom() {
    this.content.scrollToBottom(500);
  }

  logScrolling(ev) {
    if (ev.detail.scrollTop > 2) {
      this.arrow = true;
    }
    if (ev.detail.scrollTop < 2) {
      this.arrow = false;
    }
  }

  close() {
    this.modalController.dismiss();
  }

  getModellist() {
    this.commonService.presentLoader();
    var url = `https://mvt.apmkingstrack.com/fleettracking/esim/getDealerMobileRenewalAll?companyid=${localStorage.getItem(
      'userId'
    )}&dealer=${localStorage.getItem('userId')}`;
    this.ajaxService.ajaxGetPerference(url).subscribe((res) => {
      this.commonService.dismissLoader();
      this.renewallist = res;
    });
  }

  ionViewWillEnter() {
    this.getModellist();
  }

  ngOnInit() {}
}
