import { Injectable } from '@angular/core';
import { PropertyDefinition } from './schema-properties-generator/schemaPropertiesGenerator';
import { createSchema as createSchemaFunction } from './schemaCreator';

@Injectable()
export class SchemaCreatorService {

  constructor() { }

  createSchema(halFormProperties: Array<PropertyDefinition>): object {
    return createSchemaFunction(halFormProperties);
  }

}
