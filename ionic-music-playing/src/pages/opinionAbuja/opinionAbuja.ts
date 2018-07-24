import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'page-opinions',
  templateUrl: 'opinionAbuja.html'
})
export class OpinionAbujaPage {
    url : any;
    constructor(private sanitize: DomSanitizer) { 
        this.url = sanitize.bypassSecurityTrustResourceUrl("http://dashboard.maxfm.stream/abuja");
    }
}
