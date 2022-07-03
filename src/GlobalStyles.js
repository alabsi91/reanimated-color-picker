import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  panel_container: {
    position: 'relative',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: 'red',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  handle: {
    position: 'absolute',
    left: 0,
    top: 0,
    borderWidth: 1,
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
  sliderImageContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
    overflow: 'hidden',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  sliderImage: {
    width: '100%',
    height: 80,
  },
  override: {
    padding: 0,
    borderWidth: 0,
  },
});
