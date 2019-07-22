import { Injectable } from '@angular/core';
import { removeNullAndEmpty } from './null-empty-fields-remover';

@Injectable()
export class NullAndEmptyFieldsRemoverService {

  constructor() { }

  removeNullAndEmpty(obj:object): object {
    return removeNullAndEmpty(obj);
  }

}
