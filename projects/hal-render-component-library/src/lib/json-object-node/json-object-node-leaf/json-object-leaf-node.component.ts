import { Component, Input } from '@angular/core';
import { JsonElementNode, JsonElementType , HalElementType } from '../../tree-model/tree-model';

@Component({
  selector: 'hrc-json-object-leaf-node',
  templateUrl: './json-object-leaf-node.component.html',
  // styleUrls: ['./json-object-leaf-node.component.css']
})
export class JsonObjectLeafNodeComponent {
  HalElementEnumType;

  constructor() {
    this.HalElementEnumType = HalElementType;
  }

  @Input()
  node: JsonElementNode;

  leafProperty() {
    return this.leafPropertyNoDelimiter() + (this.node.lastItem ? '' : ',');
  }

  leafPropertyNoDelimiter() {
    return this.node.name ? ('"' + this.node.name + '": ' + this.leafPropertyValue()) : (this.leafPropertyValue());
  }

  leafPropertyValue() {
    switch (this.node.type) {
      case JsonElementType.Null: {
        return 'null';
      }
      case JsonElementType.String: {
        return '"' + this.node.value + '"';
      }
      default: {
        return this.node.value;
      }
    }
  }

}
