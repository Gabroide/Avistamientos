import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddBirdPage } from './add-bird';

@NgModule({
  declarations: [
    AddBirdPage,
  ],
  imports: [
    IonicPageModule.forChild(AddBirdPage),
  ],
})
export class AddBirdPageModule {}
