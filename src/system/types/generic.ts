import {FC} from 'react';

interface ClassName {
  className?: string;
}

export type GenericFunction = GenericFunctionConstructor<any>;

type GenericFunctionConstructor<T> = (...args: any[]) => T;

export type GenericVoidFunction = GenericFunctionConstructor<void | Promise<void>>;

export type SFC<P = Record<string, unknown>> = FC<P & ClassName>;
