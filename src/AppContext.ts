import { createContext } from 'react';
import type { ColorPickerContext } from '@types';

const pickerContext = createContext<ColorPickerContext>(null!);

export default pickerContext;
