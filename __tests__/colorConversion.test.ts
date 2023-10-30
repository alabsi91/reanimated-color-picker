import { describe, expect, test } from '@jest/globals';
import colorKit from '../src/colorKit/index';

const colors = [
  {
    hex: ['#fff', '#ffff', '#ffffff', '#ffffffff', 0xffffffff],
    rgb: [
      'rgb(255, 255, 255)',
      'rgb(255 255 255)',
      'rgba(255, 255, 255, 1.0)',
      'rgba(255 255 255 / 1.0)',
      { r: 255, g: 255, b: 255 },
      { r: 255, g: 255, b: 255, a: 1 },
    ],
    hsl: [
      'hsl(0, 0%, 100%)',
      'hsl(0deg, 0%, 100%)',
      'hsl(0 0% 100%)',
      'hsl(0deg 0% 100%)',
      'hsla(0, 0%, 100%, 1.0)',
      'hsla(0deg, 0%, 100%, 1.0)',
      'hsla(0 0% 100% / 1.0)',
      'hsla(0deg 0% 100% / 1.0)',
      { h: 0, s: 0, l: 100 },
      { h: 0, s: 0, l: 100, a: 1 },
    ],
    hsv: [
      'hsv(0, 0%, 100%)',
      'hsv(0deg, 0%, 100%)',
      'hsv(0 0% 100%)',
      'hsv(0deg 0% 100%)',
      'hsva(0, 0%, 100%, 1.0)',
      'hsva(0deg, 0%, 100%, 1.0)',
      'hsva(0 0% 100% / 1.0)',
      'hsva(0deg 0% 100% / 1.0)',
      { h: 0, s: 0, v: 100 },
      { h: 0, s: 0, v: 100, a: 1 },
    ],
    hwb: [
      'hwb(0, 100%, 0%)',
      'hwb(0deg, 100%, 0%)',
      'hwb(0 100% 0%)',
      'hwb(0deg 100% 0%)',
      'hwba(0, 100%, 0%, 1.0)',
      'hwba(0deg, 100%, 0%, 1.0)',
      'hwba(0 100% 0% / 1.0)',
      'hwba(0deg 100% 0% / 1.0)',
      { h: 0, w: 100, b: 0 },
      { h: 0, w: 100, b: 0, a: 1 },
    ],
  },
  {
    hex: ['#000', '#000f', '#000000', '#000000ff', 0x000000ff],
    rgb: [
      'rgb(0, 0, 0)',
      'rgb(0 0 0)',
      'rgba(0, 0, 0, 1.0)',
      'rgba(0 0 0 / 1.0)',
      { r: 0, g: 0, b: 0 },
      { r: 0, g: 0, b: 0, a: 1 },
    ],
    hsl: [
      'hsl(0, 0%, 0%)',
      'hsl(0deg, 0%, 0%)',
      'hsl(0 0% 0%)',
      'hsl(0deg 0% 0%)',
      'hsla(0, 0%, 0%, 1.0)',
      'hsla(0deg, 0%, 0%, 1.0)',
      'hsla(0 0% 0% / 1.0)',
      'hsla(0deg 0% 0% / 1.0)',
      { h: 0, s: 0, l: 0 },
      { h: 0, s: 0, l: 0, a: 1 },
    ],
    hsv: [
      'hsv(0, 0%, 0%)',
      'hsv(0deg, 0%, 0%)',
      'hsv(0 0% 0%)',
      'hsv(0deg 0% 0%)',
      'hsva(0, 0%, 0%, 1.0)',
      'hsva(0deg, 0%, 0%, 1.0)',
      'hsva(0 0% 0% / 1.0)',
      'hsva(0deg 0% 0% / 1.0)',
      { h: 0, s: 0, v: 0 },
      { h: 0, s: 0, v: 0, a: 1 },
    ],
    hwb: [
      'hwb(0, 0%, 100%)',
      'hwb(0deg, 0%, 100%)',
      'hwb(0 0% 100%)',
      'hwb(0deg 0% 100%)',
      'hwba(0, 0%, 100%, 1.0)',
      'hwba(0deg, 0%, 100%, 1.0)',
      'hwba(0 0% 100% / 1.0)',
      'hwba(0deg 0% 100% / 1.0)',
      { h: 0, w: 0, b: 100 },
      { h: 0, w: 0, b: 100, a: 1 },
    ],
  },
  {
    hex: ['#f00', '#f00f', '#ff0000', '#ff0000ff', 0xff0000ff],
    rgb: [
      'rgb(255, 0, 0)',
      'rgb(255 0 0)',
      'rgba(255, 0, 0, 1.0)',
      'rgba(255 0 0 / 1.0)',
      { r: 255, g: 0, b: 0 },
      { r: 255, g: 0, b: 0, a: 1 },
    ],
    hsl: [
      'hsl(0, 100%, 50%)',
      'hsl(0deg, 100%, 50%)',
      'hsl(0 100% 50%)',
      'hsl(0deg 100% 50%)',
      'hsla(0, 100%, 50%, 1.0)',
      'hsla(0deg, 100%, 50%, 1.0)',
      'hsla(0 100% 50% / 1.0)',
      'hsla(0deg 100% 50% / 1.0)',
      { h: 0, s: 100, l: 50 },
      { h: 0, s: 100, l: 50, a: 1 },
    ],
    hsv: [
      'hsv(0, 100%, 100%)',
      'hsv(0deg, 100%, 100%)',
      'hsv(0 100% 100%)',
      'hsv(0deg 100% 100%)',
      'hsva(0, 100%, 100%, 1.0)',
      'hsva(0deg, 100%, 100%, 1.0)',
      'hsva(0 100% 100% / 1.0)',
      'hsva(0deg 100% 100% / 1.0)',
      { h: 0, s: 100, v: 100 },
      { h: 0, s: 100, v: 100, a: 1 },
    ],
    hwb: [
      'hwb(0, 0%, 0%)',
      'hwb(0deg, 0%, 0%)',
      'hwb(0 0% 0%)',
      'hwb(0deg 0% 0%)',
      'hwba(0, 0%, 0%, 1.0)',
      'hwba(0deg, 0%, 0%, 1.0)',
      'hwba(0 0% 0% / 1.0)',
      'hwba(0deg 0% 0% / 1.0)',
      { h: 0, w: 0, b: 0 },
      { h: 0, w: 0, b: 0, a: 1 },
    ],
  },
  {
    hex: ['#0f0', '#0f0f', '#00ff00', '#00ff00ff', 0x00ff00ff],
    rgb: [
      'rgb(0, 255, 0)',
      'rgb(0 255 0)',
      'rgba(0, 255, 0, 1.0)',
      'rgba(0 255 0 / 1.0)',
      { r: 0, g: 255, b: 0 },
      { r: 0, g: 255, b: 0, a: 1 },
    ],
    hsl: [
      'hsl(120, 100%, 50%)',
      'hsl(120deg, 100%, 50%)',
      'hsl(120 100% 50%)',
      'hsl(120deg 100% 50%)',
      'hsla(120, 100%, 50%, 1.0)',
      'hsla(120deg, 100%, 50%, 1.0)',
      'hsla(120 100% 50% / 1.0)',
      'hsla(120deg 100% 50% / 1.0)',
      { h: 120, s: 100, l: 50 },
      { h: 120, s: 100, l: 50, a: 1 },
    ],
    hsv: [
      'hsv(120, 100%, 100%)',
      'hsv(120deg, 100%, 100%)',
      'hsv(120 100% 100%)',
      'hsv(120deg 100% 100%)',
      'hsva(120, 100%, 100%, 1.0)',
      'hsva(120deg, 100%, 100%, 1.0)',
      'hsva(120 100% 100% / 1.0)',
      'hsva(120deg 100% 100% / 1.0)',
      { h: 120, s: 100, v: 100 },
      { h: 120, s: 100, v: 100, a: 1 },
    ],
    hwb: [
      'hwb(120, 0%, 0%)',
      'hwb(120deg, 0%, 0%)',
      'hwb(120 0% 0%)',
      'hwb(120deg 0% 0%)',
      'hwba(120, 0%, 0%, 1.0)',
      'hwba(120deg, 0%, 0%, 1.0)',
      'hwba(120 0% 0% / 1.0)',
      'hwba(120deg 0% 0% / 1.0)',
      { h: 120, w: 0, b: 0 },
      { h: 120, w: 0, b: 0, a: 1 },
    ],
  },
  {
    hex: ['#00f', '#00ff', '#0000ff', '#0000ffff', 0x0000ffff],
    rgb: [
      'rgb(0, 0, 255)',
      'rgb(0 0 255)',
      'rgba(0, 0, 255, 1.0)',
      'rgba(0 0 255 / 1.0)',
      { r: 0, g: 0, b: 255 },
      { r: 0, g: 0, b: 255, a: 1 },
    ],
    hsl: [
      'hsl(240, 100%, 50%)',
      'hsl(240deg, 100%, 50%)',
      'hsl(240 100% 50%)',
      'hsl(240deg 100% 50%)',
      'hsla(240, 100%, 50%, 1.0)',
      'hsla(240deg, 100%, 50%, 1.0)',
      'hsla(240 100% 50% / 1.0)',
      'hsla(240deg 100% 50% / 1.0)',
      { h: 240, s: 100, l: 50 },
      { h: 240, s: 100, l: 50, a: 1 },
    ],
    hsv: [
      'hsv(240, 100%, 100%)',
      'hsv(240deg, 100%, 100%)',
      'hsv(240 100% 100%)',
      'hsv(240deg 100% 100%)',
      'hsva(240, 100%, 100%, 1.0)',
      'hsva(240deg, 100%, 100%, 1.0)',
      'hsva(240 100% 100% / 1.0)',
      'hsva(240deg 100% 100% / 1.0)',
      { h: 240, s: 100, v: 100 },
      { h: 240, s: 100, v: 100, a: 1 },
    ],
    hwb: [
      'hwb(240, 0%, 0%)',
      'hwb(240deg, 0%, 0%)',
      'hwb(240 0% 0%)',
      'hwb(240deg 0% 0%)',
      'hwba(240, 0%, 0%, 1.0)',
      'hwba(240deg, 0%, 0%, 1.0)',
      'hwba(240 0% 0% / 1.0)',
      'hwba(240deg 0% 0% / 1.0)',
      { h: 240, w: 0, b: 0 },
      { h: 240, w: 0, b: 0, a: 1 },
    ],
  },
];

