import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController, Events, PopoverController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SettingsPage } from "../settings/settings";
import { AboutPage } from '../about/about';
import { NewsPage, ShowModelPage } from "../news/news";
import { RadioService } from '../../services/radio-service';
import { ApiService } from '../../services/api-services';
import { Popover1Page } from '../popover1/popover1';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {

  flag_datasaver: boolean;

  isPlaying: boolean;
  region: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController, public inApp: InAppBrowser,
    private alertController: AlertController, public events: Events,
    public radioService: RadioService, public apiService: ApiService,
    public popoverCtrl: PopoverController) {
    this.isPlaying = radioService.isPlaying;

    this.region = this.navParams.get('region');
    console.log(this.region);

    this.events.subscribe('change:toggle', (val) => {

      // user and time are the same arguments passed in `events.publish(user, time)`
      console.log("Called..", val);
      this.close();
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverPage');
  }

  close() {
    let val = "POPOVER";

    this.events.publish('change:toggle11', val);
    this.viewCtrl.dismiss();
  }

  // openAlert() {

  //   this.viewCtrl.dismiss().then(() => {
  //     let opentoAlert = this.alertController.create({
  //       title: "Select the region",
  //       inputs: [
  //         {
  //           type: 'radio',
  //           label: 'Lagos',
  //           value: 'lagos',
  //           checked: true
  //         },
  //         {
  //           type: 'radio',
  //           label: 'Abuja',
  //           value: 'abuja'
  //         },
  //       ],
  //       buttons: [
  //         {
  //           text: 'Cancel',
  //           role: 'cancel',
  //           handler: data => {
  //             console.log('Cancel clicked');
  //           }
  //         },
  //         {
  //           text: 'Select',
  //           handler: data => {
  //             console.log('select clicked. Data -> ' + JSON.stringify(data));

  //             this.selectRegion(data);
  //           }
  //         }
  //       ]
  //     });
  //     opentoAlert.present();
  //   });
  // }

  // selectRegion(seldata) {
  //   console.log('test Data -> ' + JSON.stringify(seldata));
  // }

  openAboutPage() {
    this.viewCtrl.dismiss().then(() => {
      this.navCtrl.setRoot(AboutPage);
    });
  }

  openNewsPage() {
    this.viewCtrl.dismiss().then(() => {
      this.navCtrl.setRoot(NewsPage);
    });
  }

  openSettingsPage() {
    this.viewCtrl.dismiss().then(() => {
      this.navCtrl.setRoot(SettingsPage);
    });
  }

  openWebView() {
    this.viewCtrl.dismiss().then(() => {
      const browser = this.inApp.create("http://maxfm.thrilliant.com.ng/opinion", '_blank', 'location=no,toolbar=no');
    });
  }





  changeLowStreaming() {
    console.log("DS: " + this.flag_datasaver);
    this.events.publish('toggle', this.flag_datasaver);
  }


  presentPopover1(event) {
    let popover = this.popoverCtrl.create(Popover1Page, { region: this.region });
    popover.present({ ev: event });
    popover.onDidDismiss(() => {
      // Navigate to new page.  Popover should be gone at this point completely
      this.viewCtrl.dismiss();
    });
  }


}
