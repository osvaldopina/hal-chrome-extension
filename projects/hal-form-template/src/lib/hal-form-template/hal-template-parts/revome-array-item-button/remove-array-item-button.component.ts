import { Component, Input, EventEmitter, Output } from '@angular/core';
import { TreeNode } from '../../../services/hal-form-control-tree-creator-service/tree-node';

@Component({
  selector: 'app-remove-array-item-button',
  templateUrl: './remove-array-item-button.component.html',
  styleUrls: ['./remove-array-item-button.component.css']
})
export class RemoveArrayItemButtonComponent {

  @Input()
  node: TreeNode;

  @Output()
  removeArrayItem: EventEmitter<TreeNode> = new EventEmitter<TreeNode>();

  remove() {
    this.removeArrayItem.emit(this.node);
  }

}
