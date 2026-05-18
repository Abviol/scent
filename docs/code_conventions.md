# Code Conventions

This document defines the coding conventions applied across the `Next.js`, `React`, `TypeScript`, and `Tailwind CSS` codebase.

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

Each reusable component must reside in a dedicated `.tsx` file named in `kebab-case`:

```txt
../
├── product-card.tsx
├── search-result-item.tsx
└── ...
```

If a component's styling is extracted into a dedicated `styles.css` file in accordance with the [styling conventions](#styling), the component must follow this structure:

```txt
../
└── my-component/
    ├── index.tsx       # Component definition
    └── styles.css      # Component styles
```

#### Declaration

Components must be named using `PascalCase`, matching the name of the file or directory they reside in:

```tsx
// my-component.tsx
// or
// ../my-component/index.tsx

function MyComponent() {
    return (<></>);
}
```

---

### Custom Hooks

#### File Naming

Custom hook files must be named in `kebab-case`, prefixed with `use-`:

```txt
hooks/
└── use-my-hook.ts
```

#### Declaration

Custom hooks must be declared using a regular function declaration and named in `camelCase`, prefixed with `use`:

```ts
function useMyHook() {}
```

---

## TypeScript

### Variables

Variables must be named in `camelCase`:

```ts
let myVariable;
```

### Constants

Primitive constants and configuration values must be named in `UPPER_SNAKE_CASE`:

```ts
const MAX_ITEMS = 10;
const API_BASE_URL = "https://api.example.com";
```

### Functions

Functions must be named in `camelCase`:

```ts
function myFunction() {}
```

```ts
const myArrowFunction = () => {};
```

#### Regular vs Arrow Function Declarations

Regular function declarations must be used for utility functions:

```ts
// ./lib/utils.ts

function myUtilityFunction() {}
```

Arrow function declarations must be used for event handlers inside React components. Event handlers must be named using the `handle` prefix followed by the action name, in accordance with the [function naming convention](#functions):

```tsx
function MyComponent() {
    const handleClick = () => {};
    const handleSubmit = () => {};

    return (
        <button onClick={handleClick}></button>
    );
}
```

### Interfaces

Interfaces must be named in `PascalCase`:

```ts
interface MyInterface {}
```

### Types

Custom type aliases must be named in `PascalCase`, suffixed with `Type`:

```ts
type MyCustomType = number;
```

Types representing a set of string literal values must use `snake_case` for the values:

```ts
type StatusType = "value_one" | "value_two";
```

### Interface vs Type

#### Interface

Use `interface` for component props, following the naming pattern `[ComponentName]Props`:

```ts
interface MyComponentProps {}
```

Use `interface` for types that describe an object structure:

```ts
interface MyObjectType {
    key1: number;
    key2: string;
    key3: MyCustomType;
}
```

#### Type

Use `type` for aliases assigned to variables or constants:

```ts
type MyCustomType = "my_custom_type_value";

let array: MyCustomType[] = [];
```

---

## Styling

Tailwind CSS is used as the primary styling solution. Class names must be defined as a plain string inside the `className` attribute:

```tsx
<div className={"relative bg-red-200 text-base text-black ..."}></div>
```

When the same styling is applied across multiple elements within a component, the repeated classes must be extracted into a dedicated CSS class following the **BEM methodology**, placed in a `styles.css` file co-located with the component:

```css
/* ../my-component/styles.css */

.block-name__element-name {
    @apply relative bg-red-200;
}

.block-name__element-name--modifier-name {
    @apply bg-red-400;
}
```