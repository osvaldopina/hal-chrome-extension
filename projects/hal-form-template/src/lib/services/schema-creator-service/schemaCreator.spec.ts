import { PropertyDefinition } from './schema-properties-generator/schemaPropertiesGenerator';
import { createSchema } from './schemaCreator';

describe('parsePropertyDefinition', () => {
  it('simple string property', () => {
    const properties: Array<PropertyDefinition> = [{ name: 'a' }];
    expect(
      createSchema(properties)
    ).toEqual(
      {
        'type': 'object',
        'properties': {
          'a': {
            'type': 'string',
            'title': 'a'
          }
        }
      }
    );
  });
  it('complex mix of properties', () => {
    const properties: Array<PropertyDefinition> = [
      { name: 'a', prompt: 'a-prompt', regex: 'd+', required: true },
      { name: 'b.d[].e', prompt: 'e-prompt' },
      { name: 'b.f.g' }
    ];
    expect(
      createSchema(properties)
    ).toEqual(
      {
        'type': 'object',
        'properties': {
          'a': {
            'type': 'string',
            'title': 'a-prompt',
            'pattern': 'd+',
            'required': true
          },
          'b': {
            'type': 'object',
            'properties': {
              'd': {
                'type': 'array',
                'items': {
                  'type': 'object',
                  'properties': {
                    'e': {
                      'type': 'string',
                      'title': 'e-prompt'
                    }
                  }
                }
              },
              'f': {
                'type': 'object',
                'properties': {
                  'g': {
                    'type': 'string',
                    'title': 'g'
                  }
                }
              }
            }
          }
        }
      }
    );
  });
});
