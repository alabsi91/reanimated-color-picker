import React from 'react';
import { StatusBar } from 'react-native';

import ExamplesList from '../../ExamplesShared/ExamplesList';

export default function App() {
  return (
    <>
      <StatusBar backgroundColor='transparent' translucent />
      <ExamplesList />
    </>
  );
}
