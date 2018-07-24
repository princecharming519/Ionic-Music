import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'page-premiumrate',
  templateUrl: 'premiumrate.html'
})
export class PremiumRatePage {
    url : any;
    constructor(private sanitize: DomSanitizer) { 
        this.url = sanitize.bypassSecurityTrustResourceUrl("http://max1023.fm/premium-rate");
    }
}
