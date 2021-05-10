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

This library should be used with an implementation of ``@e-toast/css`` which needs to be imported before any component (normally in the entry point of your react application). Otherwise the components will have no style applied.