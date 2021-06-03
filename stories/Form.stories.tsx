import { Meta } from '@storybook/react';
import FlexLayout from '../src/FlexLayout';
import Form, { FormAPI, FormProps } from '../src/Form';
import FieldContainer from '../src/FieldContainer'
import TextField from '../src/TextField'
import Button from '../src/Button'
import Datepicker from '../src/Datepicker'
import Checkbox from '../src/Checkbox'
import { description, extendControl, noControl, objectControl } from './shared/utils';
import { useState } from 'react';

export default {
  title: '@e-toast/Form',
  component: Form,
  argTypes: {
    children: extendControl(
      noControl(),
      description(
        `Form content to render\n`+
        `**For demo purposes this prop is disabled**`
      )
    ),
    initialValues: objectControl(),
    formProps: objectControl(),
    onChange: noControl(),
    onSubmit: noControl(),
  }
} as Meta;

export const Manual = ({ initialValues, ...args }: FormProps<typeof initialValues>) => {
  return <Form
    initialValues={initialValues}
    {...args}
    onSubmit={({ firstName, lastName, remember}) => alert(`Hi there ${firstName} ${lastName}! ${remember ? "I'll remember you..." : ""}`)}
  >
    {
      (formAPI: FormAPI<typeof initialValues>) => {
        return <FlexLayout flexDirection="column">
          <TextField name="firstName" label="First Name" value={formAPI.getField("firstName")} onChange={formAPI.handleChange} inputProps={{ style: { marginBottom: "16px" }}}/>
          <TextField name="lastName" label="Last Name" value={formAPI.getField("lastName")} onChange={formAPI.handleChange} inputProps={{ style: { marginBottom: "16px" }}}/>
          <Checkbox name="remember" label="Remember me" checked={formAPI.getField("remember")} onChange={formAPI.handleChange} />
          <Button label="Submit" onClick={formAPI.handleSubmit} buttonProps={{ style: { marginBottom: "16px" }}}/>
          <Button label="Reset" variant="cta" onClick={formAPI.handleReset} buttonProps={{ style: { marginBottom: "16px" }}}/>
          <div>
            Current form values:
            <ul>
              {Object.keys(formAPI.values).map(key => {
                return <li key={key}>{key}: {`${formAPI.values[key]}`}</li>
              })}
            </ul>
          </div>
        </FlexLayout>
      }
    }
  </Form>
}
Manual.storyName = "Manual Form Binding"
Manual.args = {
  initialValues: {
    firstName: "Juan",
    lastName: "",
    remember: false,
  }
}
Manual.parameters = {
  docs: {
    source: {
      code: 
         `<Form`
    + `\n  initialValues={{`
    + `\n    firstName: "",`
    + `\n    lastName: ""`
    + `\n  }}`
    + `\n  onSubmit={({ firstName, lastName, remember}) => alert(\`Hi there \${firstName} \${lastName}! \${remember ? "I'll remember you..." : ""}\`)}`
    + `\n>`
    + `\n{`
    + `\n  (formAPI: FormAPI<typeof initialValues>) => {`
    + `\n    return <FlexLayout flexDirection="column">`
    + `\n      <TextField name="firstName" label="First Name" onChange={formAPI.handleChange} inputProps={{ style: { marginBottom: "16px" }}}/>`
    + `\n      <TextField name="lastName" label="Last Name" onChange={formAPI.handleChange} inputProps={{ style: { marginBottom: "16px" }}}/>`
    + `\n      <Checkbox name="remember" label="Remember me" onChange={formAPI.handleChange} />`
    + `\n      <Button label="Submit" onClick={formAPI.handleSubmit} buttonProps={{ style: { marginBottom: "16px" }}}/>`
    + `\n      <Button label="Reset" onClick={formAPI.handleReset} buttonProps={{ style: { marginBottom: "16px" }}}/>`
    + `\n      <div>`
    + `\n        Current form values:`
    + `\n        <ul>`
    + `\n          {Object.keys(formAPI.values).map(key => {`
    + `\n            return <li key={key}>{key}: "{formAPI.values[key]}"</li>`
    + `\n          })}`
    + `\n        </ul>`
    + `\n      </div>`
    + `\n    </FlexLayout>`
    + `\n  }`
    + `\n}`
    + `\n</Form>`
    }
  }
}

