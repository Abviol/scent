# Code Conventions

This document outlines the code conventions upon writing code in `Next.js`, `React`, `TypeScript`, and `Tailwind CSS`.

---

## Navigation

1. [React](#react)
    - [Components](#components)
    - [Custom Hooks](#custom-hooks)
2. [TypeScript](#typescript)
    - [Variables](#variables)
    - [Constants](#constants)
    - [Functions](#functions)
    - [Interfaces](#interfaces)
    - [Types](#types)
    - [Interface vs Type](#interface-vs-type)
3. [Styling](#styling)

---

## React

### Components

#### File Architecture

Each reusable component must be put inside a dedicates `.tsx` 
file with a `lowerCamelCase` name:
```txt
../
├── productCart.tsx
├── searchResultItem.tsx
└── ...
```

If some of the component's styling is put inside a corresponding `styles.css` 
file according to the [styling conventions](#styling), the component must have the following file architecture:
```txt
../
└── myComponent/                         
    ├── index.tsx               # The component
    └── styles.css              # Its styles 
```


#### Declaration

The React components must be given the same name as the file/directory
they are put inside using the `UpperCamelCase`:

```tsx
// myComponent.tsx 
// or 
// ../myComponent/index.tsx

function MyComponent() {
    return (<></>);
}
```

### Custom Hooks

#### File Naming

Use the `kebab-case` starting with the "use" word for naming files for custom react hooks:

```txt
hooks/
└── use-my-hook.ts
```

#### Declaration

Use `lowerCamelCase` starting with the "use" word using `regular function declaration` for declaring custom hooks:

```ts
function useMyHook() {}
```

---

## TypeScript

### Variables

Use `lowerCamelCase` for variables:
```ts
let myVariable;
```

### Constants

Use `UPPER_SNAKE_CASE` for primitive constants and configuration values:
```ts
const MAX_ITEMS = 10;
const API_BASE_URL = "https://api.example.com";
```

### Functions

Use `lowerCamelCase` for functions:
```ts
function myFunction() {}
```
or
```ts
const myArrowFunction = () => {}
```

#### Regular VS Arrow Function Declarations

Use `regular function declaration` for the utilities. 
```ts
// ./lib/utils.ts

function myUtilityFunction() {}
```

Use `arrow function declaration` for event handlers inside React components and call them handle[EventName] following the
[function naming convention](#functions):
```tsx
function MyComponent() {
    const handleClick = () => {};
    const handleSubmit = () => {};

    return (
        <button onClick={handleClick}></button>
    )
}
```

### Interfaces

Use `UpperCamelCase` for interfaces:
```ts
interface MyInterface {}
```

### Types

Use `UpperCamelCase` for custom TS types ending with the "Type" word:
```ts
type MyCustomType = number;
```

Use `lower_snake_case` for types with custom string values:
```ts
type MyCustomType = "value_1" | "value_2";
```

### Interface VS Type

#### Interface

Use `interface` for defining function parameters giving it a name starting with the name of the component and ending with the "Props" word according to the [interface naming convention](#interfaces):
```ts
interface MyComponentProps {}
```

Use `interface` for defining types with the object structure:
```ts
interface MyObjectType {
    key1: number;
    key2: string;
    key3: MyCustomType;
}
```

#### Type

Use `type` for defining types dedicated to variables, constants:
```ts
type MyCustomType = "my_custom_type_value";

let array: MyCustomType[] = [];
```

---

## Styling

We use **Tailwind CSS** for styling React components. The classes must be 
put inside curly braces with double quotes `{""}`:
```tsx
    <div className={"relative bg-red-200 text-base text-black ..."}></div>
```

If, inside a React component, a styling is used in multiple HTML elements, the styling must be
replaced with a CSS class giving it a name following the **BEM methodology** 
and put inside a `styles.css` file dedicated to the component:

```css
/* 
    ../myComponent/styles.css
*/

.block-name__element-name {
    @apply relative bg-red-200;
}

.block-name__element-name_modifier-name {
    @apply bg-red-400;
}
```