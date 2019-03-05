import { Component, Input } from '@angular/core';
import { buildHalJsonTree, JsonElementNode } from './tree-model/tree-model';

enum CurrentView {
  RAW,
  TREE
}

@Component({
  selector: 'hrc-hal-render-component',
  templateUrl: './hal-render.component.html',
  styles: []
})
export class HalRenderComponent {

  root: JsonElementNode;

  json: String;

  currentView = CurrentView.TREE;

  @Input()
  set hal(value: string) {

    if (value && value.length > 0) {
      this.json = value;
      this.root = buildHalJsonTree(JSON.parse(value));
      this.expandAll();
    }
  }

  public expandAll() {
    if (this.root) {
      this.expand(this.root);
    }
  }

  public colapseAll() {
    if (this.root) {
      this.colapse(this.root);
    }
  }

  public viewTree() {
    this.currentView = CurrentView.TREE;
  }

  public viewRaw() {
    this.currentView = CurrentView.RAW;
  }

  public isCurrentViewTree() {
    return this.currentView === CurrentView.TREE;
  }

  public isCurrentViewRaw() {
    return this.currentView === CurrentView.RAW;
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
