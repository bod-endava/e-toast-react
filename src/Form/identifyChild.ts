import Button from "../Button";
import Checkbox from "../Checkbox";
import Datepicker from "../Datepicker";
import TextField from "../TextField";

const or = <T>(...preds: ((a: T) => boolean)[]) => (a: T): boolean => {
  return preds.some(pred => pred(a));
}

type UnionFromConst<T extends readonly string[]> = T[number]
const buttonTypes = ["button" , "submit" , "reset"] as const;
const checkableTypes = ["checkbox", "radio"] as const;
const chanegableTypes = ["color" , "date" , "datetime-local" , "email" , "file" 
, "hidden" , "image" , "month" , "number" , "password" , "range" 
, "search" , "tel" , "text" , "time" , "url" , "week"] as const;

type ButtonType = UnionFromConst<typeof buttonTypes>
type CheckableType = UnionFromConst<typeof checkableTypes>
type ChangeableType = UnionFromConst<typeof chanegableTypes>
type HTMLFormType = ButtonType | CheckableType | ChangeableType

export const isButton = (type: string): type is ButtonType => buttonTypes.includes(type as ButtonType);
export const isCheckable = (type: string): type is CheckableType => checkableTypes.includes(type as CheckableType);
export const isChangeable = (type: string): type is ChangeableType => chanegableTypes.includes(type as ChangeableType);
export const isHTMLFormType = (type: string): type is HTMLFormType => or(isButton,isChangeable,isCheckable)(type)
export const isHTMLFormComponent = ({type}) => type === "input" || type === "button";

const isToastButton = (type: any) => type === Button;
const isToastCheckbox = (type: any) => type === Checkbox;
const isToastTextField = (type: any) => type === TextField;
const isToastDatepicker = (type: any) => type === Datepicker;
export const isToastFormComponent = ({type}: any) => or(isToastButton,isToastCheckbox,isToastTextField,isToastDatepicker)(type)
export const isFancyComponent = (c: any) => Boolean(c?.type?.toasty);

export const getIdentifier = (comp: any) => comp?.props?.name || comp?.prop?.id