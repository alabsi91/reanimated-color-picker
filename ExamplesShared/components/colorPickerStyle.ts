import { Platform, StyleSheet } from 'react-native';

const shadow = Platform.select({
  web: { boxShadow: 'rgba(0, 0, 0, 0.3) 0px 0px 2px' },
  default: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});

export const colorPickerStyle = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontFamily: 'Quicksand',
    fontWeight: 'bold',
    marginVertical: 20,
  },
  picker: {
    gap: 20,
  },
  pickerContainer: {
    alignSelf: 'center',
    width: 300,
    backgroundColor: '#eee',
    padding: 20,
    borderRadius: 20,
    ...shadow,
  },
  panelStyle: {
    borderRadius: 16,
    ...shadow,
  },
  sliderStyle: {
    borderRadius: 20,
    ...shadow,
  },
  sliderVerticalStyle: {
    borderRadius: 20,
    height: 300,
    ...shadow,
  },
  sliderTitle: {
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 5,
    paddingHorizontal: 4,
    fontFamily: 'Quicksand',
  },
  previewStyle: {
    height: 40,
    borderRadius: 14,
  },
  previewTxt: {
    color: '#707070',
    fontFamily: 'Quicksand',
  },
  inputStyle: {
    color: '#707070',
    paddingVertical: 2,
    borderColor: '#707070',
    fontSize: 12,
    marginLeft: 5,
  },
  swatchesContainer: {
    alignItems: 'center',
    flexWrap: 'nowrap',
    gap: 10,
  },
  swatchStyle: {
    borderRadius: 20,
    height: 30,
    width: 30,
    margin: 0,
    marginBottom: 0,
    marginHorizontal: 0,
    marginVertical: 0,
  },
});
