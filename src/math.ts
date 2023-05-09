export function dot_product(u: Array<number>, v: Array<number>): number {
  if (u.length !== v.length) {
    throw new Error('Vectors must be of same length')
  }
  let sum = 0;
  for (let i = 0; i < u.length; i++) {
    sum += u[i] * v[i];
  }
  return sum;
}

export function norm(u: Array<number>): number {
  return Math.sqrt(dot_product(u, u));
}

export function correlation(u: Array<number>, v: Array<number>): number {
  return dot_product(u, v) / (norm(u) * norm(v));
}
