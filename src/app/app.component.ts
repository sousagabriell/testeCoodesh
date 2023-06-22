import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServiceService } from './service.service';
import { interval, Subject } from 'rxjs';
import { takeWhile, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  domains: any;
  token: string = "";
  emails: any;
  counter: number = 0;
  intervalId: any;
  fromAddr: string = "";
  headerSubject: string = ""
  text: string = ""
  

  private destroy$ = new Subject<void>(); 

  constructor(
    private service: ServiceService
    ) { }

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.counter = (this.counter + 1) % 16;
    }, 1000);
    this.retrieveDataFromLocalStorage(); 
    if (!this.token) {
      this.getDomains();
    } else {
      this.startEmailLoop(); 
    }
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
        clearInterval(this.intervalId);
  }

  getDomains() {
    this.service.introduceSession().subscribe(response => {
      this.domains = response.data.introduceSession.addresses[0].address;
      this.token = response.data.introduceSession.id;
      this.saveDataToLocalStorage();
      this.startEmailLoop();
    });
  }

  startEmailLoop() {
    interval(16000)
      .pipe(
        takeWhile(() => !this.destroy$.closed),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.getEmails(this.token);
      });
  }

  startCounter() {
    this.intervalId = setInterval(() => {
      this.counter = (this.counter + 1) % 16;
    }, 1000);
  }
  
  chengeEmail(){
    this.emails = []
    this.getDomains()
    this.fromAddr = ""
    this.headerSubject = ""
    this.text = ""
  }

  getEmails(token: string) {  
    this.service.getSessionDetails(token).subscribe(
      (resp: any) => {
        this.emails = resp.data.session.mails;
        // console.log(this.emails);
        this.saveDataToLocalStorage();
      },
      (error) => {
        if (error.message === 'ApolloError: session_not_found') {
          this.getDomains();
          alert('O email foi expirado clique em ok para gerar outro.');
        }
      },
    );
    
  }
  
  copyText() {
    const inputElement = document.createElement('input');
    inputElement.value = this.domains;
    document.body.appendChild(inputElement);
    inputElement.select();
    document.execCommand('copy');
    document.body.removeChild(inputElement);
  }

  saveDataToLocalStorage() {
    localStorage.setItem('appData', JSON.stringify({
      domains: this.domains,
      token: this.token,
      emails: this.emails
    }));
  }
  
  retrieveDataFromLocalStorage(): void {
    const savedData = localStorage.getItem('appData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      this.domains = parsedData.domains;
      this.token = parsedData.token;
      this.emails = parsedData.emails;
    } else {
      this.domains = '';
      this.token = '';
      this.emails = [];
    }
  }
  

  insertEmailMain(fromAddr: string, headerSubject: string, text:string){
    this.fromAddr = fromAddr
    this.headerSubject = headerSubject
    this.text = text
  }
}
