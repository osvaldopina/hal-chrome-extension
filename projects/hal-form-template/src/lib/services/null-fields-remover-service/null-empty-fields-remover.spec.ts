import { removeNullAndEmpty } from './null-empty-fields-remover';

describe('null and empty fields remover', () => {
  it('empty object', () => {
    expect(
      removeNullAndEmpty({})
    )
      .toEqual({});
  });
  it('object with null field', () => {
    expect(
      removeNullAndEmpty({
        'a': null,
        'b': 'b-string'
      })
    )
      .toEqual({
        'b': 'b-string'
      });
  });
  it('object with empty string', () => {
    expect(
      removeNullAndEmpty({
        'a': null,
        'b': ''
      })
    )
      .toEqual({});
  });
  it('object with null field', () => {
    expect(
      removeNullAndEmpty({
        'a': null,
        'b': 'b-string',
        'c': {
          'd': null
        }
      })
    )
      .toEqual({
        'b': 'b-string',
      });
  });
  it('object with empty array', () => {
    expect(
      removeNullAndEmpty({
        'a': ['a-string'],
        'b': {
          'c': {
            'd': []
          }
        }

      })
    )
      .toEqual({
        'a': ['a-string']
      });
  });
  it('complex object', () => {
    expect(
      removeNullAndEmpty({
        'a': null,
        'b': 'b-string',
        'c': {
          'd': null,
          'e': null,
          'f': {
            'g': 'g-string'
          }
        }
      })
    )
      .toEqual({
        'b': 'b-string',
        'c': {
          'f': {
            'g': 'g-string'
          }
        }
      });
  });
});
