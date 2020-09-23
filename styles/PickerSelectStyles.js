import { StyleSheet } from 'react-native';

export const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white',
    paddingRight: 30, // to ensure the text is never behind the icon
    marginBottom: 15,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white',
    paddingRight: 30, // to ensure the text is never behind the icon
    marginBottom: 15,
  },
   
});

export const headerPickerSelectStyles = StyleSheet.create({
  inputIOS: {
    textAlign: 'center',
    fontSize: 12,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 10, // to ensure the text is never behind the icon
    marginBottom: 0,
  },
  inputAndroid: {
    textAlign: 'center',
    fontSize: 12,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    color: 'black',
    paddingRight: 10, // to ensure the text is never behind the icon
    marginBottom: 0,
  },
});
