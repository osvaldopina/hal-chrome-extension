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
    const nodeDoctype = document.implementation.createDocumentType(
      'html', '', '');
    if (document.doctype) {
      document.replaceChild(nodeDoctype, document.doctype);
    } else {
      document.insertBefore(nodeDoctype, document.childNodes[0]);
    }
    const componentElement = document.createElement('app-root');
    const preElement = document.body.firstChild;
    document.body.insertBefore(componentElement, preElement);
    app.bootstrap(AppComponent);
    document.body.childNodes[1].remove();
  }

  checkFont(strFamily) {
    const objDiv = document.createElement('div');

    objDiv.style.fontFamily = strFamily;
    objDiv.appendChild(document.createTextNode('FONT TEST'));

    if (window.getComputedStyle) {
      return window.getComputedStyle(objDiv, null).getPropertyValue('font-family') === strFamily;
    }

    return objDiv.style.fontFamily === strFamily;
  }
}
