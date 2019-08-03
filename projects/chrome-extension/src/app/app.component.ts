import { Component, ChangeDetectorRef, ChangeDetectionStrategy, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<hrc-hal-render-component [hal]="jsonValue" [initialView]="initialView"></hrc-hal-render-component>',
})
export class AppComponent {

  constructor(@Inject('initialView') public initialView: string) {
  }

  jsonValue = this.getPreJsonElement().textContent;

  getPreJsonElement(): ChildNode {
    let preElement: ChildNode;

    document.body.childNodes.forEach((element) => {
      if (element.nodeName.toUpperCase() === 'PRE') {
        preElement = element;
      }
    });

    return preElement;
  }

}
