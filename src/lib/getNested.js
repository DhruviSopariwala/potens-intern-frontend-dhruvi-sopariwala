export function getNested(object, path) {
  return path.split('.').reduce((value, key) => value?.[key], object)
}
