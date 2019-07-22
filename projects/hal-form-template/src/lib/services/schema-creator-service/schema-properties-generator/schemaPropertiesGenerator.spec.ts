import { StringSchema, AbstractSchema, ObjectSchema, PropertySchema, ArraySchema } from './schemaPropertiesGenerator';
import { PreParsedType } from '../schema-properties-parser/schemaPropertiesParser';

describe('StringSchema', () => {
  it('string schema with only name', () => {
    expect(
      new StringSchema({
        'type': PreParsedType.STRING,
        'config': {
          'title': 'prop-title'
        }
      }).generateSchema()
    ).toEqual(
      {
        'type': 'string',
        'title': 'prop-title'
      }
    );
  });
  it('string schema with name, title, pattern, value, required', () => {
    expect(
      new StringSchema({
        'type': PreParsedType.STRING,
        'config': {
          'title': 'prop-title',
          'pattern': 'd+',
          'required': true,
          'value' : 'a-value',
          'read-only': true
        }
      }).generateSchema()
    ).toEqual(
      {
        'type': 'string',
        'pattern': 'd+',
        'title': 'prop-title',
        'required': true,
        'value': 'a-value',
        'read-only': true
      }
    );
  });
});
describe('ObjectSchema', () => {
  it('object schema', () => {
    class MockSubSchema extends AbstractSchema {
      generateSchema() {
        return { 'key': 'value' };
      }
    }
    expect(
      new ObjectSchema(new MockSubSchema()).generateSchema()
    ).toEqual(
      {
        'type': 'object',
        'key': 'value'
      }
    );
  });
});
describe('PropertySchema', () => {
  it('property schema', () => {
    class MockSubSchema extends AbstractSchema {
      generateSchema() {
        return { 'key': 'value' };
      }
    }
    expect(
      new PropertySchema({
        'type': PreParsedType.PROPERTY,
        'config': {
          'name': 'a'
        }
      }, new MockSubSchema()).generateSchema()
    ).toEqual(
      {
        'properties': {
          'a': {
            'key': 'value'
          }
        }
      }
    );
  });
});
describe('ArrayProperty', () => {
  it('property with a sub property', () => {
    class MockSubSchema extends AbstractSchema {
      generateSchema() {
        return { 'key': 'value' };
      }
    }
    expect(
      new ArraySchema(new MockSubSchema()).generateSchema()
    ).toEqual(
      {
        'type': 'array',
        'items': {
          'key': 'value'
        }
      }
    );
  });
});
