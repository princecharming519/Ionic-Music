import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'page-providefeedback',
  templateUrl: 'providefeedback.html'
})
export class ProvideFeedbackPage {
    url : any;
    constructor(private sanitize: DomSanitizer) { 
        this.url = sanitize.bypassSecurityTrustResourceUrl("http://maxfm.thrilliant.com.ng/feedback");
    }
}
