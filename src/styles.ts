import { I18nManager, StyleSheet } from 'react-native';

const isRtl = I18nManager.isRTL;

export const styles = StyleSheet.create({
  panel_container: {
    position: 'relative',
    alignSelf: 'stretch',
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
  },
});