describe('RGB to Hex Conversion', () => {
  for (let i = 0; i < colors.length; i++) {
    const { rgb, hex } = colors[i];
    for (let r = 0; r < rgb.length; r++) {
      test(`converts ${rgb[r]} to ${hex[2]}`, () => {
        const color = colorKit.HEX(rgb[r]);
        expect(color).toBe(hex[2]);
      });
    }
  }
});

describe('HSL to Hex Conversion', () => {
  for (let i = 0; i < colors.length; i++) {
    const { hsl, hex } = colors[i];
    for (let r = 0; r < hsl.length; r++) {
      test(`converts ${hsl[r]} to ${hex[2]}`, () => {
        const color = colorKit.HEX(hsl[r]);
        expect(color).toBe(hex[2]);
      });
    }
  }
});

describe('HWB to Hex Conversion', () => {
  for (let i = 0; i < colors.length; i++) {
    const { hwb, hex } = colors[i];
    for (let r = 0; r < hwb.length; r++) {
      test(`converts ${hwb[r]} to ${hex[2]}`, () => {
        const color = colorKit.HEX(hwb[r]);
        expect(color).toBe(hex[2]);
      });
    }
  }
});

describe('HSV to Hex Conversion', () => {
  for (let i = 0; i < colors.length; i++) {
    const { hsv, hex } = colors[i];
    for (let r = 0; r < hsv.length; r++) {
      test(`converts ${hsv[r]} to ${hex[2]}`, () => {
        const color = colorKit.HEX(hsv[r]);
        expect(color).toBe(hex[2]);
      });
    }
  }
});

