
const arrayQualifier = /\[\d+\]/g;


export function removeArrayQualifier(str: string) {
  return str.replace(arrayQualifier, '');
}
export function objectToFormData(obj: object): FormData {
  const result = new FormData();

  Object.keys(obj).forEach(key => {
    result.append(key, obj[key]);
  });

  return result;
}

export function objectToURLSearchParams(obj: object): string {
  const ret = [];
  Object.keys(obj).forEach(key => {
    ret.push(encodeURIComponent(removeArrayQualifier(key)) + '=' + encodeURIComponent(obj[key]));
  });
  return ret.join('&');
}

export function transformObjectToFormData(obj: object): FormData {
  const formData = new FormData();
  Object.keys(obj).forEach(key => {
    formData.append(key, obj[key]);
  });
  return formData;
}

export function transformObjectToProperties(obj: object): { [key: string]: string; } {
  return transformObjectToPropertiesRecursive(obj, '', -1);
}

function transformObjectToPropertiesRecursive(obj: object, basePath: string, index = -1): { [key: string]: string; } {
  const result = {};
  if (typeof obj !== 'object') {
    result[path('', basePath, index)] = obj;
  } else {
    Object.keys(obj).forEach(propName => {
      const propValue = obj[propName];
      if (propValue != null && typeof propValue === 'object') {
        if (Array.isArray(propValue)) {
          propValue.forEach((element, index) => {
            addProperties(transformObjectToPropertiesRecursive(element, path(basePath, propName, index)), result);
          });
        } else {
          addProperties(transformObjectToPropertiesRecursive(propValue, path(basePath, propName)), result);
        }
      } else {
        result[path(basePath, propName, index)] = propValue;
      }
    });
  }
  return result;
}

function path(path1: string, path2: string, index = -1): string {
  return (path1 === '' ? path2 : path1 + '.' + path2) + (index === -1 ? '' : '[' + index + ']');
}

function addProperties(property: object, destination: object) {

  Object.keys(property).forEach(key => {
    const value = property[key];
    destination[key] = value;
  });
}
