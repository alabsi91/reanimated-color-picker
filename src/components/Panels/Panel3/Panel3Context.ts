import { createContext, useContext } from 'react';

import type { Panel3Context } from '@types';

const panel3Context = createContext<Panel3Context>(null!);
export const Panel3ContextProvider = panel3Context.Provider;

export default function usePanel3Context() {
  const ctx = useContext(panel3Context);
  if (!ctx) {
    throw new Error('[reanimated-color-picker]: App context is not ready yet!');
  }
  return ctx;
}
