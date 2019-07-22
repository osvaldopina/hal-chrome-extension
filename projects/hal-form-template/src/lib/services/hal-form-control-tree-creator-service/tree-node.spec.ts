
import { FormBuilder, FormControl } from '@angular/forms';
import { TreeNode, TreeNodeType } from './tree-node';

describe('TreeNode', () => {
  it('getChildren for a FormControl', () => {

    const formControl = new FormControl();
    formControl['marker'] = true;
    const root = new TreeNode(formControl);

    expect(root.children).toEqual([]);
    expect(root.getControl()['marker']).toBeTruthy();
    expect(root.getType()).toBe(TreeNodeType.CONTROL);
    expect(root.getLabel()).toBe('');
  });
  it('getChildren for a FormArray', () => {

    const formArray = (new FormBuilder()).array([
      ''
    ]);


    formArray['marker'] = 0;
    formArray.controls[0]['marker'] = 1;

    const root = new TreeNode(formArray);

    expect(root.getControl()['marker']).toBe(0);
    expect(root.getLabel()).toBe('');
    expect(root.getType()).toBe(TreeNodeType.ARRAY);
    expect(root.children.length).toEqual(1);

    const treeNodeChild = root.children[0];

    expect(treeNodeChild.children.length).toEqual(0);
    expect(treeNodeChild.getLabel()).toBeNull();
    expect(treeNodeChild.getType()).toBe(TreeNodeType.CONTROL);

  });
  it('getChildren for a FormGroup', () => {

    const formGroup = (new FormBuilder()).group({
      'a': ''
    });

    formGroup['marker'] = 0;
    formGroup.controls.a['marker'] = 1;

    const root = new TreeNode(formGroup);

    expect(root.getControl()['marker']).toBe(0);
    expect(root.getLabel()).toBe('');
    expect(root.getType()).toBe(TreeNodeType.GROUP);
    expect(root.children.length).toEqual(1);

    const treeNodeChild = root.children[0];

    expect(treeNodeChild.children.length).toEqual(0);
    expect(treeNodeChild.getLabel()).toBe('a');
    expect(treeNodeChild.getType()).toBe(TreeNodeType.CONTROL);

  });
});
