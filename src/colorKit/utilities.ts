export function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(value, max));
}

export function clampRGB(value: number) {
  return clamp(Math.round(value), 0, 255);
}

export function clampHue(value: number) {
  return clamp(Math.round(value), 0, 360);
}

export function clamp100(value: number) {
  return clamp(Math.round(value), 0, 100);
}

export function clampAlpha(value: number) {
  return clamp(+value.toFixed(2), 0, 1);
}

export function randomNumber(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
