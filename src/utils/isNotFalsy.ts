export function isNotFalsy<T>(o: T | false | null | undefined | ''): o is T {
  return !!o || typeof o === 'number'
}
