import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatButtonModule } from '@angular/material';
import { JsonObjectBranchNodeComponent } from './json-object-node/json-object-node-branch/json-object-branch-node.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HalRenderComponent } from './hal-render.component';
import { JsonObjectNodeComponent } from './json-object-node/json-object-node.component';
import { JsonObjectLeafNodeComponent } from './json-object-node/json-object-node-leaf/json-object-leaf-node.component';
import { JsonPropertyValueComponent } from './json-object-node/json-object-node-leaf/json-property-value/json-property-value.component';
import { JsonPropertyNameComponent } from './json-object-node/json-object-node-leaf/json-property-name/json-property-name.component';
import { UriTemplateEditorModule } from 'uri-template-editor';
import { HalFormTemplateModule} from 'hal-form-template';

@NgModule({
  declarations: [
    HalRenderComponent, JsonObjectNodeComponent, JsonObjectBranchNodeComponent,
    JsonObjectLeafNodeComponent, JsonPropertyValueComponent, JsonPropertyNameComponent,
  ],
  imports: [
    CommonModule, UriTemplateEditorModule, BrowserAnimationsModule, MatToolbarModule, MatButtonModule, HalFormTemplateModule
  ],
  exports: [HalRenderComponent]
})
export class HalRenderComponentModule { }
