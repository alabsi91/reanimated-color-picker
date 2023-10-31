export function clamp(value: number, min: number, max: number) {
  'worklet';
  return Math.max(min, Math.min(value, max));
}

export function clampRGB(value: number) {
  'worklet';
  return clamp(Math.round(value), 0, 255);
}

export function clampHue(value: number) {
  'worklet';
  return clamp(Math.round(value), 0, 360);
}

export function clamp100(value: number) {
  'worklet';
  return clamp(Math.round(value), 0, 100);
}

export function clampAlpha(value: number) {
  'worklet';
  return clamp(+value.toFixed(2), 0, 1);
}

export function randomNumber(min: number, max: number) {
  'worklet';
  return Math.random() * (max - min) + min;
}

export function numberToHexString(c: number): string {
  'worklet';
  c = clampRGB(c);
  const hex = c.toString(16).padStart(2, '0');
  return hex;
}

export function calculateHueValue(p: number, q: number, t: number): number {
  'worklet';
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}
