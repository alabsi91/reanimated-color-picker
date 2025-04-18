import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';

import ExamplesList from '../../ExamplesShared/ExamplesList';
import NativeSplashScreen from '../specs/NativeSplashScreen';

export default function App() {
  useEffect(() => {
    setTimeout(() => NativeSplashScreen.hide(), 800);
  }, []);

  return (
    <>
      <StatusBar backgroundColor='transparent' translucent />
      <ExamplesList />
    </>
  );
}
