import { Component, Input } from '@angular/core';
import { JsonElementNode, JsonElementType, HalElementType } from 'tree-model';

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
      case JsonElementType.Array: {
        return '[]';
      }
      case JsonElementType.Object: {
        return '{}';
      }
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

  propValueStyleClass() {
    switch (this.node.type) {
      case JsonElementType.Object:
      case JsonElementType.Array: {
        return 'leaf-property-composed-empty';
      }
      case JsonElementType.String: {
        return 'leaf-string-property-value';
      }
      case JsonElementType.Number: {
        return 'leaf-number-property-value';
      }
      case JsonElementType.Boolean: {
        return 'leaf-boolean-property-value';
      }
      case JsonElementType.Null: {
        return 'leaf-null-property-value';
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
