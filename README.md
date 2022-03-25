# 📘 @e-toast/react - The React Layer

This contains the React implementation of e-toast.

## 🏗️ Instalation
 > this project uses `yarn` version `1.22.1` as package manager. Please avoid using any other package manager.

```bash
yarn add @e-toast/react
```

Install dependencies using `yarn`

```
yarn install
```

To run storybook execute:

```
yarn storybook
```

Open your browser on http://localhost:6006.

To create components execute:

```
yarn generate
```

## 🧰 Tech Stack

- React v17.0.0
- Storybook v.6.2.5
- Typescript v.4.1.2
- Jest v27.4.3

## 📁 Folder Structure
 we are based on Cory's [guidelines](https://twitter.com/housecor/status/1493947989877997571?s=20&t=47Knp8NaM3KOzADGxkTH0w).

1. Button.tsx - component
2. Button.types.ts - TS types
3. Button.test.ts - Jest + testing-library unit tests
4. Button.stories.tsx - Storybook stories
5. index.tsx - Re-exports ([barrel](https://trusz.github.io/posts/barrel-pattern-in-typescript/))
6. README.md - Documentation to indicate how to use the component

## ✍️ Usage

Components are built using typescript. Can be used both in JS and TS.

The components can be imported in one of two ways:

```javascript
import { Button } from '@e-toast/react';
//or
import { Button } from '@e-toast/lib/components/Button'
```

This library should be used with an implementation of ```@e-toast/css``` which needs to be imported before any component (normally in the entry point of your react application). Otherwise the components will have no style applied.

## Guidelines

When creating components keep some things in mind:

  - Think on how a consumer will use the component
  - Make it as open as possible
  - Allow props to the inner html as an object with a clear name (check Button component for an example)
  - Allow refs by forwarding the ref where it makes sense (use the generator for component with ref for an example)
  - Some prop types might not make much sense right now (see size prop in Button) but are done thinking in case a new value is needed
  - Use unions to limit values of props instead of just a huge type like string or number where possible
  - Keep props as simple as possible
  - Shared types should go into the sharedTypes folder and exposed in the index.ts file
  - Export your types! this is so the consumer can use them
  - Use the generated file as an example on how to write your component! that should answer how you should write required/optional props, forward refs, and how to export the component
  - To enable storybook auto docgen, destructuring the prop paramenter and typing the component with React.FC is necessary (Lookup the button component)
  - Please create a README.md for the component. Look at the Button component for an example.

## 🧪 Unit Testing

This repo uses different tools for performing unit test in each component.
- [Jest](https://jestjs.io/)
- [testing-library/dom](https://testing-library.com/docs/dom-testing-library/intro)
- [testing-library/jest-dom](https://testing-library.com/docs/ecosystem-jest-dom)
- [testing-library/react](https://testing-library.com/docs/react-testing-library/intro)
- [testing-library/user-event](https://testing-library.com/docs/ecosystem-user-event/)
### Running all the tests
```bash
yarn test
```
### Running a test individually on _watch_ mode
```bash
yarn test:focus "./path/to/my/unitTest.test.tsx"
```
