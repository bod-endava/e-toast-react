import React, { useContext } from 'react';
import { FormAPI, FormAPIContext } from '../Form';

export interface FieldContainerProps {
  /**
   * Component used as container.
   */
  as?: React.ElementType<any>;
  /**
   * Form API to hook children components to form state. Normally, this should be automatically passed by the Form component
   */
  formAPI?: FormAPI<any>;
  /**
   * Function to hook a child to the form state
   */
  hookChild?: (child: React.ReactNode) => React.ReactNode; 
  /**
   * Props to be passed to the component used as container
   */
  componentProps?: any;
  /**
   * Form content to render. If React nodes are passed it will automatically hook immediate children components by passing the formAPI prop. 
   * If it is a function, it will render the result of calling said function using formAPI as parameter. 
   */
  children: ((api: FormAPI<any>) => React.ReactNode) | React.ReactNode;
}

const isRenderProp = (c: any): c is (api: FormAPI<any>) => React.ReactNode => typeof c === "function";

const FieldContainer = ({ as: Component="div", componentProps, children }: FieldContainerProps) => {
  const { hookChild, formAPI } = useContext(FormAPIContext);
  const processChildren = (children: React.ReactNode): React.ReactNode => {
    return React.Children.map(children, hookChild);
  };
  const renderChildren = () => isRenderProp(children) ? children(formAPI) : processChildren(children);
  return <Component {...componentProps}>
    {renderChildren()}
  </Component>
}

export default FieldContainer
