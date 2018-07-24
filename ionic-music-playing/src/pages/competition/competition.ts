import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'page-competition',
  templateUrl: 'competition.html'
})
export class CompetitionPage {
    url : any;
    constructor(private sanitize: DomSanitizer) { 
        this.url = sanitize.bypassSecurityTrustResourceUrl("http://max1023.fm/competition-terms");
    }
}
