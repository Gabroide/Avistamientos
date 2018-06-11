import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule} from "@angular/common/http";

import { MyApp } from './app.component';
import { LoginPage } from "../pages/login/login";
import { MainMenuPage } from "../pages/main-menu/main-menu";
import { BirdsListPage } from "../pages/birds-list/birds-list";
import { AddBirdPage } from "../pages/add-bird/add-bird";
import {InfoPage } from "../pages/info/info";
import { BirdDetailsPage } from "../pages/bird-details/bird-details";
import { BirdSightingPage} from "../pages/bird-sighting/bird-sighting";

import { BirdsProvider } from '../providers/birds/birds';

import { Geolocation } from '@ionic-native/geolocation';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    MainMenuPage,
    BirdsListPage,
    AddBirdPage,
    InfoPage,
    BirdDetailsPage,
    BirdSightingPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    MainMenuPage,
    BirdsListPage,
    AddBirdPage,
    InfoPage,
    BirdDetailsPage,
    BirdSightingPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BirdsProvider,
    Geolocation
  ]
})
export class AppModule {}
