export function getCircleRadius(): number {
  return randomNumInRange(window.innerHeight / 20, window.innerHeight / 10);
}
export function randomNumInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}
