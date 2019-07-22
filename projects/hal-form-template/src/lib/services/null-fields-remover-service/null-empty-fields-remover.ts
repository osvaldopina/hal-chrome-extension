export function removeNullAndEmpty(obj: object): object {
  const result = {};
  Object.keys(obj).forEach((key) => {
    const curValue = obj[key];
    if (curValue !== null) {
      if (typeof curValue === 'string') {
        if (curValue.length > 0) {
          result[key] = curValue;
        }
      } else if (Array.isArray(curValue) && curValue.length > 0) {
        result[key] = curValue;
      } else if (typeof curValue === 'object') {
        const subOjb = removeNullAndEmpty(curValue);
        if (Object.keys(subOjb).length > 0) {
          result[key] = subOjb;
        }
      } else {
        result[key] = curValue;
      }
    }
  });
  return result;
}
