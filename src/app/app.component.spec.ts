import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ServiceService } from './service.service';
import { EmailMainComponent } from './email-main/email-main.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let service: ServiceService;

  beforeEach(async () => await TestBed.configureTestingModule({
    imports: [RouterTestingModule, ApolloTestingModule, FormsModule],
    declarations: [AppComponent, EmailMainComponent],
    providers: [ServiceService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ServiceService);
    fixture.detectChanges();
  });


  afterEach(() => {
    localStorage.clear();
    component.ngOnDestroy();
  });


  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'testeCoodesh'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
  });

  describe('getDomains', () => {
    it('should fetch domains and token', () => {
      const response = {
        data: {
          introduceSession: {
            addresses: [{ address: 'example@domain.com' }],
            id: 'token123'
          }
        }
      };
      jest.spyOn(service, 'introduceSession').mockReturnValue(of(response));
      component.getDomains();
      expect(service.introduceSession).toHaveBeenCalled();
      expect(component.domains).toEqual('example@domain.com');
      expect(component.token).toEqual('token123');
    });
  });

  // describe('startEmailLoop', () => {
  //   it('should start email loop', () => {
  //     jest.spyOn(component, 'getEmails');

  //     component.startEmailLoop();

  //     expect(component.getEmails).toHaveBeenCalled();
  //   });
  // });


  it('should fetch emails successfully', () => {
    const mockResponse = { data: { session: { mails: ['email1', 'email2'] } } };
    jest.spyOn(service, 'getSessionDetails').mockReturnValue(of(mockResponse));

    component.getEmails('mockToken');
    expect(component.emails).toEqual(['email1', 'email2']);
  });

  window.alert = jest.fn();

  it('should handle session not found error', () => {
    jest.spyOn(service, 'getSessionDetails').mockReturnValue(
      throwError({ message: 'ApolloError: session_not_found' })
    );
    jest.spyOn(component, 'getDomains');
    jest.spyOn(window, 'alert');

    component.getEmails('mockToken');

    expect(component.getDomains).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith(
      'O email foi expirado clique em ok para gerar outro.'
    );
  });

  describe('chengeEmail', () => {
    it('should clear emails array and reset properties', () => {
      component.emails = ['email1', 'email2'];
      component.fromAddr = 'from@example.com';
      component.headerSubject = 'Example Email';
      component.text = 'This is an example email.';

      component.chengeEmail();

      expect(component.emails).toEqual([]);
      expect(component.fromAddr).toEqual('');
      expect(component.headerSubject).toEqual('');
      expect(component.text).toEqual('');
    });
  });

  // it('should copy text to clipboard', () => {
  //   const inputElement = document.createElement('input');
  //   inputElement.value = 'Sample Text';
  //   jest.spyOn(document, 'createElement').mockReturnValue(inputElement);
  //   const selectSpy = jest.spyOn(inputElement, 'select');
  //   jest.replaceProperty(document, 'execCommand', jest.fn());
  //   const alertSpy = jest.spyOn(window, 'alert');

  //   component.copyText();

  //   expect(document.createElement).toHaveBeenCalledWith('input');
  //   expect(selectSpy).toHaveBeenCalled();
  //   expect(document.execCommand).toHaveBeenCalledWith('copy');
  //   expect(alertSpy).not.toHaveBeenCalled();
  //   expect(document.body.removeChild).toHaveBeenCalledWith(inputElement);
  // });


  it('should save data to local storage', () => {
    component.domains = 'example.com';
    component.token = 'abc123';
    component.emails = ['email1@example.com', 'email2@example.com'];

    component.saveDataToLocalStorage();

    const savedData = localStorage.getItem('appData');
    if (savedData !== null) {
      const parsedData = JSON.parse(savedData);
      // Rest of the test logic
    } else {
      fail('Failed to retrieve data from local storage');
    }
  });

  describe('retrieveDataFromLocalStorage', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it('should retrieve data from local storage', () => {
      const testData = {
        domains: 'example.com',
        token: 'abc123',
        emails: ['email1@example.com', 'email2@example.com'],
      };
      localStorage.setItem('appData', JSON.stringify(testData));

      component.retrieveDataFromLocalStorage();

      expect(component.domains).toBe('example.com');
      expect(component.token).toBe('abc123');
      expect(component.emails).toEqual(['email1@example.com', 'email2@example.com']);
    });

    it('should set properties to default values if data is not found in local storage', () => {
      component.retrieveDataFromLocalStorage();

      expect(component.domains).toBe('');
      expect(component.token).toBe('');
      expect(component.emails).toEqual([]);
    });
  });

  it('should set the properties correctly', () => {
    const fromAddr = 'test@example.com';
    const headerSubject = 'Test Email';
    const text = 'This is a test email';

    component.insertEmailMain(fromAddr, headerSubject, text);

    expect(component.fromAddr).toBe(fromAddr);
    expect(component.headerSubject).toBe(headerSubject);
    expect(component.text).toBe(text);
  });

});