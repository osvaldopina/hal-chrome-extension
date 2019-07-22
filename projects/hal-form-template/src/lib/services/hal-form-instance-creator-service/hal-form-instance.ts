import { HalFormTemplate } from './../hal-form-template-extractor-service/hal-form-template-extractor';
import { objectToURLSearchParams, transformObjectToProperties } from './halFormObjectToProperty';

export class HalFormInstance {

  private contentType: string;
  private method: string;
  private payload: string = null;
  private URL: string;
  private BaseURL: string;
  private valid: boolean;

  constructor(private halFormTemplate: HalFormTemplate) {
    this.method = halFormTemplate.template['method'].toUpperCase();

    if (this.method === 'GET' && halFormTemplate.template['contentType']) {
      throw new Error('If method is GET then contentType must not be informed!');
    }

    if (this.method !== 'GET') {
      this.contentType = halFormTemplate.template['contentType'] ?
        halFormTemplate.template['contentType'] :
        'application/json';
    }

    if ((this.method === 'POST' || this.method === 'PUT')
      && (this.contentType !== 'application/json' && this.contentType !== 'application/x-www-form-urlencoded')) {
      throw new Error('If method is POST or PUT then contentType must be either application/json or application/x-www-form-urlencoded');
    }

    this.URL = halFormTemplate.href;
    this.BaseURL = this.URL;
    this.valid = false;
  }



  setFormData(formData: object): void {
    if (this.method.toUpperCase() === 'GET') {
      this.URL = this.BaseURL + this.tranformToURLQueryString(formData);
    } else if (this.contentType === 'application/json') {
      this.payload = JSON.stringify(formData, null, '   ');
    } else if (this.contentType === 'application/x-www-form-urlencoded') {
      this.payload = this.transformToEncodedURL(formData);
    }
  }

  setValid(valid: boolean) {
    this.valid = valid;
  }

  isValid(): boolean {
    return this.valid;
  }

  getURL(): string {
    return this.URL;
  }

  getPayload(): string {
    return this.payload;
  }

  getMethod(): string {
    return this.method;
  }

  getContentType(): string {
    return this.contentType;
  }

  transformToEncodedURL = (form: object): string => {
    return objectToURLSearchParams(transformObjectToProperties(form));
  }

  tranformToURLQueryString = (form: object) => {
    const queryString = this.transformToEncodedURL(form);
    return queryString ? '?' + queryString : queryString;
  }

}
