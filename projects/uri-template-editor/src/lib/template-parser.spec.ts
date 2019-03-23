import * as URITemplate from 'urijs/src/URITemplate';
import { parse, UriText, UriVariable, groupConsecutiveTexts, getTemplateValuesAsObject } from './template-parser';


describe('template parser', () => {
  it('groupConsecutiveTexts without consecutive texts', () => {
    expect(
      groupConsecutiveTexts([new UriText('a'), new UriVariable('b'), new UriText('c')])
    ).
      toEqual(
        [new UriText('a'), new UriVariable('b'), new UriText('c')]
      );
  });
  it('groupConsecutiveTexts with consecutive texts', () => {
    expect(
      groupConsecutiveTexts([new UriText('a'), new UriText('b'), new UriText('c'), new UriVariable('d'), new UriText('e'), new UriText('f')])
    ).
      toEqual(
        [new UriText('abc'), new UriVariable('d'), new UriText('ef')]
      );
  });
});
describe('template parser', () => {
  it('simple template no operators', () => {
    expect(
      parse(new URITemplate('/order/any?a=1&b=2'))
    ).
      toEqual(
        [new UriText('/order/any?a=1&b=2')]
      );
  });
  it('template with variable without operator', () => {
    expect(
      parse(new URITemplate('/order/{id}/any?a=1&b=2'))
    ).
      toEqual(
        [new UriText('/order/'), new UriVariable('id'), new UriText('/any?a=1&b=2')]
      );
  });
  it('template with ? variable operator', () => {
    expect(
      parse(new URITemplate('/order/{id}/any{?a,b}'))
    ).
      toEqual(
        [new UriText('/order/'), new UriVariable('id'), new UriText('/any?'), new UriVariable('a'), new UriText('&'), new UriVariable('b')]
      );
  });
  it('template with & variable operator', () => {
    expect(
      parse(new URITemplate('/order/{id}/any?a=1{&b,c}'))
    ).
      toEqual(
        [new UriText('/order/'), new UriVariable('id'), new UriText('/any?a=1&'), new UriVariable('b'), new UriText('&'), new UriVariable('c')]
      );
  });
});
describe('template parser', () => {
  it('getTemplateValuesAsObject', () => {
    expect(
      getTemplateValuesAsObject([new UriText('a'), new UriVariable('b', 'value of b'), new UriVariable('c')])
    ).
      toEqual(
        {
          'b' : 'value of b'
        }
      );
  });
});
