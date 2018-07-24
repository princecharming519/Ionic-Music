import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ServicesProvider} from "../../providers/services/services";
import { RadioService } from '../../services/radio-service';
import { ApiService } from '../../services/api-services';
import { MyApp } from '../../app/app.component';

/**
 * Generated class for the CapitalstationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-capitalstation',
  templateUrl: 'capitalstation.html',
})
export class CapitalstationPage {
  data:any
  relationship:any
  flag:boolean = false;
  title:string = 'Change Capital Station';

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public service: ServicesProvider, public radioService: RadioService,
              public apiService: ApiService) {
    this.getRegion();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CapitalstationPage');
  }

  getRegion() {
    this.service.getRegionData().then((results: any) => {
      //let data = results;
      this.data=results;
      console.log(results);
    });
  }

  changeRegion(regionData){
    let json_url = regionData.json_url;
    let lastSlash = json_url.lastIndexOf('/');
    let region_strem_link = '';
    let region_standard_stream_link = '';
    if(lastSlash == json_url.length - 1){
       json_url = regionData.json_url.substr(0, lastSlash);
    }
    let audioUrl = regionData.region_stream_link.split('/');
    if(audioUrl[audioUrl.length -1] == 'stream'){
      region_strem_link = regionData.region_stream_link.substr(0, regionData.region_stream_link.lastIndexOf('/')+1);
    }
    let lofiUrl = regionData.region_standard_stream_link.split('/');  
    if(audioUrl[audioUrl.length -1] == 'stream'){
      region_standard_stream_link = regionData.region_standard_stream_link.substr(0, regionData.region_standard_stream_link.lastIndexOf('/')+1);
    } 
    console.log("region link : "+region_strem_link);
    console.log("json_url : "+json_url);
    this.apiService.url = json_url;
    this.apiService.changeJsonUrl(json_url);
    this.service.url = json_url;
    this.radioService.url = region_strem_link;
    this.radioService.lowFiUrl = region_standard_stream_link;
    this.radioService.radioOptions.region = regionData.region_name;
    
    if(this.radioService.isPlaying){
      this.radioService.pauseAudio();
      if(this.radioService.radioOptions.dataSaver){
        this.radioService.file.src = region_standard_stream_link+"stream";
      }else{
        this.radioService.file.src = region_strem_link+"stream";
      }
      this.radioService.playAudio(true);
    }else{
      if(this.radioService.radioOptions.dataSaver){
        this.radioService.file.src = region_standard_stream_link+"stream";
      }else{
        this.radioService.file.src = region_strem_link+"stream";
      }
    }
    this.radioService.getStreamInfo(region_strem_link);
  }
}
