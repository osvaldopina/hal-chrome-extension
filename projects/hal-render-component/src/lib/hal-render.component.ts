import { Component, Input } from '@angular/core';
import { buildHalJsonTree, JsonElementNode, Curies } from 'tree-model';
import { isAmundsenHalForm } from './services/amudsen-hal-form-verifier';

enum CurrentView {
  RAW = 'RAW',
  TREE = 'TREE',
  FORM = 'FORM'
}

@Component({
  selector: 'hrc-hal-render-component',
  templateUrl: './hal-render.component.html',
  styleUrls: ['./hal-render.component.css']
})
export class HalRenderComponent {

  root: JsonElementNode;

  json: string;

  curView: CurrentView;

  init: string;


  @Input()
  initialView: string;

  currentView: CurrentView = null;

  isAmundsenHalForm = false;

  @Input()
  set hal(value: string) {

    if (value && value.length > 0) {
      const jsonValue = JSON.parse(value);
      this.json = value;
      this.root = buildHalJsonTree(jsonValue, new Curies(), true);
      this.expandAll();
      this.isAmundsenHalForm = isAmundsenHalForm(jsonValue);
      if (this.currentView === null) {
        if (this.initialView === CurrentView.FORM && !this.isAmundsenHalForm) {
          this.currentView = CurrentView.TREE;
        } else if (this.initialView === null || this.initialView === undefined) {
          this.currentView = CurrentView.TREE;
        } else {
          this.currentView = CurrentView[this.initialView];
        }
      }
    }
  }

  get hal(): string {
    return this.json;
  }

  expandAll() {
    if (this.root) {
      this.expand(this.root);
    }
  }

  colapseAll() {
    if (this.root) {
      this.colapse(this.root);
    }
  }

  viewTree() {
    this.setView(CurrentView.TREE);
  }

  viewRaw() {
    this.setView(CurrentView.RAW);
  }

  viewForm() {
    this.setView(CurrentView.FORM);
  }

  setView(view: CurrentView) {
    this.currentView = view;
    chrome.storage.local.set({ 'hal-render-view': this.currentView });
  }

  showRawButton(): boolean {
    return this.currentView !== CurrentView.RAW;
  }

  showTreeButton(): boolean {
    return this.currentView !== CurrentView.TREE;
  }

  showFormButton(): boolean {
    return this.currentView !== CurrentView.FORM && this.isAmundsenHalForm;
  }

  isCurrentViewTree() {
    return this.currentView === CurrentView.TREE;
  }

  isCurrentViewRaw() {
    return this.currentView === CurrentView.RAW;
  }

  isCurrentViewForm() {
    return this.currentView === CurrentView.FORM;
  }

  versionFromChromeManifest() {
    if (chrome && chrome.runtime && chrome.runtime.getManifest) {
      return chrome.runtime.getManifest().version;
    } else {
      return '(not running as chrome plugin!)';
    }
  }

  expand(node: JsonElementNode) {
    node.expanded = true;
    node.children.forEach((item) => { this.expand(item); });
  }

  colapse(node: JsonElementNode) {
    node.expanded = false;
    node.children.forEach((item) => { this.colapse(item); });
  }

}
