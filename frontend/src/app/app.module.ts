import {BrowserModule} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms'
import {AppComponent} from './app.component';
import {LettersApiService} from './components/deadletters/letters-api.service';
import { DeadlettertableComponent } from './components/deadlettertable/deadlettertable.component';

@NgModule({
  declarations: [
    AppComponent,
    DeadlettertableComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [LettersApiService],
    bootstrap: [AppComponent]
})
export class AppModule { }
