import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HalFormInstance } from './hal-form-instance-creator-service/hal-form-instance';

export interface FormData {
  url: string;
  method: string;
  contentType: string;
  payload: string;
}

export class FormSubmissionResponse {
  private status: number;
  private statusText: string;
  private contentType: string;
  private body: string;

  constructor(response: object) {
    this.status = response['status'];
    this.statusText = response['statusText'];
    this.contentType = response['contentType'];
    this.body = response['body'];
  }


  getStatus(): number {
    return this.status;
  }

  getStatusText(): string {
    return this.statusText;
  }

  getContentType(): string {
    return this.contentType;
  }

  getBody(): string {
    return this.body;
  }

  isOk() {
    return this.status >= 200 && this.status < 400;
  }
}

@Injectable()
export class FormSubmitService {

  constructor(private http: HttpClient) { }

  submit(halFormInstance: HalFormInstance): Observable<FormSubmissionResponse> {
    const headers = new HttpHeaders({ 'content-type': [halFormInstance.getContentType()] });
    const options = {
      headers: headers,
      observe: 'response' as 'body'
    };

    let request: Observable<object>;


    switch (halFormInstance.getMethod()) {
      case 'GET': {
        request = this.http.get(halFormInstance.getURL(), options);
        break;
      }
      case 'POST': {
        request = this.http.post(halFormInstance.getURL(), halFormInstance.getPayload(), options);
        break;
      }
      case 'PUT': {
        request = this.http.put(halFormInstance.getURL(), halFormInstance.getPayload(), options);
        break;
      }
      case 'DELETE': {
        request = this.http.delete(halFormInstance.getURL(), options);
        break;
      }
      case 'OPTIONS': {
        request = this.http.options(halFormInstance.getURL(), options);
        break;
      }
      case 'HEAD': {
        request = this.http.head(halFormInstance.getURL(), options);
        break;
      }
      default : {
        throw new Error(`${halFormInstance.getMethod()} is not a valid! Must be GET, POST, PUT, DELETE, OPTIONS or HEAD`);
      }
    }

    return request
      .pipe(
        map(httpResponse => {
          return new FormSubmissionResponse(httpResponse);
        }),
        catchError(httpResponse => {
          return of(new FormSubmissionResponse(httpResponse));
        })
      );
  }
}
