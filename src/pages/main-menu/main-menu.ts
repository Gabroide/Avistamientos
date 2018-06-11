import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {BirdsListPage} from "../birds-list/birds-list";
import {AddBirdPage} from "../add-bird/add-bird";
import {InfoPage} from "../info/info";
import {HttpClient} from "@angular/common/http";
import {LoginPage} from "../login/login";

/**
 * Generated class for the MainMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main-menu',
  templateUrl: 'main-menu.html',
})
export class MainMenuPage {

  loading: any;
  public userId;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {

  }

  birdsList(){
    this.navCtrl.push(BirdsListPage, {
      idUser: this.userId,
    });
  }

  addBird(){
    this.navCtrl.push(AddBirdPage);
  }

  info(){
    this.navCtrl.push(InfoPage);
  }

  logout(){
    this.showAlert("¡ATENCIÓN!", "Va a cerrar su sesión.");
    this.showLoader();
    this.navCtrl.push(LoginPage);

  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
      content: 'Exiting...'
    });

    this.loading.present();
  }

  showAlert(msg, subt){
    let alert = this.alertCtrl.create({
      title: subt,
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }
}
