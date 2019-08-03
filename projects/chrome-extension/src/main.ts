
import '@webcomponents/custom-elements';
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
      addDocType();
      bootstrapComponent();
      changeBodyMargin();
    }
  }
}, false);


function bootstrapComponent() {
  if (environment.production) {
    enableProdMode();
  }
  getInitialView().then((initialView) => {
    platformBrowserDynamic([{ provide: 'initialView', useValue: initialView}]).bootstrapModule(AppModule)
      .catch((err) => {
        console.log('error bootstraping plugin:' + err);
      });
  });
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

function addDocType() {
  const nodeDoctype = document.implementation.createDocumentType(
    'html',
    '-//W3C//DTD XHTML 1.0 Transitional//EN',
    'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtdd'
  );
  if (document.doctype) {
    document.replaceChild(nodeDoctype, document.doctype);
  } else {
    document.insertBefore(nodeDoctype, document.childNodes[0]);
  }
}

function changeBodyMargin() {
  document.body.style.margin = '0px';
}

function getInitialView(): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    chrome.storage.local.get(['hal-render-view'], (value) => {
      resolve(value['hal-render-view']);
    });
  });
}
