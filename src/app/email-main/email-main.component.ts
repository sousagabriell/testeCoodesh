import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-email-main',
  templateUrl: './email-main.component.html',
  styleUrls: ['./email-main.component.css']
})
export class EmailMainComponent {
  
  @Input() fromAddr: string = ''
  @Input() headerSubject: string = ''
  @Input() bodyText: string = ''

  constructor() { }
}