export const Auto = ({ initialValues, ...args }: FormProps<typeof initialValues>) => {
  const [values, setValues] = useState(initialValues);
  return <Form
    initialValues={initialValues}
    {...args}
    onChange={setValues}
    onSubmit={({ firstName, lastName, remember}) => alert(`Hi there ${firstName} ${lastName}! ${remember ? "I'll remember you..." : ""}`)}
  >
    <FieldContainer as={FlexLayout} componentProps={{ flexDirection: "column" }}>
      <TextField name="firstName" label="First Name" inputProps={{ style: { marginBottom: "16px" }}}/>
      <TextField name="lastName" label="Last Name" inputProps={{ style: { marginBottom: "16px" }}}/>
      <Checkbox name="remember" label="Remember me" />
      <Button label="Submit" buttonProps={{ style: { marginBottom: "16px" }}}/>
      <Button type="reset" label="Reset" variant="cta" buttonProps={{ style: { marginBottom: "16px" }}}/>
      <div>
        Current form values:
        <ul>
          {Object.keys(values).map(key => {
            return <li key={key}>{key}: {`${values[key]}`}</li>
          })}
        </ul>
      </div>
    </FieldContainer>
  </Form>
}
Auto.storyName = "Automatic Form Binding"
Auto.args = {
  initialValues: {
    firstName: "Juan",
    lastName: "",
    remember: false,
  }
}
Auto.parameters = {
  docs: {
    source: {
      code: 
        `const [values, setValues] = useState({ firstName: "", lastName: "" });`
        +`\n<Form`
        +`\n  initialValues={{`
        +`\n    firstName: "",`
        +`\n    lastName: ""`
        +`\n  }}`
        +`\n  onChange={setValues}`
        + `\n  onSubmit={({ firstName, lastName, remember}) => alert(\`Hi there \${firstName} \${lastName}! \${remember ? "I'll remember you..." : ""}\`)}`
        +`\n>`
        +`\n  <FieldContainer as={FlexLayout} componentProps={{ flexDirection: "column" }}>`
        +`\n    <TextField name="firstName" label="First Name" inputProps={{ style: { marginBottom: "16px" }}}/>`
        +`\n    <TextField name="lastName" label="Last Name" inputProps={{ style: { marginBottom: "16px" }}}/>`
        +`\n    <Checkbox name="remember" label="Remember me" />`
        +`\n    <Button type="submit" label="Submit" buttonProps={{ style: { marginBottom: "16px" }}}/>`
        +`\n    <Button type="reset" label="Reset" buttonProps={{ style: { marginBottom: "16px" }}}/>`
        +`\n    <div>`
        +`\n      Current form values:`
        +`\n      <ul>`
        +`\n        {Object.keys(values).map(key => {`
        +`\n          return <li key={key}>{key}: {values[key]}</li>`
        +`\n        })}`
        +`\n      </ul>`
        +`\n    </div>`
        +`\n  </FieldContainer>`
        +`\n</Form>`
    }
  }
}

export const Custom = ({ initialValues }) => {
  const [last, setLast] = useState("(undefined)")
  return <div>
    <p>Some form elements may be non-standard. For that, the API allows for manually setting the form values</p>
    <p>An example is the Etoast Datepicker. While the Form component can auto-hook it nicely, it is a non-standard component.
      This is due to the fact that it cannot be controlled. Other component that need extra wiring should be handled similar to this.
    </p>
    <Form
      initialValues={initialValues}
      onSubmit={data => setLast(data.someDate)}
    >
      {(formAPI: FormAPI<typeof initialValues>) => {
        return <>
          <FlexLayout alignContent="center">
            <div style={{ marginRight: "8px" }}>
              <Datepicker 
                initialValue={formAPI.initialValues["someDate"]}
                onChange={(str) => formAPI.setField("someDate",str)}
              />
            </div>
            <Button label="Submit" onClick={formAPI.handleSubmit} />
          </FlexLayout>
          <ul>
            <li>Current value : {formAPI.getField("someDate")}</li>
            <li>Last submitted: {last}</li>
          </ul>
        </>
      }}
    </Form>
  </div>
}
Custom.storyName = "Custom Form Elements"
Custom.args = {
  initialValues: {
    someDate: "01/02/20"
  }
}
Custom.parameters = {
  docs: {
    source: {
      code:
      `const [last, setLast] = useState("(undefined)")`
      +`\n<Form`
      +`\n  initialValues={initialValues}`
      +`\n  onSubmit={data => setLast(data.someDate)}`
      +`\n>`
      +`\n{(formAPI: FormAPI<typeof initialValues>) => {`
      +`\n  return <>`
      +`\n    <FlexLayout alignContent="center">`
      +`\n      <div style={{ marginRight: "8px" }}>`
      +`\n        <Datepicker `
      +`\n          initialValue={formAPI.initialValues["someDate"]}`
      +`\n          onChange={(str) => formAPI.setField("someDate",str)}`
      +`\n        />`
      +`\n      </div>`
      +`\n      <Button label="Submit" onClick={formAPI.handleSubmit} />`
      +`\n    </FlexLayout>`
      +`\n    <ul>`
      +`\n      <li>Current value : {formAPI.getField("someDate")}</li>`
      +`\n      <li>Last submitted: {last}</li>`
      +`\n    </ul>`
      +`\n  </>`
      +`\n}}`
      +`\n</Form>`
    }
  }
}

