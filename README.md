# 📘 @e-toast/react - The React Layer

This contains the React implementation of e-toast.

## 🏗️ Instalation

*IMPORTANT* this project uses `yarn` version `1.22.1` as package manager. Please avoid using any other package manager.

```bash
yarn add @e-toast/react
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
6. index.tsx - Re-exports ([barrel](https://trusz.github.io/posts/barrel-pattern-in-typescript/))

## ✍️ Usage

Components are built using typescript. Can be used both in JS and TS.

The components can be imported in one of two ways:

```javascript
import { Button } from '@e-toast/react';
//or
import Button from '@e-toast/lib/Button';
```

This library should be used with an implementation of ```@e-toast/css``` which needs to be imported before any component (normally in the entry point of your react application). Otherwise the components will have no style applied.


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
