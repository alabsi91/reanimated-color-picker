import { describe, expect, test } from '@jest/globals';
import colorKit from '../src/colorKit/index';

const rgbColor = 'rgb(100, 150, 200)';
const hslColor = 'hsl(120, 50%, 50%)';
const hsvColor = 'hsv(120, 50%, 50%)';

describe('Red manipulation', () => {
  test.each([
    ['setRed', colorKit.setRed(rgbColor, 50), 50],
    ['setRed clamps', colorKit.setRed(rgbColor, 500), 255],
    ['increaseRed by amount', colorKit.increaseRed(rgbColor, 20), 120],
    ['increaseRed by percentage', colorKit.increaseRed(rgbColor, '50%'), 150],
    ['increaseRed clamps', colorKit.increaseRed(rgbColor, 500), 255],
    ['decreaseRed by amount', colorKit.decreaseRed(rgbColor, 20), 80],
    ['decreaseRed by percentage', colorKit.decreaseRed(rgbColor, '50%'), 50],
    ['decreaseRed clamps', colorKit.decreaseRed(rgbColor, 500), 0],
  ])('%s', (_name, result, expectedRed) => {
    expect(result.rgb().object()).toEqual({ r: expectedRed, g: 150, b: 200, a: 1 });
  });
});

describe('Green manipulation', () => {
  test.each([
    ['setGreen', colorKit.setGreen(rgbColor, 50), 50],
    ['increaseGreen by amount', colorKit.increaseGreen(rgbColor, 20), 170],
    ['increaseGreen by percentage', colorKit.increaseGreen(rgbColor, '50%'), 225],
    ['decreaseGreen by amount', colorKit.decreaseGreen(rgbColor, 20), 130],
    ['decreaseGreen by percentage', colorKit.decreaseGreen(rgbColor, '50%'), 75],
  ])('%s', (_name, result, expectedGreen) => {
    expect(result.rgb().object()).toEqual({ r: 100, g: expectedGreen, b: 200, a: 1 });
  });
});

describe('Blue manipulation', () => {
  test.each([
    ['setBlue', colorKit.setBlue(rgbColor, 50), 50],
    ['increaseBlue by amount', colorKit.increaseBlue(rgbColor, 20), 220],
    ['increaseBlue by percentage', colorKit.increaseBlue(rgbColor, '10%'), 220],
    ['increaseBlue clamps', colorKit.increaseBlue(rgbColor, '50%'), 255],
    ['decreaseBlue by amount', colorKit.decreaseBlue(rgbColor, 20), 180],
    ['decreaseBlue by percentage', colorKit.decreaseBlue(rgbColor, '50%'), 100],
  ])('%s', (_name, result, expectedBlue) => {
    expect(result.rgb().object()).toEqual({ r: 100, g: 150, b: expectedBlue, a: 1 });
  });
});

describe('Alpha manipulation', () => {
  const halfAlpha = 'rgba(100, 150, 200, 0.5)';

  test('getAlpha', () => {
    expect(colorKit.getAlpha(rgbColor)).toBe(1);
    expect(colorKit.getAlpha(halfAlpha)).toBe(0.5);
  });

  test.each([
    ['setAlpha', colorKit.setAlpha(rgbColor, 0.5), 0.5],
    ['setAlpha clamps', colorKit.setAlpha(rgbColor, 2), 1],
    ['increaseAlpha by amount', colorKit.increaseAlpha(halfAlpha, 0.2), 0.7],
    ['increaseAlpha by percentage', colorKit.increaseAlpha(halfAlpha, '50%'), 0.75],
    ['decreaseAlpha by amount', colorKit.decreaseAlpha(halfAlpha, 0.2), 0.3],
    ['decreaseAlpha by percentage', colorKit.decreaseAlpha(halfAlpha, '50%'), 0.25],
    ['decreaseAlpha clamps', colorKit.decreaseAlpha(halfAlpha, 2), 0],
  ])('%s', (_name, result, expectedAlpha) => {
    expect(result.rgb().object()).toEqual({ r: 100, g: 150, b: 200, a: expectedAlpha });
  });
});

