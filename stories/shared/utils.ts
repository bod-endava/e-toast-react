type SimpleControlCreator = () => StorybookControl
type StorybookControl = {
  control : {
    type: string,
    labels?: {
      [x: string] : string
    }
  },
  options?: any[]
}
const simpleControl = (type: string): SimpleControlCreator => () => ({ control: { type } })

export const textControl = simpleControl("text")
export const booleanControl = simpleControl("boolean")
export const objectControl = simpleControl("object")
export const noControl = simpleControl(null)
export const numberControl = simpleControl("number");

const mergeControl = (control: any, extension: any) => {
  const extract = (fn: any,...args: any[]) => typeof fn === "function" ? fn(...args) : fn
  const base = extract(control)
  return { ...base, ...extract(extension,base) }
}
export const extendControl = (control: any, ...extensions: any[]) => {
  return extensions.reduce(mergeControl,control)
}
export const description = (description: string) => ({ description })
export const options = (options: any[]) => ({ options });
export const labels = (labels: { [x:string]: string }) => (base: StorybookControl) => ({ ...base, control: { ...base.control, labels } })
export const optionsWithDefaultLabel = (_options: any[]) => (base: StorybookControl) => {
  return extendControl(
    base,
    labels({ undefined: "No Value (undefined)" }),
    options([undefined, ..._options])
  )
}

export const selectControl = (_options: any[]): StorybookControl => {
  return extendControl(
    simpleControl("select"),
    options(_options)
  )
}

export const selectWithOptional = (options: any[]): StorybookControl => {
  return extendControl(
    simpleControl("select"),
    optionsWithDefaultLabel(options)
  )
}

export const radioWithOptional = (options: any[]): StorybookControl => {
  return extendControl(
    simpleControl("radio"),
    optionsWithDefaultLabel(options)
  )
}

/**
 * Create an array from `start` (inclusive) to `end` (exclusive) by means of adding `step`
 * @param start where to start (Inclusive)
 * @param end where to stop (Exclusive)
 * @param step what amount to add in each iteration, while the value is less than `end` (defaults to 1)
 * @returns 
 */
export const range = (start: number, end: number, step=1) => {
  const arr: number[] = []
  for(let value=start; value < end; value+=step)
    arr.push(value)
  return arr
}