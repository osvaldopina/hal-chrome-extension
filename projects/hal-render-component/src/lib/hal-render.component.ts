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

  json: String;

  currentView = CurrentView.TREE;

  isAmudsenHalForm = false;

  @Input()
  set hal(value: string) {

    if (value && value.length > 0) {
      const jsonValue = JSON.parse(value);
      this.json = value;
      this.root = buildHalJsonTree(jsonValue, new Curies(), true);
      this.expandAll();
      this.isAmudsenHalForm = isAmundsenHalForm(jsonValue);
      this.currentView = CurrentView.TREE;
    }
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
    this.currentView = CurrentView.TREE;
  }

  viewRaw() {
    this.currentView = CurrentView.RAW;
  }

  viewForm() {
    this.currentView = CurrentView.FORM;
  }

  showRawButton(): boolean {
    return  this.currentView !== CurrentView.RAW;
  }

  showTreeButton(): boolean {
    return this.currentView !== CurrentView.TREE;
  }

  showFormButton(): boolean {
    return this.currentView !== CurrentView.FORM && this.isAmudsenHalForm;
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
