import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";

import{ BirdsProvider } from "../../providers/birds/birds";
import {BirdDetailsPage} from "../bird-details/bird-details";
import {of} from "rxjs/observable/of";
import {LoginPage} from "../login/login";

/**
 * Generated class for the BirdsListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-birds-list',
  templateUrl: 'birds-list.html',
})
export class BirdsListPage {

  public idUser;
  aves: any[] = [];
  loading: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private birdsProvider: BirdsProvider) {

    this.getBirdsProvider();
    this.idUser = navParams.get("idUser");

  }

  getBirdsProvider(){
    this.showLoader();
    console.log("////////////////////////");
    console.log("Reciving birds.");
    this.birdsProvider.getBirds(this.idUser).subscribe(
      (data) => {
        this.aves = data;
        this.loading.dismiss();
        },
      (error) => {
        this.loading.dismiss();
        this.showAlert("KO", "Error en la petición");
        console.log("Status: KO");
        console.log("Error en la petición.");
      }
    )
  }

  birdDetail(id: number, ave: string){
    this.showAlert("DETALLES AVE", "Se ha pedido mostrar el ave: " + ave);

    this.navCtrl.push(BirdDetailsPage, {
       birdId: id
    });
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
      content: 'Updating...'
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