describe('Hex to Hex Conversion', () => {
  for (let i = 0; i < colors.length; i++) {
    const { hex } = colors[i];
    for (let r = 0; r < hex.length; r++) {
      test(`converts ${hex[r]} to ${hex[3]}`, () => {
        const color = colorKit.HEX(hex[r]);
        expect(color).toBe(hex[3]);
      });
    }
  }
});

describe('HEX to RGB Conversion', () => {
  for (let i = 0; i < colors.length; i++) {
    const { hex, rgb } = colors[i];
    for (let r = 0; r < hex.length; r++) {
      test(`converts ${hex[r]} to ${rgb[0]}`, () => {
        const color = colorKit.RGB(hex[r]).string();
        expect(color).toBe(rgb[0]);
      });
    }
  }
});

describe('HSL to RGB Conversion', () => {
  for (let i = 0; i < colors.length; i++) {
    const { hsl, rgb } = colors[i];
    for (let r = 0; r < hsl.length; r++) {
      test(`converts ${hsl[r]} to ${rgb[0]}`, () => {
        const color = colorKit.RGB(hsl[r]).string();
        expect(color).toBe(rgb[0]);
      });
    }
  }
});

describe('HSV to RGB Conversion', () => {
  for (let i = 0; i < colors.length; i++) {
    const { hsv, rgb } = colors[i];
    for (let r = 0; r < hsv.length; r++) {
      test(`converts ${hsv[r]} to ${rgb[0]}`, () => {
        const color = colorKit.RGB(hsv[r]).string();
        expect(color).toBe(rgb[0]);
      });
    }
  }
});

