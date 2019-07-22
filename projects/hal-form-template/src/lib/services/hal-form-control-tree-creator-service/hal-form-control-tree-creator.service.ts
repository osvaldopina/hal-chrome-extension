import { TreeNode } from './tree-node';
import { AbstractControl, FormGroup, FormControl, FormArray } from '@angular/forms';
import { Injectable } from '@angular/core';
import { createFormControlTree, createNewArrayItem, removeFormArrayElementById } from './hal-form-control-tree-creator';

@Injectable()
export class HalFormControlTreeCreatorService {

  constructor() { }

  createFormControlTree(schema: object): AbstractControl {
    return createFormControlTree(schema);
  }

  createNodeTree(rootControl: AbstractControl, rootLabel?: string): TreeNode {
    return new TreeNode(rootControl, rootLabel);
  }

  duplicateElementById(root: AbstractControl, id: number): void {
    createNewArrayItem(root, id);
  }

  removeFormArrayElementById(root: AbstractControl, id: number): void {
    removeFormArrayElementById(root, id);
  }

}
