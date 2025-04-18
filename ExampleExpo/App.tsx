import { useFonts } from 'expo-font';
import React from 'react';
import { StatusBar } from 'react-native';

import ExamplesList from '../ExamplesShared/ExamplesList';

export default function App() {
  const [loaded, error] = useFonts({
    Quicksand: require('./assets/fonts/Quicksand-Medium.ttf'),
  });

  if (!loaded && !error) {
    return null;
  }

  return (
    <>
      <StatusBar backgroundColor='transparent' translucent />
      <ExamplesList />
    </>
  );
}
