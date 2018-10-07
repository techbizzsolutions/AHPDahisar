import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-party-details',
  templateUrl: 'party-details.html',
})
export class PartyDetailsPage {
  data:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PartyDetailsPage',this.navParams.data);
    this.data= this.navParams.data;
  }

}
