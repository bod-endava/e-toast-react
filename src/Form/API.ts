import React from "react";

export interface FormAPI<T> {
  handleChange: (e: React.ChangeEvent<any>) => void;
  handleSubmit: (e?: React.MouseEvent) => void;
  handleReset: (e?: React.MouseEvent) => void;
  setField: <K extends keyof T>(field: K, value: T[K]) => void;
  getField: <K extends keyof T>(field: K) => T[K];
  initialValues: T;
  values: T;
}

export const FormAPIContext = React.createContext({
  formAPI: {
    handleChange: () => undefined,
    handleReset: () => undefined,
    handleSubmit: () => undefined,
    getField: () => undefined,
    setField: () => undefined,
    initialValues: {},
    values: {}
  } as FormAPI<any>,
  hookChild: x => x,
})