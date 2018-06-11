import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';

import { HttpClient, HttpHeaders} from "@angular/common/http";
import {MainMenuPage} from "../main-menu/main-menu";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

interface LoginResponse {
  status: string
  id: string
}

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage{

  loginUrl: string = "http://dev.contanimacion.com/birds/public/login/";
  loading: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) {}

  // POST REQUEST
  login(user:string,password:string) {
    let id;
    let loginStatus;
    this.showLoader();

    this.http.post<LoginResponse>(this.loginUrl,{"user": user, "password": password})
      .subscribe(
        data => {
          console.log("////////////////");
          console.log("LOGIN");
          console.log("Login status: " + data.status);
          console.log("Id del usuario: "+ data.id);
          id = data.id;
          loginStatus = data.status;
          },
        err => {
            console.log("////////////////");
            console.log("ERROR LOGIN");
            console.log("Login status: KO");
            console.log("Usuario o contraseña no válidos");
            }
      );

    if(loginStatus = "OK"){
      this.loading.dismiss();
      this.showAlert("LOGIN", "Bienvenido " + user + password);
      this.presentToast("Login: " + loginStatus);
      this.navCtrl.push(MainMenuPage, {
      userId: id,
      });
    } else {
      this.loading.dismiss();
      this.showAlert("KO", "Usuario o contraseña no válidos.")
      this.presentToast("Login: " + loginStatus);
      }
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });

    this.loading.present();
  }

  showAlert(tit, msg){
    let alert = this.alertCtrl.create({
      title: tit,
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
}
