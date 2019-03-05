import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HalRenderComponentModule } from '../../projects/hal-render-component-library/src/lib/hal-render-component.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HalRenderComponentModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
