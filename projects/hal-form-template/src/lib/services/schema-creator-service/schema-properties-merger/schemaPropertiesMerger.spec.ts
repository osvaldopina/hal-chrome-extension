import { merge } from './schemaPropertiesMerger';

describe('deep object merge', () => {
  it('null value', () => {
    expect(
      merge(null)
    ).toEqual({});
  });
  it('empty array', () => {
    expect(
      merge([])
    ).toEqual({});
  });
  it('only one empty object', () => {
    expect(
      merge([{}])
    ).toEqual({});
  });
  it('two objects', () => {
    expect(
      merge([{
        a: 'a value'
      },
      {
        b: 'b value'
      }])
    ).toEqual({
      a: 'a value',
      b: 'b value'
    });
  });
  it('two objects with array', () => {
    expect(
      merge([
        {
          title: [
            {
              a: 'a value'
            }
          ]
        },
        {
          title: [
            {
              b: 'b value'
            }
          ]
        }
      ])
    ).toEqual({
      title: [
        {
          a: 'a value',
          b: 'b value'
        }
      ]
    });
  });
});
