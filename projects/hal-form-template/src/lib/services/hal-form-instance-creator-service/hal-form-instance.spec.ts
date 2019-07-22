import { HalFormTemplate } from './../hal-form-template-extractor-service/hal-form-template-extractor';
import { HalFormInstance } from './hal-form-instance';

describe('HalFormInstance', () => {

  it('must throw exception when method is GET and contentType is informed', () => {
    expect(() => {
      const x = new HalFormInstance({
        'id': '1',
        'name': 'any-name',
        'href': 'http://',
        'template': {
          'method': 'GET',
          'contentType': 'application/json'
        }
      });
    }).toThrowError(
      'If method is GET then contentType must not be informed!'
    );
  });
  it('must throw exception when method is POST and contentType is not application/xml nor application/x-www-form-urlencoded', () => {
    expect(() => {
      const x = new HalFormInstance({
        'id': '1',
        'name': 'any-name',
        'href': 'http://',
        'template': {
          'method': 'POST',
          'contentType': 'invalid'
        }
      });
    }).toThrowError(
      'If method is POST or PUT then contentType must be either application/json or application/x-www-form-urlencoded'
    );
  });
  it('post method and application/json content-type', () => {
    const halFormInstance = new HalFormInstance({
      'id': '1',
      'name': 'any-name',
      'href': 'http://',
      'template': {
        'method': 'POST',
        'contentType': 'application/json'
      }
    });
    halFormInstance.setFormData({ 'a': 'a-value' });
    expect(JSON.parse(halFormInstance.getPayload())).toEqual({ 'a': 'a-value' });
    expect(halFormInstance.getURL()).toEqual('http://');
  });
  it('post method and application/x-www-form-urlencoded', () => {
    const halFormInstance = new HalFormInstance({
      'id': '1',
      'name': 'any-name',
      'href': 'http://',
      'template': {
        'method': 'POST',
        'contentType': 'application/x-www-form-urlencoded'
      }
    });
    halFormInstance.setFormData({ 'a': 'a-value' });
    expect(halFormInstance.getPayload()).toEqual('a=a-value');
    expect(halFormInstance.getURL()).toEqual('http://');
  });
  it('get method', () => {
    const halFormInstance = new HalFormInstance({
      'id': '1',
      'name': 'any-name',
      'href': 'http://localhost',
      'template': {
        'method': 'GET'
      }
    });
    halFormInstance.setFormData({ 'a': 'a-value' });
    expect(halFormInstance.getPayload()).toBeNull();
    expect(halFormInstance.getURL()).toEqual('http://localhost?a=a-value');
  });
  it('post method and application/json content-type with subsequent change in data', () => {
    const halFormInstance = new HalFormInstance({
      'id': '1',
      'name': 'any-name',
      'href': 'http://',
      'template': {
        'method': 'POST',
        'contentType': 'application/json'
      }
    });
    halFormInstance.setFormData({ 'a': 'a-value' });
    expect(JSON.parse(halFormInstance.getPayload())).toEqual({ 'a': 'a-value' });
    expect(halFormInstance.getURL()).toEqual('http://');

    halFormInstance.setFormData({ 'b': 'b-value' });
    expect(JSON.parse(halFormInstance.getPayload())).toEqual({ 'b': 'b-value' });
    expect(halFormInstance.getURL()).toEqual('http://');
  });
  it('post method and application/x-www-form-urlencoded with subsequent change in data', () => {
    const halFormInstance = new HalFormInstance({
      'id': '1',
      'name': 'any-name',
      'href': 'http://',
      'template': {
        'method': 'POST',
        'contentType': 'application/x-www-form-urlencoded'
      }
    });
    halFormInstance.setFormData({ 'a': 'a-value' });
    expect(halFormInstance.getPayload()).toEqual('a=a-value');
    expect(halFormInstance.getURL()).toEqual('http://');

    halFormInstance.setFormData({ 'b': 'b-value' });
    expect(halFormInstance.getPayload()).toEqual('b=b-value');
    expect(halFormInstance.getURL()).toEqual('http://');
  });
  it('get method with subsequent change in data', () => {
    const halFormInstance = new HalFormInstance({
      'id': '1',
      'name': 'any-name',
      'href': 'http://localhost',
      'template': {
        'method': 'GET'
      }
    });
    halFormInstance.setFormData({ 'b': 'b-value' });
    expect(halFormInstance.getPayload()).toBeNull();
    expect(halFormInstance.getURL()).toEqual('http://localhost?b=b-value');
  });
});
