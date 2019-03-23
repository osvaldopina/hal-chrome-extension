import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HalRenderComponentModule } from 'hal-render-component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [BrowserModule, HalRenderComponentModule],
  entryComponents: [AppComponent]
})
export class AppModule {

  ngDoBootstrap(app) {
    const componentElement = document.createElement('app-root');
    const preElement = document.body.firstChild;
    document.body.insertBefore(componentElement, preElement);
    app.bootstrap(AppComponent);
    document.body.childNodes[1].remove();
  }

}
