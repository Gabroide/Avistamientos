import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BirdSightingPage } from './bird-sighting';

@NgModule({
  declarations: [
    BirdSightingPage,
  ],
  imports: [
    IonicPageModule.forChild(BirdSightingPage),
  ],
})
export class BirdSightingPageModule {}
