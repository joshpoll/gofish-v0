type Constant = string | number | symbol;

type Field<T> = keyof T;

type Fn<T> = (data: T) => any;

export type Encoding<T> = Field<T> | Fn<T> | Constant;

export const createSelector = <T>(input?: Encoding<T>, defaultValue?: any): Fn<T> => {
  if (input === undefined) {
    return () => defaultValue;
  }
  if (typeof input === "string" || typeof input === "number" || typeof input === "symbol") {
    return (data: any) => (input in data ? data[input] : input);
  } else {
    return input;
  }
};
