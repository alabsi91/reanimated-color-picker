import NamedColors from './NamedColors';

export const HSL_RGB = (h, s, l) => {
  s /= 100;
  l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

  return {
    r: Math.round(255 * f(0)),
    g: Math.round(255 * f(8)),
    b: Math.round(255 * f(4)),
  };
};

export const ALPHA_HEX = number => {
  const op = Math.floor((number / 100) * 255);
  const hex = op.toString(16);
  return op < 16 ? '0' + hex : hex;
};

export const HSL_HEX = (h, s, l) => {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0'); // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

export const HSV_HSL = (h, s, b) => {
  s /= 100;
  b /= 100;
  let l = ((2 - s) * b) / 2;
  if (l !== 0) s = Math.round((l === 1 ? 0 : l < 0.5 ? (s * b) / (l * 2) : (s * b) / (2 - l * 2)) * 100);
  l = Math.round(l * 100);
  return { h, s, l };
};

export const RGB_HSV = (r, g, b) => {
  let rabs, gabs, babs, rr, gg, bb, h, s, v, diff, diffc, percentRoundFn;
  rabs = r / 255;
  gabs = g / 255;
  babs = b / 255;
  // eslint-disable-next-line no-sequences
  (v = Math.max(rabs, gabs, babs)), (diff = v - Math.min(rabs, gabs, babs));
  diffc = c => (v - c) / 6 / diff + 1 / 2;
  percentRoundFn = num => Math.round(num * 100) / 100;
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
    if (h < 0) {
      h += 1;
    } else if (h > 1) {
      h -= 1;
    }
  }
  return {
    h: Math.round(h * 360),
    s: percentRoundFn(s * 100),
    b: percentRoundFn(v * 100),
  };
};

export const HEX_RGB = hex => {
  const isValidHex = h => /^#([A-Fa-f0-9]{3,4}){1,2}$/.test(h);

  const getChunksFromString = (st, chunkSize) => st.match(new RegExp(`.{${chunkSize}}`, 'g'));

  const convertHexUnitTo256 = hexStr => parseInt(hexStr.repeat(2 / hexStr.length), 16);

  if (!isValidHex(hex)) throw new Error('Invalid HEX');

  const chunkSize = Math.floor((hex.length - 1) / 3);
  const hexArr = getChunksFromString(hex.slice(1), chunkSize);
  const [r, g, b, a] = hexArr.map(convertHexUnitTo256);
  const alpha = Math.round((a / 255) * 100);
  return { r, g, b, a: !isNaN(alpha) ? alpha : 100 };
};

export const HEX_HSV = hex => {
  const { r, g, b, a } = HEX_RGB(hex);
  return { ...RGB_HSV(r, g, b), a };
};

export const HSL_HSV = (h, s, l) => {
  const { r, g, b } = HSL_RGB(h, s, l);
  return RGB_HSV(r, g, b);
};

export const COLOR_HSVA = colorStr => {
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

  if (isNamedColor) return HEX_HSV(NamedColors[colorStr]);

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

export const COLOR_HEX = color => {
  const isValidHex = /^#([A-Fa-f0-9]{3,4}){1,2}$/.test(color);
  if (isValidHex) return color;
  const { h, s, b } = COLOR_HSVA(color);
  const hsl = HSV_HSL(h, s, b);
  return HSL_HEX(hsl.h, hsl.s, hsl.l);
};

const luminanceRGB = (r, g, b) => {
  const a = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};
const luminanceHEX = hex => {
  const { r, g, b } = HEX_RGB(hex);
  const a = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

export const CONTRAST_RATIO = ({ h, s, b }, hex) => {
  const hsl = HSV_HSL(h, s, b),
    { r: red, g: green, b: blue } = HSL_RGB(hsl.h, hsl.s, hsl.l),
    lum1 = luminanceRGB(red, green, blue),
    lum2 = luminanceHEX(hex),
    brightest = Math.max(lum1, lum2),
    darkest = Math.min(lum1, lum2);
  return +((brightest + 0.05) / (darkest + 0.05)).toFixed(1);
};

export const HSL_FORMAT = color => {
  const { h, s, l } = HSV_HSL(color.h, color.s, color.b);
  return `hsl(${h}, ${s}%, ${l}%)`;
};

export const HSLA_FORMAT = color => {
  const { h, s, l } = HSV_HSL(color.h, color.s, color.b);
  return `hsla(${h}, ${s}%, ${l}%, ${color.a / 100})`;
};

export const HEX_FORMAT = color => {
  const { h, s, l } = HSV_HSL(color.h, color.s, color.b);
  return HSL_HEX(h, s, l) + (color.a === 100 ? '' : ALPHA_HEX(color.a));
};

export const RGB_FORMAT = color => {
  const { h, s, l } = HSV_HSL(color.h, color.s, color.b);
  const { r, g, b } = HSL_RGB(h, s, l);
  return `rgb(${r}, ${g}, ${b})`;
};

export const RGBA_FORMAT = color => {
  const { h, s, l } = HSV_HSL(color.h, color.s, color.b);
  const { r, g, b } = HSL_RGB(h, s, l);
  return `rgba(${r}, ${g}, ${b}, ${color.a / 100})`;
};

export const HSV_FORMAT = color => {
  return `hsv(${Math.round(color.h)}, ${Math.round(color.s)}%, ${Math.round(color.b)}%)`;
};

export const HSVA_FORMAT = color => {
  return `hsva(${Math.round(color.h)}, ${Math.round(color.s)}%, ${Math.round(color.b)}%, ${color.a / 100})`;
};
