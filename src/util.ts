export function randomNumInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}
export function map(m: number, start1: number, end1: number, start2: number, end2: number): number {
  return ((m - start1) / (end1 - start1)) * (end2 - start2) + start2;
}
