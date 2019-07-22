import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TreeNode } from '../../../services/hal-form-control-tree-creator-service/tree-node';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: [ './form-input.component.css']
})
export class FormInputComponent {

  @Input()
  node: TreeNode;

  @Output()
  removeArrayItem: EventEmitter<TreeNode> = new EventEmitter<TreeNode>();

  remove() {
    this.removeArrayItem.emit(this.node);
  }
}
