import { Component, Input } from '@angular/core';
import { HalFormTemplateExtractorService } from './services/hal-form-template-extractor-service/hal-form-template-extractor-service';
import { HalFormTemplate } from './services/hal-form-template-extractor-service/hal-form-template-extractor';

enum CurrentView {
  RAW,
  TREE
}
@Component({
  selector: 'app-hal-form',
  templateUrl: './hal-form.component.html',
  styleUrls: ['./hal-form.component.css']
})


export class HalFormComponent {

  constructor(private halFormTemplateExtractorService: HalFormTemplateExtractorService) { }

  json: string;

  currentView = CurrentView.TREE;

  halFormObject: object;

  @Input()
  set halForm(value: string) {
    if (value && value.length > 0) {
      this.json = value;
      this.halFormObject = JSON.parse(this.json);
    }
  }

  get halForm() {
    return this.json;
  }

  public getTemplates(): Array<HalFormTemplate> {
    if (this.halFormObject) {
      return this.halFormTemplateExtractorService.extractTemplates(this.halFormObject);
    } else {
      return [];
    }
  }

  public identify(index, item) {
    return item['id'];
  }

}
