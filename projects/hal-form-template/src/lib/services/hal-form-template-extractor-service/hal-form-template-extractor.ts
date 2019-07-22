
let id = 0;

export interface HalFormTemplate {
  id: string;
  href: string;
  name: string;
  template: object;
  rel ?: string;
}

export function extractTemplates(halForm: object): Array<HalFormTemplate> {
  id = 0;
  let result = extractTemplate(halForm);
  if (halForm['_embedded']) {
    Object.keys(halForm['_embedded']).forEach((rel: string) => {
      if (Array.isArray(halForm['_embedded'][rel])) {
        (halForm['_embedded'][rel] as Array<object>).forEach(element => {
          result = result.concat(extractTemplate(element, rel));
        });
      } else {
        result = result.concat(extractTemplate(halForm['_embedded'][rel], rel));
      }
    });
  }
  return result;
}

function extractTemplate(halFormPart: object, rel?: string): Array<HalFormTemplate> {
  const result = [];
  const href = halFormPart['_links']['self']['href'];
  Object.keys(halFormPart['_templates']).forEach((templateKey) => {
    const template = {
      'id': '' + ++id,
      'href': href,
      'name': templateKey,
      'template': halFormPart['_templates'][templateKey]
    };
    if (rel) {
      Object.assign(template, { 'rel': rel });
    }
    result.push(template);
  });

  return result;
}
