export function zip<A, B>(arrA: A[], arrB: B[]): [A, B][];
export function zip<A, B, C>(
  arrA: A[],
  arrB: B[],
  mapFn: (a: A, b: B) => C
): C[];
export function zip<A, B, C>(arrA: A[], arrB: B[], mapFn?: (a: A, b: B) => C) {
  if (arrA.length < arrB.length) {
    return mapFn
      ? arrA.map((a, i) => mapFn(a, arrB[i]))
      : arrA.map((a, i) => [a, arrB[i]] as [A, B]);
  } else {
    return mapFn
      ? arrB.map((b, i) => mapFn(arrA[i], b))
      : arrB.map((b, i) => [arrA[i], b] as [A, B]);
  }
}

export function sum(arr: number[]): number {
  return arr.reduce((sum, current) => sum + current, 0);
}