describe('HWB to RGB Conversion', () => {
  for (let i = 0; i < colors.length; i++) {
    const { hwb, rgb } = colors[i];
    for (let r = 0; r < hwb.length; r++) {
      test(`converts ${hwb[r]} to ${rgb[0]}`, () => {
        const color = colorKit.RGB(hwb[r]).string();
        expect(color).toBe(rgb[0]);
      });
    }
  }
});

describe('RGB to RGB Conversion', () => {
  for (let i = 0; i < colors.length; i++) {
    const { rgb } = colors[i];
    for (let r = 0; r < rgb.length; r++) {
      test(`converts ${rgb[r]} to ${rgb[0]}`, () => {
        const color = colorKit.RGB(rgb[r]).string();
        expect(color).toBe(rgb[0]);
      });
    }
  }
});

describe('HEX to HSL Conversion', () => {
  for (let i = 0; i < colors.length; i++) {
    const { hex, hsl } = colors[i];
    for (let r = 0; r < hex.length; r++) {
      test(`converts ${hex[r]} to ${hsl[0]}`, () => {
        const color = colorKit.HSL(hex[r]).string();
        expect(color).toBe(hsl[0]);
      });
    }
  }
});

describe('RGB to HSL Conversion', () => {
  for (let i = 0; i < colors.length; i++) {
    const { rgb, hsl } = colors[i];
    for (let r = 0; r < rgb.length; r++) {
      test(`converts ${rgb[r]} to ${hsl[0]}`, () => {
        const color = colorKit.HSL(rgb[r]).string();
        expect(color).toBe(hsl[0]);
      });
    }
  }
});

describe('HWB to HSL Conversion', () => {
  for (let i = 0; i < colors.length; i++) {
    const { hwb, hsl } = colors[i];
    for (let r = 0; r < hwb.length; r++) {
      test(`converts ${hwb[r]} to ${hsl[0]}`, () => {
        const color = colorKit.HSL(hwb[r]).string();
        expect(color).toBe(hsl[0]);
      });
    }
  }
});

describe('HSV to HSL Conversion', () => {
  for (let i = 0; i < colors.length; i++) {
    const { hsv, hsl } = colors[i];
    for (let r = 0; r < hsv.length; r++) {
      test(`converts ${hsv[r]} to ${hsl[0]}`, () => {
        const color = colorKit.HSL(hsv[r]).string();
        expect(color).toBe(hsl[0]);
      });
    }
  }
});

describe('HSL to HSL Conversion', () => {
  for (let i = 0; i < colors.length; i++) {
    const { hsl } = colors[i];
    for (let r = 0; r < hsl.length; r++) {
      test(`converts ${hsl[r]} to ${hsl[0]}`, () => {
        const color = colorKit.HSL(hsl[r]).string();
        expect(color).toBe(hsl[0]);
      });
    }
  }
});

