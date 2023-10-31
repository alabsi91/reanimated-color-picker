import { describe, expect, test } from '@jest/globals';
import colorKit from '../src/colorKit/index';

const colorData = [
  {
    color: '#c992d2',
    expected: {
      format: 'hex6',
      red: 201,
      green: 146,
      blue: 210,
      alpha: 1,
      hue: 292,
      brightness: 82,
      luminance: 70,
      luminanceWCAG: 0.3762841918,
      saturation: 42,
      isDark: true,
      isLight: false,
    },
  },
  {
    color: '#00ff00',
    expected: {
      format: 'hex6',
      red: 0,
      green: 255,
      blue: 0,
      alpha: 1,
      hue: 120,
      brightness: 100,
      luminance: 50,
      luminanceWCAG: 0.7152,
      saturation: 100,
      isDark: false,
      isLight: true,
    },
  },
  {
    color: '#0000ff',
    expected: {
      format: 'hex6',
      red: 0,
      green: 0,
      blue: 255,
      alpha: 1,
      hue: 240,
      brightness: 100,
      luminance: 50,
      luminanceWCAG: 0.0722,
      saturation: 100,
      isDark: true,
      isLight: false,
    },
  },
  {
    color: 'rgba(39, 98, 186, 0.5)',
    expected: {
      format: 'rgba',
      red: 39,
      green: 98,
      blue: 186,
      alpha: 0.5,
      hue: 216,
      brightness: 73,
      luminance: 44,
      luminanceWCAG: 0.1271187038,
      saturation: 65,
      isDark: true,
      isLight: false,
    },
  },
  {
    color: 'hsl(310, 68%, 47%)',
    expected: {
      format: 'hsl',
      red: 201,
      green: 38,
      blue: 174,
      alpha: 1,
      hue: 310,
      brightness: 79,
      luminance: 47,
      luminanceWCAG: 0.1668271683,
      saturation: 68,
      isDark: true,
      isLight: false,
    },
  },
  {
    color: 'hwb(182, 49%, 7%)',
    expected: {
      format: 'hwb',
      red: 125,
      green: 233,
      blue: 237,
      alpha: 1,
      hue: 182,
      brightness: 93,
      luminance: 71,
      luminanceWCAG: 0.6882787144,
      saturation: 76,
      isDark: false,
      isLight: true,
    },
  },
  {
    color: 'hsv(54, 51%, 76%)',
    expected: {
      format: 'hsv',
      red: 194,
      green: 184,
      blue: 95,
      alpha: 1,
      hue: 54,
      brightness: 76,
      luminance: 57,
      luminanceWCAG: 0.4701178587,
      saturation: 45,
      isDark: true,
      isLight: false,
    },
  },
  {
    color: 0xdeb3f5ff,
    expected: {
      format: 'hex8',
      red: 222,
      green: 179,
      blue: 245,
      alpha: 1,
      hue: 279,
      brightness: 96,
      luminance: 83,
      luminanceWCAG: 0.5436236679,
      saturation: 77,
      isDark: false,
      isLight: true,
    },
  },
];

describe('get the color information', () => {
  for (const data of colorData) {
    test(`For the color "${data.color}"`, () => {
      const type = colorKit.getFormat(data.color);
      expect(type).toBe(data.expected.format);

      const red = colorKit.getRed(data.color);
      expect(red).toBe(data.expected.red);

      const green = colorKit.getGreen(data.color);
      expect(green).toBe(data.expected.green);

      const blue = colorKit.getBlue(data.color);
      expect(blue).toBe(data.expected.blue);

      const alpha = colorKit.getAlpha(data.color);
      expect(alpha).toBe(data.expected.alpha);

      const hue = colorKit.getHue(data.color);
      expect(hue).toBe(data.expected.hue);

      const brightness = colorKit.getBrightness(data.color);
      expect(brightness).toBe(data.expected.brightness);

      const luminance = colorKit.getLuminance(data.color);
      expect(luminance).toBe(data.expected.luminance);

      const luminanceWCAG = colorKit.getLuminanceWCAG(data.color);
      expect(luminanceWCAG).toBeCloseTo(data.expected.luminanceWCAG);

      const saturation = colorKit.getSaturation(data.color);
      expect(saturation).toBe(data.expected.saturation);

      const isDark = colorKit.isDark(data.color);
      expect(isDark).toBe(data.expected.isDark);

      const isLight = colorKit.isLight(data.color);
      expect(isLight).toBe(data.expected.isLight);

      const areColorsEqual = colorKit.areColorsEqual(data.color, data.color);
      expect(areColorsEqual).toBeTruthy();
    });
  }
});
