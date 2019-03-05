import { Component, Input } from '@angular/core';
import { JsonElementNode } from '../tree-model/tree-model';

@Component({
  selector: 'hrc-json-object-node',
  templateUrl: './json-object-node.component.html',
})
export class JsonObjectNodeComponent {

  @Input()
  node: JsonElementNode;

}
