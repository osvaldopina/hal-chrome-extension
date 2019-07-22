import { PreParsedConfig } from '../schema-properties-parser/schemaPropertiesParser';

export interface PropertyDefinition {
  name: string;
  prompt?: string;
  readOnly?: boolean;
  regex?: string;
  required?: boolean;
  templated?: boolean;
  value?: string;
}

export abstract class AbstractSchema {

  abstract generateSchema(): object;
}

export class StringSchema extends AbstractSchema {
  constructor(private propType: PreParsedConfig) {
    super();
  }

  public generateSchema(): object {

    const result = {
      'type': 'string'
    };

    if (this.propType.config['pattern']) {
      Object.assign(result, { pattern: this.propType.config['pattern'] });
    }

    if (this.propType.config['value']) {
      Object.assign(result, { value: this.propType.config['value'] });
    }

    if (this.propType.config['read-only']) {
      Object.assign(result, { 'read-only': this.propType.config['read-only'] });
    }

    if (this.propType.config['required']) {
      Object.assign(result, { 'required': this.propType.config['required'] });
    }

    Object.assign(result, { title: this.propType.config['title'] });

    return result;

  }

}

export class ObjectSchema extends AbstractSchema {
  constructor(private subSchema: AbstractSchema) {
    super();
  }

  generateSchema(): object {

    const result = {
      'type': 'object'
    };

    const subSchema = this.subSchema.generateSchema();

    Object.keys(subSchema).forEach((key) => {
      result[key] = subSchema[key];
    });

    return result;
  }

}
export class PropertySchema extends AbstractSchema {
  constructor(private propType: PreParsedConfig, private subSchema: AbstractSchema) {
    super();
  }

  generateSchema(): object {
    const result = {
      'properties': {}
    };

    result.properties[this.propType.config['name']] = this.subSchema.generateSchema();

    return result;

  }

}

export class ArraySchema extends AbstractSchema {

  constructor(private subSchema: AbstractSchema) {
    super();
  }
  generateSchema(): object {

    const result = {
      'type': 'array',
      'items': {}
    };

    result.items = this.subSchema.generateSchema();

    return result;
  }

}
