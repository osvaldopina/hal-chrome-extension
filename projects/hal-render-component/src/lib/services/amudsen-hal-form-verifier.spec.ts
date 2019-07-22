import {
  checkAmundsenTemplateProperties, checkAmundsenHalFormTemplate,
  isAmundsenHalForm
} from './amudsen-hal-form-verifier';

describe('amudsen hal form verifier', () => {
  it('checkAmundsenTemplateProperties valid properties', () => {
    expect(checkAmundsenTemplateProperties([{ 'name': 'a-name' }])).toBeTruthy();
  });
  it('checkAmundsenTemplateProperties invalid properties - no name property', () => {
    expect(checkAmundsenTemplateProperties([{ 'property': 'a-name' }])).toBeFalsy();
  });

  it('checkAmudsenHalFormTemplate invalid template - no method', () => {
    expect(checkAmundsenHalFormTemplate({ 'property': 'a-value' })).toBeFalsy();
  });
  it('checkAmudsenHalFormTemplate invalid template - properties is not a array', () => {
    expect(checkAmundsenHalFormTemplate({
      'method': 'GET',
      'properties': {
      }
    })).toBeFalsy();
  });
  it('checkAmudsenHalFormTemplate valid template - no properties', () => {
    expect(checkAmundsenHalFormTemplate({
      'method': 'GET'
    })).toBeTruthy();
  });
  it('checkAmudsenHalFormTemplate valid template - properties as array', () => {
    expect(checkAmundsenHalFormTemplate({
      'method': 'GET',
      'properties': [{
        'name': 'a-name'
      }]
    })).toBeTruthy();
  });
  it('checkAmudsenHalFormTemplate valid template - properties as array', () => {
    expect(checkAmundsenHalFormTemplate({
      'method': 'GET',
      'properties': [{
        'name': 'a-name'
      }]
    })).toBeTruthy();
  });

  it('isAmundsenHalForm - invalid template - no _templates', () => {
    expect(isAmundsenHalForm({
    })).toBeFalsy();
  });
  it('isAmundsenHalForm - invalid template - empty _templates', () => {
    expect(isAmundsenHalForm({
      '_templates': {
      }
    })).toBeFalsy();
  });
  it('isAmundsenHalForm - invalid template - no method', () => {
    expect(isAmundsenHalForm({
      '_templates': {
        'template': {
          'properties': [
            { 'name': 'a-name' }
          ]
        }
      }
    })).toBeFalsy();
  });
  it('isAmundsenHalForm - valid template - no properties', () => {
    expect(isAmundsenHalForm({
      '_templates': {
        'template': {
          'method': 'GET'
        }
      }
    })).toBeTruthy();
  });
  it('isAmundsenHalForm - valid template - with properties', () => {
    expect(isAmundsenHalForm({
      '_templates': {
        'template': {
          'method': 'GET',
          'properties': [
            { 'name': 'a-name' }
          ]
        }
      }
    })).toBeTruthy();
  });
});


