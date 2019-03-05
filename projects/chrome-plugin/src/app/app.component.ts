import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<hrc-hal-render-component [hal]="jsonValue"></hrc-hal-render-component>',
})
export class AppComponent {

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
