import {FC} from 'react';

interface ClassName {
  className?: string;
}

export type SFC<P = Record<string, unknown>> = FC<P & ClassName>;
