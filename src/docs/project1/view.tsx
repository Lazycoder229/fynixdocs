import { Fynix, VNode } from "fynixui";
import Docs from "../view";

// ── Live interactive demo component ──────────────────────────────────────────

import { nixState, For } from "fynixui";

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

type FilterType = "all" | "active" | "completed";

function LiveTodoApp(): VNode {
  const todos = nixState<Todo[]>([
    { id: 1, text: "Learn Fynix", done: false },
    { id: 2, text: "Build something reactive", done: false },
  ]);
  const input = nixState("");
  const filter = nixState<FilterType>("all");

  function addTodo(e: any) {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    todos.value = [...todos.value, { id: Date.now(), text, done: false }];
    input.value = "";
  }

  function toggleTodo(id: number) {
    todos.value = todos.value.map((t) =>
      t.id === id ? { ...t, done: !t.done } : t,
    );
  }

  function deleteTodo(id: number) {
    todos.value = todos.value.filter((t) => t.id !== id);
  }

  function getFiltered(): Todo[] {
    switch (filter.value) {
      case "active":
        return todos.value.filter((t) => !t.done);
      case "completed":
        return todos.value.filter((t) => t.done);
      default:
        return todos.value;
    }
  }

  // Read ALL reactive values in render body so Fynix subscribes to each.
  // todos.value.length MUST be read here — this ensures the component
  // re-renders when todos are deleted, so filtered.length is always fresh.
  const totalCount = todos.value.length;
  const filtered = getFiltered();
  const activeCount = todos.value.filter((t) => !t.done).length;
  const filters: FilterType[] = ["all", "active", "completed"];

  return (
    <div r-class="max-w-md mx-auto">
      {/* Title */}
      <h2 r-class="text-2xl font-bold text-slate-900 tracking-tight mb-6">
        My Todos
      </h2>

      {/* Input form */}
      <form
        action=""
        method="post"
        r-submit={addTodo}
        r-class="flex gap-2 mb-6"
      >
        <input
          type="text"
          value={input.value}
          r-input={(e: any) => (input.value = e.target.value)}
          placeholder="What needs to be done?"
          r-class="flex-1 text-sm border border-slate-200 rounded-md px-3 py-2 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 placeholder:text-slate-300 transition"
        />
        <button
          type="submit"
          r-class="font-mono text-xs font-semibold text-white bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-md transition-colors shrink-0"
        >
          ADD
        </button>
      </form>

      {/* Filter tabs */}
      <div r-class="flex gap-1 mb-4 bg-slate-100 rounded-md p-1">
        {filters.map((f) => (
          <button
            key={f}
            r-click={() => (filter.value = f)}
            r-class={`flex-1 font-mono text-xs py-1.5 rounded transition-all ${
              filter.value === f
                ? "bg-white text-cyan-600 shadow-sm font-semibold"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* key combines filter AND filtered.length so the wrapper fully
          remounts whenever the visible list changes — including when the
          last item is deleted. Without filtered.length in the key, the
          stale For fiber lingers and the last deleted todo stays visible. */}
      <div
        key={`${filter.value}|${filtered.length}`}
        r-class="border border-slate-200 rounded-lg overflow-hidden mb-4"
      >
        {filtered.length === 0 ? (
          <div r-class="py-10 text-center text-sm text-slate-300 font-mono">
            No tasks here.
          </div>
        ) : (
          <For each={filtered}>
            {(todo, i) => (
              <div
                key={todo.id}
                r-class={`flex items-center gap-3 px-4 py-3 group transition-colors hover:bg-slate-50 ${
                  i > 0 ? "border-t border-slate-100" : ""
                }`}
              >
                {/* Checkbox */}
                <button
                  r-click={() => toggleTodo(todo.id)}
                  r-class="shrink-0 text-base leading-none"
                >
                  {todo.done ? "✅" : "⬜"}
                </button>

                {/* Text */}
                <span
                  r-click={() => toggleTodo(todo.id)}
                  r-class={`flex-1 text-sm cursor-pointer select-none transition-colors ${
                    todo.done ? "line-through text-slate-300" : "text-slate-700"
                  }`}
                >
                  {todo.text}
                </span>

                {/* Delete */}
                <button
                  r-click={() => deleteTodo(todo.id)}
                  r-class="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-400 transition-all text-sm"
                >
                  🗑️
                </button>
              </div>
            )}
          </For>
        )}
      </div>

      {/* Footer */}
      <div r-class="flex items-center justify-between">
        <p r-class="font-mono text-xs text-slate-400">
          {activeCount} {activeCount === 1 ? "item" : "items"} left
        </p>
        {todos.value.some((t) => t.done) && (
          <button
            r-click={() => (todos.value = todos.value.filter((t) => !t.done))}
            r-class="font-mono text-xs text-slate-400 hover:text-red-400 transition-colors"
          >
            Clear completed
          </button>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export default function Project1(): VNode {
  const whatYoullBuild = [
    { num: "01", text: "Add new tasks" },
    { num: "02", text: "Mark tasks as complete" },
    { num: "03", text: "Delete tasks" },
    { num: "04", text: "Filter by status — All / Active / Completed" },
    { num: "05", text: "Task counter for remaining items" },
  ];

  const whatYoullLearn = [
    {
      icon: "⊕",
      concept: "nixState",
      detail: "Reactive data for todos and input",
    },
    {
      icon: "⬢",
      concept: "For",
      detail: "Efficient list rendering with keyed items",
    },
    {
      icon: "⟁",
      concept: "r-click / r-input",
      detail: "Secure delegated event handling",
    },
    {
      icon: "◇",
      concept: "Conditional rendering",
      detail: "Toggle UI based on state values",
    },
    {
      icon: "◈",
      concept: "Derived values",
      detail: "Filter and count directly from nixState in the render body",
    },
  ];

  const steps = [
    {
      num: "01",
      title: "Project Setup",
      description:
        "Create the file src/home/view.tsx and scaffold the component with a typed Todo interface and initial nixState.",
      details: [
        "Start by defining a TypeScript interface for your Todo shape. This gives you autocomplete and type safety throughout the component — any time you access todo.text or todo.done, TypeScript knows exactly what those are.",
        "nixState<Todo[]>([]) creates a reactive array initialized as empty. The generic <Todo[]> tells the runtime what type of data lives inside, so you get full type inference when mapping or filtering later.",
        "The component function itself is just a plain function that returns a VNode. There is no class, no lifecycle method, and no special registration — Fynix tracks reactivity automatically from the moment you call nixState inside a component.",
      ],
      concept:
        "nixState with a typed array — use an interface to define the shape of each todo item.",
      lang: "tsx",
      code: `import { nixState, For, VNode } from "fynixui";

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

export default function TodoApp(): VNode {
  const todos = nixState<Todo[]>([]);

  return (
    <div class="todo-app">
      <h1>My Todos</h1>
    </div>
  );
}`,
    },
    {
      num: "02",
      title: "Add Todo Input",
      description:
        "Wire up a text input and submit button. State updates are immutable — always spread the previous array.",
      details: [
        "input is a separate nixState<string> that tracks what the user is typing. Keeping input state separate from todos state means a keystroke only re-renders the input field, not the entire list.",
        "r-input is Fynix's secure alternative to oninput. All event handlers must use the r- prefix — inline on* handlers are blocked by the runtime for XSS protection. The handler receives the native browser event, so you read e.target.value just like vanilla JS.",
        "r-submit replaces onsubmit on the form element. Calling e.preventDefault() stops the browser from navigating away. Always trim the input value before saving — users often accidentally include leading or trailing spaces.",
        "The todos update uses spread syntax: [...todos.value, newItem]. This creates a brand-new array rather than mutating the existing one. Fynix detects the reference change and schedules a re-render. Calling todos.value.push(...) directly would NOT trigger reactivity because the array reference stays the same.",
        "After adding, reset input.value = '' to clear the text field. Because input is reactive, the DOM input updates immediately to reflect the empty string.",
      ],
      concept:
        "Two-way binding with r-input. Use r-submit on the form to handle submission. State updates use spread syntax to stay immutable.",
      lang: "tsx",
      code: `const todos = nixState<Todo[]>([]);
const input = nixState("");

function addTodo(e: any) {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  // ✅ Spread creates a new array — Fynix detects the change
  todos.value = [
    ...todos.value,
    { id: Date.now(), text, done: false }
  ];
  input.value = ""; // clears the field reactively
}

return (
  <div class="todo-app">
    <h1>My Todos</h1>
    <form action="" method="post" r-submit={addTodo}>
      <input
        type="text"
        value={input.value}
        r-input={(e: any) => (input.value = e.target.value)}
        placeholder="What needs to be done?"
      />
      <button type="submit">ADD</button>
    </form>
  </div>
);`,
    },
    {
      num: "03",
      title: "Render the Todo List",
      description:
        "Use the For component to render each todo. Each item gets a key for efficient reconciliation. Pass todos.value — a plain array — directly to For.",
      details: [
        "The For component accepts an each prop and a render function as its child. The render function receives each item and its index. It must return JSX — use arrow-function shorthand (todo) => (...) or an explicit return statement. Forgetting the return is a silent bug: the function runs but produces nothing, the list appears empty, and no error is thrown.",
        "key={todo.id} is critical for performance. Without keys, Fynix's fiber reconciler assumes every item changed on every re-render and rebuilds the entire list from scratch. With stable keys, it matches old fibers to new ones by identity and only patches what actually changed.",
        "toggleTodo maps over the current array and returns a new array with the done flag flipped for the matching id. Every other item is returned as-is. This immutable map pattern guarantees a new array reference, which is what Fynix needs to detect the update and trigger a re-render.",
        "deleteTodo uses filter to produce a new array that excludes the removed item. Never use splice or mutate the array in place — those change the contents without changing the reference, so Fynix sees no difference and skips the re-render.",
        "r-click inside the For render function closes over the todo from the current iteration. Each click handler carries its own todo.id in its closure, so the correct item is always toggled or deleted regardless of how the list is sorted or filtered.",
      ],
      concept:
        "For component for list rendering. Keys let the fiber reconciler track items across re-renders. Always return JSX using arrow shorthand or an explicit return — missing return is a silent bug.",
      lang: "tsx",
      code: `function toggleTodo(id: number) {
  // ✅ map returns a new array — reactive update triggers
  todos.value = todos.value.map((t) =>
    t.id === id ? { ...t, done: !t.done } : t
  );
}

function deleteTodo(id: number) {
  // ✅ filter returns a new array — reactive update triggers
  todos.value = todos.value.filter((t) => t.id !== id);
}

// Inside return:
<For each={todos.value}>
  {(todo) => (  // ← arrow shorthand implicitly returns the li
    <li key={todo.id}>
      <span r-click={() => toggleTodo(todo.id)}>
        {todo.done ? "✅" : "⬜"} {todo.text}
      </span>
      <button r-click={() => deleteTodo(todo.id)}>🗑️</button>
    </li>
  )}
</For>

{/* ❌ Common mistake — curly braces with no return: */}
{/* {(todo) => { <li key={todo.id}>...</li> }}    */}
{/* The li is a statement, not a return value.    */}
{/* List renders empty with zero errors thrown.   */}`,
    },
    {
      num: "04",
      title: "Add Filtering — No nixComputed Needed",
      description:
        "Derive the filtered list and active count directly in the render body. Because todos.value and filter.value are read during render, the runtime tracks them automatically and re-renders the component whenever they change.",
      details: [
        "filter is a nixState<Filter> holding the current tab selection — 'all', 'active', or 'completed'. Setting filter.value = 'active' from a button click is all it takes to switch views. The component re-renders automatically because filter is subscribed.",
        "getFiltered() is a plain function with no special wrappers. It reads filter.value and todos.value inside a switch statement. When this function is called during the component's render pass, those reads happen while activeContext is active — meaning the runtime registers both states as dependencies of this component automatically.",
        "This is the key insight: nixComputed is not required for local derived values. nixComputed is most useful when you want to share derived state across multiple components or memoize an expensive computation that should not re-run on every unrelated re-render. For values used only within one component, reading nixState.value directly in the render body is simpler and equally reactive.",
        "const filtered = getFiltered() runs synchronously during render and gives you a plain array to pass to For. When todos or filter changes, the whole component re-renders, getFiltered() runs again with fresh values, and For receives the updated list.",
        "activeCount is computed the same way — a plain .filter().length expression that reads todos.value. The result is a plain number you drop directly into JSX. No hook, no wrapper, no subscription to set up manually.",
        "The filter buttons each set filter.value inline with a short r-click handler. Because filter is a nixState, changing it immediately queues a re-render, getFiltered() returns the correct subset, and the list updates on screen.",
      ],
      concept:
        "Reading nixState.value inside the render body registers it with activeContext automatically. No nixComputed required for local derived values — call a plain function during render and the component re-renders with fresh data whenever any accessed state changes.",
      lang: "tsx",
      code: `import { nixState, For, VNode } from "fynixui";

type Filter = "all" | "active" | "completed";

// Inside TodoApp:
const filter = nixState<Filter>("all");

// Plain function — no hooks, no special wrappers
function getFiltered() {
  switch (filter.value) {          // tracked ✓ — read during render
    case "active":
      return todos.value.filter((t) => !t.done);   // tracked ✓
    case "completed":
      return todos.value.filter((t) => t.done);    // tracked ✓
    default:
      return todos.value;                          // tracked ✓
  }
}

// Both called during render — both nixStates subscribed automatically
const filtered = getFiltered();
const activeCount = todos.value.filter((t) => !t.done).length;

return (
  <div class="todo-app">
    <h1>My Todos</h1>

    <form action="" method="post" r-submit={addTodo}>
      <input
        type="text"
        value={input.value}
        r-input={(e: any) => (input.value = e.target.value)}
        placeholder="What needs to be done?"
      />
      <button type="submit">ADD</button>
    </form>

    {/* Each button sets filter.value → triggers re-render → getFiltered() reruns */}
    <div class="filters">
      <button r-click={() => (filter.value = "all")}>All</button>
      <button r-click={() => (filter.value = "active")}>Active</button>
      <button r-click={() => (filter.value = "completed")}>Done</button>
    </div>

    {/* filtered is a plain array — For renders it efficiently with keys */}
    <For each={filtered}>
      {(todo) => (
        <li key={todo.id}>
          <span r-click={() => toggleTodo(todo.id)}>
            {todo.done ? "✅" : "⬜"} {todo.text}
          </span>
          <button r-click={() => deleteTodo(todo.id)}>🗑️</button>
        </li>
      )}
    </For>

    <p class="counter">{activeCount} items left</p>
  </div>
);`,
    },
  ];

  const takeaways = [
    { label: "nixState", detail: "Mutable reactive data" },
    {
      label: "Render-body reads",
      detail: "Derived values tracked automatically",
    },
    { label: "For", detail: "Efficient list rendering" },
    { label: "r-click / r-input", detail: "Event handling" },
    { label: "Spread syntax", detail: "Immutable state updates" },
    { label: "Arrow fn return", detail: "Always return JSX from For children" },
  ];

  return (
    <Docs>
      <div r-class="min-h-screen bg-white text-slate-800 relative overflow-x-hidden text-base md:text-lg font-normal">
        <div r-class="relative z-10 max-w-5xl mx-auto py-6 px-6 lg:px-10">
          {/* ── Badge ── */}
          <div r-class="mb-10 flex items-center gap-2">
            <span r-class="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-cyan-600 bg-cyan-50 border border-cyan-200 px-3 py-1.5 rounded-sm">
              <span r-class="w-1.5 h-1.5 rounded-full bg-cyan-500" />
              Project 1 — Beginner
            </span>
          </div>

          {/* ── Hero ── */}
          <div r-class="mb-16">
            <p r-class="font-mono text-xs text-slate-400 tracking-widest uppercase mb-5">
              Tutorial — Build Your First App
            </p>
            <h1 r-class="font-extrabold leading-none tracking-tight text-5xl lg:text-6xl mb-8 text-slate-900">
              Todo{" "}
              <span r-class="bg-gradient-to-r from-cyan-500 to-violet-500 bg-clip-text text-transparent">
                App
              </span>
            </h1>
            <p r-class="text-xl text-slate-500 leading-relaxed max-w-2xl font-normal">
              Build a fully functional Todo application and learn the core
              primitives of Fynix — state, list rendering, and event handling.
            </p>
          </div>

          {/* ── What You'll Build + Learn ── */}
          <div r-class="mb-28 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Build */}
            <div r-class="bg-white border border-slate-200 rounded-lg p-6">
              <p r-class="font-mono text-xs text-slate-400 uppercase tracking-widest mb-4">
                What You'll Build
              </p>
              <div r-class="flex flex-col gap-2">
                {whatYoullBuild.map((item) => (
                  <div r-class="flex items-center gap-3">
                    <span r-class="font-mono text-[10px] text-slate-300 shrink-0">
                      {item.num}
                    </span>
                    <p r-class="text-sm text-slate-600">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Learn */}
            <div r-class="bg-white border border-slate-200 rounded-lg p-6">
              <p r-class="font-mono text-xs text-slate-400 uppercase tracking-widest mb-4">
                What You'll Learn
              </p>
              <div r-class="flex flex-col gap-3">
                {whatYoullLearn.map((item) => (
                  <div r-class="flex items-start gap-3">
                    <span r-class="text-slate-300 text-base shrink-0 mt-0.5">
                      {item.icon}
                    </span>
                    <div>
                      <code r-class="font-mono text-xs text-cyan-600 bg-cyan-50 border border-cyan-200 px-1.5 py-0.5 rounded-sm">
                        {item.concept}
                      </code>
                      <p r-class="text-xs text-slate-400 mt-1">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Steps ── */}
          <div r-class="mb-28">
            <div r-class="mb-12">
              <p r-class="font-mono text-xs text-slate-400 uppercase tracking-widest mb-2">
                Step by Step
              </p>
              <h2 r-class="text-3xl font-bold text-slate-900 tracking-tight">
                Building the Todo App
              </h2>
            </div>

            <div r-class="flex flex-col gap-8">
              {steps.map((step) => (
                <div r-class="group relative bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-cyan-400/50 hover:shadow-md transition-all duration-300">
                  {/* Step header */}
                  <div r-class="flex items-start gap-4 px-6 py-5 border-b border-slate-100">
                    <span r-class="font-mono text-xs text-slate-300 group-hover:text-cyan-500 transition-colors duration-200 shrink-0 mt-0.5">
                      {step.num}
                    </span>
                    <div r-class="flex-1">
                      <h3 r-class="text-base font-bold text-slate-900 tracking-tight mb-1">
                        {step.title}
                      </h3>
                      <p r-class="text-sm text-slate-500 leading-relaxed mb-5">
                        {step.description}
                      </p>
                      {/* Detailed explanation bullets */}
                      <div r-class="flex flex-col gap-3">
                        {step.details.map((detail, i) => (
                          <div r-class="flex items-start gap-3">
                            <span r-class="font-mono text-[10px] text-cyan-400 shrink-0 mt-[3px]">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <p r-class="text-sm text-slate-400 leading-relaxed">
                              {detail}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <span r-class="font-mono text-xs text-slate-300 shrink-0">
                      {step.lang}
                    </span>
                  </div>

                  {/* Code block */}
                  <div r-class="bg-slate-900">
                    <div r-class="flex items-center gap-2 px-5 py-2.5 border-b border-slate-800 bg-slate-950/60">
                      <span r-class="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                      <span r-class="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                      <span r-class="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                      <span r-class="ml-3 font-mono text-xs text-slate-600">
                        {step.lang}
                      </span>
                    </div>
                    <pre r-class="text-slate-300 font-mono text-xs leading-6 p-6 overflow-x-auto">
                      {step.code}
                    </pre>
                  </div>

                  {/* Concept callout */}
                  <div r-class="px-6 py-4 bg-cyan-50/40 border-t border-cyan-100">
                    <p r-class="text-sm text-slate-500 leading-relaxed">
                      <span r-class="text-slate-700 font-medium">
                        Concept:{" "}
                      </span>
                      {step.concept}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Live Example ── */}
          <div r-class="mb-28">
            <div r-class="mb-8">
              <p r-class="font-mono text-xs text-slate-400 uppercase tracking-widest mb-2">
                Try It Yourself
              </p>
              <h2 r-class="text-3xl font-bold text-slate-900 tracking-tight mb-3">
                Live Example
              </h2>
              <p r-class="text-slate-500 text-sm leading-relaxed max-w-2xl">
                This is the finished Todo app from the tutorial running live.
                Add tasks, toggle them complete, delete them, and switch filters
                — all powered by the same patterns you just learned.
              </p>
            </div>

            <div r-class="rounded-lg border border-slate-200 overflow-hidden shadow-sm">
              {/* Browser chrome bar */}
              <div r-class="flex items-center gap-2 px-4 py-3 bg-slate-100 border-b border-slate-200">
                <span r-class="w-3 h-3 rounded-full bg-red-400/70" />
                <span r-class="w-3 h-3 rounded-full bg-yellow-400/70" />
                <span r-class="w-3 h-3 rounded-full bg-green-400/70" />
                <span r-class="ml-3 font-mono text-xs text-slate-400 bg-white border border-slate-200 rounded px-3 py-1">
                  localhost:5173
                </span>
              </div>

              {/* App container */}
              <div r-class="bg-white px-8 py-8 min-h-[420px]">
                <LiveTodoApp />
              </div>
            </div>
          </div>

          {/* ── Key Takeaways ── */}
          <div r-class="mb-20">
            <p r-class="font-mono text-xs text-slate-400 uppercase tracking-widest mb-2">
              Summary
            </p>
            <h2 r-class="text-3xl font-bold text-slate-900 tracking-tight mb-10">
              Key Takeaways
            </h2>

            <div r-class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {takeaways.map((item, i) => (
                <div r-class="group bg-white border border-slate-200 rounded-lg p-5 hover:border-cyan-400/50 hover:shadow-md transition-all duration-300">
                  <span r-class="font-mono text-[10px] text-slate-300 group-hover:text-cyan-500 transition-colors block mb-3">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <code r-class="font-mono text-xs text-cyan-600 bg-cyan-50 border border-cyan-200 px-1.5 py-0.5 rounded-sm block mb-2 w-fit">
                    {item.label}
                  </code>
                  <p r-class="text-sm text-slate-400">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Next ── */}
          <div r-class="flex items-center justify-between py-6 border-t border-slate-100">
            <span r-class="font-mono text-xs text-slate-400 uppercase tracking-widest">
              Up Next
            </span>
            <div r-class="flex items-center gap-2 font-mono text-xs text-cyan-600 hover:text-cyan-700 cursor-pointer transition-colors">
              Project 2: Notes Manager
              <span>→</span>
            </div>
          </div>
        </div>
      </div>
    </Docs>
  );
}
