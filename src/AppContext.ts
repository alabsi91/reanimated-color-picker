import { createContext } from 'react';
import type { TCTX } from '@types';

const CTX = createContext<TCTX>(null!);

export default CTX;
