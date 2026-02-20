# Fynix Framework Documentation

**Version:** 1.0.0  
**Author:** Resty Gonzales  
**License:** MIT  
**Last Updated:** February 2026

---
  /*   const items = nixState([
    { name: "Apple", price: 1.5, qty: 2 },
    { name: "Bread", price: 2.0, qty: 1 },
  ]);

  const total = nixComputed(() => {
    return items.value.reduce((sum, item) => sum + item.price * item.qty, 0);
  }); */
  {
    /*  <h2>Total: ${total.value.toFixed(2)}</h2>
      
      <For each={items}>
        {(item, index) => (
          <div key={index}>
            {item.name} - ${item.price} x {item.qty}
          </div>
        )}
      </For> */
  }

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Core Concepts](#core-concepts)
4. [Architecture](#architecture)
5. [Runtime System](#runtime-system)
6. [Router System](#router-system)
7. [Vite Plugin](#vite-plugin)
8. [State Management](#state-management)
9. [Hooks API](#hooks-api)
10. [Security Features](#security-features)
11. [Performance Optimization](#performance-optimization)
12. [API Reference](#api-reference)
13. [Examples](#examples)
14. [Migration Guide](#migration-guide)
15. [Troubleshooting](#troubleshooting)

---

## Introduction

Fynix is a modern, lightweight JavaScript framework for building reactive web applications. It combines the simplicity of a virtual DOM with advanced features like fiber architecture, priority-based scheduling, and built-in security mechanisms.

### Key Features

- **Reactive State Management**: Automatic dependency tracking and efficient updates
- **Fiber Architecture**: Non-blocking rendering with priority scheduling
- **File-Based Routing**: Convention-over-configuration routing system
- **Security First**: Built-in XSS protection and input sanitization
- **Zero Dependencies**: Minimal runtime with no external dependencies
- **TypeScript Support**: Full TypeScript support with type definitions
- **Hot Module Replacement**: Fast refresh during development
- **Performance Optimized**: Advanced scheduling and memoization strategies

### Philosophy

Fynix is designed around three core principles:

1. **Simplicity**: Clean, intuitive API that's easy to learn
2. **Performance**: Efficient rendering with minimal overhead
3. **Security**: Protection against common web vulnerabilities by default

---

## Getting Started

### Installation

```bash
# Using npm
npm install fynixui

# Using yarn
yarn add fynixui

# Using pnpm
pnpm add fynixui
```

### Project Setup

#### 1. Install Vite Plugin

```bash
npm install -D vite-plugin-fynix
```

#### 2. Configure Vite

Create or update `vite.config.ts`:

```typescript
import { defineConfig } from 'vite';
import fynixPlugin from 'vite-plugin-fynix';

export default defineConfig({
  plugins: [
    fynixPlugin({
      jsxFactory: 'Fynix',
      jsxFragment: 'Fynix.Fragment',
      include: ['.ts', '.tsx', '.jsx', '.fnx'],
    }),
  ],
});
```

#### 3. Create Your First App

**src/main.ts**
```typescript
import { mount, Fynix } from 'fynixui';

function App() {
  return (
    <div>
      <h1>Hello, Fynix!</h1>
      <p>Your first Fynix application</p>
    </div>
  );
}

mount(App, '#root');
```

**index.html**
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Fynix App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

#### 4. Run Development Server

```bash
npm run dev
```

---

## Core Concepts

### Virtual DOM

Fynix uses a virtual DOM to efficiently update the UI. The virtual DOM is a lightweight representation of the actual DOM, allowing Fynix to calculate minimal changes needed.

```typescript
// Virtual Node structure
interface VNode {
  type: VNodeType;        // Element type or component
  props: VNodeProps;      // Properties and attributes
  key: string | number | null;  // Unique identifier
  _domNode?: Node | null; // Reference to actual DOM node
  _rendered?: VNode | null;     // Rendered output
}
```

### JSX/Hyperscript

Fynix supports JSX syntax through the `Fynix` (or `h`) function:

```typescript
// JSX syntax
const element = <div className="container">Hello</div>;

// Equivalent hyperscript
const element = Fynix('div', { className: 'container' }, 'Hello');
```

### Components

Components are functions that return virtual nodes:

```typescript
// Function component
function Welcome({ name }: { name: string }) {
  return <h1>Welcome, {name}!</h1>;
}

// Using the component
<Welcome name="Alice" />
```

### Reactive State

State in Fynix is reactive by default using the `nixState` hook:

```typescript
import { nixState } from 'fynixui';

function Counter() {
  const count = nixState(0);
  
  return (
    <div>
      <p>Count: {count.value}</p>
      <button r-click={() => count.value++}>Increment</button>
    </div>
  );
}
```

---

## Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     FYNIX FRAMEWORK                          │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Runtime    │  │    Router    │  │ Vite Plugin  │      │
│  │   System     │  │    System    │  │              │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
│         │                  │                  │               │
│         │                  │                  │               │
│  ┌──────▼──────────────────▼──────────────────▼───────┐      │
│  │            Application Layer                        │      │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐           │      │
│  │  │Components│  │  Pages  │  │ Layouts │           │      │
│  │  └─────────┘  └─────────┘  └─────────┘           │      │
│  └─────────────────────────────────────────────────────┘      │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### Three Pillars of Fynix

#### 1. Runtime System (Core Engine)

```
┌─────────────────────────────────────────────────────────┐
│                   RUNTIME SYSTEM                         │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  ┌─────────────────────────────────────────────┐        │
│  │        Priority-Based Scheduler              │        │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  │        │
│  │  │Immediate │  │   High   │  │   Idle   │  │        │
│  │  │  Queue   │  │  Queue   │  │  Queue   │  │        │
│  │  └──────────┘  └──────────┘  └──────────┘  │        │
│  └───────────────────┬─────────────────────────┘        │
│                      │                                    │
│  ┌───────────────────▼─────────────────────────┐        │
│  │         Fiber Reconciliation                 │        │
│  │  ┌──────────────────────────────────┐       │        │
│  │  │   Work-in-Progress Tree          │       │        │
│  │  │   ┌────┐   ┌────┐   ┌────┐      │       │        │
│  │  │   │Fiber│──▶│Fiber│──▶│Fiber│    │       │        │
│  │  │   └────┘   └────┘   └────┘      │       │        │
│  │  └──────────────────────────────────┘       │        │
│  └───────────────────┬─────────────────────────┘        │
│                      │                                    │
│  ┌───────────────────▼─────────────────────────┐        │
│  │         Virtual DOM Patching                 │        │
│  │  ┌──────────┐           ┌──────────┐        │        │
│  │  │ Old VNode│ ────────▶ │ New VNode│        │        │
│  │  └──────────┘   Diff    └──────────┘        │        │
│  └───────────────────┬─────────────────────────┘        │
│                      │                                    │
│  ┌───────────────────▼─────────────────────────┐        │
│  │            DOM Mutations                     │        │
│  │  ┌────────────────────────────────┐         │        │
│  │  │  Real DOM Updates              │         │        │
│  │  │  (Minimal, Batched)            │         │        │
│  │  └────────────────────────────────┘         │        │
│  └─────────────────────────────────────────────┘        │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

**How it works:**

1. **State Change Detection**: When reactive state changes, updates are queued
2. **Priority Assignment**: Updates are assigned priorities (immediate, high, normal, low, idle)
3. **Fiber Work Loop**: Processes updates in priority order with time-slicing
4. **Virtual DOM Diffing**: Calculates minimal changes between old and new virtual trees
5. **DOM Commit**: Applies batched changes to the real DOM

**Example Flow:**

```typescript
// User clicks button
const count = nixState(0);
<button r-click={() => count.value++}>Click</button>

// Flow:
// 1. Event handler executes: count.value++
// 2. State change detected, subscribers notified
// 3. Component rerender scheduled (priority: normal)
// 4. Scheduler processes update during idle time
// 5. New virtual tree created
// 6. Diff algorithm finds changes
// 7. DOM updated with minimal operations
```

#### 2. Router System (Navigation Engine)

```
┌─────────────────────────────────────────────────────────┐
│                   ROUTER SYSTEM                          │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  ┌─────────────────────────────────────────────┐        │
│  │       File-Based Route Discovery             │        │
│  │                                               │        │
│  │  src/                                         │        │
│  │  ├── home/                                    │        │
│  │  │   └── view.tsx          → /home           │        │
│  │  ├── about/                                   │        │
│  │  │   └── view.tsx          → /about          │        │
│  │  └── users/                                   │        │
│  │      └── [id]/                                │        │
│  │          └── view.tsx      → /users/:id      │        │
│  └───────────────────┬─────────────────────────┘        │
│                      │                                    │
│  ┌───────────────────▼─────────────────────────┐        │
│  │         Route Matching Engine                │        │
│  │  ┌──────────────────────────────────┐       │        │
│  │  │  Static Routes (Hash Table)      │       │        │
│  │  │  /home    → HomeComponent        │       │        │
│  │  │  /about   → AboutComponent       │       │        │
│  │  └──────────────────────────────────┘       │        │
│  │  ┌──────────────────────────────────┐       │        │
│  │  │  Dynamic Routes (Regex Match)    │       │        │
│  │  │  /users/:id → UsersComponent     │       │        │
│  │  │  Pattern: ^/users/([^/]+)$       │       │        │
│  │  └──────────────────────────────────┘       │        │
│  └───────────────────┬─────────────────────────┘        │
│                      │                                    │
│  ┌───────────────────▼─────────────────────────┐        │
│  │         Navigation Manager                   │        │
│  │  ┌──────────────────────────────────┐       │        │
│  │  │  History API Integration         │       │        │
│  │  │  • pushState / replaceState      │       │        │
│  │  │  • popstate event handling       │       │        │
│  │  └──────────────────────────────────┘       │        │
│  │  ┌──────────────────────────────────┐       │        │
│  │  │  Link Delegation                 │       │        │
│  │  │  • Click event interception      │       │        │
│  │  │  • Props serialization           │       │        │
│  │  └──────────────────────────────────┘       │        │
│  └───────────────────┬─────────────────────────┘        │
│                      │                                    │
│  ┌───────────────────▼─────────────────────────┐        │
│  │         Security & Optimization              │        │
│  │  ┌──────────────────────────────────┐       │        │
│  │  │  • URL Validation                │       │        │
│  │  │  • XSS Prevention                │       │        │
│  │  │  • Props Sanitization            │       │        │
│  │  │  • LRU Caching                   │       │        │
│  │  │  • Route Preloading              │       │        │
│  │  └──────────────────────────────────┘       │        │
│  └─────────────────────────────────────────────┘        │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

**How it works:**

1. **Route Discovery**: Scans project structure for route files
2. **Route Registration**: Builds routing tables (static and dynamic)
3. **URL Matching**: Matches current URL to registered routes
4. **Component Loading**: Lazy-loads route component
5. **Props Handling**: Deserializes and passes route props
6. **Meta Updates**: Updates document title and meta tags

**Example Flow:**

```typescript
// File structure:
// src/users/[id]/view.tsx

// User navigates to /users/123
router.navigate('/users/123', { fromSearch: true });

// Flow:
// 1. URL validated for security
// 2. Pattern matched: /users/:id
// 3. Params extracted: { id: '123' }
// 4. Props sanitized: { fromSearch: true }
// 5. Component loaded
// 6. Meta tags updated
// 7. Component mounted with props
```

#### 3. Vite Plugin (Build Integration)

```
┌─────────────────────────────────────────────────────────┐
│                   VITE PLUGIN                            │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  ┌─────────────────────────────────────────────┐        │
│  │         File Processing Pipeline             │        │
│  │                                               │        │
│  │  Source File (.tsx, .jsx, .fnx)             │        │
│  │         │                                     │        │
│  │         ▼                                     │        │
│  │  ┌──────────────────┐                        │        │
│  │  │ File Filter      │                        │        │
│  │  │ • Check extension │                       │        │
│  │  │ • Apply exclude   │                       │        │
│  │  └────────┬─────────┘                        │        │
│  │           │                                   │        │
│  │           ▼                                   │        │
│  │  ┌──────────────────┐                        │        │
│  │  │ ESBuild Transform│                        │        │
│  │  │ • Parse JSX      │                        │        │
│  │  │ • TypeScript     │                        │        │
│  │  │ • Tree shaking   │                        │        │
│  │  └────────┬─────────┘                        │        │
│  │           │                                   │        │
│  │           ▼                                   │        │
│  │  ┌──────────────────┐                        │        │
│  │  │ JSX Transform    │                        │        │
│  │  │ <div /> →        │                        │        │
│  │  │ Fynix('div')     │                        │        │
│  │  └────────┬─────────┘                        │        │
│  │           │                                   │        │
│  │           ▼                                   │        │
│  │  ┌──────────────────┐                        │        │
│  │  │ Source Maps      │                        │        │
│  │  │ Generation       │                        │        │
│  │  └────────┬─────────┘                        │        │
│  │           │                                   │        │
│  │           ▼                                   │        │
│  │  Transformed Output (ESM)                    │        │
│  └─────────────────────────────────────────────┘        │
│                                                           │
│  ┌─────────────────────────────────────────────┐        │
│  │         Hot Module Replacement               │        │
│  │                                               │        │
│  │  File Change Detected                        │        │
│  │         │                                     │        │
│  │         ▼                                     │        │
│  │  ┌──────────────────┐                        │        │
│  │  │ Transform Updated│                        │        │
│  │  │ Module           │                        │        │
│  │  └────────┬─────────┘                        │        │
│  │           │                                   │        │
│  │           ▼                                   │        │
│  │  ┌──────────────────┐                        │        │
│  │  │ Send WS Message  │                        │        │
│  │  │ to Browser       │                        │        │
│  │  └────────┬─────────┘                        │        │
│  │           │                                   │        │
│  │           ▼                                   │        │
│  │  ┌──────────────────┐                        │        │
│  │  │ Browser Updates  │                        │        │
│  │  │ (Preserve State) │                        │        │
│  │  └──────────────────┘                        │        │
│  └─────────────────────────────────────────────┘        │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

**How it works:**

1. **File Watching**: Monitors source files for changes
2. **Filtering**: Determines which files to transform
3. **Transformation**: Converts JSX/TSX to JavaScript
4. **Hot Reload**: Sends updates to browser without full refresh
5. **Error Handling**: Displays errors in browser overlay

**Example Configuration:**

```typescript
fynixPlugin({
  jsxFactory: 'Fynix',        // JSX pragma
  jsxFragment: 'Fynix.Fragment', // Fragment pragma
  include: ['.tsx', '.jsx'],  // File extensions
  exclude: ['node_modules'],  // Excluded paths
  sourcemap: true,            // Generate source maps
});
```

---

## Runtime System

### Virtual DOM

The runtime uses a virtual DOM for efficient updates:

```typescript
// Creating virtual nodes
const vnode = h('div', { className: 'box' }, 
  h('h1', null, 'Title'),
  h('p', null, 'Content')
);

// With JSX
const vnode = (
  <div className="box">
    <h1>Title</h1>
    <p>Content</p>
  </div>
);
```

### Component Lifecycle

```
Component Creation
       │
       ▼
┌──────────────┐
│ beginComponent│  ← Initialize context, hooks
└──────┬───────┘
       │
       ▼
┌──────────────┐
│    Render    │  ← Execute component function
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ endComponent │  ← Setup subscriptions
└──────┬───────┘
       │
       ▼
┌──────────────┐
│    Mount     │  ← Attach to DOM
└──────┬───────┘
       │
       ▼
   [Mounted]
       │
       ├─── State Change ───┐
       │                    │
       │                    ▼
       │            ┌──────────────┐
       │            │   Rerender   │
       │            └──────┬───────┘
       │                   │
       │                   ▼
       │            ┌──────────────┐
       │            │     Patch    │
       │            └──────┬───────┘
       │                   │
       │◄──────────────────┘
       │
       ▼
┌──────────────┐
│   Unmount    │  ← Cleanup subscriptions
└──────────────┘
```

### Fiber Architecture

Fynix uses a fiber-based reconciliation algorithm for non-blocking rendering:

```typescript
interface FynixFiber {
  type: string | symbol | ComponentFunction;
  props: any;
  key: string | number | null;
  child: FynixFiber | null;      // First child
  sibling: FynixFiber | null;    // Next sibling
  parent: FynixFiber | null;     // Parent fiber
  alternate: FynixFiber | null;  // Previous version
  effectTag: "PLACEMENT" | "UPDATE" | "DELETION" | null;
  updatePriority: Priority;
}
```

**Work Loop:**

```typescript
// Simplified fiber work loop
function performUnitOfWork(fiber: FynixFiber): FynixFiber | null {
  // 1. Reconcile children
  reconcileChildren(fiber);
  
  // 2. Return next unit of work
  if (fiber.child) return fiber.child;
  
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) return nextFiber.sibling;
    nextFiber = nextFiber.parent;
  }
  
  return null;
}
```

### Priority Scheduling

Fynix implements a sophisticated priority queue for update scheduling:

```typescript
type Priority = "immediate" | "high" | "normal" | "low" | "idle";

// Priority levels:
// - immediate: Synchronous, blocks everything
// - high: User interactions (clicks, input)
// - normal: Data fetching, state updates
// - low: Non-critical updates
// - idle: Background tasks
```

**Example:**

```typescript
// High priority - user interaction
<button r-click={() => count.value++}>Click</button>

// Normal priority - async data
useEffect(() => {
  fetchData().then(data => setState(data));
}, []);

// Idle priority - analytics
requestIdleCallback(() => {
  trackPageView();
});
```

### Event Delegation

Fynix uses event delegation for performance:

```typescript
// Single global listener per event type
document.addEventListener('click', (e) => {
  // Traverse up to find handler
  let element = e.target;
  while (element) {
    const handler = getHandler(element, 'click');
    if (handler) {
      handler(e);
      return;
    }
    element = element.parentElement;
  }
});
```

**Usage:**

```typescript
// Use r- prefix for delegated events
<button r-click={handleClick}>Click</button>
<input r-change={handleChange} />
<form r-submit={handleSubmit} />
```

---

## Router System

### File-Based Routing

Routes are automatically discovered from your file structure:

```
src/
├── home/
│   └── view.tsx          → /home
├── about/
│   └── view.tsx          → /about
├── users/
│   ├── view.tsx          → /users
│   └── [id]/
│       └── view.tsx      → /users/:id
└── blog/
    └── [slug]/
        └── view.tsx      → /blog/:slug
```

### Route Components

```typescript
// src/users/[id]/view.tsx
export default function UserProfile({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>User Profile</h1>
      <p>User ID: {params.id}</p>
    </div>
  );
}

// Add static props
UserProfile.props = {
  title: "User Profile"
};

// Add meta tags
UserProfile.meta = (params) => ({
  title: `User ${params.id} - Profile`,
  description: `Profile page for user ${params.id}`
});
```

### Navigation

```typescript
import { createFynix } from 'fynixui';

const router = createFynix();

// Navigate programmatically
router.navigate('/users/123', { fromDashboard: true });

// Replace current route
router.replace('/users/123');

// Go back
router.back();
```

### Link Component

```typescript
// Using data attributes
<a href="/users/123" data-fynix-link>View User</a>

// With props
import { setLinkProps } from 'fynixui';

function UserList({ users }) {
  return users.map(user => {
    const propsKey = `user-${user.id}`;
    setLinkProps(propsKey, { user });
    
    return (
      <a 
        href={`/users/${user.id}`}
        data-fynix-link
        data-props-key={propsKey}
      >
        {user.name}
      </a>
    );
  });
}
```

### Route Guards

```typescript
interface RouteConfig {
  component: () => Promise<any>;
  guard?: {
    canActivate?: (route: string, params: Record<string, string>) => 
      boolean | Promise<boolean>;
    canDeactivate?: (route: string) => boolean | Promise<boolean>;
    redirect?: string;
  };
}

// Example with authentication guard
const protectedRoute = {
  component: () => import('./Dashboard'),
  guard: {
    canActivate: async (route, params) => {
      const isAuth = await checkAuth();
      return isAuth;
    },
    redirect: '/login'
  }
};
```

### Meta Tag Management

```typescript
// Static meta
export const meta = {
  title: "About Us",
  description: "Learn about our company",
  keywords: "company, about, team",
  ogTitle: "About Us - Company Name",
  ogImage: "/og-image.jpg"
};

// Dynamic meta
export const meta = (params: Record<string, string>) => ({
  title: `User ${params.id} - Profile`,
  description: `View profile for user ${params.id}`
});
```

### Route Preloading

```typescript
import { createFynix } from 'fynixui';

const router = createFynix();

// Preload a route
await router.preloadRoute('/dashboard');

// Configure preloading
const config: RouteConfig = {
  component: () => import('./Home'),
  preload: true,
  priority: 'high',
  prefetch: ['/about', '/contact']
};
```

---

## Vite Plugin

### Configuration

```typescript
import { defineConfig } from 'vite';
import fynixPlugin from 'vite-plugin-fynix';

export default defineConfig({
  plugins: [
    fynixPlugin({
      // JSX factory function
      jsxFactory: 'Fynix',
      
      // JSX fragment
      jsxFragment: 'Fynix.Fragment',
      
      // File extensions to process
      include: ['.ts', '.tsx', '.jsx', '.fnx'],
      
      // Paths to exclude
      exclude: ['node_modules', 'dist'],
      
      // Enable source maps
      sourcemap: true,
      
      // Custom esbuild options
      esbuildOptions: {
        target: 'es2020',
        platform: 'browser'
      }
    })
  ]
});
```

### Hot Module Replacement

```typescript
// HMR is automatic, but you can customize:
if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    // Custom HMR logic
    console.log('Module updated:', newModule);
  });
  
  import.meta.hot.dispose(() => {
    // Cleanup before reload
  });
}
```

### Error Handling

The plugin sends errors to the browser overlay:

```typescript
// Development error overlay shows:
// - Error message
// - Stack trace
// - Source file and line number
// - Code snippet with highlighting
```

---

## State Management

### nixState

Basic reactive state:

```typescript
import { nixState } from 'fynixui';

function Counter() {
  const count = nixState(0);
  
  return (
    <div>
      <p>Count: {count.value}</p>
      <button r-click={() => count.value++}>+</button>
      <button r-click={() => count.value--}>-</button>
    </div>
  );
}
```

### nixComputed

Derived state with automatic dependency tracking:

```typescript
import { nixState, nixComputed } from 'fynixui';

function ShoppingCart() {
  const items = nixState([
    { name: 'Apple', price: 1.5, qty: 2 },
    { name: 'Bread', price: 2.0, qty: 1 }
  ]);
  
  const total = nixComputed(() => {
    return items.value.reduce((sum, item) => 
      sum + item.price * item.qty, 0
    );
  });
  
  return (
    <div>
      <h2>Total: ${total.value.toFixed(2)}</h2>
      {items.value.map((item, i) => (
        <div key={i}>
          {item.name} - ${item.price} x {item.qty}
        </div>
      ))}
    </div>
  );
}
```

### nixStore

Global state management:

```typescript
import { nixStore } from 'fynixui';

// Create store
const userStore = nixStore({
  name: 'John Doe',
  email: 'john@example.com',
  isAdmin: false
});

// Use in components
function UserProfile() {
  const user = userStore;
  
  return (
    <div>
      <h1>{user.value.name}</h1>
      <p>{user.value.email}</p>
      <button r-click={() => {
        user.value = { ...user.value, isAdmin: true };
      }}>
        Make Admin
      </button>
    </div>
  );
}
```

### nixLocalStorage

Persistent state with localStorage:

```typescript
import { nixLocalStorage } from 'fynixui';

function Settings() {
  const theme = nixLocalStorage('theme', 'light');
  
  return (
    <div>
      <p>Current theme: {theme.value}</p>
      <button r-click={() => {
        theme.value = theme.value === 'light' ? 'dark' : 'light';
      }}>
        Toggle Theme
      </button>
    </div>
  );
}
```

---

## Hooks API

### Basic Hooks

#### nixState
```typescript
const state = nixState<T>(initialValue: T);
// Returns reactive state object with .value property
```

#### nixRef
```typescript
const ref = nixRef<T>(initialValue: T);
// Returns mutable ref object that doesn't trigger rerenders
```

#### nixEffect
```typescript
nixEffect(() => {
  // Side effect code
  return () => {
    // Cleanup (optional)
  };
}, [dependency1, dependency2]);
```

#### nixEffectOnce
```typescript
nixEffectOnce(() => {
  // Runs only once on mount
  return () => {
    // Cleanup on unmount
  };
});
```

#### nixEffectAlways
```typescript
nixEffectAlways(() => {
  // Runs on every render
});
```

### Advanced Hooks

#### nixMemo
```typescript
const memoized = nixMemo(() => {
  return expensiveComputation();
}, [dependency1, dependency2]);
```

#### nixCallback
```typescript
const callback = nixCallback((arg) => {
  // Function body
}, [dependency1, dependency2]);
```

#### nixPrevious
```typescript
const count = nixState(0);
const prevCount = nixPrevious(count.value);
```

#### nixDebounce
```typescript
const search = nixState('');
const debouncedSearch = nixDebounce(search.value, 500);
```

#### nixInterval
```typescript
nixInterval(() => {
  console.log('Tick');
}, 1000);
```

### Async Hooks

#### nixAsync
```typescript
const data = nixAsync(async () => {
  const response = await fetch('/api/data');
  return response.json();
}, []);

// data.value has: { loading, error, data }
```

#### nixAsyncQuery
```typescript
const userData = nixAsyncQuery(
  'user',
  async () => {
    const res = await fetch(`/api/users/${userId}`);
    return res.json();
  },
  { 
    enabled: !!userId,
    refetchInterval: 30000 
  }
);
```

#### nixAsyncCached
```typescript
const cachedData = nixAsyncCached(
  'cache-key',
  async () => {
    return await fetchExpensiveData();
  },
  { ttl: 60000 } // Cache for 60 seconds
);
```

#### nixAsyncDebounce
```typescript
const results = nixAsyncDebounce(
  async (searchTerm) => {
    const res = await fetch(`/api/search?q=${searchTerm}`);
    return res.json();
  },
  searchTerm.value,
  500
);
```

### Form Hooks

#### nixForm
```typescript
const form = nixForm({
  initialValues: {
    name: '',
    email: ''
  },
  validate: (values) => {
    const errors: any = {};
    if (!values.email.includes('@')) {
      errors.email = 'Invalid email';
    }
    return errors;
  },
  onSubmit: async (values) => {
    await submitForm(values);
  }
});

<form r-submit={form.handleSubmit}>
  <input 
    value={form.values.name}
    r-input={(e) => form.setFieldValue('name', e.target.value)}
  />
  {form.errors.email && <span>{form.errors.email}</span>}
  <button type="submit" disabled={form.isSubmitting}>
    Submit
  </button>
</form>
```

#### nixFormAsync
```typescript
const form = nixFormAsync({
  initialValues: { username: '' },
  validate: async (values) => {
    const available = await checkUsername(values.username);
    return available ? {} : { username: 'Username taken' };
  },
  onSubmit: async (values) => {
    await createAccount(values);
  }
});
```

### Lazy Loading

#### nixLazy
```typescript
const LazyComponent = nixLazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
```

#### nixLazyAsync
```typescript
const AsyncComponent = nixLazyAsync(async () => {
  await delay(1000);
  return () => <div>Loaded!</div>;
});
```

---

## Security Features

### Built-in XSS Protection

Fynix sanitizes all text content and attribute values automatically:

```typescript
// Automatically escaped
const userInput = '<script>alert("XSS")</script>';
<div>{userInput}</div>
// Renders as: &lt;script&gt;alert("XSS")&lt;/script&gt;

// Dangerous properties blocked
<div innerHTML={userInput} /> // ❌ Blocked with console error
<div textContent={userInput} /> // ✅ Safe, sanitized
```

### URL Validation

```typescript
// Dangerous protocols blocked
<a href="javascript:alert('XSS')">Link</a> // ❌ Blocked
<a href="data:text/html,<script>alert()</script>">Link</a> // ❌ Blocked

// Safe protocols allowed
<a href="https://example.com">Link</a> // ✅ Allowed
<a href="/internal/path">Link</a> // ✅ Allowed
<a href="mailto:user@example.com">Email</a> // ✅ Allowed
```

### Props Sanitization

```typescript
// Router automatically sanitizes route props
router.navigate('/users/123', {
  name: '<script>alert("XSS")</script>',
  role: 'admin'
});

// Props received are sanitized:
// { name: '&lt;script&gt;...', role: 'admin' }
```

### Event Handler Security

```typescript
// Inline event handlers blocked
<button onclick="maliciousCode()">Click</button> // ❌ Blocked

// Use r- prefix instead
<button r-click={handleClick}>Click</button> // ✅ Safe
```

### Content Security Policy

Recommended CSP headers:

```http
Content-Security-Policy: 
  default-src 'self'; 
  script-src 'self' 'unsafe-inline'; 
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  connect-src 'self' https://api.example.com;
```

---

## Performance Optimization

### Memoization

```typescript
// Memoize expensive computations
const expensiveValue = nixMemo(() => {
  return complexCalculation(data.value);
}, [data.value]);

// Memoize callbacks
const handleClick = nixCallback(() => {
  // Handler logic
}, [dependency]);
```

### Code Splitting

```typescript
// Route-based splitting (automatic)
src/
├── home/view.tsx      // Separate chunk
├── about/view.tsx     // Separate chunk
└── dashboard/view.tsx // Separate chunk

// Component-based splitting
const HeavyComponent = nixLazy(() => import('./HeavyComponent'));
```

### Virtual Scrolling

```typescript
function LargeList({ items }) {
  const [visibleRange, setVisibleRange] = nixState({ start: 0, end: 50 });
  
  const visibleItems = nixComputed(() => 
    items.value.slice(visibleRange.value.start, visibleRange.value.end)
  );
  
  return (
    <div 
      r-scroll={handleScroll}
      style={{ height: '500px', overflow: 'auto' }}
    >
      <div style={{ height: `${items.value.length * 50}px` }}>
        <div style={{ 
          transform: `translateY(${visibleRange.value.start * 50}px)` 
        }}>
          {visibleItems.value.map(item => (
            <div key={item.id} style={{ height: '50px' }}>
              {item.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

### Debouncing and Throttling

```typescript
// Debounce search input
const search = nixState('');
const debouncedSearch = nixDebounce(search.value, 300);

nixEffect(() => {
  performSearch(debouncedSearch.value);
}, [debouncedSearch.value]);

// Throttle scroll handler
const throttledScroll = nixCallback(
  throttle(() => {
    handleScroll();
  }, 100),
  []
);
```

### Priority Updates

```typescript
// High priority - user interactions
<button r-click={() => {
  // Scheduled with high priority
  count.value++;
}}>Click</button>

// Low priority - analytics
requestIdleCallback(() => {
  analytics.track('page_view');
});
```

---

## API Reference

### Core Functions

#### h / Fynix
```typescript
function h(
  type: VNodeType,
  props: VNodeProps | null,
  ...children: VNodeChildren[]
): VNode

// Aliases
Fynix === h
```

#### mount
```typescript
function mount(
  AppComponent: ComponentFunction,
  root: string | Element,
  props?: any
): void
```

#### patch
```typescript
function patch(
  parent: Node,
  newVNode: VNode | string | number | null,
  oldVNode: VNode | string | number | null
): Promise<void>
```

#### renderComponent
```typescript
function renderComponent(
  Component: ComponentFunction,
  props?: any
): VNode
```

### Router Functions

#### createFynix
```typescript
function createFynix(): FynixRouter

interface FynixRouter {
  mountRouter(selector?: string): void;
  navigate(path: string, props?: Record<string, any>): void;
  replace(path: string, props?: Record<string, any>): void;
  back(): void;
  cleanup(): void;
  preloadRoute?(path: string): Promise<void>;
  clearCache?(): void;
}
```

#### setLinkProps
```typescript
function setLinkProps(
  key: string,
  props: Record<string, any>
): void
```

#### clearLinkProps
```typescript
function clearLinkProps(key: string): void
```

### State Hooks

#### nixState
```typescript
function nixState<T>(initialValue: T): ReactiveState<T>

interface ReactiveState<T> {
  value: T;
  subscribe(callback: () => void): () => void;
}
```

#### nixComputed
```typescript
function nixComputed<T>(
  compute: () => T
): ReactiveState<T>
```

#### nixStore
```typescript
function nixStore<T>(
  initialValue: T
): ReactiveState<T>
```

#### nixRef
```typescript
function nixRef<T>(
  initialValue: T
): { value: T }
```

### Effect Hooks

#### nixEffect
```typescript
function nixEffect(
  effect: () => void | (() => void),
  deps?: any[]
): void
```

#### nixEffectOnce
```typescript
function nixEffectOnce(
  effect: () => void | (() => void)
): void
```

#### nixEffectAlways
```typescript
function nixEffectAlways(
  effect: () => void
): void
```

### Utility Hooks

#### nixMemo
```typescript
function nixMemo<T>(
  compute: () => T,
  deps: any[]
): T
```

#### nixCallback
```typescript
function nixCallback<T extends Function>(
  callback: T,
  deps: any[]
): T
```

#### nixPrevious
```typescript
function nixPrevious<T>(value: T): T | undefined
```

#### nixDebounce
```typescript
function nixDebounce<T>(
  value: T,
  delay: number
): T
```

#### nixInterval
```typescript
function nixInterval(
  callback: () => void,
  delay: number
): void
```

### Async Hooks

#### nixAsync
```typescript
function nixAsync<T>(
  asyncFn: () => Promise<T>,
  deps?: any[]
): ReactiveState<{
  loading: boolean;
  error: Error | null;
  data: T | null;
}>
```

#### nixAsyncQuery
```typescript
function nixAsyncQuery<T>(
  key: string,
  queryFn: () => Promise<T>,
  options?: {
    enabled?: boolean;
    refetchInterval?: number;
    retry?: number;
  }
): ReactiveState<{
  loading: boolean;
  error: Error | null;
  data: T | null;
}>
```

### Form Hooks

#### nixForm
```typescript
function nixForm<T extends Record<string, any>>(config: {
  initialValues: T;
  validate?: (values: T) => Partial<Record<keyof T, string>>;
  onSubmit: (values: T) => void | Promise<void>;
}): FormState<T>

interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  isSubmitting: boolean;
  setFieldValue(field: keyof T, value: any): void;
  handleSubmit(e: Event): void;
  reset(): void;
}
```

---

## Examples

### Todo App

```typescript
import { Fynix, mount, nixState, nixComputed } from 'fynixui';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function TodoApp() {
  const todos = nixState<Todo[]>([]);
  const input = nixState('');
  const filter = nixState<'all' | 'active' | 'completed'>('all');
  
  const filteredTodos = nixComputed(() => {
    const list = todos.value;
    if (filter.value === 'active') {
      return list.filter(t => !t.completed);
    }
    if (filter.value === 'completed') {
      return list.filter(t => t.completed);
    }
    return list;
  });
  
  const addTodo = () => {
    if (input.value.trim()) {
      todos.value = [
        ...todos.value,
        {
          id: Date.now(),
          text: input.value,
          completed: false
        }
      ];
      input.value = '';
    }
  };
  
  const toggleTodo = (id: number) => {
    todos.value = todos.value.map(todo =>
      todo.id === id 
        ? { ...todo, completed: !todo.completed }
        : todo
    );
  };
  
  const deleteTodo = (id: number) => {
    todos.value = todos.value.filter(todo => todo.id !== id);
  };
  
  return (
    <div className="todo-app">
      <h1>Todo App</h1>
      
      <div className="input-section">
        <input
          type="text"
          value={input.value}
          r-input={(e) => input.value = e.target.value}
          r-keypress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="What needs to be done?"
        />
        <button r-click={addTodo}>Add</button>
      </div>
      
      <div className="filter-section">
        <button 
          r-click={() => filter.value = 'all'}
          className={filter.value === 'all' ? 'active' : ''}
        >
          All
        </button>
        <button 
          r-click={() => filter.value = 'active'}
          className={filter.value === 'active' ? 'active' : ''}
        >
          Active
        </button>
        <button 
          r-click={() => filter.value = 'completed'}
          className={filter.value === 'completed' ? 'active' : ''}
        >
          Completed
        </button>
      </div>
      
      <ul className="todo-list">
        {filteredTodos.value.map(todo => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={todo.completed}
              r-change={() => toggleTodo(todo.id)}
            />
            <span>{todo.text}</span>
            <button r-click={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

mount(TodoApp, '#root');
```

### User Dashboard with Router

```typescript
// src/dashboard/view.tsx
import { nixAsync, nixState } from 'fynixui';

export default function Dashboard() {
  const userData = nixAsync(async () => {
    const res = await fetch('/api/user');
    return res.json();
  }, []);
  
  if (userData.value.loading) {
    return <div>Loading...</div>;
  }
  
  if (userData.value.error) {
    return <div>Error: {userData.value.error.message}</div>;
  }
  
  const user = userData.value.data;
  
  return (
    <div className="dashboard">
      <h1>Welcome, {user.name}!</h1>
      <div className="stats">
        <div className="stat-card">
          <h3>Posts</h3>
          <p>{user.stats.posts}</p>
        </div>
        <div className="stat-card">
          <h3>Followers</h3>
          <p>{user.stats.followers}</p>
        </div>
        <div className="stat-card">
          <h3>Following</h3>
          <p>{user.stats.following}</p>
        </div>
      </div>
      
      <nav>
        <a href="/profile" data-fynix-link>Profile</a>
        <a href="/settings" data-fynix-link>Settings</a>
        <a href="/logout" data-fynix-link>Logout</a>
      </nav>
    </div>
  );
}

Dashboard.meta = {
  title: "Dashboard - My App",
  description: "User dashboard"
};
```

### Shopping Cart

```typescript
import { Fynix, mount, nixState, nixComputed } from 'fynixui';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

function ShoppingCart() {
  const cart = nixState<CartItem[]>([]);
  const products = nixState<Product[]>([
    { id: 1, name: 'Laptop', price: 999, image: '/laptop.jpg' },
    { id: 2, name: 'Mouse', price: 29, image: '/mouse.jpg' },
    { id: 3, name: 'Keyboard', price: 79, image: '/keyboard.jpg' }
  ]);
  
  const total = nixComputed(() => {
    return cart.value.reduce((sum, item) => 
      sum + item.price * item.quantity, 0
    );
  });
  
  const itemCount = nixComputed(() => {
    return cart.value.reduce((count, item) => 
      count + item.quantity, 0
    );
  });
  
  const addToCart = (product: Product) => {
    const existing = cart.value.find(item => item.id === product.id);
    
    if (existing) {
      cart.value = cart.value.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      cart.value = [...cart.value, { ...product, quantity: 1 }];
    }
  };
  
  const removeFromCart = (productId: number) => {
    cart.value = cart.value.filter(item => item.id !== productId);
  };
  
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      cart.value = cart.value.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      );
    }
  };
  
  return (
    <div className="shopping-cart">
      <header>
        <h1>Store</h1>
        <div className="cart-summary">
          Cart: {itemCount.value} items - ${total.value.toFixed(2)}
        </div>
      </header>
      
      <div className="products">
        <h2>Products</h2>
        <div className="product-grid">
          {products.value.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              <button r-click={() => addToCart(product)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="cart">
        <h2>Shopping Cart</h2>
        {cart.value.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          <>
            {cart.value.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p>${item.price}</p>
                </div>
                <div className="quantity-controls">
                  <button r-click={() => updateQuantity(item.id, item.quantity - 1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button r-click={() => updateQuantity(item.id, item.quantity + 1)}>
                    +
                  </button>
                </div>
                <button r-click={() => removeFromCart(item.id)}>
                  Remove
                </button>
              </div>
            ))}
            
            <div className="cart-total">
              <h3>Total: ${total.value.toFixed(2)}</h3>
              <button className="checkout-btn">Checkout</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

mount(ShoppingCart, '#root');
```

### Form with Validation

```typescript
import { Fynix, mount, nixForm } from 'fynixui';

function RegistrationForm() {
  const form = nixForm({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validate: (values) => {
      const errors: any = {};
      
      if (!values.username) {
        errors.username = 'Username is required';
      } else if (values.username.length < 3) {
        errors.username = 'Username must be at least 3 characters';
      }
      
      if (!values.email) {
        errors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        errors.email = 'Invalid email format';
      }
      
      if (!values.password) {
        errors.password = 'Password is required';
      } else if (values.password.length < 8) {
        errors.password = 'Password must be at least 8 characters';
      }
      
      if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
      
      return errors;
    },
    onSubmit: async (values) => {
      await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });
      
      alert('Registration successful!');
      form.reset();
    }
  });
  
  return (
    <div className="registration-form">
      <h1>Register</h1>
      
      <form r-submit={form.handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={form.values.username}
            r-input={(e) => form.setFieldValue('username', e.target.value)}
          />
          {form.errors.username && (
            <span className="error">{form.errors.username}</span>
          )}
        </div>
        
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={form.values.email}
            r-input={(e) => form.setFieldValue('email', e.target.value)}
          />
          {form.errors.email && (
            <span className="error">{form.errors.email}</span>
          )}
        </div>
        
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={form.values.password}
            r-input={(e) => form.setFieldValue('password', e.target.value)}
          />
          {form.errors.password && (
            <span className="error">{form.errors.password}</span>
          )}
        </div>
        
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            value={form.values.confirmPassword}
            r-input={(e) => form.setFieldValue('confirmPassword', e.target.value)}
          />
          {form.errors.confirmPassword && (
            <span className="error">{form.errors.confirmPassword}</span>
          )}
        </div>
        
        <button 
          type="submit" 
          disabled={form.isSubmitting}
        >
          {form.isSubmitting ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}

mount(RegistrationForm, '#root');
```

---

## Migration Guide

### From React

#### State
```typescript
// React
const [count, setCount] = useState(0);
setCount(count + 1);

// Fynix
const count = nixState(0);
count.value++;
```

#### Effects
```typescript
// React
useEffect(() => {
  // effect
  return () => {
    // cleanup
  };
}, [dep]);

// Fynix
nixEffect(() => {
  // effect
  return () => {
    // cleanup
  };
}, [dep]);
```

#### Event Handlers
```typescript
// React
<button onClick={handleClick}>Click</button>

// Fynix
<button r-click={handleClick}>Click</button>
```

#### Refs
```typescript
// React
const ref = useRef(null);

// Fynix
const ref = nixRef(null);
```

### From Vue

#### Reactive State
```typescript
// Vue
const count = ref(0);
count.value++;

// Fynix
const count = nixState(0);
count.value++;
```

#### Computed Properties
```typescript
// Vue
const doubled = computed(() => count.value * 2);

// Fynix
const doubled = nixComputed(() => count.value * 2);
```

#### Watchers
```typescript
// Vue
watch(count, (newVal) => {
  console.log(newVal);
});

// Fynix
nixEffect(() => {
  console.log(count.value);
}, [count.value]);
```

---

## Troubleshooting

### Common Issues

#### Component Not Rendering

**Problem:** Component doesn't appear on screen

**Solutions:**
1. Check mount selector is correct
2. Verify component returns valid VNode
3. Check for JavaScript errors in console
4. Ensure element exists before mounting

```typescript
// ❌ Wrong
mount(App, '#root'); // Element doesn't exist yet

// ✅ Correct
window.addEventListener('DOMContentLoaded', () => {
  mount(App, '#root');
});
```

#### State Not Updating

**Problem:** UI doesn't update when state changes

**Solutions:**
1. Use `.value` to access/modify reactive state
2. Ensure state is created with `nixState`
3. Check if component is still mounted

```typescript
// ❌ Wrong
const count = nixState(0);
count++; // Doesn't trigger update

// ✅ Correct
const count = nixState(0);
count.value++; // Triggers update
```

#### Router Not Working

**Problem:** Navigation doesn't work

**Solutions:**
1. Call `router.mountRouter()` after creating router
2. Use `data-fynix-link` attribute on links
3. Check file structure matches routing convention
4. Verify route files export default component

```typescript
// ✅ Correct setup
import { createFynix } from 'fynixui';

const router = createFynix();
router.mountRouter('#app-root');
```

#### Memory Leaks

**Problem:** Application slows down over time

**Solutions:**
1. Clean up effects with return function
2. Unsubscribe from manual subscriptions
3. Use `nixEffectOnce` for one-time setup
4. Clear intervals and timeouts

```typescript
// ✅ Proper cleanup
nixEffect(() => {
  const interval = setInterval(() => {
    console.log('tick');
  }, 1000);
  
  return () => {
    clearInterval(interval); // Cleanup
  };
}, []);
```

#### HMR Not Working

**Problem:** Changes don't reflect during development

**Solutions:**
1. Check Vite plugin is configured correctly
2. Verify file extensions are in `include` list
3. Clear browser cache
4. Restart dev server

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [
    fynixPlugin({
      include: ['.tsx', '.jsx', '.ts', '.js', '.fnx']
    })
  ]
});
```

### Performance Issues

#### Slow Rendering

**Solutions:**
1. Use `nixMemo` for expensive computations
2. Implement virtual scrolling for long lists
3. Use `nixCallback` to prevent function recreation
4. Add `key` props to list items

```typescript
// ✅ Optimized list
function UserList({ users }) {
  return (
    <>
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </>
  );
}
```

#### Too Many Rerenders

**Solutions:**
1. Check for infinite loops in effects
2. Use proper dependency arrays
3. Avoid creating new objects in render
4. Use `nixComputed` for derived state

```typescript
// ❌ Wrong - infinite loop
nixEffect(() => {
  state.value = { ...state.value, updated: true };
}, [state.value]);

// ✅ Correct
nixEffect(() => {
  state.value = { ...state.value, updated: true };
}, []); // Empty deps or specific primitive deps
```

### Build Issues

#### Module Not Found

**Solutions:**
1. Check import paths are correct
2. Verify package is installed
3. Check file extensions match Vite config
4. Clear node_modules and reinstall

```bash
rm -rf node_modules package-lock.json
npm install
```

#### Type Errors

**Solutions:**
1. Add TypeScript types: `npm i -D @types/node`
2. Configure `tsconfig.json` properly
3. Use explicit type annotations
4. Check Fynix type definitions

```json
// tsconfig.json
{
  "compilerOptions": {
    "jsx": "preserve",
    "jsxFactory": "Fynix",
    "jsxFragmentFactory": "Fynix.Fragment",
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler"
  }
}
```

---

## Best Practices

### Component Design

1. **Keep components small and focused**
   ```typescript
   // ✅ Good - single responsibility
   function UserAvatar({ user }) {
     return <img src={user.avatar} alt={user.name} />;
   }
   
   function UserInfo({ user }) {
     return (
       <div>
         <UserAvatar user={user} />
         <h3>{user.name}</h3>
       </div>
     );
   }
   ```

2. **Use TypeScript for prop types**
   ```typescript
   interface UserProps {
     user: {
       id: number;
       name: string;
       email: string;
     };
     onEdit?: (id: number) => void;
   }
   
   function UserCard({ user, onEdit }: UserProps) {
     // ...
   }
   ```

3. **Extract reusable logic into hooks**
   ```typescript
   function useWindowSize() {
     const width = nixState(window.innerWidth);
     const height = nixState(window.innerHeight);
     
     nixEffectOnce(() => {
       const handleResize = () => {
         width.value = window.innerWidth;
         height.value = window.innerHeight;
       };
       
       window.addEventListener('resize', handleResize);
       return () => window.removeEventListener('resize', handleResize);
     });
     
     return { width: width.value, height: height.value };
   }
   ```

### State Management

1. **Keep state close to where it's used**
   ```typescript
   // ✅ Good - local state
   function Counter() {
     const count = nixState(0);
     return <button r-click={() => count.value++}>{count.value}</button>;
   }
   ```

2. **Use store for global state**
   ```typescript
   // ✅ Good - global state
   const userStore = nixStore({
     name: '',
     isAuthenticated: false
   });
   ```

3. **Prefer computed over manual calculations**
   ```typescript
   // ❌ Avoid
   function getTotalPrice() {
     return items.value.reduce((sum, item) => sum + item.price, 0);
   }
   
   // ✅ Better
   const totalPrice = nixComputed(() => 
     items.value.reduce((sum, item) => sum + item.price, 0)
   );
   ```

### Performance

1. **Use keys in lists**
   ```typescript
   // ✅ Good
   {items.map(item => (
     <Item key={item.id} item={item} />
   ))}
   ```

2. **Memoize expensive operations**
   ```typescript
   const processedData = nixMemo(() => {
     return expensiveOperation(data.value);
   }, [data.value]);
   ```

3. **Lazy load heavy components**
   ```typescript
   const HeavyChart = nixLazy(() => import('./HeavyChart'));
   ```

### Security

1. **Never use innerHTML**
   ```typescript
   // ❌ Dangerous
   <div innerHTML={userInput} />
   
   // ✅ Safe
   <div>{userInput}</div>
   ```

2. **Validate user input**
   ```typescript
   const handleSubmit = (e) => {
     e.preventDefault();
     const email = emailInput.value;
     
     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
       alert('Invalid email');
       return;
     }
     
     submitForm({ email });
   };
   ```

3. **Use CSP headers in production**
   ```http
   Content-Security-Policy: default-src 'self'; script-src 'self'
   ```

---

## Contributing

Fynix is open source and welcomes contributions!

### Development Setup

```bash
# Clone repository
git clone https://github.com/restygonzales/fynix.git
cd fynix

# Install dependencies
npm install

# Run tests
npm test

# Build
npm run build
```

### Guidelines

1. Follow TypeScript best practices
2. Add tests for new features
3. Update documentation
4. Follow conventional commits
5. Keep changes focused and atomic

---

## License

Fynix is MIT licensed. See LICENSE file for details.

Copyright (c) 2026 Resty Gonzales

---

## Changelog

### Version 1.0.0 (2026-02-14)

- Initial release
- Virtual DOM implementation
- Fiber architecture
- Priority-based scheduling
- File-based routing
- Comprehensive hooks API
- Built-in security features
- TypeScript support
- Vite plugin
- Hot module replacement

---

## Resources

- **GitHub**: https://github.com/restygonzales/fynix
- **Documentation**: https://fynix.dev/docs
- **Examples**: https://fynix.dev/examples
- **Discord Community**: https://discord.gg/fynix
- **Twitter**: @fynixjs

---

**Made with ❤️ by Resty Gonzales**