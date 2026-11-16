import React, { useEffect } from 'react';

import ExamplesList from '../../ExamplesShared/ExamplesList';
import NativeSplashScreen from '../specs/NativeSplashScreen';

export default function App() {
  useEffect(() => {
    setTimeout(() => NativeSplashScreen.hide(), 500);
  }, []);

  return <ExamplesList />;
}
