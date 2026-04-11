import { Fynix, VNode } from "fynixui";
import Docs from "../view";
import { For } from "fynixui";

// ─────────────────────────────────────────────────────────────────────────────

export default function ComponentsGuide(): VNode {
  const components = [
    {
      num: "01",
      name: "<For>",
      badge: "fynixui",
      purpose:
        "Efficiently renders arrays of items with automatic keying and minimal DOM diffing.",
      usedIn: [
        "Todo list (Project 1)",
        "Notes grid (Project 2)",
        "Activity feed (Project 3)",
      ],
      props: [
        {
          name: "each",
          type: "T[] | ReactiveState<T[]>",
          description: "Array to iterate over",
        },
        {
          name: "children",
          type: "(item: T, index: number) => VNode",
          description: "Render function called once per item",
        },
      ],
      tip: "Always provide a key prop on the returned element. Without it, Fynix re-creates every DOM node on each render instead of patching only what changed.",
      code: `import { For } from "fynixui";

<For each={items.value}>
  {(item, index) => (
    <div key={item.id}>{item.name}</div>
  )}
</For>`,
    },
    {
      num: "02",
      name: "<Suspense>",
      badge: "fynixui",
      purpose:
        "Shows a fallback UI while a lazy-loaded component is being fetched and parsed.",
      usedIn: ["Dashboard lazy-loaded widgets (Project 3)"],
      props: [
        {
          name: "fallback",
          type: "VNode",
          description: "Content rendered while the child is loading",
        },
        {
          name: "children",
          type: "VNode",
          description: "The lazy component to render once ready",
        },
      ],
      tip: "Use Suspense only around nixLazy components. Wrapping eager components adds overhead without benefit.",
      code: `import { nixLazy, Suspense } from "fynixui";

const HeavyChart = nixLazy(() => import("./Chart"));

function Dashboard(): VNode {
  return (
    <Suspense fallback={<p>Loading chart...</p>}>
      <HeavyChart />
    </Suspense>
  );
}`,
    },
    {
      num: "03",
      name: "Button",
      badge: "fynixui/custom",
      purpose:
        "Pre-styled, accessible button with delegated click handling and built-in focus management.",
      usedIn: ["Available as a built-in custom component"],
      props: [
        {
          name: "r-click",
          type: "() => void",
          description: "Click handler delegated through Fynix's event system",
        },
        {
          name: "disabled",
          type: "boolean",
          description: "Prevents interaction and applies disabled styling",
        },
        {
          name: "children",
          type: "VNode",
          description: "Button label or content",
        },
      ],
      tip: "Prefer Button over a raw <button> when you want consistent focus-ring and disabled styling across your app without writing per-component CSS.",
      code: `import { Button } from "fynixui/custom";

<Button r-click={handleSave}>
  Save
</Button>

<Button r-click={handleDelete} disabled={isLoading.value}>
  {isLoading.value ? "Deleting..." : "Delete"}
</Button>`,
    },
    {
      num: "04",
      name: "Path",
      badge: "fynixui/custom",
      purpose:
        "Declarative navigation link that integrates with the Fynix router — no manual navigate() calls needed.",
      usedIn: ["Navigation between pages (Project 3)"],
      props: [
        { name: "href", type: "string", description: "Target route path" },
        {
          name: "props",
          type: "Record<string, any>",
          description: "Optional props to pass to the destination component",
        },
        { name: "children", type: "VNode", description: "Link content" },
      ],
      tip: "Path uses router.navigate() internally, so it respects history caching. Use it instead of <a href> to avoid full page reloads in SPA mode.",
      code: `import { Path } from "fynixui/custom";

<Path href="/dashboard">
  Dashboard
</Path>

<Path href="/dashboard/42" props={{ source: "sidebar" }}>
  Item 42
</Path>`,
    },
  ];

  const guidelines = [
    {
      num: "01",
      title: "Define a props interface",
      detail:
        "Type every prop with a TypeScript interface. This gives you autocomplete, catches mismatches at compile time, and documents the component's contract without extra comments.",
      code: `interface CardProps {
  title: string;
  children?: VNode[];
  variant?: "default" | "highlighted";
}`,
    },
    {
      num: "02",
      title: "Export a plain function",
      detail:
        "Components are just functions that accept props and return a VNode. No class syntax, no decorator, no registration step — just export the function and Fynix picks it up.",
      code: `export function Card(props: CardProps): VNode {
  const cls =
    props.variant === "highlighted"
      ? "card highlighted"
      : "card";

  return (
    <div class={cls}>
      <h3 class="card-title">{props.title}</h3>
      <div class="card-body">{props.children}</div>
    </div>
  );
}`,
    },
    {
      num: "03",
      title: "Keep state local or lift it up",
      detail:
        "State that only affects one component belongs inside that component via nixState. State shared across siblings belongs in the parent — passed down as props and mutated via callbacks. Never reach up into a parent's state directly.",
      code: `// ✅ Local state — private to this component
function Counter(): VNode {
  const count = nixState(0);
  return <button r-click={() => count.value++}>{count.value}</button>;
}

// ✅ Lifted state — parent owns it, child calls callback
function Parent(): VNode {
  const count = nixState(0);
  return <Child value={count.value} onIncrement={() => count.value++} />;
}`,
    },
    {
      num: "04",
      title: "One responsibility per component",
      detail:
        "If a component is doing layout AND data fetching AND form validation, split it. A component that renders a note card should not also know how to save it — pass an onSave callback from the parent instead.",
      code: `// ✅ Focused component — renders only, calls parent callback
function NoteCard(props: { note: Note; onDelete: () => void }): VNode {
  return (
    <div class="note-card">
      <h3>{props.note.title}</h3>
      <button r-click={props.onDelete}>Delete</button>
    </div>
  );
}

// ✅ Parent handles data mutation
function NoteList(): VNode {
  const notes = nixState<Note[]>([]);
  function deleteNote(id: string) {
    notes.value = notes.value.filter((n) => n.id !== id);
  }
  return (
    <For each={notes.value}>
      {(note) => (
        <NoteCard key={note.id} note={note} onDelete={() => deleteNote(note.id)} />
      )}
    </For>
  );
}`,
    },
  ];

  const takeaways = [
    { label: "<For>", detail: "Keyed list renderer for arrays" },
    { label: "<Suspense>", detail: "Lazy-load boundary with fallback" },
    { label: "Button", detail: "Accessible pre-styled button" },
    { label: "Path", detail: "Router-integrated nav link" },
    { label: "Props interface", detail: "Type every component contract" },
    { label: "Single responsibility", detail: "One job per component" },
  ];

  return (
    <Docs>
      <div r-class="min-h-screen bg-white text-slate-800 relative overflow-x-hidden text-base md:text-lg font-normal">
        <div r-class="relative z-10 max-w-5xl mx-auto py-6 px-6 lg:px-10">
          {/* ── Badge ── */}
          <div r-class="mb-10 flex items-center gap-2">
            <span r-class="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-violet-600 bg-violet-50 border border-violet-200 px-3 py-1.5 rounded-sm">
              <span r-class="w-1.5 h-1.5 rounded-full bg-violet-500" />
              Reference — Components Guide
            </span>
          </div>

          {/* ── Hero ── */}
          <div r-class="mb-16">
            <p r-class="font-mono text-xs text-slate-400 tracking-widest uppercase mb-5">
              Guide — Built-in & Custom Components
            </p>
            <h1 r-class="font-extrabold leading-none tracking-tight text-5xl lg:text-6xl mb-8 text-slate-900">
              Components{" "}
              <span r-class="bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent">
                Guide
              </span>
            </h1>
            <p r-class="text-xl text-slate-500 leading-relaxed max-w-2xl font-normal">
              A reference for every reusable component encountered across the
              project tutorials — props, usage examples, and patterns for
              building your own.
            </p>
          </div>

          {/* ── Built-in Components ── */}
          <div r-class="mb-28">
            <div r-class="mb-12">
              <p r-class="font-mono text-xs text-slate-400 uppercase tracking-widest mb-2">
                Built-in
              </p>
              <h2 r-class="text-3xl font-bold text-slate-900 tracking-tight">
                Fynix Components
              </h2>
            </div>

            <div r-class="flex flex-col gap-8">
              <For each={components}>
                {(comp) => (
                  <div r-class="group relative bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-violet-400/50 hover:shadow-md transition-all duration-300">
                    {/* Header */}
                    <div r-class="flex items-start gap-4 px-6 py-5 border-b border-slate-100">
                      <span r-class="font-mono text-xs text-slate-300 group-hover:text-violet-500 transition-colors duration-200 shrink-0 mt-0.5">
                        {comp.num}
                      </span>
                      <div r-class="flex-1">
                        <div r-class="flex items-center gap-3 mb-1">
                          <h3 r-class="text-base font-bold text-slate-900 tracking-tight font-mono">
                            {comp.name}
                          </h3>
                          <code r-class="font-mono text-[10px] text-violet-600 bg-violet-50 border border-violet-200 px-1.5 py-0.5 rounded-sm">
                            {comp.badge}
                          </code>
                        </div>
                        <p r-class="text-sm text-slate-500 leading-relaxed mb-5">
                          {comp.purpose}
                        </p>

                        {/* Props table */}
                        <p r-class="font-mono text-[10px] text-slate-400 uppercase tracking-widest mb-3">
                          Props
                        </p>
                        <div r-class="flex flex-col gap-2 mb-5">
                          <For each={comp.props}>
                            {(prop) => (
                              <div r-class="flex items-start gap-3 border border-slate-100 rounded-md px-3 py-2.5 bg-slate-50/50">
                                <code r-class="font-mono text-xs text-violet-600 shrink-0 w-28">
                                  {prop.name}
                                </code>
                                <code r-class="font-mono text-[11px] text-slate-400 shrink-0 w-52 leading-snug">
                                  {prop.type}
                                </code>
                                <p r-class="text-xs text-slate-500 leading-relaxed">
                                  {prop.description}
                                </p>
                              </div>
                            )}
                          </For>
                        </div>

                        {/* Used in */}
                        <div r-class="flex items-start gap-2 flex-wrap mb-1">
                          <span r-class="font-mono text-[10px] text-slate-400 uppercase tracking-widest shrink-0 mt-0.5">
                            Used in:
                          </span>
                          <For each={comp.usedIn}>
                            {(use) => (
                              <span r-class="font-mono text-[10px] text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-sm">
                                {use}
                              </span>
                            )}
                          </For>
                        </div>
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
                        {comp.code}
                      </pre>
                    </div>

                    {/* Tip callout */}
                    <div r-class="px-6 py-4 bg-violet-50/40 border-t border-violet-100">
                      <p r-class="text-sm text-slate-500 leading-relaxed">
                        <span r-class="text-slate-700 font-medium">Tip: </span>
                        {comp.tip}
                      </p>
                    </div>
                  </div>
                )}
              </For>
            </div>
          </div>

          {/* ── Building Your Own ── */}
          <div r-class="mb-28">
            <div r-class="mb-12">
              <p r-class="font-mono text-xs text-slate-400 uppercase tracking-widest mb-2">
                Patterns
              </p>
              <h2 r-class="text-3xl font-bold text-slate-900 tracking-tight">
                Building Your Own Components
              </h2>
            </div>

            <div r-class="flex flex-col gap-8">
              <For each={guidelines}>
                {(g) => (
                  <div r-class="group relative bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-violet-400/50 hover:shadow-md transition-all duration-300">
                    {/* Header */}
                    <div r-class="flex items-start gap-4 px-6 py-5 border-b border-slate-100">
                      <span r-class="font-mono text-xs text-slate-300 group-hover:text-violet-500 transition-colors duration-200 shrink-0 mt-0.5">
                        {g.num}
                      </span>
                      <div r-class="flex-1">
                        <h3 r-class="text-base font-bold text-slate-900 tracking-tight mb-1">
                          {g.title}
                        </h3>
                        <p r-class="text-sm text-slate-500 leading-relaxed">
                          {g.detail}
                        </p>
                      </div>
                      <span r-class="font-mono text-xs text-slate-300 shrink-0">
                        tsx
                      </span>
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
                        {g.code}
                      </pre>
                    </div>
                  </div>
                )}
              </For>
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
              <For each={takeaways}>
                {(item, i) => (
                  <div r-class="group bg-white border border-slate-200 rounded-lg p-5 hover:border-violet-400/50 hover:shadow-md transition-all duration-300">
                    <span r-class="font-mono text-[10px] text-slate-300 group-hover:text-violet-500 transition-colors block mb-3">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <code r-class="font-mono text-xs text-violet-600 bg-violet-50 border border-violet-200 px-1.5 py-0.5 rounded-sm block mb-2 w-fit">
                      {item.label}
                    </code>
                    <p r-class="text-sm text-slate-400">{item.detail}</p>
                  </div>
                )}
              </For>
            </div>
          </div>

          {/* ── Nav ── */}
          <div r-class="flex items-center justify-between py-6 border-t border-slate-100">
            <div r-class="flex items-center gap-2 font-mono text-xs text-slate-400 hover:text-slate-600 cursor-pointer transition-colors">
              <span>←</span>
              Project 3: Dashboard
            </div>
            <div r-class="flex items-center gap-2 font-mono text-xs text-violet-600 hover:text-violet-700 cursor-pointer transition-colors">
              API Reference
              <span>→</span>
            </div>
          </div>
        </div>
      </div>
    </Docs>
  );
}
