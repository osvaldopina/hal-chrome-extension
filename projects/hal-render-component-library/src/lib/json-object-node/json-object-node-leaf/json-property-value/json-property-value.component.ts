import { Component, Input } from '@angular/core';
import { JsonElementNode, JsonElementType, HalElementType } from '../../../tree-model/tree-model';

@Component({
  selector: 'hrc-json-property-value',
  templateUrl: './json-property-value.component.html',
  styleUrls: ['./json-property-value.component.css']

})
export class JsonPropertyValueComponent {

  @Input()
  node: JsonElementNode;


  value() {
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

  getColor() {
    switch (this.node.type) {
      case JsonElementType.String: {
        return 'green';
      }
      case JsonElementType.Number: {
        return 'blue';
      }
      case JsonElementType.Boolean: {
        return 'brown';
      }
      default: {
        return 'black';
      }
    }

  }

  propValueStyleClass() {
    switch (this.node.type) {
      case JsonElementType.String: {
        return 'leaf-string-property-value';
      }
      case JsonElementType.Number: {
        return 'leaf-number-property-value';
      }
      case JsonElementType.Boolean: {
        return 'leaf-boolean-property-value';
      }
      default: {
        return '';
      }
    }
  }

  linkHref() {
    return this.value().substring(1, this.value().length - 1);
  }

  isSimpleProperty() {
    return this.node.halElementType !== HalElementType.LinkHref &&
      this.node.halElementType !== HalElementType.TemplatedLinkHref &&
      this.node.halElementType !== HalElementType.PropertyUrl;
  }

  isLinkProperty() {
    return this.node.halElementType === HalElementType.LinkHref || this.node.halElementType === HalElementType.PropertyUrl;
  }

  isTemplatedLink() {
    return this.node.halElementType === HalElementType.TemplatedLinkHref;
  }
}
