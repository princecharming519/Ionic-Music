import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'page-terms',
  templateUrl: 'terms.html'
})
export class TermsPage {
    url : any;
    constructor(private sanitize: DomSanitizer) { 
        this.url = sanitize.bypassSecurityTrustResourceUrl("http://max1023.fm/terms-of-use");
    }
}
