import { HAL_FORM_ID_PROP_NAME } from './hal-form-control-tree-creator';

import { AbstractControl, FormGroup, FormControl, FormArray } from '@angular/forms';

export enum TreeNodeType {
  ARRAY = 'ARRAY',
  GROUP = 'GROUP',
  CONTROL = 'CONTROL'
}

export class TreeNode {

  type: TreeNodeType;

  constructor(private control: AbstractControl, private label: string = null) {
    if (control instanceof FormControl) {
      this.type = TreeNodeType.CONTROL;
    } else if (control instanceof FormArray) {
      this.type = TreeNodeType.ARRAY;
    } else if (control instanceof FormGroup) {
      this.type = TreeNodeType.GROUP;
    } else {
      throw new Error('control must be a FormControl, a FormArray or a FormGroup');
    }
  }

  getLabel(): string {
    if (this.isRoot()) {
      return '';
    } else {
      return this.label;
    }
  }

  getType(): TreeNodeType {
    return this.type;
  }

  getControl(): AbstractControl {
    return this.control;
  }

  getId(): number {
    return this.control[HAL_FORM_ID_PROP_NAME];
  }

  isArrayItem(): boolean {
    return this.getControl().parent && this.getControl().parent instanceof FormArray;
  }

  isRoot(): boolean {
    return this.getControl().parent === undefined;
  }

  get children(): Array<TreeNode> {
    if (this.control instanceof FormControl) {
      return [];
    } else if (this.control instanceof FormArray) {
      const formArray = this.control as FormArray;
      const result = [];
      formArray.controls.forEach((subControl) => {
        result.push(new TreeNode(subControl as FormArray));
      });
      return result;
    } else if (this.control instanceof FormGroup) {
      const formGroup = this.control as FormGroup;
      const result = [];
      Object.keys(formGroup.controls).forEach((key) => {
        result.push(new TreeNode(formGroup.controls[key] as FormGroup, key));
      });
      return result;
    } else {
      throw new Error('Can only get children from form constrols type FormControl, FormArray and FormGroup!');
    }
  }
}
