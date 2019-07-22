import { FormGroup, AbstractControl, FormControl, ValidatorFn, Validators, FormArray } from '@angular/forms';

export const HAL_FORM_SHCEMA_PROP_NAME = '_halFormSchema';
export const HAL_FORM_LABEL_PROP_NAME = '_halFormLabel';
export const HAL_FORM_ID_PROP_NAME = '_halFormId';

export function createFormControlTree(schema: object): AbstractControl {
  return createControlFormProperty(schema);
}

let id = 1;

function generateId(): number {
  return id++;
}

export function initId() {
  id = 1;
}

export function createNewArrayItem(root: AbstractControl, elementId: number): void {
  const control = findFormElementById(root, elementId);

  if (!(control instanceof FormArray)) {
    throw new Error('Can only duplicate FormArray controls');
  }

  const newControl = createControlFormProperty(control[HAL_FORM_SHCEMA_PROP_NAME].items);
  (control as FormArray).push(newControl);
}

export function removeFormArrayElementById(root: AbstractControl, elementId: number): void {
  const control = findFormElementById(root, elementId);

  if (control === null || !(control.parent instanceof FormArray)) {
    throw new Error('Can only remove elements that have a FormArray as parent');
  }

  const formArray = control.parent as FormArray;
  const idxToRemove = formArray.controls.findIndex(control => {
    return control[HAL_FORM_ID_PROP_NAME] === elementId;
  });

  if (idxToRemove !== -1) {
    formArray.removeAt(idxToRemove);
  } else {
    throw new Error(`Cannot find control in array with id ${idxToRemove}`);
  }

}

export function findFormElementById(control: AbstractControl, id: number): AbstractControl {
  if (control[HAL_FORM_ID_PROP_NAME] === id) {
    return control;
  } else if (control instanceof FormArray) {
    return (control as FormArray).controls.reduce(
      (accum, subControl) => accum === null ? findFormElementById(subControl, id) : accum, null
    );
  } else if (control instanceof FormGroup) {
    return Object.values((control as FormGroup).controls).reduce(
      (accum, subControl) => accum === null ? findFormElementById(subControl, id) : accum, null
    );
  } else {
    return null;
  }

}

function createFormGroup(schema: object): AbstractControl {
  const formGroup = new FormGroup(createControlFormProperties(schema['properties']));
  formGroup[HAL_FORM_SHCEMA_PROP_NAME] = schema;
  formGroup[HAL_FORM_ID_PROP_NAME] = generateId();

  return formGroup;
}

function createArray(schema: object): AbstractControl {
  const formArray = new FormArray([createControlFormProperty(schema['items'])]);
  formArray[HAL_FORM_SHCEMA_PROP_NAME] = schema;
  formArray[HAL_FORM_ID_PROP_NAME] = generateId();

  return formArray;
}


function createControlFormProperties(schema: object): { [key: string]: AbstractControl } {
  const result: { [key: string]: AbstractControl } = {};
  Object.keys(schema).forEach((key) => {
    result[key] = createControlFormProperty(schema[key]);
  });
  return result;
}

function createControlFormProperty(schema: object): AbstractControl {
  if (schema['type'] === 'string') {
    const formControl = new FormControl(schema['value'] ? schema['value'] : '');
    if (schema['title']) {
      formControl[HAL_FORM_LABEL_PROP_NAME] = schema['title'];
    }
    formControl[HAL_FORM_SHCEMA_PROP_NAME] = schema;
    formControl[HAL_FORM_ID_PROP_NAME] = generateId();

    const validators: Array<ValidatorFn> = [];
    if (schema['required']) {
      validators.push(Validators.required);
    }
    if (schema['pattern']) {
      validators.push(Validators.pattern(schema['pattern']));
    }
    if (validators.length > 0) {
      formControl.setValidators(validators);
      formControl.updateValueAndValidity();
    }
    return formControl;
  } else if (schema['type'] === 'object') {
    return createFormGroup(schema);
  } else if (schema['type'] === 'array') {
    return createArray(schema);
  }
  throw new Error(`schema type:${schema['type']} is not implemented!`);
}
