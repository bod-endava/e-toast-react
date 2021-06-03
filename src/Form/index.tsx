import React, { useEffect, useMemo, useReducer } from 'react';
import { FormAPI, FormAPIContext } from './API';
import { 
  isHTMLFormComponent, 
  isToastFormComponent,
  isButton,
  isChangeable,
  isCheckable,
  getIdentifier, 
  isFancyComponent
} from './identifyChild'

export type { FormAPI }
export { FormAPIContext }

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

  const handleReset = (e) => {
    e?.preventDefault?.();
    dispatch(reset())
  }

  useEffect(() => onChange(state), [state]);

  const API: FormAPI<T> = {
    handleSubmit,
    handleReset,
    handleChange: (e: React.ChangeEvent<any>) => {
      const { name, id, value, type } = e.target;
      if( type === "checkbox" || type === "radio" ){
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
    const id = getIdentifier(child)
    if( isHTMLFormComponent(child) ){
      const type = child.props.type || (child.type === "button" ? "button" : "text")
      if( isCheckable(type) ){
        if( id in state ){
          props.checked = Boolean(state[id]);
        }
        props.onChange = (e: any) => API.setField(id,e.target.checked);
      }
      if( isButton(type) ){
        switch(type){
          case "reset":
            props.onClick = API.handleReset
            break;
          case "submit":
            props.onClick = API.handleSubmit
            break;
        }
      }
      if( isChangeable(type) ){
        if( id in state ){
          props.value = state[id] || "";
        }
        props.onChange = API.handleChange
      }
    }
    if( isToastFormComponent(child) || isFancyComponent(child) ){
      props.value = state[id];
      props.checked = state[id];
      props.formAPI = API;
      if( id in initialValues ){
        props.initialValue = initialValues[id];
      }
    }
    return React.cloneElement(child as any, props);
  }

  const processChildren = (children: React.ReactNode): React.ReactNode => React.Children.map(children, processChild);
  const renderChildren = () => typeof children === "function" ? children(API) : processChildren(children);

  return <FormAPIContext.Provider value={{ formAPI: API, hookChild: processChild }}>
    <form onSubmit={handleSubmit} {...formProps}>{renderChildren()}</form>
  </FormAPIContext.Provider>
}

export default Form
