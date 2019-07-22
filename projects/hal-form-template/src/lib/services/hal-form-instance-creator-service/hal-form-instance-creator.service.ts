import { HalFormTemplate } from './../hal-form-template-extractor-service/hal-form-template-extractor';
import { Injectable } from '@angular/core';
import { HalFormInstance } from './hal-form-instance';

@Injectable()
export class HalFormInstanceCreatorService {

  constructor() { }

  create(halFormTemplate: HalFormTemplate): HalFormInstance {
    return new HalFormInstance(halFormTemplate);
  }
}
