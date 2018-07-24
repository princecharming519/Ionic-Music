import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CapitalstationPage} from "../capitalstation/capitalstation";
import { InAppBrowser, InAppBrowserOptions } from "@ionic-native/in-app-browser";
import { CompetitionPage } from '../competition/competition';
import { PrivacyPage } from '../privacy/privacy';
import { PremiumRatePage } from '../premiumrate/premiumrate';
import { ThirdPartyPage } from '../thirdparty/thirdparty';
import { TermsPage } from '../terms/terms';
import { ContactPRPage } from '../contactPR/contactPR';
import { ProvideFeedbackPage } from '../providefeedback/providefeedback';


/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  url: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,private inAppBrowser: InAppBrowser) {
console.log(123);

  }

  openCompetitionPage(){
    this.navCtrl.push(CompetitionPage)
  }

  openPrivacyPage(){
    this.navCtrl.push(PrivacyPage)
  }

  openPremiumratePage(){
    this.navCtrl.push(PremiumRatePage)
  }
  
  openThirdPartyPage(){
    this.navCtrl.push(ThirdPartyPage)
  }

  openTermsPage(){
    this.navCtrl.push(TermsPage)
  }

  openProvideFeedbackPage(){
    this.navCtrl.push(ProvideFeedbackPage)
  }
 
 
  openContactPRPage(){
    this.navCtrl.push(ContactPRPage)
  }
 
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  openSettingStationPage(){
    this.navCtrl.push(CapitalstationPage)
  }

  // openChangeBrandUrl(){
  //   const browser = this.inAppBrowser.create("http://maxfm.thrilliant.com.ng/changebrand", '_blank', 'location=no,toolbar=no');
  //     browser.show()
  // }

  // openPrideFeedBackUrl(){
  //   const browser = this.inAppBrowser.create("http://maxfm.thrilliant.com.ng/feedback",'_blank', 'location=no,toolbar=no');
  //     browser.show()
  // }

  openWebView(url){
    console.log("url is :"+url)
    const browser = this.inAppBrowser.create(url,'_blank', 'location=yes,toolbar=yes');
    browser.show();
  }
}
