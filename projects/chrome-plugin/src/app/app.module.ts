import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HalRenderComponent } from 'projects/hal-render-component-library/src/projects';
import { HalRenderComponentModule } from 'projects/hal-render-component-library/src/lib/hal-render-component.module';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
// import { HalRenderComponent } from 'projects/hal-render-component-library/src/lib/hal-render.component';

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
