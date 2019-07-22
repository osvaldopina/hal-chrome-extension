// import { PropertyExpectation } from './schemaPropertiesPaserTestUtils';
import { parsePropertyDefinition, preParsePropertyDefinition, getPropertyName, PreParsedType } from './schemaPropertiesParser';

describe('preParsePropertyDefinition', () => {
  it('simple string property: a', () => {
    expect(
      preParsePropertyDefinition({ name: 'a' })
    ).toEqual(
      [
        { 'type': PreParsedType.OBJECT },
        { 'type': PreParsedType.PROPERTY, 'config': { 'name': 'a' } },
        { 'type': PreParsedType.STRING, 'config': { 'title': 'a' } }
      ]
    );
  });
  it('simple string property with defintions: a', () => {
    expect(
      preParsePropertyDefinition({ name: 'a', required: true, regex: 'd+', prompt: 'prompt', value: 'a-value' })
    ).toEqual(
      [
        { 'type': PreParsedType.OBJECT },
        { 'type': PreParsedType.PROPERTY, 'config': { 'name': 'a' } },
        { 'type': PreParsedType.STRING, 'config': { 'title': 'prompt', 'pattern': 'd+', 'required': true, 'value': 'a-value' } }
      ]
    );
  });
  it('object and string property: a.b', () => {
    expect(
      preParsePropertyDefinition({ name: 'a.b' })
    ).toEqual(
      [
        { 'type': PreParsedType.OBJECT },
        { 'type': PreParsedType.PROPERTY, 'config': { 'name': 'a' } },
        { 'type': PreParsedType.OBJECT },
        { 'type': PreParsedType.PROPERTY, 'config': { 'name': 'b' } },
        { 'type': PreParsedType.STRING, 'config': { 'title': 'b' } }
      ]
    );
  });
  it('two objects and string property: a.b.c', () => {
    expect(
      preParsePropertyDefinition({ name: 'a.b.c' })
    ).toEqual(
      [
        { 'type': PreParsedType.OBJECT },
        { 'type': PreParsedType.PROPERTY, 'config': { 'name': 'a' } },
        { 'type': PreParsedType.OBJECT },
        { 'type': PreParsedType.PROPERTY, 'config': { 'name': 'b' } },
        { 'type': PreParsedType.OBJECT },
        { 'type': PreParsedType.PROPERTY, 'config': { 'name': 'c' } },
        { 'type': PreParsedType.STRING, 'config': { 'title': 'c' } }
      ]
    );
  });
  it('anonymous array property: []', () => {
    expect(
      preParsePropertyDefinition({ name: '[]', prompt: 'prompt' })
    ).toEqual(
      [
        { 'type': PreParsedType.ARRAY },
        { 'type': PreParsedType.STRING, 'config': { 'title': 'prompt' } }
      ]
    );
  });
  it('anonymous array property and a string property: [].a', () => {
    expect(
      preParsePropertyDefinition({ name: '[].a' })
    ).toEqual(
      [
        { 'type': PreParsedType.ARRAY },
        { 'type': PreParsedType.OBJECT },
        { 'type': PreParsedType.PROPERTY, 'config': { 'name': 'a' } },
        { 'type': PreParsedType.STRING, 'config': { 'title': 'a' } }
      ]
    );
  });
  it('one named array property: a[]', () => {
    expect(
      preParsePropertyDefinition({ name: 'a[]' })
    ).toEqual(
      [
        { 'type': PreParsedType.OBJECT },
        { 'type': PreParsedType.PROPERTY, 'config': { 'name': 'a' } },
        { 'type': PreParsedType.ARRAY },
        { 'type': PreParsedType.STRING, 'config': { 'title': 'a' } }
      ]
    );
  });
  it('named array and string property: a[].b', () => {
    expect(
      preParsePropertyDefinition({ name: 'a[].b' })
    ).toEqual(
      [
        { 'type': PreParsedType.OBJECT },
        { 'type': PreParsedType.PROPERTY, 'config': { 'name': 'a' } },
        { 'type': PreParsedType.ARRAY },
        { 'type': PreParsedType.OBJECT },
        { 'type': PreParsedType.PROPERTY, 'config': { 'name': 'b' } },
        { 'type': PreParsedType.STRING, 'config': { 'title': 'b' } }
      ]
    );
  });
  it('object property and named array: a.b[]', () => {
    expect(
      preParsePropertyDefinition({ name: 'a.b[]' })
    ).toEqual(
      [
        { 'type': PreParsedType.OBJECT },
        { 'type': PreParsedType.PROPERTY, 'config': { 'name': 'a' } },
        { 'type': PreParsedType.OBJECT },
        { 'type': PreParsedType.PROPERTY, 'config': { 'name': 'b' } },
        { 'type': PreParsedType.ARRAY },
        { 'type': PreParsedType.STRING, 'config': { 'title': 'b' } }
      ]
    );
  });
  it('object property, array property, string property: a.b[].c', () => {
    expect(
      preParsePropertyDefinition({ name: 'a.b[].c' })
    ).toEqual(
      [
        { 'type': PreParsedType.OBJECT },
        { 'type': PreParsedType.PROPERTY, 'config': { 'name': 'a' } },
        { 'type': PreParsedType.OBJECT },
        { 'type': PreParsedType.PROPERTY, 'config': { 'name': 'b' } },
        { 'type': PreParsedType.ARRAY },
        { 'type': PreParsedType.OBJECT },
        { 'type': PreParsedType.PROPERTY, 'config': { 'name': 'c' } },
        { 'type': PreParsedType.STRING, 'config': { 'title': 'c' } }
      ]
    );
  });
});
describe('utility functions', () => {
  it('getPropertyName without name', () => {
    expect(getPropertyName('string', 'string')).toBeNull();
  });
  it('getPropertyName with name', () => {
    expect(getPropertyName('string', 'string:a')).toBe('a');
  });
});
describe('parsePropertyDefinition', () => {
  it('simple string property: a', () => {
    expect(
      parsePropertyDefinition({ name: 'a' }).generateSchema()
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
  it('simple string property with defintions: a', () => {

    expect(
      parsePropertyDefinition({ name: 'a', value: 'a-value', required: true, regex: 'd+', prompt: 'prompt' }).generateSchema()
    ).toEqual(
      {
        'type': 'object',
        'properties': {
          'a': {
            'type': 'string',
            'pattern': 'd+',
            'title': 'prompt',
            'value': 'a-value',
            'required': true
          }
        }
      }
    );
  });
  it('object and string property: a.b', () => {
    expect(
      parsePropertyDefinition({ name: 'a.b' }).generateSchema()
    ).toEqual(
      {
        'type': 'object',
        'properties': {
          'a': {
            'type': 'object',
            'properties': {
              'b': {
                'type': 'string',
                'title': 'b'
              }
            }
          }
        }
      }
    );
  });
  it('two objects and string property: a.b.c', () => {
    expect(
      parsePropertyDefinition({ name: 'a.b.c' }).generateSchema()
    ).toEqual(
      {
        'type': 'object',
        'properties': {
          'a': {
            'type': 'object',
            'properties': {
              'b': {
                'type': 'object',
                'properties': {
                  'c': {
                    'type': 'string',
                    'title': 'c'
                  }
                }
              }
            }
          }
        }
      }
    );
  });
  it('anonymous array property: []', () => {
    expect(
      parsePropertyDefinition({ name: '[]', prompt: 'prompt' }).generateSchema()
    ).toEqual(
      {
        'type': 'array',
        'items': {
          'type': 'string',
          'title': 'prompt'
        }
      }
    );
  });
  it('anonymous array property and a string property: [].a', () => {
    expect(
      parsePropertyDefinition({ name: '[].a' }).generateSchema()
    ).toEqual(
      {
        'type': 'array',
        'items': {
          'type': 'object',
          'properties': {
            'a': {
              'type': 'string',
              'title': 'a'
            }
          }
        }
      }
    );
  });
  it('one named array property: a[]', () => {
    expect(
      parsePropertyDefinition({ name: 'a[]' }).generateSchema()
    ).toEqual(
      {
        'type': 'object',
        'properties': {
          'a': {
            'type': 'array',
            'items': {
              'type': 'string',
              'title': 'a'
            }
          }
        }
      }
    );
  });
  it('named array and string property: a[].b', () => {
    expect(
      parsePropertyDefinition({ name: 'a[].b' }).generateSchema()
    ).toEqual(
      {
        'type': 'object',
        'properties': {
          'a': {
            'type': 'array',
            'items': {
              'type': 'object',
              'properties': {
                'b': {
                  'type': 'string',
                  'title': 'b'
                }
              }
            }
          }
        }
      }
    );
  });
  it('object property and named array: a.b[]', () => {
    expect(
      parsePropertyDefinition({ name: 'a.b[]' }).generateSchema()
    ).toEqual(
      {
        'type': 'object',
        'properties': {
          'a': {
            'type': 'object',
            'properties': {
              'b': {
                'type': 'array',
                'items': {
                  'type': 'string',
                  'title': 'b'
                }
              }
            }
          }
        }
      }
    );
  });
  it('object property, array property, string property: a.b[].c', () => {
    expect(
      parsePropertyDefinition({ name: 'a.b[].c' }).generateSchema()
    ).toEqual(
      {
        'type': 'object',
        'properties': {
          'a': {
            'type': 'object',
            'properties': {
              'b': {
                'type': 'array',
                'items': {
                  'type': 'object',
                  'properties': {
                    'c': {
                      'type': 'string',
                      'title': 'c'
                    }
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

