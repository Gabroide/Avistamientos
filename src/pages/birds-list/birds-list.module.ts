import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BirdsListPage } from './birds-list';

@NgModule({
  declarations: [
    BirdsListPage,
  ],
  imports: [
    IonicPageModule.forChild(BirdsListPage),
  ],
})
export class BirdsListPageModule {}
