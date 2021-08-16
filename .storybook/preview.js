import "@e-toast/css"
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      method: "",
      order: [
        "@e-toast",
        [
          "Avatar",
          "Button",
          "Checkbox",
          "TextField",
          "FlexLayout",
          "Datepicker",
          "NativeDatepicker",
          "Form"
        ]
      ],
    }
  }
}