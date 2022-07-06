import { createContext } from 'react';
import { I18nManager, StyleSheet } from 'react-native';

const isRtl = I18nManager.isRTL;

export const CTX = createContext();

export function getStyle(style, property, defaultValue) {
  const isArray = Array.isArray(style);
  if (isArray) {
    const all = style.filter(s => s[property] !== undefined).map(s => s[property]);
    if (all.length > 0) return all[all.length - 1];
    return defaultValue;
  }
  return style[property] ?? defaultValue;
}

export default StyleSheet.create({
  panel_container: {
    position: 'relative',
    alignSelf: 'stretch',
    borderRadius: 5,
  },
  handle: {
    position: 'absolute',
    ...(isRtl ? { right: 0 } : { left: 0 }),
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  handleInner: {
    width: '75%',
    height: '75%',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
