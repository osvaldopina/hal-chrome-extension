import { Component, Input, Output } from '@angular/core';
import * as URITemplate from 'urijs/src/URITemplate';
import { parse, UriVariable, UriText, getTemplateValuesAsObject } from './template-parser';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'uri-template-editor',
  templateUrl: './uri-template-editor.component.html',
  styleUrls: ['./uri-template-editor.component.css']
})
export class UriTemplateEditorComponent {

  templateParts: any[];
  template: any;

  @Input()
  set uriTemplate(template: string) {
    this.template = new URITemplate(template);
    this.templateParts = parse(this.template);
  }

  isVariable(templatePart: any) {
    return templatePart instanceof UriVariable;
  }

  isText(templatePart: any) {
    return templatePart instanceof UriText;
  }

  keyUp(templatePart: any, event: any) {
    templatePart.value = event.target.value;
  }

  getInputLength(templatePart: any) {
    return templatePart.value.length === 0 ? 1 : templatePart.value.length;
  }

  evaluatedTemplate() {
    return this.template.expand(getTemplateValuesAsObject(this.templateParts));
  }

}
