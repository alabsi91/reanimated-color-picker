import { useFonts } from 'expo-font';
import React from 'react';

import ExamplesList from '../../../ExamplesShared/ExamplesList';

export default function App() {
  const [loaded, error] = useFonts({
    Quicksand: require('../../assets/fonts/Quicksand-Medium.ttf'),
  });

  if (!loaded && !error) {
    return null;
  }

  return <ExamplesList />;
}