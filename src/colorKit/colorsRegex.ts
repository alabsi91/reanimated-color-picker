import type { ColorFormats } from './types';

const colorsRegex: Record<ColorFormats, RegExp | RegExp[]> = {
  hex3: /^#([A-Fa-f0-9]{3})$/, // #rgb
  hex4: /^#([A-Fa-f0-9]{3}[A-Fa-f0-9]{1})$/, // #rgba
  hex6: /^#([A-Fa-f0-9]{6})$/, // #rrggbb
  hex8: /^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i, // #rrggbbaa

  hsl: [
    /^hsl\s*\(\s*(\d{1,3})(?:deg)?\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*\)$/i,
    /^hsl\s*\(\s*(\d{1,3})(?:deg)?\s+([\d.]+)%\s+([\d.]+)%\s*\)$/i,
  ],
  hsla: [
    /^hsla\s*\(\s*(\d{1,3})(?:deg)?\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*,\s*(\d|\d\.\d+)\s*\)$/i,
    /^hsla\s*\(\s*(\d{1,3})(?:deg)?\s+([\d.]+)%\s+([\d.]+)%\s*\/\s*(\d|\d\.\d+)\s*\)$/i,
  ],

  hsv: [
    /^hsv\s*\(\s*(\d{1,3})(?:deg)?\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*\)$/i,
    /^hsv\s*\(\s*(\d{1,3})(?:deg)?\s+([\d.]+)%\s+([\d.]+)%\s*\)$/i,
  ],
  hsva: [
    /^hsva\s*\(\s*(\d{1,3})(?:deg)?\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*,\s*(\d|\d\.\d+)\s*\)$/i,
    /^hsva\s*\(\s*(\d{1,3})(?:deg)?\s+([\d.]+)%\s+([\d.]+)%\s*\/\s*(\d|\d\.\d+)\s*\)$/i,
  ],

  hwb: [
    /^hwb\s*\(\s*(\d{1,3})(?:deg)?\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*\)$/i,
    /^hwb\s*\(\s*(\d{1,3})(?:deg)?\s+([\d.]+)%\s+([\d.]+)%\s*\)$/i,
  ],
  hwba: [
    /^hwba\s*\(\s*(\d{1,3})(?:deg)?\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*,\s*(\d|\d\.\d+)\s*\)$/i,
    /^hwba\s*\(\s*(\d{1,3})(?:deg)?\s+([\d.]+)%\s+([\d.]+)%\s*\/\s*(\d|\d\.\d+)\s*\)$/i,
  ],

  rgb: [/^rgb\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i, /^rgb\s*\(\s*(\d{1,3})\s+(\d{1,3})\s+(\d{1,3})\s*\)$/i],
  rgba: [
    /^rgba\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*([\d.]+)\s*\)$/i,
    /^rgba\s*\(\s*(\d{1,3})\s+(\d{1,3})\s+(\d{1,3})\s*\/\s*([\d.]+)\s*\)$/i,
  ],
};

export default colorsRegex;
