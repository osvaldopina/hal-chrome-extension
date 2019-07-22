import { Component, Input } from '@angular/core';
import { HalFormInstance } from '../../../services/hal-form-instance-creator-service/hal-form-instance';

@Component({
  selector: 'app-form-request-materialization',
  templateUrl: './form-request-materialization.component.html',
  styleUrls: ['./form-request-materialization.component.css']
})
export class FormRequestMaterializationComponent {

  @Input()
  halFormInstance: HalFormInstance;

  getMethod(): string {
    return this.halFormInstance.getMethod();
  }

  isGet(): boolean {
    return this.getMethod() === 'GET';
  }

  getURL(): string {
    return this.halFormInstance.getURL();
  }

  getContentType(): string {
    return this.halFormInstance.getContentType();
  }

  getPayload(): string {
    return this.halFormInstance.getPayload();
  }

  isValid(): boolean {
    return this.halFormInstance.isValid();
  }
}
