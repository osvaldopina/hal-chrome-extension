import { HalFormControlTreeCreatorService } from './services/hal-form-control-tree-creator-service/hal-form-control-tree-creator.service';
import { SchemaCreatorService } from './services/schema-creator-service/shema-creator.service';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import {
  MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatToolbarModule,
  MatIconModule, ErrorStateMatcher, ShowOnDirtyErrorStateMatcher, MatProgressBarModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormSubmitService } from './services/form-submit.service';
import { HalFormInstanceCreatorService } from './services/hal-form-instance-creator-service/hal-form-instance-creator.service';
import { HttpClientModule } from '@angular/common/http';
import { CdkTreeModule } from '@angular/cdk/tree';
import { NullAndEmptyFieldsRemoverService } from './services/null-fields-remover-service/null-empty-fields-remover-service';
import { HalFormTemplateExtractorService } from './services/hal-form-template-extractor-service/hal-form-template-extractor-service';
import { HalFormTemplateComponent } from './hal-form-template/hal-form-template.component';
import { RemoveArrayItemButtonComponent } from './hal-form-template/hal-template-parts/revome-array-item-button/remove-array-item-button.component';
import { HalFormComponent } from './hal-form.component';
import { HttpResponsePanelComponent } from './hal-form-template/hal-template-parts/http-response-panel/http-response-panel.component';
import { FormRequestMaterializationComponent } from './hal-form-template/hal-template-parts/form-request-materialization/form-request-materialization.component';
import { FormInputComponent } from './hal-form-template/hal-template-parts/form-input/form-input.component';

@NgModule({
  declarations: [
    HalFormComponent,
    HalFormTemplateComponent,
    HttpResponsePanelComponent,
    FormRequestMaterializationComponent,
    FormInputComponent,
    RemoveArrayItemButtonComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule,
    HttpClientModule,
    CdkTreeModule
  ],
  exports: [
    HalFormComponent
  ],
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
    FormSubmitService, SchemaCreatorService, HalFormInstanceCreatorService,
    HalFormControlTreeCreatorService, NullAndEmptyFieldsRemoverService,
    HalFormTemplateExtractorService
  ],
})
export class HalFormTemplateModule { }
