import {FC} from 'react';

interface ClassName {
  className?: string;
}

export interface Dict<T> {
  [key: string]: T;
}

export type SFC<P = Record<string, unknown>> = FC<P & ClassName>;
