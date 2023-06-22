import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { FormsModule } from '@angular/forms';
import { EmailMainComponent } from './email-main/email-main.component';


@NgModule({
  declarations: [
    AppComponent,
    EmailMainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ApolloModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    apollo: Apollo, httpLink: HttpLink
    ) {
    const link = httpLink.create({
      uri: 'https://cors-anywhere.herokuapp.com/dropmail.me/api/graphql/testeCoodesh',
      method: 'GET'
    });
    apollo.create({
      link: link,
      cache: new InMemoryCache()
    });
  }
}


