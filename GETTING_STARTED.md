# Getting Started

1. Install dependencies using ``yarn`` or ``npm``

2. Use ``yarn generate`` to create components

3. When creating components keep some things in mind:

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