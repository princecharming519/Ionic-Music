import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Events } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';
import { ApiService } from '../../services/api-services';
import { RadioService } from '../../services/radio-service';
import { CapitalstationPage } from "../capitalstation/capitalstation";
import { HomePage } from '../home/home';

@Component({
  selector: 'page-popover1',
  templateUrl: 'popover1.html',
})
export class Popover1Page {

  data: any;

  flag_lagos: boolean;
  flag_abuja: boolean;

  flag_changeRegion: any;
  region: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController, public service: ServicesProvider,
    public radioService: RadioService, public apiService: ApiService, public events: Events,
  public radio: RadioService) {



    // this.region = this.navParams.get('region');
    // console.log(this.region);

    this.flag_changeRegion = this.radioService.radioOptions.region;

    // this.flag_lagos = true;
  }

  getRegion() {
    this.service.getRegionData().then((results: any) => {
      //let data = results;
      this.data = results;
      console.log(results);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Popover1Page');
  }

  ionViewWillEnter() {
    //this.getRegion();
  }

  close() {
    this.viewCtrl.dismiss();
  }

  changeRegion() {    
    console.log(this.flag_changeRegion);
    this.radioService.radioOptions.region = this.flag_changeRegion;
    this.viewCtrl.dismiss();  
  }



}
