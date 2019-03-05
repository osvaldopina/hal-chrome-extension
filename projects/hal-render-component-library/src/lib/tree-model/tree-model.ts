export enum JsonElementType {
  Root,
  Object,
  Array,
  String,
  Number,
  Boolean,
  Null,
  LinkRel
}

export enum HalElementType {
  LinkRel,
  LinkHref,
  TemplatedLinkHref,
  PropertyUrl
}

export class JsonElementNode {
  name: string;
  type: JsonElementType;
  halElementType: HalElementType;
  curie: Curie;
  value: string;
  children: JsonElementNode[];
  expanded: boolean;
  lastItem: boolean;
}

export class Curie {

  constructor(public name: string, public href: string, public templated: boolean) { }

}

export class Curies {
  curies: Curie[] = [];

  add(curie: Curie) {
    this.curies.push(curie);
  }

  getCuriesNames() {
    return this.curies.reduce((acum, curie, i) => {
      return acum + (i === 0 ? '' : ', ') + curie.name;
    }, '');
  }

  get(name: string) {
    for (let i = 0; i <= this.curies.length - 1; i++) {
      if (this.curies[i].name === name) {
        return this.curies[i];
      }
    }
    throw new Error(`Could not find curie named ${name}. availabe curies are: ${this.getCuriesNames()}`);
  }

}


export function jsonNodeElementFactory(name: string, type: JsonElementType, value: string, children: JsonElementNode[], lastItem: boolean) {
  const result = new JsonElementNode();
  result.name = name;
  result.type = type;
  result.value = value;
  result.children = children;
  result.expanded = false;
  result.lastItem = lastItem;

  return result;
}

export function halNodeElementFactory(name: string, type: JsonElementType, halElementType: HalElementType,
  value: string, children: JsonElementNode[], lastItem: boolean, curie: Curie = null) {

  const result = new JsonElementNode();
  result.name = name;
  result.type = type;
  if (halElementType != null) {
    result.halElementType = halElementType;
  }
  result.value = value;
  result.children = children;
  result.expanded = false;
  result.lastItem = lastItem;
  if (curie) {
    result.curie = curie;
  }

  return result;
}

export function buildJsonTree(value: any): JsonElementNode {
  return buildJsonNode(value, true, 'root');
}


export function buildHalJsonTree(value: object): JsonElementNode {
  const _links = value['_links'];
  const _embedded = value['_embedded'];
  delete value['_links'];
  delete value['_embedded'];
  const resourceTree = buildJsonTree(value);

  resourceTree.type = JsonElementType.Root;

  if (resourceTree.children.length > 0) {
    resourceTree.children[resourceTree.children.length - 1].lastItem = false;
  }
  let curies;
  if (_links) {
    curies = extractCuries(_links);

    delete _links['curies'];
    resourceTree.children.push(buildHalLinksJsonTree({
      '_links': _links
    }, curies));
  }
  if (_embedded) {
    resourceTree.children.push(buildHalEmbeddedJsonTree({
      '_embedded': _embedded
    }, curies));
  }
  resourceTree.children[resourceTree.children.length - 1].lastItem = true;
  return resourceTree;
}

export function buildHalLinksJsonTree(links: object, curies: Curies = new Curies()): JsonElementNode {
  const linksRoot = jsonNodeElementFactory('_links', JsonElementType.Object, null, [], false);
  const linksRels = links['_links'];

  Object.keys(linksRels).forEach((linkRel) => {
    const curieName = getCurieName(linkRel);

    if (Array.isArray(linksRels[linkRel])) {
      const linkRelArray = halNodeElementFactory(linkRel, JsonElementType.Array, HalElementType.LinkRel, null, [], false);
      if (curieName) {
        linkRelArray.curie = curies.get(curieName);
      }
      linksRoot.children.push(linkRelArray);
      linksRels[linkRel].forEach((linkRelItem) => {
        linkRelArray.children.push(
          jsonNodeElementFactory(null, JsonElementType.Object, null, buildHalLinkProperties(linkRelItem), false)
        );
      });
      linkRelArray.children[linkRelArray.children.length - 1].lastItem = true;
    } else if (typeof linksRels[linkRel] === 'object') {
      const linkRelObject = halNodeElementFactory(
        linkRel,
        JsonElementType.Object,
        HalElementType.LinkRel,
        null,
        buildHalLinkProperties(linksRels[linkRel]),
        false
      );
      if (curieName) {
        linkRelObject.curie = curies.get(curieName);
      }
      linksRoot.children.push(linkRelObject);
    }
  });
  linksRoot.children[linksRoot.children.length - 1].lastItem = true;
  return linksRoot;
}

export function extractCuries(links: object) {
  const curies = new Curies();
  if (links['curies']) {
    links['curies'].forEach((curie) => {
      curies.add(new Curie(curie.name, curie.href, curie.templated));
    });
  }
  return curies;
}

