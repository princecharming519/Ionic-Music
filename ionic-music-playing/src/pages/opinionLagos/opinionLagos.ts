import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'page-opinionLagos',
  templateUrl: 'opinionLagos.html'
})
export class OpinionLagosPage {
    url : any;
    constructor(private sanitize: DomSanitizer) { 
        this.url = sanitize.bypassSecurityTrustResourceUrl("http://dashboard.maxfm.stream/lagos");
    }
}
