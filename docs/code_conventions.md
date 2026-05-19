# Code Conventions

This document defines the coding conventions applied across the `Next.js`, `React`, `TypeScript`, and `Tailwind CSS` codebase.

---

## Navigation

1. [React / Next.js](#react--nextjs)
   - [Components](#components)
   - [Custom Hooks](#custom-hooks)
   - [Exports](#exports)
   - [Folder Colocation](#folder-colocation)
2. [TypeScript](#typescript)
    - [Variables](#variables)
    - [Constants](#constants)
    - [Functions](#functions)
    - [Interfaces](#interfaces)
    - [Types](#types)
    - [Interface vs Type](#interface-vs-type)
3. [Styling](#styling)

---

## React / Next.js

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

#### `'use client'` Usage

Use `'use client'` only when a component requires one of the following:

- React state (`useState`, `useReducer`)
- React lifecycle effects (`useEffect`)
- Browser APIs (`window`, `localStorage`, etc.)
- Event handlers (`onClick`, `onChange`, etc.)

If none of the above apply, leave it as a Server Component — no directive is needed.

The key design principle is: push `'use client'` as deep into the component tree as possible, so the maximum amount of UI stays server-rendered.

```tsx
async function MyServerComponent() {
    return (
        <MyClientComponent />
    );
}
```

```tsx
'use client'

import { useState } from "react";

function MyClientComponent() {
    const [number, setNumber] = useState<number>(0);
    const handleClick = () => setNumber(prev => prev + 1);

    return (
        <button onClick={handleClick}>Number: {number}</button>
    );
}
```

#### Props Destructuring

Use inline destructuring for component props:

```tsx
function MyComponent({ title, description }: MyComponentProps) {
    return <div>{title}</div>;
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

### Exports

Use `export default` for components and page files:

```tsx
// ./my-page.tsx
export default function MyPage() {}
```

```tsx
// ./my-component.tsx
export default function MyComponent() {}
```

Use named exports for utilities, hooks, types, and constants:

```ts
export function myUtility() {}
export function useMyHook() {}
export type MyType = number;
export const MY_CONST = "my_const_value";
```

---

### Folder Colocation

Component-specific utilities, types, and constants that are **not shared across the codebase** must be placed inside the component's file:

```tsx
// my-component.tsx

function myComponentUtility() {}
interface MyComponentProps {}
const MY_COMPONENT_CONST = "my_component_const_value";

function MyComponent() {}
```

If the component already has a folder structure, those may live in dedicated files within that folder:

```txt
my-component/
├── index.tsx
├── styles.css
├── types.ts        # Component-specific types
└── utils.ts        # Component-specific utilities
```

Shared utilities, types, and constants must be placed in the corresponding files inside the `lib/` directory:

```ts
// lib/types.ts
export type MyType = number;

// lib/utils.ts
export function myUtility() {}

// lib/data.ts
export const MY_CONST = "my_const_value";
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