export function getCurieName(rel: string) {
  const curieMarkPosition = rel.indexOf(':');

  if ((!rel.startsWith('http:')) && curieMarkPosition > -1) {
    return rel.substring(0, curieMarkPosition);
  }
  return null;
}

export function buildHalEmbeddedJsonTree(links: object, curies: Curies = new Curies()): JsonElementNode {
  const embeddedRoot = jsonNodeElementFactory('_embedded', JsonElementType.Object, null, [], false);
  const embeddedRels = links['_embedded'];

  Object.keys(embeddedRels).forEach((embeddedRel) => {
    const curieName = getCurieName(embeddedRel);

    if (Array.isArray(embeddedRels[embeddedRel])) {
      const embeddedRelArray = halNodeElementFactory(embeddedRel, JsonElementType.Array, HalElementType.LinkRel, null, [], false);
      if (curieName) {
        embeddedRelArray.curie = curies.get(curieName);
      }
      embeddedRoot.children.push(embeddedRelArray);
      embeddedRels[embeddedRel].forEach((embeddedItem) => {
        embeddedRelArray.children.push(buildJsonNode(embeddedItem, false));
      });
      embeddedRelArray.children[embeddedRelArray.children.length - 1].lastItem = true;
    } else if (typeof embeddedRels[embeddedRel] === 'object') {
      const embeddedResourceTree = buildHalJsonTree(embeddedRels[embeddedRel]);
      if (curieName) {
        embeddedResourceTree.curie = curies.get(curieName);
      }
      embeddedRoot.children.push(
        halNodeElementFactory(embeddedRel, JsonElementType.Object, HalElementType.LinkRel, null, [
          embeddedResourceTree.children[0]
        ], false)
      );
    }
  });
  embeddedRoot.children[embeddedRoot.children.length - 1].lastItem = true;
  return embeddedRoot;
}

export function buildHalLinkProperties(linkProperties: object): JsonElementNode[] {
  const jsonElementNodes: JsonElementNode[] = [];

  if (!linkProperties['href']) {
    throw new Error('Link must have a href property');
  }

  buildHalLinkProperty(jsonElementNodes, linkProperties, 'href', JsonElementType.String, HalElementType.LinkHref);
  if (linkProperties['templated']) {
    jsonElementNodes[0].halElementType = HalElementType.TemplatedLinkHref;
  }

  buildHalLinkProperty(jsonElementNodes, linkProperties, 'templated', JsonElementType.Boolean, null);
  buildHalLinkProperty(jsonElementNodes, linkProperties, 'type', JsonElementType.String, null);
  buildHalLinkProperty(jsonElementNodes, linkProperties, 'deprecation', JsonElementType.String, HalElementType.PropertyUrl);
  buildHalLinkProperty(jsonElementNodes, linkProperties, 'name', JsonElementType.String, null);
  buildHalLinkProperty(jsonElementNodes, linkProperties, 'profile', JsonElementType.String, HalElementType.PropertyUrl);
  buildHalLinkProperty(jsonElementNodes, linkProperties, 'title', JsonElementType.String, null);
  buildHalLinkProperty(jsonElementNodes, linkProperties, 'hreflang', JsonElementType.String, null);

  if (jsonElementNodes.length > 0) {
    jsonElementNodes[jsonElementNodes.length - 1].lastItem = true;
  }

  return jsonElementNodes;
}

export function buildHalLinkProperty(jsonElementNodes: JsonElementNode[], linkProperties: object, propertyName: string,
  type: JsonElementType, halElementType: HalElementType) {
  if (linkProperties.hasOwnProperty(propertyName)) {
    jsonElementNodes.push(halNodeElementFactory(propertyName, type, halElementType, linkProperties[propertyName].toString(), [], false));
  }
}

function buildJsonNode(value: any, last: boolean, name = null): JsonElementNode {
  const node = new JsonElementNode();
  node.children = [];
  node.value = null;
  node.name = name;
  node.lastItem = last;
  node.expanded = false;


 if (value == null) {
    node.type = JsonElementType.Null;
  } else if (typeof value === 'string') {
    node.type = JsonElementType.String;
    node.value = value;
  } else if (typeof value === 'number') {
    node.type = JsonElementType.Number;
    node.value = value.toString();
  } else if (typeof value === 'boolean') {
    node.type = JsonElementType.Boolean;
    node.value = value.toString();
  } else if (!Array.isArray(value) && typeof value === 'object') {
    node.type = JsonElementType.Object;
    Object.keys(value).forEach((key, index, keysArray) => {
      node.children.push(buildJsonNode(value[key], index === keysArray.length - 1, key));
    });
  } else if (Array.isArray(value)) {
    node.type = JsonElementType.Array;
    value.forEach((arrayItem, index, array) => {
      node.children.push(buildJsonNode(arrayItem, index === array.length - 1));
    });
  }
  return node;
}

