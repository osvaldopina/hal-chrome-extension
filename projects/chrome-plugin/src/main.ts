// import 'core-js/es6/reflect';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

document.addEventListener('DOMContentLoaded', () => {

  if (halJsonPage()) {
    const json = getJson();
    if (json) {
      bootstrapComponent();
    }
  }

}, false);


function bootstrapComponent() {

  if (environment.production) {
    enableProdMode();
  }
  platformBrowserDynamic().bootstrapModule(AppModule).catch((err) => { console.log('error bootstraping plugin:' + err); });

}

function halJsonPage() {
  if (isJsonPage()) {
    const json = getJson();
    if (json && json['_links']) {
      return true;
    }
  }
  return false;
}

function isJsonPage() {

  return documentHasOnlyHtmlWithHeadAndBody() && bodyHasOnlyPre();

}

function documentHasOnlyHtmlWithHeadAndBody() {

  return document.children.length === 1 && document.childNodes[0].nodeName.toUpperCase() === 'HTML' &&
    document.children[0].children.length === 2 &&
    document.children[0].childNodes[0].nodeName.toUpperCase() === 'HEAD' &&
    document.children[0].childNodes[1].nodeName.toUpperCase() === 'BODY';

}

function bodyHasOnlyPre() {
  return document.body.children.length === 1 &&
    document.body.childNodes[0].nodeName.toLocaleUpperCase() === 'PRE';
}

function getJson() {

  try {
    return JSON.parse(document.body.firstChild.textContent);
  } catch (err) {
    return null;
  }

}
