import { Fynix, VNode } from "fynixui";
import Docs from "../view";

export default function Core(): VNode {
  const pillars = [
    {
      num: "01",
      title: "Components",
      subtitle: "The building block of every Fynix UI",
      icon: "◇",
      used: "All three project tutorials",
      rules: [
        "Must return a VNode (or Fragment for multiple elements)",
        "Props are passed as the first argument",
        "Hooks must be called at the top level — not inside conditionals",
      ],
      code: `import { VNode } from "fynixui";

function Greeting(props: { name: string }): VNode {
  return <h1>Hello, {props.name}!</h1>;
}

// Usage
<Greeting name="Alice" />`,
      lang: "tsx",
    },
    {
      num: "02",
      title: "State (nixState)",
      subtitle: "Reactive values with surgical re-renders",
      icon: "⊕",
      used: "Todo App, Notes Manager, Dashboard",
      rules: [
        "Read via count.value or just {count} in JSX — auto-unwraps",
        "Write via count.value = newValue",
        "Only the subscribing fiber re-renders, not the whole tree",
        "Built-in protection against prototype pollution",
      ],
      code: `import { nixState, VNode } from "fynixui";

function Counter(): VNode {
  const count = nixState<number>(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button r-click={() => count.value++}>+1</button>
      <button r-click={() => count.value = 0}>Reset</button>
    </div>
  );
}`,
      lang: "tsx",
    },
    {
      num: "03",
      title: "Effects (nixEffect)",
      subtitle: "Side effects scheduled after render",
      icon: "⟁",
      used: "Timer in Todo App, API fetching in Dashboard",
      rules: [
        "Keeps component functions pure — side effects run separately",
        "Cleanup function runs on unmount or when deps change",
        "Empty deps array means run once on mount",
      ],
      code: `import { nixState, nixEffect, VNode } from "fynixui";

function Timer(): VNode {
  const seconds = nixState(0);

  nixEffect(() => {
    const interval = setInterval(() => {
      seconds.value++;
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <p>Elapsed: {seconds} seconds</p>;
}`,
      lang: "tsx",
    },
    {
      num: "04",
      title: "Events & Rendering",
      subtitle: "Delegated events and the commit pipeline",
      icon: "⬡",
      used: "Every component that handles user input",
      rules: [
        "All events use the r- prefix — inline handlers are blocked for XSS security",
        "Multiple state changes in one handler are automatically batched",
        "DOM mutations happen in one synchronous commit pass",
      ],
      code: `// ✅ Safe — delegated event
<button r-click={(e) => handleClick(e)}>Click me</button>
<input r-input={(e) => name.value = e.target.value} />
<form r-submit={(e) => { e.preventDefault(); save(); }}>

// ❌ Blocked — inline handlers
<button onclick="alert('xss')">Click</button>`,
      lang: "tsx",
    },
  ];

  const effectVariants = [
    { hook: "nixEffect", behavior: "Runs when dependencies change" },
    { hook: "nixEffectOnce", behavior: "Runs once on mount" },
    {
      hook: "nixEffectAlways",
      behavior: "Runs on every render (use sparingly)",
    },
  ];

  const pipeline = [
    { step: "01", label: "nixState changes", detail: "marks fiber as dirty" },
    {
      step: "02",
      label: "Scheduler queues",
      detail: "prioritizes immediate → idle",
    },
    { step: "03", label: "Work loop", detail: "time-sliced to avoid blocking" },
    {
      step: "04",
      label: "Commit phase",
      detail: "all DOM mutations in one pass",
    },
    { step: "05", label: "Effects run", detail: "nixEffect callbacks execute" },
  ];

  const events = [
    "r-click",
    "r-input",
    "r-change",
    "r-submit",
    "r-keydown",
    "r-keyup",
    "r-focus",
    "r-blur",
    "r-mouseover",
    "r-mouseout",
  ];

  return (
    <Docs>
      <div r-class="min-h-screen bg-white text-slate-800 relative overflow-x-hidden text-base md:text-lg font-normal">
        <div r-class="relative z-10 max-w-5xl mx-auto py-6 px-6 lg:px-10">
          {/* ── Badge ── */}
          <div r-class="mb-10 flex items-center gap-2">
            <span r-class="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-cyan-600 bg-cyan-50 border border-cyan-200 px-3 py-1.5 rounded-sm">
              <span r-class="w-1.5 h-1.5 rounded-full bg-cyan-500" />
              Core Concepts
            </span>
          </div>

          {/* ── Hero ── */}
          <div r-class="mb-16">
            <p r-class="font-mono text-xs text-slate-400 tracking-widest uppercase mb-5">
              Four Pillars — Master These First
            </p>
            <h1 r-class="font-extrabold leading-none tracking-tight text-5xl lg:text-6xl mb-8 text-slate-900">
              Core{" "}
              <span r-class="bg-gradient-to-r from-cyan-500 to-violet-500 bg-clip-text text-transparent">
                Concepts
              </span>
            </h1>
            <p r-class="text-xl text-slate-500 leading-relaxed max-w-2xl font-normal">
              Everything in Fynix builds on four primitives — components, state,
              effects, and events. Understand these and the rest clicks into
              place.
            </p>
          </div>

          {/* ── Four Pillars ── */}
          <div r-class="mb-28">
            <div r-class="mb-12">
              <p r-class="font-mono text-xs text-slate-400 uppercase tracking-widest mb-2">
                Primitives
              </p>
              <h2 r-class="text-3xl font-bold text-slate-900 tracking-tight">
                The Four Pillars
              </h2>
            </div>

            <div r-class="flex flex-col gap-8">
              {pillars.map((pillar) => (
                <div r-class="group relative bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-cyan-400/50 hover:shadow-md transition-all duration-300">
                  {/* Pillar header */}
                  <div r-class="flex items-start gap-4 px-6 py-5 border-b border-slate-100">
                    <span r-class="text-2xl text-slate-300 group-hover:text-cyan-500 transition-colors duration-200 mt-0.5">
                      {pillar.icon}
                    </span>
                    <div r-class="flex-1">
                      <div r-class="flex items-center gap-3 mb-1">
                        <span r-class="font-mono text-xs text-slate-300 group-hover:text-cyan-500 transition-colors">
                          {pillar.num}
                        </span>
                        <h3 r-class="text-lg font-bold text-slate-900 tracking-tight">
                          {pillar.title}
                        </h3>
                      </div>
                      <p r-class="text-sm text-slate-400">{pillar.subtitle}</p>
                    </div>
                    <span r-class="hidden md:block font-mono text-xs text-slate-300 bg-slate-50 border border-slate-100 px-2 py-1 rounded-sm shrink-0">
                      Used in: {pillar.used}
                    </span>
                  </div>

                  {/* Rules */}
                  <div r-class="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                    <div r-class="flex flex-col gap-1.5">
                      {pillar.rules.map((rule, i) => (
                        <div r-class="flex items-start gap-2.5">
                          <span r-class="font-mono text-[10px] text-slate-300 mt-0.5 shrink-0">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <p r-class="text-sm text-slate-500 leading-relaxed">
                            {rule}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Code block */}
                  <div r-class="bg-slate-900">
                    <div r-class="flex items-center gap-2 px-5 py-2.5 border-b border-slate-800 bg-slate-950/60">
                      <span r-class="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                      <span r-class="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                      <span r-class="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                      <span r-class="ml-3 font-mono text-xs text-slate-600">
                        {pillar.lang}
                      </span>
                    </div>
                    <pre r-class="text-slate-300 font-mono text-xs leading-6 p-6 overflow-x-auto">
                      {pillar.code}
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Effect Variants ── */}
          <div r-class="mb-28">
            <p r-class="font-mono text-xs text-slate-400 uppercase tracking-widest mb-2">
              Effect Variants
            </p>
            <h2 r-class="text-3xl font-bold text-slate-900 tracking-tight mb-10">
              Choosing the Right Effect
            </h2>

            <div r-class="grid grid-cols-1 md:grid-cols-3 gap-4">
              {effectVariants.map((v, i) => (
                <div r-class="group bg-white border border-slate-200 rounded-lg p-5 hover:border-cyan-400/50 hover:shadow-md transition-all duration-300">
                  <span r-class="font-mono text-[10px] text-slate-300 group-hover:text-cyan-500 transition-colors block mb-3">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <code r-class="font-mono text-xs text-cyan-600 bg-cyan-50 border border-cyan-200 px-1.5 py-0.5 rounded-sm block mb-3 w-fit">
                    {v.hook}
                  </code>
                  <p r-class="text-sm text-slate-400 leading-relaxed">
                    {v.behavior}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Rendering Pipeline ── */}
          <div r-class="mb-28">
            <p r-class="font-mono text-xs text-slate-400 uppercase tracking-widest mb-2">
              Internals
            </p>
            <h2 r-class="text-3xl font-bold text-slate-900 tracking-tight mb-10">
              The Rendering Pipeline
            </h2>

            <div r-class="flex flex-col gap-2">
              {pipeline.map((p, i) => (
                <div r-class="group flex items-center gap-4 p-5 bg-white border border-slate-200 rounded-lg hover:border-cyan-400/50 hover:shadow-sm transition-all duration-200">
                  <span r-class="font-mono text-xs text-slate-300 group-hover:text-cyan-500 transition-colors shrink-0 w-6">
                    {p.step}
                  </span>
                  <div r-class="flex-1">
                    <span r-class="text-sm font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">
                      {p.label}
                    </span>
                    <span r-class="text-sm text-slate-400 ml-2">
                      — {p.detail}
                    </span>
                  </div>
                  {i < pipeline.length - 1 && (
                    <span r-class="text-slate-200 group-hover:text-slate-400 transition-colors text-sm">
                      ↓
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── Available Events ── */}
          <div r-class="mb-28">
            <p r-class="font-mono text-xs text-slate-400 uppercase tracking-widest mb-2">
              Event System
            </p>
            <h2 r-class="text-3xl font-bold text-slate-900 tracking-tight mb-4">
              Available r- Events
            </h2>
            <p r-class="text-slate-400 text-base mb-8 max-w-xl">
              Any standard DOM event works with the{" "}
              <code r-class="font-mono text-cyan-600 bg-cyan-50 border border-cyan-200 px-1.5 py-0.5 rounded-sm text-xs">
                r-
              </code>{" "}
              prefix. Inline handlers are blocked at the framework level.
            </p>

            <div r-class="flex flex-wrap gap-2">
              {events.map((ev) => (
                <code r-class="font-mono text-xs text-cyan-600 bg-cyan-50 border border-cyan-200 px-2.5 py-1.5 rounded-sm">
                  {ev}
                </code>
              ))}
              <span r-class="font-mono text-xs text-slate-400 bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded-sm">
                + any DOM event…
              </span>
            </div>
          </div>

          {/* ── Batch Updates ── */}
          <div r-class="mb-28">
            <p r-class="font-mono text-xs text-slate-400 uppercase tracking-widest mb-2">
              Optimization
            </p>
            <h2 r-class="text-3xl font-bold text-slate-900 tracking-tight mb-4">
              Batch Updates
            </h2>
            <p r-class="text-slate-400 text-base mb-8 max-w-xl">
              Multiple state changes in one handler are automatically batched
              into a single re-render. You can also batch explicitly.
            </p>

            <div r-class="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  label: "Automatic",
                  note: "One re-render, not three",
                  code: `function handleReset() {\n  // These trigger ONE re-render\n  name.value = "";\n  count.value = 0;\n  items.value = [];\n}`,
                },
                {
                  label: "Explicit",
                  note: "Single re-render after both updates",
                  code: `import { batchUpdates } from "fynixui";\n\nbatchUpdates(() => {\n  stateA.value = 1;\n  stateB.value = 2;\n});`,
                },
              ].map((batch) => (
                <div r-class="bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-cyan-400/50 hover:shadow-md transition-all duration-300">
                  <div r-class="flex items-center justify-between px-5 py-3 border-b border-slate-100">
                    <span r-class="text-sm font-semibold text-slate-700">
                      {batch.label}
                    </span>
                    <span r-class="font-mono text-xs text-slate-400">
                      {batch.note}
                    </span>
                  </div>
                  <div r-class="bg-slate-900">
                    <div r-class="flex items-center gap-2 px-5 py-2.5 border-b border-slate-800 bg-slate-950/60">
                      <span r-class="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                      <span r-class="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                      <span r-class="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                    </div>
                    <pre r-class="text-slate-300 font-mono text-xs leading-6 p-6 overflow-x-auto">
                      {batch.code}
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── h() & Fragment ── */}
          <div r-class="mb-20">
            <p r-class="font-mono text-xs text-slate-400 uppercase tracking-widest mb-2">
              Under the Hood
            </p>
            <h2 r-class="text-3xl font-bold text-slate-900 tracking-tight mb-4">
              JSX, h(), and Fragment
            </h2>
            <p r-class="text-slate-400 text-base mb-8 max-w-xl">
              JSX is syntactic sugar over{" "}
              <code r-class="font-mono text-cyan-600 bg-cyan-50 border border-cyan-200 px-1.5 py-0.5 rounded-sm text-xs">
                h()
              </code>{" "}
              calls. You can use either — and{" "}
              <code r-class="font-mono text-cyan-600 bg-cyan-50 border border-cyan-200 px-1.5 py-0.5 rounded-sm text-xs">
                {"<>"}
                {"</>"}
              </code>{" "}
              lets you return multiple elements without a wrapper.
            </p>

            <div r-class="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
              <div r-class="flex items-center gap-2 px-5 py-3 border-b border-slate-800 bg-slate-950/60">
                <span r-class="w-3 h-3 rounded-full bg-red-500/50" />
                <span r-class="w-3 h-3 rounded-full bg-yellow-500/50" />
                <span r-class="w-3 h-3 rounded-full bg-green-500/50" />
                <span r-class="ml-3 font-mono text-xs text-slate-600">
                  fynix — h() compilation
                </span>
              </div>
              <pre r-class="text-slate-400 font-mono text-xs leading-7 p-8 overflow-x-auto">
                {`// JSX:\n<div id="app">\n  <MyComponent name="Alice" />\n  Hello\n</div>\n\n// Compiles to:\nh("div", { id: "app" },\n  h(MyComponent, { name: "Alice" }),\n  "Hello"\n);`}
              </pre>
            </div>

            <p r-class="text-slate-400 mt-6 text-base leading-relaxed">
              <span r-class="text-slate-700 font-medium">Key Insight: </span>
              You never need to call{" "}
              <code r-class="font-mono text-cyan-600 bg-cyan-50 border border-cyan-200 px-1.5 py-0.5 rounded-sm text-xs">
                h()
              </code>{" "}
              directly — JSX handles it. But knowing the compilation target
              helps debug unexpected renders and understand how Fynix builds its
              fiber tree.
            </p>
          </div>

          {/* ── Next ── */}
          <div r-class="flex items-center justify-between py-6 border-t border-slate-100">
            <span r-class="font-mono text-xs text-slate-400 uppercase tracking-widest">
              Up Next
            </span>
            <div r-class="flex items-center gap-2 font-mono text-xs text-cyan-600 hover:text-cyan-700 cursor-pointer transition-colors">
              Project 1: Todo App
              <span>→</span>
            </div>
          </div>
        </div>
      </div>
    </Docs>
  );
}
