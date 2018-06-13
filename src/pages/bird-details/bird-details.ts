import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';

import { BirdSightingPage} from "../bird-sighting/bird-sighting";

import { BirdsProvider } from "../../providers/birds/birds";
import {MainMenuPage} from "../main-menu/main-menu";
import { HttpClient } from "@angular/common/http";

/**
 * Generated class for the BirdDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bird-details',
  templateUrl: 'bird-details.html',
})
export class BirdDetailsPage {

  loading: any;
  getBirdIdUrl: string = "http://dev.contanimacion.com/birds/public/getBirdDetails/";
  bird;
  imageOfBird;
  nameOfBird;
  descriptionOfBird;
  sightingsOfBird;
  public birdId;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private birdsProvider: BirdsProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public http: HttpClient) {

    this.birdId = navParams.get("birdId");
    this.getBird();

  }

  getBird() {
    this.showLoader();
    this.http.get<any[]>(this.getBirdIdUrl + this.birdId)
      .subscribe((data) => {
          this.bird = data;
          data.forEach(bird =>{
            this.imageOfBird = bird.bird_image;
            this.nameOfBird = bird.bird_name;
            this.descriptionOfBird = bird.bird_description;
            this.sightingsOfBird = bird.sightings;
            this.loading.dismiss();
        })
        },
        err => {
          this.loading.dismiss();
          console.log("Status: KO");
          console.log("Error en la petición.");
          this.showAlert("KO", "Error en la petición.");
        });
  }

  sighting(id: number){
    this.showAlert("Nuevo AVISTAMIENTO", "Se va a introducir un nuevo avistamiento");
    this.navCtrl.push(BirdSightingPage, {
      birdId: this.birdId
    });
  }

  goHome(){
    this.navCtrl.push(MainMenuPage);
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
