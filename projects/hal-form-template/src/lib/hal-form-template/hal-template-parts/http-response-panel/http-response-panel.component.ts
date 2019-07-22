import { Component, Input } from '@angular/core';
import { FormSubmissionResponse } from '../../../services/form-submit.service';

@Component({
  selector: 'app-http-response-panel',
  templateUrl: './http-response-panel.component.html',
  styleUrls: ['./http-response-panel.component.css']
})
export class HttpResponsePanelComponent {

  @Input()
  response: FormSubmissionResponse;
}
