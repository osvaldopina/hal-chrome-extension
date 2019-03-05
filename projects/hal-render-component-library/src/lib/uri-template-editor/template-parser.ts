export class UriVariable {
  constructor(public name: string, public value: string = '') {
  }
}

export class UriText {
  constructor(public text: string) { }
}

export function parse(template: any): any[] {
  const parts = template.parse().parts;
  const parsedParts = [];
  parts.forEach((element) => {
    if (typeof element === 'object') {
      switch (element.operator) {
        case '?': {
          parsedParts.push(new UriText('?'));
          break;
        }
      }
      element.variables.forEach((variable, index) => {
        if (element.operator === '?' && index > 0) {
          parsedParts.push(new UriText('&'));
        } else if (element.operator === '&') {
          parsedParts.push(new UriText('&'));
        }
        parsedParts.push(new UriVariable(variable.name));
      });
    } else {
      if (typeof element === 'string' && element.trim().length > 0) {
        parsedParts.push(new UriText(element));
      }
    }
  });
  return groupConsecutiveTexts(parsedParts);
}

export function groupConsecutiveTexts(templateParts: any[]) {
  const resultTemplateParts = [];
  templateParts.forEach((templatePart, index, templatePartsInternal) => {
    if (index > 0 && templatePart instanceof UriText && templatePartsInternal[index - 1] instanceof UriText) {
      resultTemplateParts[resultTemplateParts.length - 1] =
        new UriText(resultTemplateParts[resultTemplateParts.length - 1].text + templatePart.text);
    } else {
      resultTemplateParts.push(templatePart);
    }
  });

  return resultTemplateParts;

}

export function getTemplateValuesAsObject(templateParts: any[]): object {
  const values = {};
  templateParts.forEach((templatePart) => {
    if (templatePart instanceof UriVariable && templatePart.value.length > 0) {
      values[templatePart.name] = templatePart.value;
    }
  });
  return values;
}
