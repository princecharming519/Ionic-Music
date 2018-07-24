import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'page-contactPRPage',
  templateUrl: 'contactPR.html'
})
export class ContactPRPage {
    url : any;
    constructor(private sanitize: DomSanitizer) { 
        this.url = sanitize.bypassSecurityTrustResourceUrl("https://maxfm.thrilliant.com.ng/changebrand");
    }
}
