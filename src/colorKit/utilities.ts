export const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(value, max));
export const clampRGB = (value: number) => clamp(Math.round(value), 0, 255);
export const clampHue = (value: number) => clamp(Math.round(value), 0, 360);
export const clamp100 = (value: number) => clamp(Math.round(value), 0, 100);
export const clampAlpha = (value: number) => clamp(+value.toFixed(2), 0, 1);
export const randomNumber = (min: number, max: number) => Math.random() * (max - min) + min;
