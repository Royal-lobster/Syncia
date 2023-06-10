/**
 * Deep find an object by key and its value. Returns the first object found.
 *
 * @example
 * const obj = {
 * id: 1,
 * children: [
 *   {
 *    id: 2,
 *    children: [
 *       {
 *        id: 3,
 *        children: [...]
 *       }
 *    ]
 *   }
 * ]
 * deepFind(obj, 'id', '3') // { id: 3, children: [...] }
 */
export const deepFind = (
  obj: any,
  key: string | number,
  value: string | number,
) => {
  if (obj[key] === value) {
    return obj
  }
  for (const child of obj.children || []) {
    const found: any = deepFind(child, key, value)
    if (found) {
      return found
    }
  }
  return null
}
