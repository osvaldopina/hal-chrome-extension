import { transformObjectToProperties, removeArrayQualifier } from './halFormObjectToProperty';

describe('generate a object with a list of properties from object. ', () => {
  it('empty object', () => {
    expect(
      transformObjectToProperties({})
    ).toEqual(
      {}
    );
  });
  it('object with null property value', () => {
    expect(
      transformObjectToProperties({
        'a': 'null'
      })
    ).toEqual(
      {
        'a': 'null'
      }
    );
  });
  it('object with simple property', () => {
    expect(
      transformObjectToProperties({
        'property': 'property value'
      })
    ).toEqual(
      {
        'property': 'property value'
      }
    );
  });
  it('object with sub property', () => {
    expect(
      transformObjectToProperties({
        'property': {
          'sub-property': 'property value'
        }
      })
    ).toEqual(
      {
        'property.sub-property': 'property value'
      }
    );
  });
  it('object with one element array', () => {
    expect(
      transformObjectToProperties({
        'property': ['value1']
      })
    ).toEqual(
      {
        'property[0]': 'value1'
      }
    );
  });
  it('object with three elements array', () => {
    expect(
      transformObjectToProperties({
        'property': ['value1', 'value2', 'value3']
      })
    ).toEqual(
      {
        'property[0]': 'value1',
        'property[1]': 'value2',
        'property[2]': 'value3'
      }
    );
  });
  it('object with sub property and three elements array', () => {
    expect(
      transformObjectToProperties({
        'property': {
          'sub-property': ['value1', 'value2', 'value3']
        }
      })
    ).toEqual(
      {
        'property.sub-property[0]': 'value1',
        'property.sub-property[1]': 'value2',
        'property.sub-property[2]': 'value3'
      }
    );
  });
});
describe('remove array qualifier from string', () => {
  it('string without array qualifier', () => {
    expect(
      removeArrayQualifier('a.b.c.d')
    ).toBe(
      'a.b.c.d'
    );
  });
  it('string with one array qualifier', () => {
    expect(
      removeArrayQualifier('a.b.c.d[12]')
    ).toBe(
      'a.b.c.d'
    );
  });
  it('string with two array qualifier', () => {
    expect(
      removeArrayQualifier('a.b[345].c.d[12]')
    ).toBe(
      'a.b.c.d'
    );
  });
});
