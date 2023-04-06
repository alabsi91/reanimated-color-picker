import { Platform, StyleSheet } from 'react-native';
import { isRtl } from '@utils';

export const styles = StyleSheet.create({
  // Panels
  panel_container: {
    position: 'relative',
    borderRadius: 5,
  },
  panel_image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },

  // grid
  selected: {
    position: 'absolute',
    borderRadius: 2,
    borderWidth: 2,
    borderColor: '#fff',
  },

  // Thumb
  handle: {
    position: 'absolute',
    ...(isRtl ? { right: 0 } : { left: 0 }),
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
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
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },

  // Input Widgets style
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowButton: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
  inputsWrapper: {
    flex: 1,
    flexDirection: isRtl ? 'row-reverse' : 'row',
    gap: 5,
  },
  inputsContainer: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 10,
    textAlign: 'center',
    fontSize: 16,
    color: '#000',
  },
  inputTitle: {
    textAlign: 'center',
    color: 'gray',
    paddingVertical: 5,
    ...Platform.select({ web: { userSelect: 'none' }, default: {} }),
  },

  // Swatches
  swatchesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  swatch: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 5,
    marginBottom: 15,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  // Preview
  previewWrapper: {
    flexDirection: 'row',
    height: 25,
    borderRadius: 5,
    overflow: 'hidden',
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewInitialText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },

  // PreviewText
  previewText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
});
