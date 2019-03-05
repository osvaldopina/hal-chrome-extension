import { Component, Input } from '@angular/core';
import { JsonElementNode, JsonElementType , HalElementType } from '../../../tree-model/tree-model';

@Component({
  selector: 'hrc-json-property-name',
  template: `<pre [ngStyle]="{'display':'inline'}">{{name()}}</pre>`
})
export class JsonPropertyNameComponent {

  @Input()
  node: JsonElementNode;

  name() {
    return this.node.name ? ('"' + this.node.name + '":') : ('');
  }
}