export const FieldContainerExample = ({ ...args }) => {
  const initialValues = {
    firstName: "Juan",
    lastName: "",
  }
  return <div>
    <p>
      Sometimes, you might need a component to group fields or for some style requirement.
    </p>
    <p>
      FieldContainers have the same effect on child components as a Form. All they do is forward the logic.
      Optionally they accept an `as` prop to use any react component as container.
    </p>
    <p>Additionally, Field containers can be nested, though shallow is always better and this is unnecesary</p>
    <p>FieldContainers receive the API from a API provider created by the nearest parent Form component</p>
    <Form
      {...args}
      initialValues={initialValues}
    >
      <FieldContainer>
        {(formAPI: FormAPI<typeof initialValues>) => 
          <TextField 
            name="firstName" 
            label="Using manual approach" 
            value={formAPI.getField("firstName")}
            initialValue={formAPI.initialValues["firstName"]}
            onChange={formAPI.handleChange} 
            inputProps={{ style: { marginBottom: "16px" }}}
          />
        }
      </FieldContainer>
      <FieldContainer as="div" componentProps={{ style: { marginBotton: "8px" } }}>
        <TextField name="lastName" label="Using automatic approach"/>
      </FieldContainer>
      <FieldContainer>
        <FieldContainer>
          <FieldContainer>
            <FieldContainer>
              {(formAPI: FormAPI<typeof initialValues>) => {
                return <>
                  <p>Current Full Name: {formAPI.getField("firstName")} {formAPI.getField("lastName")}</p>
                </>
              }}
            </FieldContainer>
          </FieldContainer>
        </FieldContainer>
      </FieldContainer>
      <Button label="Submit"/>
    </Form>
  </div>
}
FieldContainerExample.storyName = "Field Containers"
FieldContainerExample.args = {}

FieldContainerExample.parameters = {
  docs: {
    source: {
      code: 
      `<Form`
      +`\n  initialValues={initialValues}`
      +`\n>`
      +`\n  <FieldContainer>`
      +`\n    {(formAPI: FormAPI<typeof initialValues>) => `
      +`\n      <TextField `
      +`\n        name="firstName" `
      +`\n        label="Using manual approach" `
      +`\n        value={formAPI.getField("firstName")}`
      +`\n        initialValue={formAPI.initialValues["firstName"]}`
      +`\n        onChange={formAPI.handleChange} `
      +`\n        inputProps={{ style: { marginBottom: "16px" }}}`
      +`\n      />`
      +`\n    }`
      +`\n  </FieldContainer>`
      +`\n  <FieldContainer as="div" componentProps={{ style: { marginBotton: "8px" } }}>`
      +`\n    <TextField name="lastName" label="Using automatic approach"/>`
      +`\n  </FieldContainer>`
      +`\n  <FieldContainer>`
      +`\n    <FieldContainer>`
      +`\n      <FieldContainer>`
      +`\n        <FieldContainer>`
      +`\n          {(formAPI: FormAPI<typeof initialValues>) => {`
      +`\n            return <>`
      +`\n              <p>Current Full Name: {formAPI.getField("firstName")} {formAPI.getField("lastName")}</p>`
      +`\n            </>`
      +`\n          }}`
      +`\n        </FieldContainer>`
      +`\n      </FieldContainer>`
      +`\n    </FieldContainer>`
      +`\n  </FieldContainer>`
      +`\n  <Button label="Submit"/>`
      +`\n</Form>`
    }
  }
}