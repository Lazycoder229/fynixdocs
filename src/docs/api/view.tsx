import { Fynix, VNode } from "fynixui";
import Docs from "../view";
import { For } from "fynixui";

// ─────────────────────────────────────────────────────────────────────────────

interface ApiParam {
  name: string;
  type: string;
  description: string;
}

interface ApiEntry {
  num: string;
  name: string;
  returns: string;
  summary: string;
  params: ApiParam[];
  returnProps: ApiParam[];
  code: string;
}

interface ApiSection {
  id: string;
  label: string;
  entries: ApiEntry[];
}

export default function ApiReference(): VNode {
  const sections: ApiSection[] = [
    {
      id: "core",
      label: "Core",
      entries: [
        {
          num: "01",
          name: "h(type, props, ...children)",
          returns: "VNode",
          summary:
            "Creates a virtual DOM node. This is the underlying call JSX compiles to — you rarely call it directly.",
          params: [
            {
              name: "type",
              type: "string | symbol | Function",
              description:
                "HTML tag name, Fragment symbol, or component function",
            },
            {
              name: "props",
              type: "object | null",
              description: "Attributes or props to apply to the element",
            },
            {
              name: "children",
              type: "VNodeChildren[]",
              description: "Zero or more child VNodes",
            },
          ],
          returnProps: [],
          code: `h("div", { id: "app" }, h("p", null, "Hello"))
// Equivalent JSX:
<div id="app"><p>Hello</p></div>`,
        },
        {
          num: "02",
          name: "Fynix",
          returns: "VNode",
          summary:
            "Alias for h. Set as the JSX factory in tsconfig so the compiler calls Fynix() for every JSX element.",
          params: [],
          returnProps: [],
          code: `// tsconfig.json
{ "compilerOptions": { "jsxFactory": "Fynix" } }

// Every JSX element compiles to Fynix(...)
import { Fynix } from "fynixui";
const el = <div class="box">Hello</div>;`,
        },
        {
          num: "03",
          name: "Fragment",
          returns: "symbol",
          summary:
            "Groups multiple children without adding a wrapper DOM node. Used implicitly by the <> shorthand.",
          params: [],
          returnProps: [],
          code: `import { Fragment } from "fynixui";

// Both are equivalent:
<>{child1}{child2}</>
<Fragment>{child1}{child2}</Fragment>`,
        },
        {
          num: "04",
          name: "mount(vnode, container)",
          returns: "void",
          summary:
            "Mounts a VNode tree into a real DOM element. Call once at the entry point of your app.",
          params: [
            {
              name: "vnode",
              type: "VNode",
              description: "Root VNode — usually your top-level App component",
            },
            {
              name: "container",
              type: "HTMLElement",
              description: "DOM node to mount into",
            },
          ],
          returnProps: [],
          code: `import { mount, h } from "fynixui";
import App from "./App";

mount(h(App, null), document.getElementById("app"));`,
        },
        {
          num: "05",
          name: "batchUpdates(fn)",
          returns: "void",
          summary:
            "Batches multiple state mutations into a single reconciliation pass, preventing intermediate re-renders.",
          params: [
            {
              name: "fn",
              type: "() => void",
              description: "Function containing one or more state mutations",
            },
          ],
          returnProps: [],
          code: `import { batchUpdates } from "fynixui";

// Without batch: 2 re-renders
a.value = 1;
b.value = 2;

// With batch: 1 re-render
batchUpdates(() => {
  a.value = 1;
  b.value = 2;
});`,
        },
      ],
    },
    {
      id: "state",
      label: "State Hooks",
      entries: [
        {
          num: "01",
          name: "nixState<T>(initial)",
          returns: "NixState<T>",
          summary:
            "Creates local reactive state. Reading .value during render subscribes the component; assigning .value triggers a re-render.",
          params: [
            { name: "initial", type: "T", description: "Starting value" },
          ],
          returnProps: [
            {
              name: ".value",
              type: "T (get/set)",
              description:
                "Current value — read to subscribe, assign to update",
            },
            {
              name: ".subscribe(fn)",
              type: "(fn) => () => void",
              description:
                "Manually subscribe to changes; returns an unsubscribe function",
            },
            {
              name: ".asReadOnly()",
              type: "ReadOnlyState<T>",
              description:
                "Returns a read-only view — useful for exposing state from a hook",
            },
            {
              name: ".cleanup()",
              type: "() => void",
              description: "Destroy the state and notify all subscribers",
            },
            {
              name: ".isDestroyed()",
              type: "() => boolean",
              description: "True after cleanup() has been called",
            },
          ],
          code: `import { nixState } from "fynixui";

const count = nixState(0);

count.value++;        // increment — triggers re-render
count.value = 10;     // assign — triggers re-render
console.log(count.value); // 10`,
        },
        {
          num: "02",
          name: "nixComputed<T>(computeFn)",
          returns: "ComputedState<T>",
          summary:
            "Derived state that re-evaluates automatically when any reactive value read inside computeFn changes.",
          params: [
            {
              name: "computeFn",
              type: "() => T",
              description:
                "Pure function whose reactive reads are tracked as dependencies",
            },
          ],
          returnProps: [],
          code: `import { nixState, nixComputed } from "fynixui";

const count = nixState(4);
const doubled = nixComputed(() => count.value * 2);

console.log(doubled.value); // 8
count.value = 10;
console.log(doubled.value); // 20 — auto-recomputed`,
        },
        {
          num: "03",
          name: "nixStore<T>(path, initial)",
          returns: "StoreState<T>",
          summary:
            "Global reactive state keyed by a dot-namespaced path. Any component reading the same path stays synchronized automatically.",
          params: [
            {
              name: "path",
              type: "string",
              description:
                "Unique dot-namespaced identifier, e.g. 'dashboard.stats'",
            },
            {
              name: "initial",
              type: "T",
              description:
                "Initial value used only if the path hasn't been set yet",
            },
          ],
          returnProps: [],
          code: `import { nixStore } from "fynixui";

// Component A
const theme = nixStore("app.theme", "dark");
theme.value = "light"; // all subscribers update

// Component B — same key, same instance
const theme = nixStore("app.theme", "dark");
console.log(theme.value); // "light"`,
        },
        {
          num: "04",
          name: "nixLocalStorage<T>(key, initial)",
          returns: "LocalStorageState<T>",
          summary:
            "Reactive state that reads from and writes to localStorage automatically. Survives page reloads.",
          params: [
            {
              name: "key",
              type: "string",
              description: "localStorage key to read/write",
            },
            {
              name: "initial",
              type: "T",
              description: "Fallback value when the key doesn't exist yet",
            },
          ],
          returnProps: [
            {
              name: ".value",
              type: "T (get/set)",
              description:
                "Current value — assignment persists to localStorage",
            },
            {
              name: ".set(v)",
              type: "(v: T) => boolean",
              description:
                "Set value and persist; returns false if storage is full",
            },
            {
              name: ".clear()",
              type: "() => void",
              description:
                "Remove the key from localStorage and reset to initial",
            },
            {
              name: ".getSize()",
              type: "() => number",
              description: "Byte size of the stored value",
            },
            {
              name: ".isValid()",
              type: "() => boolean",
              description: "True if the stored value passes JSON parse",
            },
          ],
          code: `import { nixLocalStorage } from "fynixui";

const settings = nixLocalStorage("user-settings", { dark: false });

settings.value = { dark: true };     // persists immediately
settings.set({ dark: false });        // same, but returns boolean
settings.clear();                     // removes from localStorage`,
        },
      ],
    },
    {
      id: "effects",
      label: "Effect Hooks",
      entries: [
        {
          num: "01",
          name: "nixEffect(effect, deps?)",
          returns: "void",
          summary:
            "Runs a side effect after render. Return a cleanup function to cancel timers, subscriptions, or event listeners on unmount or before the next run.",
          params: [
            {
              name: "effect",
              type: "() => void | (() => void)",
              description: "Effect function — optionally returns a cleanup",
            },
            {
              name: "deps",
              type: "any[]",
              description:
                "Re-run when any dep changes; omit to run on every render; pass [] to run once",
            },
          ],
          returnProps: [],
          code: `import { nixEffect } from "fynixui";

nixEffect(() => {
  const id = setInterval(tick, 1000);
  return () => clearInterval(id); // cleanup on unmount
}, []);

// Re-run when userId changes
nixEffect(() => {
  fetchProfile(userId.value);
}, [userId.value]);`,
        },
        {
          num: "02",
          name: "nixEffectOnce(effect)",
          returns: "void",
          summary:
            "Shorthand for nixEffect(effect, []). Runs the effect exactly once after the first render, then cleans up on unmount.",
          params: [
            {
              name: "effect",
              type: "() => void | (() => void)",
              description: "Effect to run once on mount",
            },
          ],
          returnProps: [],
          code: `import { nixEffectOnce } from "fynixui";

nixEffectOnce(() => {
  analytics.track("page_view");
  return () => analytics.track("page_leave");
});`,
        },
        {
          num: "03",
          name: "nixInterval(callback, ms)",
          returns: "void",
          summary:
            "Calls a callback on a fixed interval and automatically clears it when the component unmounts.",
          params: [
            {
              name: "callback",
              type: "() => void",
              description: "Function to call on each tick",
            },
            {
              name: "ms",
              type: "number",
              description: "Interval delay in milliseconds",
            },
          ],
          returnProps: [],
          code: `import { nixInterval } from "fynixui";

// Fires every 5 seconds — cleared automatically on unmount
nixInterval(() => {
  stats.value = fetchLatestStats();
}, 5000);`,
        },
      ],
    },
    {
      id: "memo",
      label: "Memoization Hooks",
      entries: [
        {
          num: "01",
          name: "nixMemo<T>(factory, deps)",
          returns: "T",
          summary:
            "Memoizes an expensive computed value. The factory re-runs only when a dependency changes, not on every render.",
          params: [
            {
              name: "factory",
              type: "() => T",
              description: "Value producer — expensive operations go here",
            },
            {
              name: "deps",
              type: "any[]",
              description: "Re-run factory when any dep changes",
            },
          ],
          returnProps: [],
          code: `import { nixMemo } from "fynixui";

// Only re-sorts when items changes
const sorted = nixMemo(
  () => [...items.value].sort((a, b) => a.name.localeCompare(b.name)),
  [items.value]
);`,
        },
        {
          num: "02",
          name: "nixCallback<T>(fn, deps)",
          returns: "T",
          summary:
            "Memoizes a callback reference. Pass stable callbacks to child components to prevent unnecessary re-renders.",
          params: [
            {
              name: "fn",
              type: "Function",
              description: "Callback to memoize",
            },
            {
              name: "deps",
              type: "any[]",
              description: "Re-create callback when any dep changes",
            },
          ],
          returnProps: [],
          code: `import { nixCallback } from "fynixui";

// Stable reference — child won't re-render unless id changes
const handleSave = nixCallback(() => {
  save(id.value);
}, [id.value]);

<ExpensiveChild onSave={handleSave} />`,
        },
        {
          num: "03",
          name: "nixRef<T>(initial)",
          returns: "{ current: T }",
          summary:
            "A mutable container that persists across renders without triggering re-renders. Use for DOM refs or any mutable value that shouldn't cause updates.",
          params: [
            {
              name: "initial",
              type: "T",
              description: "Initial value for .current",
            },
          ],
          returnProps: [],
          code: `import { nixRef } from "fynixui";

const inputRef = nixRef<HTMLInputElement>(null);

// After mount, .current holds the real DOM node
function focusInput() {
  inputRef.current?.focus();
}

<input ref={inputRef} type="text" />`,
        },
        {
          num: "04",
          name: "nixPrevious<T>(value)",
          returns: "T",
          summary:
            "Returns the value from the previous render. Useful for detecting direction of change or animating between states.",
          params: [
            {
              name: "value",
              type: "T",
              description: "The current value to track",
            },
          ],
          returnProps: [],
          code: `import { nixPrevious } from "fynixui";

const prevCount = nixPrevious(count.value);

// Compare to detect direction
const increased = count.value > prevCount;`,
        },
      ],
    },
    {
      id: "async",
      label: "Async Hooks",
      entries: [
        {
          num: "01",
          name: "nixAsync<T>(asyncFn, deps)",
          returns: "{ data, loading, error, refetch }",
          summary:
            "Runs an async function and exposes reactive loading, error, and data handles. Cancels the in-flight request when deps change or the component unmounts.",
          params: [
            {
              name: "asyncFn",
              type: "async (signal: AbortSignal) => T",
              description:
                "Async fetcher — pass signal to fetch() to enable cancellation",
            },
            {
              name: "deps",
              type: "any[]",
              description: "Re-run when any dep changes; [] runs once on mount",
            },
          ],
          returnProps: [
            {
              name: "data",
              type: "NixState<T | null>",
              description: "Resolved value, or null while loading",
            },
            {
              name: "loading",
              type: "NixState<boolean>",
              description: "True while the promise is pending",
            },
            {
              name: "error",
              type: "NixState<Error | null>",
              description: "Thrown error, or null on success",
            },
            {
              name: "refetch",
              type: "() => void",
              description:
                "Manually re-trigger the fetcher without changing deps",
            },
          ],
          code: `import { nixAsync } from "fynixui/hooks/nixAsync";

const { data, loading, error, refetch } = nixAsync(
  async (signal) => {
    const res = await fetch("/api/posts", { signal });
    if (!res.ok) throw new Error("Failed");
    return res.json();
  },
  []
);

if (loading.value) return <p>Loading...</p>;
if (error.value) return <button r-click={refetch}>Retry</button>;
return <PostList posts={data.value} />;`,
        },
        {
          num: "02",
          name: "nixAsyncCached<T>(asyncFn, deps)",
          returns: "{ data, loading, error, refetch }",
          summary:
            "Like nixAsync but caches the result by deps key. Subsequent calls with the same deps return the cached value immediately without re-fetching.",
          params: [
            {
              name: "asyncFn",
              type: "async (signal: AbortSignal) => T",
              description: "Async fetcher",
            },
            {
              name: "deps",
              type: "any[]",
              description: "Cache key — same deps reuse the cached result",
            },
          ],
          returnProps: [],
          code: `import { nixAsyncCached } from "fynixui/hooks/nixAsync";

// Second call with the same userId returns instantly from cache
const { data } = nixAsyncCached(
  async (signal) => fetchUser(userId.value, signal),
  [userId.value]
);`,
        },
        {
          num: "03",
          name: "nixAsyncDebounce<T>(asyncFn, deps, delay)",
          returns: "{ data, loading, error, refetch }",
          summary:
            "Like nixAsync but waits for delay milliseconds of inactivity before firing. Ideal for search-as-you-type patterns.",
          params: [
            {
              name: "asyncFn",
              type: "async (signal: AbortSignal) => T",
              description: "Async fetcher",
            },
            {
              name: "deps",
              type: "any[]",
              description: "Re-run when any dep changes, after the delay",
            },
            {
              name: "delay",
              type: "number",
              description: "Debounce delay in milliseconds",
            },
          ],
          returnProps: [],
          code: `import { nixAsyncDebounce } from "fynixui/hooks/nixAsync";

// Only fetches 300ms after the user stops typing
const { data, loading } = nixAsyncDebounce(
  async (signal) => searchPosts(query.value, signal),
  [query.value],
  300
);`,
        },
      ],
    },
    {
      id: "forms",
      label: "Form Hooks",
      entries: [
        {
          num: "01",
          name: "nixForm<T>(initialValues, rules)",
          returns: "FormInstance<T>",
          summary:
            "Full-featured form handler with per-field validation, touched tracking, async submit, and reset.",
          params: [
            {
              name: "initialValues",
              type: "T",
              description:
                "Object with one key per form field and its default value",
            },
            {
              name: "rules",
              type: "ValidationRules<T>",
              description:
                "Per-field rules: required, minLength, maxLength, pattern, message",
            },
          ],
          returnProps: [
            {
              name: "values",
              type: "NixState<T>",
              description: "Current field values",
            },
            {
              name: "errors",
              type: "NixState<Errors>",
              description: "Validation error messages keyed by field name",
            },
            {
              name: "touched",
              type: "NixState<Touched>",
              description: "Which fields the user has interacted with",
            },
            {
              name: "isSubmitting",
              type: "NixState<boolean>",
              description: "True while the submit callback is running",
            },
            {
              name: "isValid",
              type: "ComputedState<boolean>",
              description: "True when all fields pass validation",
            },
            {
              name: "getFieldProps(field)",
              type: "FieldProps",
              description:
                "Returns value, r-input, and r-blur ready to spread onto an input",
            },
            {
              name: "handleSubmit(onSubmit)",
              type: "() => void",
              description:
                "Validate then call onSubmit(values) — skips if invalid",
            },
            {
              name: "reset()",
              type: "() => void",
              description:
                "Reset all values, errors, and touched back to initial",
            },
          ],
          code: `import { nixForm } from "fynixui";

const form = nixForm(
  { email: "", password: "" },
  {
    email:    { required: true, pattern: /^\S+@\S+$/, message: "Invalid email" },
    password: { required: true, minLength: 8, message: "Min 8 characters" },
  }
);

<form r-submit={(e) => { e.preventDefault(); form.handleSubmit(async (v) => login(v)); }}>
  <input type="email" {...form.getFieldProps("email")} />
  {form.errors.value.email && <span>{form.errors.value.email}</span>}

  <input type="password" {...form.getFieldProps("password")} />
  {form.errors.value.password && <span>{form.errors.value.password}</span>}

  <button type="submit" disabled={form.isSubmitting.value}>
    {form.isSubmitting.value ? "Signing in..." : "Sign in"}
  </button>
</form>`,
        },
        {
          num: "02",
          name: "nixDebounce(fn, delay)",
          returns: "DebouncedFn",
          summary:
            "Returns a debounced version of fn that only executes after delay milliseconds of silence. The timer resets on every call.",
          params: [
            {
              name: "fn",
              type: "(...args: any[]) => void",
              description: "Function to debounce",
            },
            {
              name: "delay",
              type: "number",
              description: "Wait time in milliseconds after the last call",
            },
          ],
          returnProps: [],
          code: `import { nixDebounce } from "fynixui";

const search = nixDebounce((query: string) => {
  searchQuery.value = query;
}, 300);

// r-input fires on every keystroke, but search() only runs
// 300ms after the user stops typing
<input r-input={(e) => search(e.target.value)} />`,
        },
      ],
    },
    {
      id: "router",
      label: "Router API",
      entries: [
        {
          num: "01",
          name: "createFynix(options?)",
          returns: "FynixRouter",
          summary:
            "Creates or returns the singleton router instance. Safe to call multiple times — always returns the same object.",
          params: [
            {
              name: "lazy",
              type: "boolean",
              description:
                "Enable lazy route loading via code splitting (default: false)",
            },
          ],
          returnProps: [
            {
              name: "mountRouter(selector)",
              type: "(selector: string) => void",
              description:
                "Attach the router to a DOM element and start rendering routes",
            },
            {
              name: "navigate(path, props?)",
              type: "(path: string, props?: object) => void",
              description:
                "Push a new history entry and render the matched route",
            },
            {
              name: "replace(path, props?)",
              type: "(path: string, props?: object) => void",
              description:
                "Replace the current history entry — Back won't return here",
            },
            {
              name: "back()",
              type: "() => void",
              description:
                "Navigate to the previous history entry with cached props",
            },
            {
              name: "cleanup()",
              type: "() => void",
              description: "Destroy the router and remove all event listeners",
            },
          ],
          code: `import createFynix from "fynixui/router";

const router = createFynix({ lazy: true });
router.mountRouter("#app");

// Programmatic navigation from any component
router.navigate("/dashboard/42", { source: "sidebar" });
router.replace("/login");
router.back();`,
        },
        {
          num: "02",
          name: "location",
          returns: "LocationManager",
          summary:
            "Reactive signal for the current route. Read .value during render to subscribe — the component re-renders on every navigation.",
          params: [],
          returnProps: [
            {
              name: ".value.path",
              type: "string",
              description: "Current URL pathname",
            },
            {
              name: ".value.params",
              type: "Record<string, string>",
              description: "Extracted dynamic route parameters",
            },
            {
              name: ".value.search",
              type: "string",
              description: "Raw query string including the leading ?",
            },
            {
              name: ".subscribe(cb)",
              type: "(cb) => () => void",
              description: "Subscribe to route changes; returns unsubscribe",
            },
          ],
          code: `import { location } from "fynixui/router";

function Breadcrumb(): VNode {
  // Subscribes automatically — re-renders on every navigation
  const { path, params } = location.value;

  return (
    <nav>
      <span>{path}</span>
      {params.id && <span> / {params.id}</span>}
    </nav>
  );
}`,
        },
      ],
    },
  ];

  return (
    <Docs>
      <div r-class="min-h-screen bg-white text-slate-800 relative overflow-x-hidden text-base md:text-lg font-normal">
        <div r-class="relative z-10 max-w-5xl mx-auto py-6 px-6 lg:px-10">
          {/* ── Badge ── */}
          <div r-class="mb-10 flex items-center gap-2">
            <span r-class="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-violet-600 bg-violet-50 border border-violet-200 px-3 py-1.5 rounded-sm">
              <span r-class="w-1.5 h-1.5 rounded-full bg-violet-500" />
              Reference — API
            </span>
          </div>

          {/* ── Hero ── */}
          <div r-class="mb-16">
            <p r-class="font-mono text-xs text-slate-400 tracking-widest uppercase mb-5">
              Complete Hook & Function Reference
            </p>
            <h1 r-class="font-extrabold leading-none tracking-tight text-5xl lg:text-6xl mb-8 text-slate-900">
              API{" "}
              <span r-class="bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent">
                Reference
              </span>
            </h1>
            <p r-class="text-xl text-slate-500 leading-relaxed max-w-2xl font-normal">
              Every hook, function, and core API in Fynix — with parameter
              tables, return value breakdowns, and working code examples.
            </p>
          </div>

          {/* ── Quick-jump index ── */}
          <div r-class="mb-20 bg-white border border-slate-200 rounded-lg p-6">
            <p r-class="font-mono text-xs text-slate-400 uppercase tracking-widest mb-4">
              Sections
            </p>
            <div r-class="flex flex-wrap gap-2">
              <For each={sections}>
                {(s) => (
                  <a
                    href={`#${s.id}`}
                    r-class="font-mono text-xs text-violet-600 bg-violet-50 border border-violet-200 px-3 py-1.5 rounded-sm hover:bg-violet-100 transition-colors"
                  >
                    {s.label}
                  </a>
                )}
              </For>
            </div>
          </div>

          {/* ── Sections ── */}
          <For each={sections}>
            {(section) => (
              <div id={section.id} r-class="mb-28">
                <div r-class="mb-12">
                  <p r-class="font-mono text-xs text-slate-400 uppercase tracking-widest mb-2">
                    {section.label}
                  </p>
                  <h2 r-class="text-3xl font-bold text-slate-900 tracking-tight">
                    {section.label}
                  </h2>
                </div>

                <div r-class="flex flex-col gap-8">
                  <For each={section.entries}>
                    {(entry) => (
                      <div r-class="group relative bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-violet-400/50 hover:shadow-md transition-all duration-300">
                        {/* Header */}
                        <div r-class="flex items-start gap-4 px-6 py-5 border-b border-slate-100">
                          <span r-class="font-mono text-xs text-slate-300 group-hover:text-violet-500 transition-colors duration-200 shrink-0 mt-0.5">
                            {entry.num}
                          </span>
                          <div r-class="flex-1">
                            <div r-class="flex items-start justify-between gap-4 mb-1 flex-wrap">
                              <h3 r-class="text-sm font-bold text-slate-900 tracking-tight font-mono">
                                {entry.name}
                              </h3>
                              <code r-class="font-mono text-[10px] text-violet-600 bg-violet-50 border border-violet-200 px-1.5 py-0.5 rounded-sm shrink-0">
                                → {entry.returns}
                              </code>
                            </div>
                            <p r-class="text-sm text-slate-500 leading-relaxed mb-5">
                              {entry.summary}
                            </p>

                            {/* Params */}
                            {entry.params.length > 0 && (
                              <div r-class="mb-5">
                                <p r-class="font-mono text-[10px] text-slate-400 uppercase tracking-widest mb-3">
                                  Parameters
                                </p>
                                <div r-class="flex flex-col gap-2">
                                  <For each={entry.params}>
                                    {(p) => (
                                      <div r-class="flex items-start gap-3 border border-slate-100 rounded-md px-3 py-2.5 bg-slate-50/50">
                                        <code r-class="font-mono text-xs text-violet-600 shrink-0 w-28">
                                          {p.name}
                                        </code>
                                        <code r-class="font-mono text-[11px] text-slate-400 shrink-0 w-48 leading-snug">
                                          {p.type}
                                        </code>
                                        <p r-class="text-xs text-slate-500 leading-relaxed">
                                          {p.description}
                                        </p>
                                      </div>
                                    )}
                                  </For>
                                </div>
                              </div>
                            )}

                            {/* Return props */}
                            {entry.returnProps &&
                              entry.returnProps.length > 0 && (
                                <div r-class="mb-1">
                                  <p r-class="font-mono text-[10px] text-slate-400 uppercase tracking-widest mb-3">
                                    Returns
                                  </p>
                                  <div r-class="flex flex-col gap-2">
                                    <For each={entry.returnProps}>
                                      {(r) => (
                                        <div r-class="flex items-start gap-3 border border-slate-100 rounded-md px-3 py-2.5 bg-slate-50/50">
                                          <code r-class="font-mono text-xs text-cyan-600 shrink-0 w-36">
                                            {r.name}
                                          </code>
                                          <code r-class="font-mono text-[11px] text-slate-400 shrink-0 w-44 leading-snug">
                                            {r.type}
                                          </code>
                                          <p r-class="text-xs text-slate-500 leading-relaxed">
                                            {r.description}
                                          </p>
                                        </div>
                                      )}
                                    </For>
                                  </div>
                                </div>
                              )}
                          </div>
                        </div>

                        {/* Code block */}
                        <div r-class="bg-slate-900">
                          <div r-class="flex items-center gap-2 px-5 py-2.5 border-b border-slate-800 bg-slate-950/60">
                            <span r-class="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                            <span r-class="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                            <span r-class="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                            <span r-class="ml-3 font-mono text-xs text-slate-600">
                              tsx
                            </span>
                          </div>
                          <pre r-class="text-slate-300 font-mono text-xs leading-6 p-6 overflow-x-auto">
                            {entry.code}
                          </pre>
                        </div>
                      </div>
                    )}
                  </For>
                </div>
              </div>
            )}
          </For>

          {/* ── Nav ── */}
          <div r-class="flex items-center justify-between py-6 border-t border-slate-100">
            <div r-class="flex items-center gap-2 font-mono text-xs text-slate-400 hover:text-slate-600 cursor-pointer transition-colors">
              <span>←</span>
              Components Guide
            </div>
            <div r-class="flex items-center gap-2 font-mono text-xs text-violet-600 hover:text-violet-700 cursor-pointer transition-colors">
              Advanced Guides
              <span>→</span>
            </div>
          </div>
        </div>
      </div>
    </Docs>
  );
}
