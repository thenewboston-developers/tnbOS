export type GenericFunction = GenericFunctionConstructor<any>;

type GenericFunctionConstructor<T> = (...args: any[]) => T;

export type GenericVoidFunction = GenericFunctionConstructor<void | Promise<void>>;

export interface Id {
  id: string;
}
