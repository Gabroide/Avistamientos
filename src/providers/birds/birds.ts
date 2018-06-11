import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';


/*
  Generated class for the BirdsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class BirdsProvider {

  getBirdsUrl: string = "http://dev.contanimacion.com/birds/public/getBirds/";
  //getBirdIdUrl: string = "http://dev.contanimacion.com/birds/public/getBirdDetails/";

  constructor(public http: HttpClient) {
  }


  // GET REQUEST
  getBirds(idUser:number) {
    console.log("Serving back birds");
    return this.http.get<any[]>(this.getBirdsUrl+idUser);
  }

  /*getBird(idBird:number) {
    console.log("Serving back bird with id: " + idBird);
    return this.http.get<any[]>(this.getBirdIdUrl+idBird);
  }*/
}
