import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BirdDetailsPage } from './bird-details';

@NgModule({
  declarations: [
    BirdDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(BirdDetailsPage),
  ],
})
export class BirdDetailsPageModule {}
