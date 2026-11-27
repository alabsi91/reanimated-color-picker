import { StyleSheet } from 'react-native';

const border = {
  borderWidth: StyleSheet.hairlineWidth,
  borderColor: 'rgba(0, 0, 0, 0.15)',
};

export const colorPickerStyle = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontFamily: 'Quicksand',
    fontWeight: 'bold',
    marginVertical: 20,
    color: 'gray',
  },
  picker: {
    gap: 20,
  },
  pickerContainer: {
    alignSelf: 'center',
    width: 300,
    backgroundColor: '#eae5f1',
    padding: 20,
    borderRadius: 20,
  },
  panelStyle: {
    borderRadius: 16,
  },
  sliderStyle: {
    borderRadius: 20,
  },
  sliderVerticalStyle: {
    borderRadius: 20,
    height: 300,
  },
  sliderBorderContainer: {
    borderRadius: 20 + StyleSheet.hairlineWidth,
    ...border,
  },
  panelBorderContainer: {
    borderRadius: 16 + StyleSheet.hairlineWidth,
    ...border,
  },
  gridPanelBorderContainer: {
    borderRadius: 4 + StyleSheet.hairlineWidth,
    ...border,
  },
  wheelPanelBorderContainer: {
    borderRadius: 2000,
    ...border,
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
    boxShadow: 'none',
    shadowOpacity: 0,
    elevation: 0,
    ...border,
  },
});