describe('HEX to HWB Conversion', () => {
  for (let i = 0; i < colors.length; i++) {
    const { hex, hwb } = colors[i];
    for (let r = 0; r < hex.length; r++) {
      test(`converts ${hex[r]} to ${hwb[0]}`, () => {
        const color = colorKit.HWB(hex[r]).string();
        expect(color).toBe(hwb[0]);
      });
    }
  }
});

describe('RGB to HWB Conversion', () => {
  for (let i = 0; i < colors.length; i++) {
    const { rgb, hwb } = colors[i];
    for (let r = 0; r < rgb.length; r++) {
      test(`converts ${rgb[r]} to ${hwb[0]}`, () => {
        const color = colorKit.HWB(rgb[r]).string();
        expect(color).toBe(hwb[0]);
      });
    }
  }
});

describe('HSL to HWB Conversion', () => {
  for (let i = 0; i < colors.length; i++) {
    const { hsl, hwb } = colors[i];
    for (let r = 0; r < hsl.length; r++) {
      test(`converts ${hsl[r]} to ${hwb[0]}`, () => {
        const color = colorKit.HWB(hsl[r]).string();
        expect(color).toBe(hwb[0]);
      });
    }
  }
});

describe('HSV to HWB Conversion', () => {
  for (let i = 0; i < colors.length; i++) {
    const { hsv, hwb } = colors[i];
    for (let r = 0; r < hsv.length; r++) {
      test(`converts ${hsv[r]} to ${hwb[0]}`, () => {
        const color = colorKit.HWB(hsv[r]).string();
        expect(color).toBe(hwb[0]);
      });
    }
  }
});

describe('HWB to HWB Conversion', () => {
  for (let i = 0; i < colors.length; i++) {
    const { hwb } = colors[i];
    for (let r = 0; r < hwb.length; r++) {
      test(`converts ${hwb[r]} to ${hwb[0]}`, () => {
        const color = colorKit.HWB(hwb[r]).string();
        expect(color).toBe(hwb[0]);
      });
    }
  }
});

describe('HEX to HSV Conversion', () => {
  for (let i = 0; i < colors.length; i++) {
    const { hex, hsv } = colors[i];
    for (let r = 0; r < hex.length; r++) {
      test(`converts ${hex[r]} to ${hsv[0]}`, () => {
        const color = colorKit.HSV(hex[r]).string();
        expect(color).toBe(hsv[0]);
      });
    }
  }
});

describe('RGB to HSV Conversion', () => {
  for (let i = 0; i < colors.length; i++) {
    const { rgb, hsv } = colors[i];
    for (let r = 0; r < rgb.length; r++) {
      test(`converts ${rgb[r]} to ${hsv[0]}`, () => {
        const color = colorKit.HSV(rgb[r]).string();
        expect(color).toBe(hsv[0]);
      });
    }
  }
});

describe('HSL to HSV Conversion', () => {
  for (let i = 0; i < colors.length; i++) {
    const { hsl, hsv } = colors[i];
    for (let r = 0; r < hsl.length; r++) {
      test(`converts ${hsl[r]} to ${hsv[0]}`, () => {
        const color = colorKit.HSV(hsl[r]).string();
        expect(color).toBe(hsv[0]);
      });
    }
  }
});

describe('HWB to HSV Conversion', () => {
  for (let i = 0; i < colors.length; i++) {
    const { hwb, hsv } = colors[i];
    for (let r = 0; r < hwb.length; r++) {
      test(`converts ${hwb[r]} to ${hsv[0]}`, () => {
        const color = colorKit.HSV(hwb[r]).string();
        expect(color).toBe(hsv[0]);
      });
    }
  }
});

describe('HSV to HSV Conversion', () => {
  for (let i = 0; i < colors.length; i++) {
    const { hsv } = colors[i];
    for (let r = 0; r < hsv.length; r++) {
      test(`converts ${hsv[r]} to ${hsv[0]}`, () => {
        const color = colorKit.HSV(hsv[r]).string();
        expect(color).toBe(hsv[0]);
      });
    }
  }
});
