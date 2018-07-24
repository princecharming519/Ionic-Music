import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'page-thirdparty',
  templateUrl: 'thirdparty.html'
})
export class ThirdPartyPage {
    url : any;
    constructor(private sanitize: DomSanitizer) { 
        this.url = sanitize.bypassSecurityTrustResourceUrl("http://max1023.fm/third-party​");
    }
}
