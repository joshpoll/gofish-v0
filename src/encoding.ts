type Constant = string | number | symbol;

type Field<T> = keyof T;

type Fn<T> = (data: T) => Constant;

export type Encoding<T> = Field<T> | Fn<T> | Constant;

export const createEncodingFn = <T>(input?: Encoding<T>, defaultValue?: Constant): Fn<T> => {
  if (input === undefined) {
    return () => defaultValue!; /* TODO: idk what to do in this case if defaultValue is undefined */
  }
  if (typeof input === "string" || typeof input === "number" || typeof input === "symbol") {
    return (data: any) => (input in data ? data[input] : input);
  } else {
    return input;
  }
};
