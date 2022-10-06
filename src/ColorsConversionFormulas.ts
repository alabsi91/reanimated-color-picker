import NamedColors from './NamedColors';

/**
 * The function takes in a hue value, a saturation value, and a lightness value, and returns an object
 * with the corresponding red, green, and blue values.
 * @param h - hue (0-360)
 * @param s - saturation
 * @param l - lightness
 * @returns  The RGB color as an object.
 */
export const HSL_RGB = (h: number, s: number, l: number) => {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

  return {
    r: Math.round(255 * f(0)),
    g: Math.round(255 * f(8)),
    b: Math.round(255 * f(4)),
  };
};

/**
 * It takes a number between 0 and 100 and returns a hexadecimal string between 00 and FF.
 * @param number - a number between 0 and 100
 * @returns a hexadecimal value.
 */
export const ALPHA_HEX = (number: number) => {
  const op = Math.floor((number / 100) * 255);
  const hex = op.toString(16);
  return op < 16 ? '0' + hex : hex;
};

/**
 * It takes a hue, saturation, and lightness value and returns a hex color
 * @param h - Hue (0-360)
 * @param s - saturation (0-100)
 * @param l - lightness
 * @returns A hex color.
 */
export const HSL_HEX = (h: number, s: number, l: number) => {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0'); // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

/**
 * It takes a hsv color and returns a hsl color as an object with the h, s, and l values.
 * @param h - Hue
 * @param s - saturation
 * @param b - brightness
 * @returns - A hsl color as an object with the properties h, s, and l.
 */
export const HSV_HSL = (h: number, s: number, b: number) => {
  s /= 100;
  b /= 100;
  let l = ((2 - s) * b) / 2;
  if (l !== 0) s = Math.round((l === 1 ? 0 : l < 0.5 ? (s * b) / (l * 2) : (s * b) / (2 - l * 2)) * 100);
  l = Math.round(l * 100);
  return { h, s, l };
};

/**
 * It takes a color in RGB format and returns the same color in HSV format
 * @param r - red value
 * @param g - The green value of the color.
 * @param b - Brightness
 * @returns - An object with the properties h, s, and b.
 */
export const RGB_HSV = (r: number, g: number, b: number) => {
  let rabs, gabs, babs, rr, gg, bb, h, s, v: number, diff: number, diffc, percentRoundFn;
  rabs = r / 255;
  gabs = g / 255;
  babs = b / 255;
  // eslint-disable-next-line no-sequences
  (v = Math.max(rabs, gabs, babs)), (diff = v - Math.min(rabs, gabs, babs));
  diffc = (c: number) => (v - c) / 6 / diff + 1 / 2;
  percentRoundFn = (num: number) => Math.round(num * 100) / 100;
  if (diff === 0) {
    h = s = 0;
  } else {
    s = diff / v;
    rr = diffc(rabs);
    gg = diffc(gabs);
    bb = diffc(babs);

    if (rabs === v) {
      h = bb - gg;
    } else if (gabs === v) {
      h = 1 / 3 + rr - bb;
    } else if (babs === v) {
      h = 2 / 3 + gg - rr;
    }
    if ((h as number) < 0) {
      (h as number) += 1;
    } else if ((h as number) > 1) {
      (h as number) -= 1;
    }
  }
  return {
    h: Math.round((h as number) * 360),
    s: percentRoundFn(s * 100),
    b: percentRoundFn(v * 100),
  };
};

/**
 * It takes a hex string, splits it into chunks, converts each chunk to a number between 0 and 255, and returns an object with the RGB values
 * @param hex - A hex color string.
 * @returns - The RGBA color as an object.
 */
export const HEX_RGB = (hex: string) => {
  const isValidHex = (h: string) => /^#([A-Fa-f0-9]{3,4}){1,2}$/.test(h);

  const getChunksFromString = (st: string, chunkSize: number) => st.match(new RegExp(`.{${chunkSize}}`, 'g'));

  const convertHexUnitTo256 = (hexStr: string) => parseInt(hexStr.repeat(2 / hexStr.length), 16);

  if (!isValidHex(hex)) throw new Error('Invalid HEX');

  const chunkSize = Math.floor((hex.length - 1) / 3);
  const hexArr = getChunksFromString(hex.slice(1), chunkSize)!;
  const [r, g, b, a] = hexArr.map(convertHexUnitTo256);
  const alpha = Math.round((a / 255) * 100);
  return { r, g, b, a: !isNaN(alpha) ? alpha : 100 };
};

/**
 * Convert a hexadecimal color value to an HSV color object.
 * @param hex - A hex color string.
 * @returns - An object with the properties h, s, b, and a.
 */
export const HEX_HSV = (hex: string) => {
  const { r, g, b, a } = HEX_RGB(hex);
  return { ...RGB_HSV(r, g, b), a };
};

/**
 * Convert HSL to RGB, then convert RGB to HSV.
 * @param h - Hue (0-360)
 * @param s - saturation
 * @param l - lightness
 * @returns - An object with the properties h, s, and v.
 */
export const HSL_HSV = (h: number, s: number, l: number) => {
  const { r, g, b } = HSL_RGB(h, s, l);
  return RGB_HSV(r, g, b);
};

/**
 * It takes a color string in any format and returns an object with the color's hue, saturation, value, and alpha
 * @param colorStr - A color string.
 * @returns - An object with the properties h, s, b, and a.
 */
export const COLOR_HSVA = (colorStr: string) => {
  colorStr = colorStr.toLowerCase().trim();
  const isRgba = colorStr.startsWith('rgba');
  const isRgb = colorStr.startsWith('rgb');
  const isHex = colorStr.startsWith('#');
  const isNamedColor = NamedColors.hasOwnProperty(colorStr);
  const isHsla = colorStr.startsWith('hsla');
  const isHsl = colorStr.startsWith('hsl');
  const isHsva = colorStr.startsWith('hsva');
  const isHsv = colorStr.startsWith('hsv');

  const regex = /\(([^)]+)/;

  if (isRgba) {
    const match = colorStr.match(regex)?.[1];
    if (!match) throw new Error('Invalid RGBA value');
    const colorValues = match.split(',');
    if (colorValues.length !== 4) throw new Error('Invalid RGBA value');
    const [r, g, b, a] = colorValues.map(v => +v);
    if (isNaN(r) || isNaN(g) || isNaN(b) || isNaN(a)) throw new Error('Invalid RGBA value');
    return { ...RGB_HSV(r, g, b), a: Math.round(a * 100) };
  }

  if (isRgb) {
    const match = colorStr.match(regex)?.[1];
    if (!match) throw new Error('Invalid RGB value');
    const colorValues = match.split(',');
    if (colorValues.length !== 3) throw new Error('Invalid RGB value');
    const [r, g, b] = colorValues.map(v => +v);
    if (isNaN(r) || isNaN(g) || isNaN(b)) throw new Error('Invalid RGB value');
    return { ...RGB_HSV(r, g, b), a: 100 };
  }

  if (isHex) return HEX_HSV(colorStr);

  if (isNamedColor) return HEX_HSV(NamedColors[colorStr as keyof typeof NamedColors]);

  if (isHsla) {
    const match = colorStr.match(regex)?.[1];
    if (!match) throw new Error('Invalid HSLA value');
    const colorValues = match.split(',');
    if (colorValues.length !== 4) throw new Error('Invalid HSLA value');
    const [h, s, l, a] = colorValues.map(v => +v.replace('%', '').replace('deg', ''));
    if (isNaN(h) || isNaN(s) || isNaN(l) || isNaN(a)) throw new Error('Invalid HSLA value');
    return { ...HSL_HSV(h, s, l), a: Math.round(a * 100) };
  }

  if (isHsl) {
    const match = colorStr.match(regex)?.[1];
    if (!match) throw new Error('Invalid HSL value');
    const colorValues = match.split(',');
    if (colorValues.length !== 3) throw new Error('Invalid HSL value');
    const [h, s, l] = colorValues.map(v => +v.replace('%', '').replace('deg', ''));
    if (isNaN(h) || isNaN(s) || isNaN(l)) throw new Error('Invalid HSL value');
    return { ...HSL_HSV(h, s, l), a: 100 };
  }

  if (isHsva) {
    const match = colorStr.match(regex)?.[1];
    if (!match) throw new Error('Invalid HSVA value');
    const colorValues = match.split(',');
    if (colorValues.length !== 4) throw new Error('Invalid HSVA value');
    const [h, s, b, a] = colorValues.map(n => +n.replace('%', '').replace('deg', ''));
    if (isNaN(h) || isNaN(s) || isNaN(b) || isNaN(a)) throw new Error('Invalid HSVA value');
    return { h, s, b, a: Math.round(a * 100) };
  }

  if (isHsv) {
    const match = colorStr.match(regex)?.[1];
    if (!match) throw new Error('Invalid HSV value');
    const colorValues = match.split(',');
    if (colorValues.length !== 3) throw new Error('Invalid HSV value');
    const [h, s, b] = colorValues.map(n => +n.replace('%', '').replace('deg', ''));
    if (isNaN(h) || isNaN(s) || isNaN(b)) throw new Error('Invalid HSV value');
    return { h, s, b, a: 100 };
  }

  throw new Error('Invalid color');
};

/**
 * It converts a color to a hex value
 * @param color - A color string in any format
 * @returns - A hex color code.
 */
export const COLOR_HEX = (color: string) => {
  const isValidHex = /^#([A-Fa-f0-9]{3,4}){1,2}$/.test(color);
  if (isValidHex) return color;
  const { h, s, b } = COLOR_HSVA(color);
  const hsl = HSV_HSL(h, s, b);
  return HSL_HEX(hsl.h, hsl.s, hsl.l);
};

/**
 * It takes three numbers, each representing a color channel (red, green, blue), and returns a number between 0 and 1 representing the color's luminance.
 * @param r - red value
 * @param g - The green value of the color.
 * @param b - The brightness of the color.
 * @returns - The luminance of the color.
 */
const luminanceRGB = (r: number, g: number, b: number) => {
  const a = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

/**
 * Convert the hex color to RGB, then convert the RGB color to luminance value.
 * @param hex - A hex color code.
 * @returns The luminance of the hex color.
 */
const luminanceHEX = (hex: string) => {
  const { r, g, b } = HEX_RGB(hex);
  const a = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

/**
 * It takes a color in HSV format and a color in hex format and returns the contrast ratio between the two colors
 * @param color1 - A hsv color object.
 * @param hex - The hex value of the color you want to compare against.
 * @returns - The contrast ratio between the two colors.
 */
export const CONTRAST_RATIO = ({ h, s, b }: { h: number; s: number; b: number }, hex: string) => {
  const hsl = HSV_HSL(h, s, b),
    { r: red, g: green, b: blue } = HSL_RGB(hsl.h, hsl.s, hsl.l),
    lum1 = luminanceRGB(red, green, blue),
    lum2 = luminanceHEX(hex),
    brightest = Math.max(lum1, lum2),
    darkest = Math.min(lum1, lum2);
  return +((brightest + 0.05) / (darkest + 0.05)).toFixed(1);
};

/**
 * It converts the HSV color to HSL color string.
 * @param color - A hsv color object.
 * @returns - A string of the color in HSL format.
 */
export const HSL_FORMAT = (color: { h: number; s: number; b: number }) => {
  const { h, s, l } = HSV_HSL(color.h, color.s, color.b);
  return `hsl(${h}, ${s}%, ${l}%)`;
};

/**
 * It converts the HSV color to HSLA color string.
 * @param color - A hsv color object.
 * @returns A string of the color in HSL format.
 */
export const HSLA_FORMAT = (color: { h: number; s: number; b: number; a: number }) => {
  const { h, s, l } = HSV_HSL(color.h, color.s, color.b);
  return `hsla(${h}, ${s}%, ${l}%, ${color.a / 100})`;
};

/**
 * Convert HSV to HSL, then HSL to HEX, then add the alpha value to the end of the HEX string.
 * @param color - A hsv color object.
 * @returns - A string of the color in hex format.
 */
export const HEX_FORMAT = (color: { h: number; s: number; b: number; a: number }) => {
  const { h, s, l } = HSV_HSL(color.h, color.s, color.b);
  return HSL_HEX(h, s, l) + (color.a === 100 ? '' : ALPHA_HEX(color.a));
};

/**
 * Convert the color from HSV to HSL, then convert the color from HSL to RGB
 * @param color - A hsv color object.
 * @returns - A string of the color in RGB format.
 */
export const RGB_FORMAT = (color: { h: number; s: number; b: number }) => {
  const { h, s, l } = HSV_HSL(color.h, color.s, color.b);
  const { r, g, b } = HSL_RGB(h, s, l);
  return `rgb(${r}, ${g}, ${b})`;
};

/**
 * Convert HSV to HSL, then HSL to RGB, then return the RGBA value as a string
 * @param color - A hsv color object.
 * @returns - A string in the format of "rgba(r, g, b, a)"
 */
export const RGBA_FORMAT = (color: { h: number; s: number; b: number; a: number }) => {
  const { h, s, l } = HSV_HSL(color.h, color.s, color.b);
  const { r, g, b } = HSL_RGB(h, s, l);
  return `rgba(${r}, ${g}, ${b}, ${color.a / 100})`;
};

/**
 * Convert the color from HSV object to string.
 * @param color - A hsv color object.
 * @returns - A string with the color in HSV format.
 */
export const HSV_FORMAT = (color: { h: number; s: number; b: number }) => {
  return `hsv(${Math.round(color.h)}, ${Math.round(color.s)}%, ${Math.round(color.b)}%)`;
};

/**
 * Convert the color from HSV object to string.
 * @param color - A hsv color object.
 * @returns - A string with the color in HSVA format.
 */
export const HSVA_FORMAT = (color: { h: number; s: number; b: number; a: number }) => {
  return `hsva(${Math.round(color.h)}, ${Math.round(color.s)}%, ${Math.round(color.b)}%, ${color.a / 100})`;
};
