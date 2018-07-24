import {Component, ViewChild} from '@angular/core';
import {Platform, NavController, Nav, ModalController, ViewController, Events, AlertController, PopoverController, MenuController} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {HomePage} from "../pages/home/home";
import {NewsPage} from "../pages/news/news";
import {AboutPage} from "../pages/about/about";
import {ContactPage} from "../pages/contact/contact";
import {Media, MediaObject} from '@ionic-native/media';
import {RadioService} from "../services/radio-service";
import {ApiService} from "../services/api-services";
import {PushOptions, Push, PushObject} from "@ionic-native/push";
import {SettingsPage} from "../pages/settings/settings";
import {CapitalstationPage} from "../pages/capitalstation/capitalstation";
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Popover1Page } from '../pages/popover1/popover1';
import { OpinionAbujaPage } from '../pages/opinionAbuja/opinionAbuja';
import { OpinionLagosPage } from '../pages/opinionLagos/opinionLagos';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  contactpage: any = ContactPage;
    @ViewChild(Nav) nav: Nav
  rootPage: any = HomePage;
  homePage: any = HomePage;
  newspage: any = NewsPage;
  aboutpage: any = AboutPage;
  settingspage:any=SettingsPage;
  capitalstation:any=CapitalstationPage;
  buttonColor: string = '#122851';
  pageName:any='HomePage';
  regions:any = [];

  lo_fi:boolean = false

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private push: Push,
              private media: Media, public inApp: InAppBrowser, private alertController:AlertController,
              public menuCtrl: MenuController, 
              public radioService:RadioService, public popoverCtrl: PopoverController,
              public apiService:ApiService,public modalCtrl:ModalController,private apiServices: ApiService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
   //   this.initPush()
      statusBar.styleDefault();
      splashScreen.hide();
    });

  }

  iconMenu = {
    theme: 'ios',
    type: 'hamburger'
  };


  presentPopover(event) {
    let popover = this.popoverCtrl.create(Popover1Page);
    popover.present({ ev: event });
    popover.onDidDismiss(() => {
      // Navigate to new page.  Popover should be gone at this point completely
      //this.viewCtrl.dismiss();
      this.nav.setRoot(HomePage);
      this.menuCtrl.close();
    });
  }

  
  openPage(page) {
    console.log(page);
    this.nav.setRoot(page).then(()=>{
      this.pageName= this.nav.getActive().name
    })
  }

  openWebView(){
    
    if(this.radioService.radioOptions.region == 'Lagos'){
      this.nav.push(OpinionLagosPage)
    } else {
      this.nav.push(OpinionAbujaPage)
    }
  }

  initPush(){
    // to check if we have permission
    this.push.hasPermission()
      .then((res: any) => {

        if (res.isEnabled) {
          console.log('We have permission to send push notifications');
        } else {
          console.log('We do not have permission to send push notifications');
        }

      });


// to initialize push notifications

    const options: PushOptions = {
      android: {},
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
      },
      windows: {},
      browser: {
        pushServiceURL: 'http://push.api.phonegap.com/v1/push'
      }
    };

    const pushObject: PushObject = this.push.init(options);


    pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));

    pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));

  }

  addEvent(id){
    document.getElementById('1').style.backgroundColor='transparent';
    document.getElementById('2').style.backgroundColor='transparent';
    document.getElementById('3').style.backgroundColor='transparent';
    document.getElementById('4').style.backgroundColor='transparent';
    document.getElementById(id).style.backgroundColor='#fe332d';

  }

  openModel(){
    let customModal = this.modalCtrl.create(ShowInfoPage,{},{showBackdrop: true, enableBackdropDismiss: true});
    customModal.present();
  }

  changeLowStreaming(){
    if(this.lo_fi){
      console.log(this.radioService.lowFiUrl+"stream");
      this.radioService.radioOptions.datasaver = true;
      if(this.radioService.isPlaying){
        this.radioService.pauseAudio();
        this.radioService.file.src = this.radioService.lowFiUrl+"stream";
        this.radioService.playAudio(true);
      }else{
        this.radioService.file.src = this.radioService.lowFiUrl+"stream";
      }
    }else{
      this.radioService.radioOptions.datasaver = false;
      console.log(this.radioService.url+"stream");
      if(this.radioService.isPlaying){
        this.radioService.pauseAudio();
        this.radioService.file.src = this.radioService.url+"stream";
        this.radioService.playAudio(true);
      }else{
        this.radioService.file.src = this.radioService.url+"stream";
      }
    }
  }
}


@Component({
  selector: 'page-showInfo',
  templateUrl:'showInfo.html',
})

export class ShowInfoPage {
  schedules:any=[];
  showTitle:string=''
  startTime:string=''
  endTime:string=''
  constructor(public viewCtrl: ViewController,public apiServices:ApiService,public radioService:RadioService) {
  }
  ionViewDidLoad() {
    console.log(1234);
    this.schedules=this.apiServices.scheduleData;
    console.log(this.schedules);

  }

  public dismiss() {
    this.viewCtrl.dismiss();
  }
}
