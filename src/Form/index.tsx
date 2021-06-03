import React, { useEffect, useMemo, useReducer } from 'react';

export interface EToastFormAPI<T> {
  handleChange: (e: React.ChangeEvent<any>) => void;
  handleSubmit: (e?: React.MouseEvent) => void;
  handleReset: (e?: React.MouseEvent) => void;
  setField: <K extends keyof T>(field: K, value: T[K]) => void;
  getField: <K extends keyof T>(field: K) => T[K];
  initialValues: T;
  values: T;
}

export type FormAPI<T> = EToastFormAPI<T>;

export const FormAPIContext = React.createContext({
  formAPI: {
    handleChange: () => undefined,
    handleReset: () => undefined,
    handleSubmit: () => undefined,
    getField: () => undefined,
    setField: () => undefined,
    initialValues: {},
    values: {}
  } as EToastFormAPI<any>,
  hookChild: x => x,
})

export interface FormProps<T> {
  /**
   * Change event handler
   */
  onChange?: (values: T) => void;
  /**
   * Submit event handler
   */
  onSubmit?: (values: T) => void;
  /**
   * Initial form values
   */
  initialValues: T;
  /**
   * Form content to render. If React nodes are passed it will automatically hook immediate children components by passing the formAPI prop. 
   * If it is a function, it will render the result of calling said function using formAPI as parameter
   */
  children: ((api: FormAPI<T>) => React.ReactNode) | React.ReactNode;
  /**
   * Props to be passed to the underlying form component
   */
  formProps?: React.ComponentPropsWithoutRef<"form">;
}

type Key = string | number | symbol

type SetAction = { type: "SET", field: Key, value: any };

type ResetAction = { type: "RESET" }

type Action = SetAction | ResetAction;

function createReducer<T>(init: T){ 
  return (state: T, action: Action): T => {
    switch(action.type){
      case "SET":
        return {
          ...state,
          [action.field]: action.value
        }
      case "RESET":
        return { ...init };
    }
  }
}

const setField = (field: Key, value: any) => ({ type: "SET" as "SET", field, value })
const reset = (): ResetAction => ({ type: "RESET" });

const Form = <T,>({
  initialValues,
  children,
  formProps={},
  onSubmit=()=>{},
  onChange=()=>{}
}: FormProps<T>) => {

  const reducer = useMemo(() => createReducer(initialValues),[]);
  const [state, dispatch] = useReducer(reducer,initialValues);
  const handleSubmit = (e) => {
    e?.preventDefault?.();
    onSubmit(state);
  }

  useEffect(() => onChange(state), [state]);

  const API: EToastFormAPI<T> = {
    handleSubmit: handleSubmit as () => void,
    handleReset: () => dispatch(reset()),
    handleChange: (e: React.ChangeEvent<any>) => {
      const { name, id, value, type } = e.target;
      if( type === "checkbox" ){
        dispatch(setField(name || id, e.target.checked));
      } else {
        dispatch(setField(name || id, value));
      }
    },
    setField: <K extends keyof T>(field: K, value: T[K]) => dispatch(setField(field,value)),
    getField: <K extends keyof T>(field: K) :T[K] => state[field],
    initialValues,
    values: {...state}
  }

  function processChild(child) {
    const props: any = {};
    const originalProps = (child as any)?.props;
    if( originalProps?.name || originalProps?.id ){
      const id = originalProps?.name || originalProps?.id;
      if( id in initialValues ){
        props.initialValue = initialValues[id];
      }
      props.value = state[id];
      props.checked = state[id];
    }
    if( typeof child.type !== "string" ){
      props.formAPI = API;
    }
    return React.cloneElement(child as any, props);
  }

  const processChildren = (children: React.ReactNode): React.ReactNode => {
    return React.Children.map(children, processChild);
  };
  const renderChildren = () => typeof children === "function" ? children(API) : processChildren(children);

  return <FormAPIContext.Provider value={{ formAPI: API, hookChild: processChild }}>
    <form onSubmit={handleSubmit} {...formProps}>{renderChildren()}</form>
  </FormAPIContext.Provider>
}

export default Form
