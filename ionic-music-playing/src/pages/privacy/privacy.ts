import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'page-privacy',
  templateUrl: 'privacy.html'
})
export class PrivacyPage {
    url : any;
    constructor(private sanitize: DomSanitizer) { 
        this.url = sanitize.bypassSecurityTrustResourceUrl("https://max1023.fm/privacy-policy");
    }
}
