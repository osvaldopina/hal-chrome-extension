import { Component, Input } from '@angular/core';
import { JsonElementNode, JsonElementType, HalElementType, Curie } from 'tree-model';
import * as URITemplate from 'urijs/src/URITemplate';

@Component({
  selector: 'hrc-json-object-branch-node',
  templateUrl: './json-object-branch-node.component.html',
  styleUrls: ['./json-object-branch-node.component.css']
})
export class JsonObjectBranchNodeComponent {

  @Input()
  node: JsonElementNode;

  curie: Curie;

  branchStart() {
    if (this.node.expanded) {
      return this.branchNodeDelimiterStart();
    } else {
      return this.branchNodeDelimiterStart() + '...' + this.branchNodeDelimiterEnd() + (this.node.lastItem ? '' : ',');
    }
  }

  branchEnd() {
    if (this.node.expanded) {
      return this.branchNodeDelimiterEnd() + (this.node.lastItem ? '' : ',');
    } else {
      return '';
    }
  }

  branchNodeDelimiterStart() {
    return this.node.type === JsonElementType.Array ? '[' : '{';
  }

  branchNodeDelimiterEnd() {
    return this.node.type === JsonElementType.Array ? ']' : '}';
  }

  clickExpand() {
    this.node.expanded = !this.node.expanded;
  }

  expandSymbol() {
    return this.node.expanded ? '-' : '+';
  }

  isSimpleBranchProperty() {
    return this.node.halElementType !== HalElementType.LinkRel ||
      (this.node.halElementType === HalElementType.LinkRel && (!this.node.curie) && !this.node.name.startsWith('http:'));
  }

  isLinkRel() {
    return this.node.halElementType === HalElementType.LinkRel && (!this.node.curie) && this.node.name.startsWith('http:');
  }

  isCuriedLinkRel() {
    return this.node.halElementType === HalElementType.LinkRel && this.node.curie;
  }

  getLinkRel() {
    return this.node.name;

  }

  getNodeName() {
    if (this.node.type === JsonElementType.Root) {
      return '';
    } else {
      if (this.node.name) {
        return '"' + this.node.name + '"';
      } else {
        return '';
      }
    }
  }

  getKeyValueDelimiter() {
    if (this.node.name && this.node.type !== JsonElementType.Root) {
      return ':';
    } else {
      return '';
    }
  }

  getCurieRelValue() {
    return this.node.name.split(':')[1];
  }

  getCuriedLinkHref() {
    const curieTemplate = new URITemplate(this.node.curie.href);
    return curieTemplate.expand({
      rel: this.getCurieRelValue()
    });
  }
}
