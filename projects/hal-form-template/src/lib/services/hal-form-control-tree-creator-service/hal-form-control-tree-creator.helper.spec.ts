import { FormGroup, FormControl, AbstractControl, FormArray } from '@angular/forms';
import { HAL_FORM_SHCEMA_PROP_NAME, HAL_FORM_LABEL_PROP_NAME, HAL_FORM_ID_PROP_NAME } from './hal-form-control-tree-creator';

export class AbstractElementVerifier {
  constructor(protected element: AbstractControl) {}

  schema(schema: object) {
    expect(this.element[HAL_FORM_SHCEMA_PROP_NAME]).toEqual(schema);
    return this;
  }

  id(id: number) {
    expect(this.element[HAL_FORM_ID_PROP_NAME]).toEqual(id);
    return this;
  }
}

export class ControlVerifier extends AbstractElementVerifier {
  constructor(protected element: AbstractControl) {
    super(element);
    expect(this.element instanceof FormControl);
  }

  label(label: string) {
    expect(this.element[HAL_FORM_LABEL_PROP_NAME]).toBe(label);
    return this;
  }

}

export class ControlGroupVerifier extends AbstractElementVerifier {

  formGroup: FormGroup;
  constructor(formGroup: AbstractControl) {
    super(formGroup);
    expect(formGroup instanceof FormGroup);
    this.formGroup = formGroup as FormGroup;
  }

  property(name: string) {
    expect(Object.keys(this.formGroup.controls)).toContain(name);
    expect(Object.keys(this.formGroup.controls) instanceof FormControl);
    return new PropertyVerifier(this.formGroup.controls[name]);
  }
}

export class PropertyVerifier extends AbstractElementVerifier {

  control() {
    return new ControlVerifier(this.element);
  }

  group() {
    return new ControlGroupVerifier(this.element);
  }

  array() {
    return new ControlArrayVerifier(this.element);
  }

}

export class ControlArrayVerifier extends AbstractElementVerifier {
  constructor(formArray: AbstractControl) {
    super(formArray);
    expect(formArray instanceof FormArray).toBeTruthy();
  }

  control() {
    return new ControlVerifier((this.element as FormArray).controls[0]);
  }

  group() {
    return new ControlGroupVerifier((this.element as FormArray).controls[0]);
  }

}

