import { extractTemplates } from './hal-form-template-extractor';

describe('extractTemplates', () => {
  it('extract simple default template', () => {
    expect(
      extractTemplates({
        '_links': {
          'self': {
            'href': 'http://api.example.org/rels/create'
          }
        },
        '_templates': {
          'default': {
            'title': 'Create',
            'method': 'POST',
            'contentType': 'application/json',
            'properties': [
              { 'name': 'title', 'required': true, 'value': '', 'prompt': 'Title', 'regex': '', 'templated': false },
              { 'name': 'completed', 'required': false, 'value': 'false', 'prompt': 'Completed', 'regex': '' }
            ]
          }
        }
      })
    ).toEqual(
      [
        {
          'id': '1',
          'name': 'default',
          'href': 'http://api.example.org/rels/create',
          'template': {
            'title': 'Create',
            'method': 'POST',
            'contentType': 'application/json',
            'properties': [
              { 'name': 'title', 'required': true, 'value': '', 'prompt': 'Title', 'regex': '', 'templated': false },
              { 'name': 'completed', 'required': false, 'value': 'false', 'prompt': 'Completed', 'regex': '' }
            ]
          }
        }
      ]
    );
  });
  it('extract 2 templates', () => {
    expect(
      extractTemplates({
        '_links': {
          'self': {
            'href': 'http://api.example.org/rels/create'
          }
        },
        '_templates': {
          'default': {
            'title': 'Create',
            'method': 'POST',
            'contentType': 'application/json',
            'properties': [
              { 'name': 'title', 'required': true, 'value': '', 'prompt': 'Title', 'regex': '', 'templated': false },
              { 'name': 'completed', 'required': false, 'value': 'false', 'prompt': 'Completed', 'regex': '' }
            ]
          },
          'other': {
            'title': 'other-create',
            'method': 'GET',
            'properties': [
              { 'name': 'other-name' }
            ]
          }
        }
      })
    ).toEqual(
      [
        {
          'id': '1',
          'name': 'default',
          'href': 'http://api.example.org/rels/create',
          'template': {
            'title': 'Create',
            'method': 'POST',
            'contentType': 'application/json',
            'properties': [
              { 'name': 'title', 'required': true, 'value': '', 'prompt': 'Title', 'regex': '', 'templated': false },
              { 'name': 'completed', 'required': false, 'value': 'false', 'prompt': 'Completed', 'regex': '' }
            ]
          }
        },
        {
          'id': '2',
          'name': 'other',
          'href': 'http://api.example.org/rels/create',
          'template': {
            'title': 'other-create',
            'method': 'GET',
            'properties': [
              { 'name': 'other-name' },
            ]
          }
        }
      ]
    );
  });
  it('extract templates from _embedded - embedded with array', () => {
    expect(
      extractTemplates({
        '_embedded': {
          'http://www.acme.com/rel/employee': [
            {
              'id': 1,
              'firstName': 'Frodo',
              'lastName': 'Baggins',
              'role': 'ring bearer',
              '_links': {
                'self': {
                  'href': 'http://www.acme.com/employee/1'
                }
              },
              '_templates': {
                'default': {
                  'title': 'update employee',
                  'method': 'PUT',
                  'properties': [
                    { 'name': 'firstName', 'required': true },
                    { 'name': 'id', 'required': true },
                    { 'name': 'lastName', 'required': true },
                    { 'name': 'role', 'required': true }
                  ]
                },
                'delete': {
                  'title': 'delete employee',
                  'method': 'DELETE',
                  'properties': []
                }
              }
            }
          ]
        },
        '_links': {
          'self': {
            'href': 'http://www.acem.com/employees'
          }
        },
        '_templates': {
          'default': {
            'title': 'create new employee',
            'method': 'POST',
            'contentType': 'application/json',
            'properties': [
              { 'name': 'firstName', 'required': true },
              { 'name': 'id', 'required': true },
              { 'name': 'lastName', 'required': true },
              { 'name': 'role', 'required': true }
            ]
          }
        }
      })
    ).toEqual(
      [
        {
          'id': '1',
          'name': 'default',
          'href': 'http://www.acem.com/employees',
          'template': {
            'title': 'create new employee',
            'method': 'POST',
            'contentType': 'application/json',
            'properties': [
              { 'name': 'firstName', 'required': true },
              { 'name': 'id', 'required': true },
              { 'name': 'lastName', 'required': true },
              { 'name': 'role', 'required': true }
            ]
          }
        },
        {
          'id': '2',
          'name': 'default',
          'href': 'http://www.acme.com/employee/1',
          'rel': 'http://www.acme.com/rel/employee',
          'template': {
            'title': 'update employee',
            'method': 'PUT',
            'properties': [
              { 'name': 'firstName', 'required': true },
              { 'name': 'id', 'required': true },
              { 'name': 'lastName', 'required': true },
              { 'name': 'role', 'required': true }
            ]
          }
        },
        {
          'id': '3',
          'name': 'delete',
          'href': 'http://www.acme.com/employee/1',
          'rel': 'http://www.acme.com/rel/employee',
          'template': {
            'title': 'delete employee',
            'method': 'DELETE',
            'properties': []
          }
        }
      ]
    );
  });
  it('extract templates from _embedded - embedded with object', () => {
    expect(
      extractTemplates({
        '_embedded': {
          'http://www.acme.com/rel/employee': {
            'id': 1,
            'firstName': 'Frodo',
            'lastName': 'Baggins',
            'role': 'ring bearer',
            '_links': {
              'self': {
                'href': 'http://www.acme.com/employee/1'
              }
            },
            '_templates': {
              'default': {
                'title': 'update employee',
                'method': 'put',
                'properties': [
                  { 'name': 'firstName', 'required': true },
                  { 'name': 'id', 'required': true },
                  { 'name': 'lastName', 'required': true },
                  { 'name': 'role', 'required': true }
                ]
              },
              'delete': {
                'title': 'delete employee',
                'method': 'delete',
                'properties': []
              }
            }
          }
        },
        '_links': {
          'self': {
            'href': 'http://www.acem.com/employees'
          }
        },
        '_templates': {
          'default': {
            'title': 'create new employee',
            'method': 'post',
            'contentType': 'application/json',
            'properties': [
              { 'name': 'firstName', 'required': true },
              { 'name': 'id', 'required': true },
              { 'name': 'lastName', 'required': true },
              { 'name': 'role', 'required': true }
            ]
          }
        }
      })
    ).toEqual(
      [
        {
          'id': '1',
          'name': 'default',
          'href': 'http://www.acem.com/employees',
          'template': {
            'title': 'create new employee',
            'method': 'post',
            'contentType': 'application/json',
            'properties': [
              { 'name': 'firstName', 'required': true },
              { 'name': 'id', 'required': true },
              { 'name': 'lastName', 'required': true },
              { 'name': 'role', 'required': true }
            ]
          }
        },
        {
          'id': '2',
          'name': 'default',
          'href': 'http://www.acme.com/employee/1',
          'rel': 'http://www.acme.com/rel/employee',
          'template': {
            'title': 'update employee',
            'method': 'put',
            'properties': [
              { 'name': 'firstName', 'required': true },
              { 'name': 'id', 'required': true },
              { 'name': 'lastName', 'required': true },
              { 'name': 'role', 'required': true }
            ]
          }
        },
        {
          'id': '3',
          'name': 'delete',
          'href': 'http://www.acme.com/employee/1',
          'rel': 'http://www.acme.com/rel/employee',
          'template': {
            'title': 'delete employee',
            'method': 'delete',
            'properties': []
          }
        }
      ]
    );
  });
});
