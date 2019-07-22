import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material';
import deepEqual from 'deep-equal';
import { FormSubmitService, FormSubmissionResponse } from '../services/form-submit.service';
import { SchemaCreatorService } from '../services/schema-creator-service/shema-creator.service';
import { HalFormInstanceCreatorService } from '../services/hal-form-instance-creator-service/hal-form-instance-creator.service';
import { HalFormControlTreeCreatorService } from '../services/hal-form-control-tree-creator-service/hal-form-control-tree-creator.service';
import { NullAndEmptyFieldsRemoverService } from '../services/null-fields-remover-service/null-empty-fields-remover-service';
import { HalFormInstance } from '../services/hal-form-instance-creator-service/hal-form-instance';
import { TreeNode } from '../services/hal-form-control-tree-creator-service/tree-node';
import { HalFormTemplate } from '../services/hal-form-template-extractor-service/hal-form-template-extractor';
import { createNewArrayItem, HAL_FORM_ID_PROP_NAME } from '../services/hal-form-control-tree-creator-service/hal-form-control-tree-creator';

@Component({
  selector: 'app-hal-form-template',
  templateUrl: './hal-form-template.component.html',
  styleUrls: ['./hal-form-template.component.css']
})
export class HalFormTemplateComponent implements OnChanges {

  constructor(
    private formSubmitService: FormSubmitService,
    private schemaCreatorService: SchemaCreatorService,
    private halFormInstanceCreatorService: HalFormInstanceCreatorService,
    private halFormControlTreeCreatorService: HalFormControlTreeCreatorService,
    private nullAndEmptyFieldsRemoverService: NullAndEmptyFieldsRemoverService
  ) { }

  name: string;
  template: object;
  schema: object = null;
  halFormInstance: HalFormInstance;
  rootFormComponent: AbstractControl;
  treeControl = new NestedTreeControl<TreeNode>(node => node.children);
  dataSource: MatTreeNestedDataSource<TreeNode> = new MatTreeNestedDataSource();
  response: FormSubmissionResponse = null;
  loading = false;

  @Input()
  halFormTemplate: HalFormTemplate;


  trackBy(index: number, item: TreeNode) {
    return item.getId();
  }

  changeIn(changes: object, propertyName: string) {
    return (changes[propertyName] && !deepEqual(changes[propertyName]['currentValue'], changes[propertyName]['previousValue']));
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (this.halFormTemplate && (!this.schema || this.changeIn(changes, 'halFormTemplate'))) {

      this.name = this.halFormTemplate.name;

      this.halFormInstance = this.halFormInstanceCreatorService.create(this.halFormTemplate);

      this.response = null;
      const formProperties = this.halFormTemplate.template['properties'];
      this.schema = this.schemaCreatorService.createSchema(formProperties);

      if (Object.keys(this.schema).length > 0) {
        this.rootFormComponent = this.halFormControlTreeCreatorService.createFormControlTree(this.schema);
        this.onFormDataChange(this.rootFormComponent.value);
        this.onIsValidChange(this.rootFormComponent.status);

        this.rootFormComponent.valueChanges.subscribe(this.onFormDataChange);
        this.rootFormComponent.statusChanges.subscribe(this.onIsValidChange);

        this.dataSource.data = [this.halFormControlTreeCreatorService.createNodeTree(this.rootFormComponent, this.name)];
      } else {
        this.halFormInstance.setValid(true);
      }
    }
  }

  addArrayItem(node: TreeNode) {
    createNewArrayItem(this.rootFormComponent, node.getId());
    this.dataSource.data = null;
    this.dataSource.data = [this.halFormControlTreeCreatorService.createNodeTree(this.rootFormComponent, this.name)];
  }

  removeArrayItem(node: TreeNode) {
    const formArray = node.getControl().parent as FormArray;
    const indexToRemove = formArray.controls.findIndex((control) => control[HAL_FORM_ID_PROP_NAME] === node.getId());
    formArray.removeAt(indexToRemove);
    this.dataSource.data = null;
    this.dataSource.data = [this.halFormControlTreeCreatorService.createNodeTree(this.rootFormComponent, this.name)];
  }

  onFormDataChange = (event: object) => {
    this.halFormInstance.setFormData(this.nullAndEmptyFieldsRemoverService.removeNullAndEmpty(event));
  }

  onIsValidChange = (event: string) => {
    this.halFormInstance.setValid(event === 'VALID');
  }

  getName(): string {
    if (this.halFormTemplate['rel']) {
      return `${this.halFormTemplate['rel']}:${this.halFormTemplate['name']}`;
    } else {
      return `${this.halFormTemplate['name']}`;
    }
  }

  isGroupOrArray = (_: number, node: TreeNode) =>
    node.getType() === 'ARRAY' || node.getType() === 'GROUP'

  isControl = (_: number, node: TreeNode) =>
    node.getType() === 'CONTROL'

  onSubmit = () => {
    this.showLoader();
    this.formSubmitService.submit(this.halFormInstance).subscribe(
      response => {
        this.response = response;
      },
      error => {
        console.log('error:' + error);
      },
      () => {
        this.hideLoader();
      }
    );
  }

  showLoader() {
    this.loading = true;
  }

  hideLoader() {
    this.loading = false;
  }
}
