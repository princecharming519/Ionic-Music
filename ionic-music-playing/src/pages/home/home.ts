import {Component, ViewChild} from '@angular/core';
import {NavController, Slides, Events, Nav, ModalController, ViewController, NavParams} from 'ionic-angular';
import {RadioService} from "../../services/radio-service";
import {ApiService} from "../../services/api-services";
import {DomSanitizer} from "@angular/platform-browser";
import {Headers, Http} from "@angular/http";
import {ServicesProvider} from "../../providers/services/services";
import {AboutPage} from "../about/about";
import {NewsPage, ShowModelPage} from "../news/news";
import { CapitalstationPage } from '../capitalstation/capitalstation';
import { trigger, style, state, animate, transition } from '@angular/animations';

@Component({
  selector: 'page-home', animations: [
    trigger(
      'enterAnimation', [
        state('in', style({opacity: 1})),
        transition(':enter', [
          style({opacity: 0}),
          animate('500ms')
        ]),
        transition(':leave', 
          animate(600, style({opacity: 0}))
        )
      ]
    )
  ],
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Nav) nav: Nav
  schedules: any = []
  postData: any = []
  feturedPhoto: any;
  sliderPhoto: any;
  photoPost: any;
  regions:any = [];

  constructor(public http: Http, public navCtrl: NavController, public radioService: RadioService, 
    public apiServices: ApiService, private _sanitizer: DomSanitizer, public service: ServicesProvider, public modalCtrl: ModalController) {
    this.getFeturedPhoto();
    this.getSliderPhoto();
    this.getRegion();
  }

  setMyStyles() {
    let styles = {}
    if(this.radioService.radioOptions.region == 'Lagos'){
      styles = {
        background: '#fb3336',        
      };
    }
    else {
      styles = {
        background: '#222',        
      };
    }
  
    return styles;
  }

  ionViewDidLoad() {
     // this.radioService.getAlbumArt('');
      this.apiServices.getPostData().subscribe(data => {
        console.log(data);
        this.postData = data.json()
      });
      if(this.radioService.isLivePlaying){
        this.radioService.applyCSS()
      }
  }

  getImageUrl(url_) {
    if(url_){
      //console.log(url_);
      let ret = this._sanitizer.bypassSecurityTrustStyle("url(" + url_ + ")");
      //console.log(ret);
      return ret;
    }

  }

  getFeturedPhoto() {
    this.service.getFetured().then((results: any) => {
      let data = results;
      let d = [];
      let i = 0;
      var flag = true;
      var b_flag = true;

      data.posts.forEach(a => {
      if(flag){
          b_flag = true;
          a.attachments.forEach(b => {
            if(b_flag){
              d.push({date: a.date, url: b.url, title: a.title, content:a.content})            
              b_flag = false;
              return;
            }            
          })
          i++;          
        }
        if(i == 5) {
          flag = false;
          return;
        }
      })

      console.log(d);
      this.feturedPhoto = d;
      console.log(results);

    });
  }


  getSliderPhoto() {
    this.service.getSlider().then((results: any) => {
      let data = results;
      let e = [];
      let i= 0;
      var flag = true;

      data.posts.forEach(a => {
        if(flag){
        a.attachments.forEach(b => {
          e.push({url: b.url, title: b.title,content:a.content})
        })
        i++;
      }
      if(i == 5) {
        flag =false;
        return;
      }
      })
      
      console.log(e);
      this.sliderPhoto = e;
      console.log(results);
    });
  }

  getRegion() {
    this.service.getRegionData().then((results: any) => {
      //let data = results;
      this.regions=results;
      console.log(results);
    });
  }

  openFeatured() {
    this.navCtrl.push(NewsPage, {items: "home"})
  }


  openModelPost(post,item) {
    console.log(item)
    let customModal = this.modalCtrl.create(ShowModelPage, {post: post,item:item});
    customModal.present();
  }

  changeRegion(){
    let regionData: any;
    let region = this.radioService.radioOptions.region;
    for(let i = 0; i< this.regions.length; i++){
      if(this.regions[i].region_name.toLowerCase() == region.toLowerCase()){
        if(i == this.regions.length - 1){
          regionData = this.regions[0];
        }else{
          regionData = this.regions[i+1];
        }
      }
    }
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
    console.log("region link : " + region_strem_link);
    console.log("json_url : " + json_url);
    this.apiServices.url = json_url;
    this.apiServices.changeJsonUrl(json_url);
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

