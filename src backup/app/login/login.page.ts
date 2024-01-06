import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AjaxService } from '../services/ajax.service';
import { CommonService } from '../services/common.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(
    private http: HttpClient,
    private ajaxService: AjaxService,
    private commonService: CommonService,
    public router: Router
  ) {}
  userId: string;
  password: string;
  showPassword: boolean = false;
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  login() {
    if (this.userId && this.password) {
      this.commonService.presentLoader();
      const url =
        'https://mvt.apmkingstrack.com/fleettracking/global/checkAuthenticateDealer';
      const payload = {
        userId: this.userId.trim(),
        password: this.password,
        version: 'v2',
      };

      this.ajaxService.ajaxPostWithBody(url, payload).subscribe((res) => {
        this.commonService.dismissLoader();
        if (res !== undefined) {
          if (res.message == 'Invalid User') {
            this.commonService.showConfirm('Invalid Username And Password');
          } else {
            this.commonService.presentLoader();
            this.commonService.updateLogo(res);
            localStorage.setItem('userId', res.userId);
            localStorage.setItem('password', res.password);
            this.router.navigateByUrl('main-menu');
            this.commonService.dismissLoader();
          }
        }
      });
    } else {
      this.commonService.presentToast(
        'Please Enter Both Username And Password.'
      );
    }
  }
  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    if (this.userId) {
      this.commonService.presentLoader();
      this.router.navigateByUrl('/main-menu');
      this.commonService.dismissLoader();
    }
  }
  ionViewWillEnter() {
    this.userId = '';
    this.password = '';
  }
}
