# @e-toast/react - The React Layer

This contains the React implementation of e-toast.

## Instalation

```bash
yarn add @e-toast/react
// or
npm install @e-toast/react
```

## Usage

Components are built using typescript. Can be used both in JS and TS.

The components can be imported in one of two ways:

```javascript
import { Button } from '@e-toast/react';
//or
import Button from '@e-toast/lib/Button';
```

This library should be used with an implementation of ```@e-toast/css``` which needs to be imported before any component (normally in the entry point of your react application). Otherwise the components will have no style applied.


## Unit Testing 

This repo uses different tools for performing unit test in each component. 
- (Jest)[https://jestjs.io/] 
- (testing-library/dom)[https://testing-library.com/docs/dom-testing-library/intro]
- (testing-library/jest-dom)[https://testing-library.com/docs/ecosystem-jest-dom]
- (testing-library/react)[https://testing-library.com/docs/react-testing-library/intro]
- (testing-library/user-event)[https://testing-library.com/docs/ecosystem-user-event/]
### Running all the tests 
```bash
yarn test 
//or
npm run test
```
### Running a test individually on _watch_ mode
```bash
yarn test:focus "./path/to/my/unitTest.test.tsx"
//or
npm run test:focus "./path/to/my/unitTest.test.tsx"
```
