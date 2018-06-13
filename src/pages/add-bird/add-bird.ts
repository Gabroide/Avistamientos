import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {MainMenuPage} from "../main-menu/main-menu";
import {BirdDetailsPage} from "../bird-details/bird-details";
import {BirdsListPage} from "../birds-list/birds-list";

/**
 * Generated class for the AddBirdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

interface AddResponse {
  idUser: number,
  bird_name: string,
  bird_description: string,
  place: string,
}

@IonicPage()
@Component({
  selector: 'page-add-bird',
  templateUrl: 'add-bird.html',
})
export class AddBirdPage {

  addUrl: string = "http://dev.contanimacion.com/birds/public/addBird/";
  idUser: number;
  public place;
  public sighted: boolean;
  loading: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private http: HttpClient) {

    //this.showContent();

  }

  /*showContent() {
    let element = document.getElementById("content");
    let check = document.getElementById("check");
    if (this.sighted){
      element.style.display='block';
    }
    else {
      element.style.display='none';
    }
  }*/


  // POST REQUEST
  sendBird(bird_name: string, bird_description: string){
    this.showLoader();
    let sighPlace;
    if(this.sighted){
      sighPlace = this.place;
    } else{
      sighPlace = "none"
    }
    this.http.post<AddResponse>(this.addUrl,{
      "idUser": this.idUser,
      "bird_name": bird_name,
      "bird_description": bird_description,
      "place": sighPlace,
      })
      .subscribe(
        data => {
          console.log("////////////////");
          console.log("SAVING DATA");
          console.log("Save status: true");
          this.loading.dismiss();
          this.showAlert("NUEVA AVE", "Se ha añadoido una nueva ave: " + bird_name);
          this.navCtrl.push(BirdsListPage, {
            userId: this.idUser,
          });
        },
        err => {
          this.loading.dismiss();
          this.showAlert("KO", "Error en la petición.");
          console.log("Status: KO");
          console.log("Error en la petición.")
        }
      );
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
      content: 'Saving data...'
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
