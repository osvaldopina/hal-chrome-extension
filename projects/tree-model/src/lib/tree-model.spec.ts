import {
  buildJsonTree,
  JsonElementType,
  jsonNodeElementFactory,
  buildHalLinksJsonTree,
  HalElementType,
  halNodeElementFactory,
  JsonElementNode,
  buildHalLinkProperty,
  buildHalLinkProperties,
  buildHalJsonTree,
  buildHalEmbeddedJsonTree,
  getCurieName,
  Curie,
  Curies
} from './tree-model';

describe('buildJsonTree', () => {
  it('buildJsonTree for a null value', () => {

    expect(
      buildJsonTree(null)
    ).toEqual(
      jsonNodeElementFactory('root', JsonElementType.Null, null, [], true)
    );

  });
  it('buildJsonTree for a string', () => {

    expect(
      buildJsonTree('a single string')
    ).toEqual(
      jsonNodeElementFactory('root', JsonElementType.String, 'a single string', [], true)
    );

  });
  it('buildJsonTree for a number', () => {

    expect(
      buildJsonTree(123)
    ).toEqual(
      jsonNodeElementFactory('root', JsonElementType.Number, '123', [], true)
    );

  });
  it('buildJsonTree for a boolean', () => {

    expect(
      buildJsonTree(false)
    ).toEqual(
      jsonNodeElementFactory('root', JsonElementType.Boolean, 'false', [], true)
    );

  });
  it('buildJsonTree for a empty object', () => {

    expect(
      buildJsonTree({})
    ).toEqual(
      jsonNodeElementFactory('root', JsonElementType.Object, null, [], true)
    );


  });
  it('buildJsonTree for an object with some properties', () => {

    expect(
      buildJsonTree({
        aStringProperty: 'a string value',
        aNumberProperty: 123,
        aBooleanProperty: true,
        aNullProperty: null,
        aSubObject: {
          aSubObjectStringProperty: 'a sub object string property'
        },
        aArray: [
          'a array item'
        ]
      })
    ).toEqual(
      jsonNodeElementFactory('root', JsonElementType.Object, null, [
        jsonNodeElementFactory('aStringProperty', JsonElementType.String, 'a string value', [], false),
        jsonNodeElementFactory('aNumberProperty', JsonElementType.Number, '123', [], false),
        jsonNodeElementFactory('aBooleanProperty', JsonElementType.Boolean, 'true', [], false),
        jsonNodeElementFactory('aNullProperty', JsonElementType.Null, null, [], false),
        jsonNodeElementFactory('aSubObject', JsonElementType.Object, null, [
          jsonNodeElementFactory('aSubObjectStringProperty', JsonElementType.String, 'a sub object string property', [], true)
        ], false),
        jsonNodeElementFactory('aArray', JsonElementType.Array, null, [
          jsonNodeElementFactory(null, JsonElementType.String, 'a array item', [], true)
        ], true)
      ], true
      )
    );
  });
  it('buildJsonTree for an empty array', () => {

    expect(
      buildJsonTree([])
    ).toEqual(
      jsonNodeElementFactory('root', JsonElementType.Array, null, [], true)
    );

  });
  it('buildJsonTree for an array with some elements', () => {

    expect(
      buildJsonTree([
        'a string',
        123,
        true,
        null,
        {
          aStringProperty: 'a string property value'
        }
      ])
    ).toEqual(
      jsonNodeElementFactory('root', JsonElementType.Array, null, [
        jsonNodeElementFactory(null, JsonElementType.String, 'a string', [], false),
        jsonNodeElementFactory(null, JsonElementType.Number, '123', [], false),
        jsonNodeElementFactory(null, JsonElementType.Boolean, 'true', [], false),
        jsonNodeElementFactory(null, JsonElementType.Null, null, [], false),
        jsonNodeElementFactory(null, JsonElementType.Object, null, [
          jsonNodeElementFactory('aStringProperty', JsonElementType.String, 'a string property value', [], true)
        ], true)
      ], true
      )
    );
  });
});
describe('buildHalLinkProperties', () => {
  it('buildHalLinkProperties for an single link with a object no templated link property', () => {
    expect(
      buildHalLinkProperties({
        'href': 'http://href-url',
        'templated': false,
        'type': 'link type',
        'deprecation': 'http://deprecation-url',
        'name': 'link name',
        'profile': 'http://profile-url',
        'title': 'link title',
        'hreflang': 'link hreflang'
      })
    ).toEqual(
      [
        halNodeElementFactory('href', JsonElementType.String, HalElementType.LinkHref, 'http://href-url', [], false),
        jsonNodeElementFactory('templated', JsonElementType.Boolean, 'false', [], false),
        jsonNodeElementFactory('type', JsonElementType.String, 'link type', [], false),
        halNodeElementFactory('deprecation', JsonElementType.String, HalElementType.PropertyUrl, 'http://deprecation-url', [], false),
        jsonNodeElementFactory('name', JsonElementType.String, 'link name', [], false),
        halNodeElementFactory('profile', JsonElementType.String, HalElementType.PropertyUrl, 'http://profile-url', [], false),
        jsonNodeElementFactory('title', JsonElementType.String, 'link title', [], false),
        jsonNodeElementFactory('hreflang', JsonElementType.String, 'link hreflang', [], true)
      ]
    );
  });
  it('buildHalLinksJsonTree for an single link with a object with templated link property', () => {
    expect(
      buildHalLinkProperties({
        'href': 'http://href-url',
        'templated': true,
        'type': 'link type',
        'deprecation': 'http://deprecation-url',
        'name': 'link name',
        'profile': 'http://profile-url',
        'title': 'link title',
        'hreflang': 'link hreflang'
      })
    ).toEqual(
      [
        halNodeElementFactory('href', JsonElementType.String, HalElementType.TemplatedLinkHref, 'http://href-url', [], false),
        jsonNodeElementFactory('templated', JsonElementType.Boolean, 'true', [], false),
        jsonNodeElementFactory('type', JsonElementType.String, 'link type', [], false),
        halNodeElementFactory('deprecation', JsonElementType.String, HalElementType.PropertyUrl, 'http://deprecation-url', [], false),
        jsonNodeElementFactory('name', JsonElementType.String, 'link name', [], false),
        halNodeElementFactory('profile', JsonElementType.String, HalElementType.PropertyUrl, 'http://profile-url', [], false),
        jsonNodeElementFactory('title', JsonElementType.String, 'link title', [], false),
        jsonNodeElementFactory('hreflang', JsonElementType.String, 'link hreflang', [], true)
      ]
    );
  });
});
describe('buildHalLinkProperty', () => {
  it('buildHalLinkProperty for a non existing property', () => {
    const jsonElementNodes: JsonElementNode[] = [];
    const linkProperties = {
      'a-property': 'a property value'
    };

    buildHalLinkProperty(jsonElementNodes, linkProperties, 'a-no-existing-property', JsonElementType.String, HalElementType.PropertyUrl);

    expect(jsonElementNodes).toEqual([]);

  });
  it('buildHalLinkProperty for a valid string property', () => {
    const jsonElementNodes: JsonElementNode[] = [];
    const linkProperties = {
      'a-property': 'a property value'
    };

    buildHalLinkProperty(jsonElementNodes, linkProperties, 'a-property', JsonElementType.String, HalElementType.PropertyUrl);

    expect(jsonElementNodes).
      toEqual([halNodeElementFactory('a-property', JsonElementType.String, HalElementType.PropertyUrl, 'a property value', [], false)]);

  });
  it('buildHalLinkProperty for a valid boolean property', () => {
    const jsonElementNodes: JsonElementNode[] = [];
    const linkProperties = {
      'a-property': true
    };

    buildHalLinkProperty(jsonElementNodes, linkProperties, 'a-property', JsonElementType.Boolean, HalElementType.PropertyUrl);

    expect(jsonElementNodes).
      toEqual([halNodeElementFactory('a-property', JsonElementType.Boolean, HalElementType.PropertyUrl, 'true', [], false)]);

  });
});
describe('buildHalLinksJsonTree', () => {
  it('buildHalLinksJsonTree for an object links rel ', () => {
    expect(
      buildHalLinksJsonTree({
        '_links': {
          'first-rel': {
            'href': 'first href'
          },
          'second-rel': {
            'href': 'second href'
          }
        }
      })
    ).toEqual(
      jsonNodeElementFactory('_links', JsonElementType.Object, null, [
        halNodeElementFactory('first-rel', JsonElementType.Object, HalElementType.LinkRel, null, [
          halNodeElementFactory('href', JsonElementType.String, HalElementType.LinkHref, 'first href', [], true)
        ], false),
        halNodeElementFactory('second-rel', JsonElementType.Object, HalElementType.LinkRel, null, [
          halNodeElementFactory('href', JsonElementType.String, HalElementType.LinkHref, 'second href', [], true)
        ], true)
      ], false));
  });
  it('buildHalLinksJsonTree for an object links rel with curies', () => {
    expect(
      buildHalLinksJsonTree({
        '_links': {
          'first-rel': {
            'href': 'first href'
          },
          'second-rel': {
            'href': 'second href'
          }
        }
      })
    ).toEqual(
      jsonNodeElementFactory('_links', JsonElementType.Object, null, [
        halNodeElementFactory('first-rel', JsonElementType.Object, HalElementType.LinkRel, null, [
          halNodeElementFactory('href', JsonElementType.String, HalElementType.LinkHref, 'first href', [], true)
        ], false),
        halNodeElementFactory('second-rel', JsonElementType.Object, HalElementType.LinkRel, null, [
          halNodeElementFactory('href', JsonElementType.String, HalElementType.LinkHref, 'second href', [], true)
        ], true)
      ], false));
  });
  it('buildHalLinksJsonTree for an array links rel ', () => {

    expect(buildHalLinksJsonTree({
      '_links': {
        'first-rel': [
          {
            'href': 'first href'
          },
          {
            'href': 'second href'
          }
        ]
      }
    })).toEqual(
      jsonNodeElementFactory('_links', JsonElementType.Object, null, [
        halNodeElementFactory('first-rel', JsonElementType.Array, HalElementType.LinkRel, null, [
          jsonNodeElementFactory(null, JsonElementType.Object, null, [
            halNodeElementFactory('href', JsonElementType.String, HalElementType.LinkHref, 'first href', [], true)
          ], false),
          jsonNodeElementFactory(null, JsonElementType.Object, null, [
            halNodeElementFactory('href', JsonElementType.String, HalElementType.LinkHref, 'second href', [], true)
          ], true),
        ], true),
      ], false)
    );
  });
});
describe('buildHalEmbeddedJsonTree', () => {
  it('buildHalEmbeddedJsonTree for an object links rel ', () => {

    expect(
      buildHalEmbeddedJsonTree({
        '_embedded': {
          'first-rel': {
            'a-property': 'a property value'
          },
          'second-rel': {
            'other-property': 'other property value'
          }

        }
      })
    ).toEqual(
      jsonNodeElementFactory('_embedded', JsonElementType.Object, null, [
        halNodeElementFactory('first-rel', JsonElementType.Object, HalElementType.LinkRel, null, [
          jsonNodeElementFactory('a-property', JsonElementType.String, 'a property value', [], true)
        ], false),
        halNodeElementFactory('second-rel', JsonElementType.Object, HalElementType.LinkRel, null, [
          jsonNodeElementFactory('other-property', JsonElementType.String, 'other property value', [], true)
        ], true),
      ], false)
    );
  });
  it('buildHalEmbeddedJsonTree for an array _embedded rel', () => {
    console.log(buildHalEmbeddedJsonTree({
      '_embedded': {
        'first-rel': [
          {
            'first-property': 'first property value'
          },
          {
            'second-property': 'second property value'
          }
        ]
      }
    }));
    expect(
      buildHalEmbeddedJsonTree({
        '_embedded': {
          'first-rel': [
            {
              'first-property': 'first property value'
            },
            {
              'second-property': 'second property value'
            }
          ]
        }
      })
    ).toEqual(
      jsonNodeElementFactory('_embedded', JsonElementType.Object, null, [
        halNodeElementFactory('first-rel', JsonElementType.Array, HalElementType.LinkRel, null, [
          jsonNodeElementFactory(null, JsonElementType.Object, null, [
            jsonNodeElementFactory('first-property', JsonElementType.String, 'first property value', [], true)
          ], false),
          jsonNodeElementFactory(null, JsonElementType.Object, null, [
            jsonNodeElementFactory('second-property', JsonElementType.String, 'second property value', [], true)
          ], true),
        ], true),
      ], false));
  });
  it('buildHalEmbeddedJsonTree for embedded array with _links', () => {
    expect(
      buildHalEmbeddedJsonTree({
        '_embedded': {
          'rel': [{
            '_links': {
              'self': { 'href': '/orders/123' }
            }
          }]
        }
      })
    ).toEqual(

      jsonNodeElementFactory('_embedded', JsonElementType.Object, null, [
        halNodeElementFactory('rel', JsonElementType.Array, HalElementType.LinkRel, null, [
          jsonNodeElementFactory(null, JsonElementType.Object, null, [
            jsonNodeElementFactory('_links', JsonElementType.Object, null, [
              halNodeElementFactory('self', JsonElementType.Object, HalElementType.LinkRel, null, [
                halNodeElementFactory('href', JsonElementType.String, HalElementType.LinkHref, '/orders/123', [], true)
              ], true)
            ], true),
          ], true),
        ], true),
      ], false));
  });
  it('buildHalEmbeddedJsonTree for embedded object with _links', () => {
    expect(
      buildHalEmbeddedJsonTree({
        '_embedded': {
          'rel': {
            '_links': {
              'self': { 'href': '/orders/123' }
            }
          }
        }
      })
    ).toEqual(

      jsonNodeElementFactory('_embedded', JsonElementType.Object, null, [
        halNodeElementFactory('rel', JsonElementType.Object, HalElementType.LinkRel, null, [
          jsonNodeElementFactory('_links', JsonElementType.Object, null, [
            halNodeElementFactory('self', JsonElementType.Object, HalElementType.LinkRel, null, [
              halNodeElementFactory('href', JsonElementType.String, HalElementType.LinkHref, '/orders/123', [], true)
            ], true)
          ], true),
        ], true),
      ], false));
  });
});
describe('buildHalJsonTree', () => {
  it('buildHalJsonTree for an complete hal object', () => {

    expect(
      buildHalJsonTree({
        '_links': {
          'curies': [{
            'name': 'curie-name',
            'href': 'http://curie-href',
            'templated': true
          }],
          'curie-name:curie-parameter': {
            'href': 'http://self-url'
          },
          'an-array-link-rel': [
            {
              'href': 'http://one-array-link-rel-url'
            },
            {
              'href': 'http://other-array-link-rel-url'
            }
          ]
        },
        '_embedded': {
          'a-embedded-rel': {
            'a-property': 'a property value'
          },
          'curie-name:other-embedded-rel': [
            {
              'first-property': 'first property value'
            },
            {
              'second-property': 'second property value'
            }
          ]
        },
        'string-property': 'string property value',
        'boolean-property': true,
        'array-property': [
          'first-array-item',
          false,
          123
        ],
        'a-sub-object': {
          'a-sub-object-property': 'a sub object property value'
        }
      },
        new Curies(),
        true)
      ).toEqual(
        jsonNodeElementFactory('root', JsonElementType.Root, null, [
          jsonNodeElementFactory('string-property', JsonElementType.String, 'string property value', [], false),
          jsonNodeElementFactory('boolean-property', JsonElementType.Boolean, 'true', [], false),
          jsonNodeElementFactory('array-property', JsonElementType.Array, null, [
            jsonNodeElementFactory(null, JsonElementType.String, 'first-array-item', [], false),
            jsonNodeElementFactory(null, JsonElementType.Boolean, 'false', [], false),
            jsonNodeElementFactory(null, JsonElementType.Number, '123', [], true),
          ], false),
          jsonNodeElementFactory('a-sub-object', JsonElementType.Object, null, [
            jsonNodeElementFactory('a-sub-object-property', JsonElementType.String, 'a sub object property value', [], true),
          ], false),
          jsonNodeElementFactory('_links', JsonElementType.Object, null, [
            halNodeElementFactory('curie-name:curie-parameter', JsonElementType.Object, HalElementType.LinkRel, null, [
              halNodeElementFactory('href', JsonElementType.String, HalElementType.LinkHref, 'http://self-url', [], true)
            ], false, new Curie('curie-name', 'http://curie-href', true)),
            halNodeElementFactory('an-array-link-rel', JsonElementType.Array, HalElementType.LinkRel, null, [
              jsonNodeElementFactory(null, JsonElementType.Object, null, [
                halNodeElementFactory('href', JsonElementType.String, HalElementType.LinkHref, 'http://one-array-link-rel-url', [], true)
              ], false),
              jsonNodeElementFactory(null, JsonElementType.Object, null, [
                halNodeElementFactory('href', JsonElementType.String, HalElementType.LinkHref, 'http://other-array-link-rel-url', [], true)
              ], true)
            ], true)
          ], false),
          jsonNodeElementFactory('_embedded', JsonElementType.Object, null, [
            halNodeElementFactory('a-embedded-rel', JsonElementType.Object, HalElementType.LinkRel, null, [
              jsonNodeElementFactory('a-property', JsonElementType.String, 'a property value', [], true),
            ], false),
            halNodeElementFactory('curie-name:other-embedded-rel', JsonElementType.Array, HalElementType.LinkRel, null, [
              jsonNodeElementFactory(null, JsonElementType.Object, null, [
                jsonNodeElementFactory('first-property', JsonElementType.String, 'first property value', [], true)
              ], false),
              jsonNodeElementFactory(null, JsonElementType.Object, null, [
                jsonNodeElementFactory('second-property', JsonElementType.String, 'second property value', [], true)
              ], true),
            ], true, new Curie('curie-name', 'http://curie-href', true))
          ], true)
        ], true));
  });
});
describe('isCuriedRel', () => {
  it('isCuriedRel for a rel without curie', () => {
    expect(
      getCurieName('no-curied-rel')
    ).toBeNull();
  });
  it('isCuriedRel for a rel with curie', () => {
    expect(
      getCurieName('curie:parameter')
    ).toBe('curie');
  });
});
