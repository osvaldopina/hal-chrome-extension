import { Injectable } from '@angular/core';
import { extractTemplates, HalFormTemplate } from './hal-form-template-extractor';




@Injectable()
export class HalFormTemplateExtractorService {

  constructor() { }

  extractTemplates(halForm: object): Array<HalFormTemplate> {
    return extractTemplates(halForm);
  }

}
