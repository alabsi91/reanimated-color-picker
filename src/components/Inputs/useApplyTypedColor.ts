import colorKit from '@colorKit';
import usePickerContext from '@context';

import type { SupportedColorFormats } from '../../colorKit/types';

export function useApplyTypedColor(disableAlphaChannel: boolean) {
  const { setColor, onGestureChange, onGestureEnd } = usePickerContext();

  return (color: SupportedColorFormats) => {
    const isHex = colorKit.getFormat(color)?.includes('hex');

    if (disableAlphaChannel && isHex) {
      color = colorKit.setAlpha(color, 1).hsv().object(false);
    }

    setColor(color, 0);
    onGestureChange(color);
    onGestureEnd(color);
  };
}
