

export function isAmundsenHalForm(json: object): boolean {
  if (json['_templates'] && Object.keys(json['_templates']).length > 0) {
    for (const templateName of Object.keys(json['_templates'])) {
      if (!checkAmundsenHalFormTemplate(json['_templates'][templateName])) {
        return false;
      }
    }
    return true;
  } else {
    return false;
  }
}

export function checkAmundsenHalFormTemplate(template: object): boolean {
  if ((typeof template['method'] === 'string') &&
    (template['properties'] === undefined ||
      (Array.isArray(template['properties']) && checkAmundsenTemplateProperties(template['properties'])))) {
    return true;
  } else {
    return false;
  }
}

export function checkAmundsenTemplateProperties(propertiesArray: Array<object>): boolean {
  for (const properties of propertiesArray) {
    if (typeof properties['name'] !== 'string') {
      return false;
    }
  }
  return true;
}
