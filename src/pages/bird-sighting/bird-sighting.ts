import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';

import {Geolocation, GeolocationOptions, Geoposition} from '@ionic-native/geolocation';
import {MainMenuPage} from "../main-menu/main-menu";

import { HttpClient } from "@angular/common/http";
import {BirdDetailsPage} from "../bird-details/bird-details";

/**
 * Generated class for the BirdSightingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

interface BirdResponse {
  status: string
  idAve: string
  place: string
  long: number
  lat: number
}

@IonicPage()
@Component({
  selector: 'page-bird-sighting',
  templateUrl: 'bird-sighting.html',
})
export class BirdSightingPage {

  public birdId;
  public lat;
  public long;
  options: GeolocationOptions;
  currentPos: Geoposition;
  sightingUrl: string = "http://dev.contanimacion.com/birds/public/addSighting/";
  loading: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private geolocation: Geolocation,
    public http: HttpClient,
    public loadingCtrl: LoadingController) {

    this.birdId = navParams.get("birdId");
/*
    this.geolocation.getCurrentPosition().then((resp)=>{
      this.lat = resp.coords.latitude;
      this.long = resp.coords.longitude;
    }).catch((error) => {
      console.log('Error: Se ha obtenido un error en el posicionamiento.');
    });

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      data.coords.latitude;
      data.coords.longitude;
    });*/
  }

  getUserPosition(){
    this.options = {
      enableHighAccuracy: true
    };

    this.geolocation.getCurrentPosition(this.options).then((pos: Geoposition) => {
      this.currentPos = pos;
      this.lat = pos.coords.latitude;
      this.long = pos.coords.longitude;
      console.log("lat:" + this.lat);
      console.log("long: " + this.long);
    }, (error: PositionError) => {
      console.log("Error: " + error.message);
    });
  }

  ionViewDidEnter(){
   this.getUserPosition();
  }

  // POST REQUEST
  saveSightsing(place: string) {
    let birdId;
    this.http.post<BirdResponse>(this.sightingUrl,{
      "idAve": this.birdId,
      "place": place,
      "long": this.long,
      "lat": this.lat })
      .subscribe(
        data => {
          console.log("////////////////");
          console.log("SAVING DATA");
          console.log("Save status: OK");
          console.log("Id del ave: "+ data.idAve);
          console.log("Geolocalización: " + data.lat + ", " + data.long);
          this.navCtrl.push(BirdDetailsPage, {
            birdId: this.birdId
          });
          this.showAlert("Subida de datos", "Nuevo avistamiento guardado");
          this.showLoader();
        },
        err => {
          this.showAlert("KO", "Error en la petición");
          console.log("status: KO");
          console.log("Error en la petición.")
        }
      );
  }

  goHome(){
    this.navCtrl.push(MainMenuPage);
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
      content: 'Saving...'
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