describe('Hue manipulation', () => {
  test.each([
    ['setHue', colorKit.setHue(hslColor, 200), 200],
    ['increaseHue by amount', colorKit.increaseHue(hslColor, 30), 150],
    ['increaseHue by percentage', colorKit.increaseHue(hslColor, '50%'), 180],
    ['increaseHue clamps', colorKit.increaseHue(hslColor, 300), 360],
    ['decreaseHue by amount', colorKit.decreaseHue(hslColor, 30), 90],
    ['decreaseHue by percentage', colorKit.decreaseHue(hslColor, '50%'), 60],
    ['decreaseHue clamps', colorKit.decreaseHue(hslColor, 300), 0],
    ['spin by degrees', colorKit.spin(hslColor, 30), 150],
    ['spin by negative degrees', colorKit.spin(hslColor, -30), 90],
    ['spin wraps above 360', colorKit.spin(hslColor, 300), 60],
    ['spin wraps below 0', colorKit.spin(hslColor, -150), 330],
    ['spin by a full turn returns the same hue', colorKit.spin(hslColor, 360), 120],
    ['spin by percentage of the hue', colorKit.spin(hslColor, '50%'), 180],
  ])('%s', (_name, result, expectedHue) => {
    expect(result.hsl().object()).toEqual({ h: expectedHue, s: 50, l: 50, a: 1 });
  });
});

describe('Saturation manipulation', () => {
  test.each([
    ['setSaturation', colorKit.setSaturation(hslColor, 80), 80],
    ['saturate by amount', colorKit.saturate(hslColor, 20), 70],
    ['saturate by percentage', colorKit.saturate(hslColor, '50%'), 75],
    ['saturate clamps', colorKit.saturate(hslColor, 100), 100],
    ['desaturate by amount', colorKit.desaturate(hslColor, 20), 30],
    ['desaturate by percentage', colorKit.desaturate(hslColor, '50%'), 25],
    ['desaturate clamps', colorKit.desaturate(hslColor, 100), 0],
  ])('%s', (_name, result, expectedSaturation) => {
    expect(result.hsl().object()).toEqual({ h: 120, s: expectedSaturation, l: 50, a: 1 });
  });
});

describe('Luminance manipulation', () => {
  test.each([
    ['setLuminance', colorKit.setLuminance(hslColor, 80), 80],
    ['brighten by amount', colorKit.brighten(hslColor, 20), 70],
    ['brighten by percentage', colorKit.brighten(hslColor, '50%'), 75],
    ['brighten clamps', colorKit.brighten(hslColor, 100), 100],
    ['darken by amount', colorKit.darken(hslColor, 20), 30],
    ['darken by percentage', colorKit.darken(hslColor, '50%'), 25],
    ['darken clamps', colorKit.darken(hslColor, 100), 0],
  ])('%s', (_name, result, expectedLuminance) => {
    expect(result.hsl().object()).toEqual({ h: 120, s: 50, l: expectedLuminance, a: 1 });
  });
});

describe('Brightness manipulation', () => {
  test.each([
    ['setBrightness', colorKit.setBrightness(hsvColor, 80), 80],
    ['increaseBrightness by amount', colorKit.increaseBrightness(hsvColor, 20), 70],
    ['increaseBrightness by percentage', colorKit.increaseBrightness(hsvColor, '50%'), 75],
    ['increaseBrightness clamps', colorKit.increaseBrightness(hsvColor, 100), 100],
    ['decreaseBrightness by amount', colorKit.decreaseBrightness(hsvColor, 20), 30],
    ['decreaseBrightness by percentage', colorKit.decreaseBrightness(hsvColor, '50%'), 25],
    ['decreaseBrightness clamps', colorKit.decreaseBrightness(hsvColor, 100), 0],
  ])('%s', (_name, result, expectedBrightness) => {
    expect(result.hsv().object()).toEqual({ h: 120, s: 50, v: expectedBrightness, a: 1 });
  });
});

describe('Conversion methods on a manipulated color', () => {
  const result = colorKit.setRed(rgbColor, 50);

  test('hex', () => {
    expect(result.hex()).toBe('#3296c8');
  });

  test('rgb string', () => {
    expect(result.rgb().string()).toBe('rgb(50, 150, 200)');
  });

  test('hsl, hsv, and hwb objects agree on the hue', () => {
    expect(result.hsl().object().h).toBe(200);
    expect(result.hsv().object().h).toBe(200);
    expect(result.hwb().object().h).toBe(200);
  });
});
