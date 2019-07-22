import {
  PropertySchema,
  ObjectSchema,
  AbstractSchema,
  PropertyDefinition,
  ArraySchema,
  StringSchema
} from './../schema-properties-generator/schemaPropertiesGenerator';

export enum PreParsedType {
  OBJECT = 'object',
  ARRAY = 'array',
  PROPERTY = 'property',
  STRING = 'string'
}

export interface PreParsedConfig {
  type: PreParsedType;
  config?: object;
}

export function preParsePropertyDefinition(propertyDefinition: PropertyDefinition): Array<PreParsedConfig> {
  const result = [];

  const propertyParts = propertyDefinition.name.split('.');

  if (propertyParts.length === 1) {
    const propName = getPropName(propertyParts[0]);
    if (isAnonymousArray(propertyParts[0])) {
      result.push(createPreParsedArray());
      result.push(createPreParsedString(propertyDefinition, propName));
    } else if (isNamedArray(propertyParts[0])) {
      result.push(createPreParsedObject());
      result.push(createPreParsedProperty(propName));
      result.push(createPreParsedArray());
      result.push(createPreParsedString(propertyDefinition, propName));
    } else {
      result.push(createPreParsedObject());
      result.push(createPreParsedProperty(propName));
      result.push(createPreParsedString(propertyDefinition, propName));
    }
    return result;

  }

  propertyParts.forEach((propertyPart, index) => {

    if (isAnonymousArray(propertyPart)) {
      result.push(createPreParsedArray());
    } else if (isNamedArray(propertyPart)) {
      if (index === 0) {
        result.push(createPreParsedObject());
        result.push(createPreParsedProperty(getPropName(propertyPart)));
        result.push(createPreParsedArray());
      } else if (index === propertyParts.length - 1) {
        result.push(createPreParsedObject());
        result.push(createPreParsedProperty(getPropName(propertyPart)));
        result.push(createPreParsedArray());
      } else {
        result.push(createPreParsedObject());
        result.push(createPreParsedProperty(getPropName(propertyPart)));
        result.push(createPreParsedArray());
      }
    } else {
      result.push(createPreParsedObject());
      result.push(createPreParsedProperty(getPropName(propertyPart)));
    }

    if (index === propertyParts.length - 1) {
      result.push(createPreParsedString(propertyDefinition, getPropName(propertyPart)));
    }

  });

  return result;

}

function createPreParsedObject(): PreParsedConfig {
  return { 'type': PreParsedType.OBJECT };
}

function createPreParsedArray(): PreParsedConfig {
  return { 'type': PreParsedType.ARRAY };
}

function createPreParsedProperty(propertyName: string): PreParsedConfig {
  const result = { 'type': PreParsedType.PROPERTY, 'config': { 'name': propertyName } };

  return result;

}

function createPreParsedString(propertyDefinition: PropertyDefinition, propertyName?: string): PreParsedConfig {
  const result = { 'type': PreParsedType.STRING };

  const config = {};

  if (propertyDefinition.prompt || propertyName) {
    config['title'] = propertyDefinition.prompt || propertyName;
  }

  if (propertyDefinition.value) {
    config['value'] = propertyDefinition.value;
  }

  if (propertyDefinition.readOnly) {
    config['read-only'] = propertyDefinition.readOnly;
  }

  if (propertyDefinition.required) {
    config['required'] = propertyDefinition.required;
  }

  if (propertyDefinition.regex) {
    config['pattern'] = propertyDefinition.regex;
  }

  if (Object.keys(config).length !== 0) {
    result['config'] = config;
  }

  return result;

}

export function parsePropertyDefinition(propertyDefinition: PropertyDefinition): AbstractSchema {
  const propTypes = preParsePropertyDefinition(propertyDefinition);

  let currentSchema: AbstractSchema = null;
  propTypes.reverse().forEach((propType) => {
    if (propType.type === PreParsedType.STRING) {
      currentSchema = new StringSchema(propType);
    } else if (propType.type === PreParsedType.OBJECT) {
      currentSchema = new ObjectSchema(currentSchema);
    } else if (propType.type === PreParsedType.PROPERTY) {
      currentSchema = new PropertySchema(propType, currentSchema);
    } else if (propType.type === PreParsedType.ARRAY) {
      currentSchema = new ArraySchema(currentSchema);
    } else {
      throw new Error(`invalid prop type:${propType.type}`);
    }
  });

  return currentSchema;
}

export function getPropertyName(prefix: string, propType: string): string {
  if (propType.length === prefix.length) {
    return null;
  } else {
    return propType.substring(prefix.length + 1);
  }
}

function isAnonymousArray(propName: string): boolean {
  return propName === '[]';
}

function isNamedArray(propName: string): boolean {
  return propName.endsWith('[]') && propName.length > 2;
}

function getNamedArrayPropName(propName: string): string {
  return propName.substring(0, propName.length - 2);
}

function getPropName(propName: string) {
  if (isNamedArray(propName)) {
    return getNamedArrayPropName(propName);
  } else {
    return propName;
  }
}
