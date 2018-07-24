import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp, ShowInfoPage } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NewsPage, ShowModelPage } from "../pages/news/news";
import { HttpClientModule } from "@angular/common/http";
import { Media, MediaObject } from '@ionic-native/media';
import { RadioService } from "../services/radio-service";
import { HttpModule } from "@angular/http";
import { ApiService } from "../services/api-services";
import { PipesModule } from "../pipes/pipes.module";
import { Push } from "@ionic-native/push";
import { ServicesProvider } from '../providers/services/services';
import { Services } from "@angular/core/src/view";
import { MusicControls } from "@ionic-native/music-controls";
import { SettingsPage } from "../pages/settings/settings";
import { CapitalstationPage } from "../pages/capitalstation/capitalstation";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Popover1Page } from '../pages/popover1/popover1';
import { CompetitionPage } from '../pages/competition/competition';
import { ContactPRPage } from '../pages/contactPR/contactPR';
import { PremiumRatePage } from '../pages/premiumrate/premiumrate';
import { PrivacyPage } from '../pages/privacy/privacy';
import { ProvideFeedbackPage } from '../pages/providefeedback/providefeedback';
import { ThirdPartyPage } from '../pages/thirdparty/thirdparty';
import { TermsPage } from '../pages/terms/terms';
import { OpinionLagosPage } from '../pages/opinionLagos/opinionLagos';
import { OpinionAbujaPage } from '../pages/opinionAbuja/opinionAbuja';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    NewsPage,
    ShowInfoPage,
    ShowModelPage,
    SettingsPage,
    CapitalstationPage,
    Popover1Page,
    CompetitionPage,
    ContactPRPage,
    PremiumRatePage,
    PrivacyPage,
    ProvideFeedbackPage,
    ThirdPartyPage,
    TermsPage,
    OpinionLagosPage,
    OpinionAbujaPage
  ],
  imports: [
    BrowserModule, PipesModule,
    HttpClientModule, HttpModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    NewsPage,
    ShowInfoPage,
    ShowModelPage,
    SettingsPage,
    CapitalstationPage,
    Popover1Page,
    CompetitionPage,
    ContactPRPage,
    PremiumRatePage,
    PrivacyPage,
    ProvideFeedbackPage,
    ThirdPartyPage,
    TermsPage, 
    OpinionLagosPage,
    OpinionAbujaPage
  ],
  providers: [
    StatusBar,

    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }, Media, RadioService, ApiService, Push,
    ServicesProvider, MusicControls, InAppBrowser
  ]
})
export class AppModule {
}
