import { JsonObjectBranchNodeComponent } from './json-object-node/json-object-node-branch/json-object-branch-node.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HalRenderComponent } from './hal-render.component';
import { JsonObjectNodeComponent } from './json-object-node/json-object-node.component';
import { JsonObjectLeafNodeComponent } from './json-object-node/json-object-node-leaf/json-object-leaf-node.component';
import { JsonPropertyValueComponent } from './json-object-node/json-object-node-leaf/json-property-value/json-property-value.component';
import { JsonPropertyNameComponent } from './json-object-node/json-object-node-leaf/json-property-name/json-property-name.component';
import { UriTemplateEditorComponent } from './uri-template-editor/uri-template-editor.component';

@NgModule({
  declarations: [
    HalRenderComponent, JsonObjectNodeComponent, JsonObjectBranchNodeComponent,
    JsonObjectLeafNodeComponent, JsonPropertyValueComponent, JsonPropertyNameComponent,
    UriTemplateEditorComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [HalRenderComponent]
})
export class HalRenderComponentModule { }
