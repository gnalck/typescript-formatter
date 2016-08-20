import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { FormatComponent } from './format.component';

@NgModule({
  imports: [ BrowserModule ],
  declarations: [ AppComponent, FormatComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
