import { all } from 'deepmerge';

export function merge(objects: object[]): object {


  if (objects === null) {
    return {};
  }
  if (objects.length === 0) {
    return {};
  }

  return all(objects, { arrayMerge: combineMerge });
}

const emptyTarget = value => Array.isArray(value) ? [] : {}
const clone = (value, options) => all([emptyTarget(value), value], options);
function combineMerge(target, source, options) {
  const destination = target.slice()

  source.forEach(function (e, i) {
    if (typeof destination[i] === 'undefined') {
      const cloneRequested = options.clone !== false;
      const shouldClone = cloneRequested && options.isMergeableObject(e)
      destination[i] = shouldClone ? clone(e, options) : e
    } else if (options.isMergeableObject(e)) {
      destination[i] = all([target[i], e], options);
    } else if (target.indexOf(e) === -1) {
      destination.push(e)
    }
  })
  return destination;
}
