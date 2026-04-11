import { Fynix, VNode } from "fynixui";
import Docs from "../view";
import { For } from "fynixui";

// ─────────────────────────────────────────────────────────────────────────────

interface GuideSection {
  id: string;
  label: string;
  description: string;
  items: GuideItem[];
}

interface GuideItem {
  num: string;
  title: string;
  description: string;
  code: string;
  notes?: string;
}

export default function Advanced(): VNode {
  const sections: GuideSection[] = [
    {
      id: "state-management",
      label: "State Management Patterns",
      description:
        "Proven patterns for managing state in production applications",
      items: [
        {
          num: "01",
          title: "Pattern 1: Local Component State",
          description:
            "Use nixState for state that belongs to a single component. Only that component re-renders when the state changes.",
          code: `function Counter(): VNode {
  const count = nixState(0); // Only this component re-renders
  return <button r-click={() => count.value++}>{count}</button>;
}`,
          notes: "Best for: UI state, form inputs, temporary data",
        },
        {
          num: "02",
          title: "Pattern 2: Global Shared State",
          description:
            "Use nixStore when multiple components need to access and modify the same data. All components stay synced automatically.",
          code: `// In any component:
const theme = nixStore("app.theme", "light");

// In another component — same store instance:
const theme = nixStore("app.theme", "light");
// Both components stay synced automatically`,
          notes: "Best for: App theme, user session, global settings",
        },
        {
          num: "03",
          title: "Pattern 3: Derived State",
          description:
            "Use nixComputed to derive state from other state instead of duplicating logic. Always stays in sync with source.",
          code: `// ❌ Bad: duplicated filter logic
const activeItems = nixState(items.value.filter(i => i.active));

// ✅ Good: derived from source of truth
const activeItems = nixComputed(() => items.value.filter(i => i.active));`,
          notes: "Best for: Filtered lists, computed values, transformations",
        },
        {
          num: "04",
          title: "Pattern 4: Persistent State",
          description:
            "Use nixLocalStorage for data that should survive page reloads and browser sessions.",
          code: `const preferences = nixLocalStorage("prefs", { 
  fontSize: 14, 
  theme: "dark" 
});
preferences.set({ ...preferences.value, fontSize: 16 });`,
          notes: "Best for: User preferences, saved data, cache",
        },
      ],
    },
    {
      id: "performance",
      label: "Performance Optimization",
      description: "Techniques for building fast, responsive applications",
      items: [
        {
          num: "01",
          title: "Memoize Expensive Computations",
          description:
            "Use nixMemo to cache expensive calculations and only recompute when dependencies change.",
          code: `const sorted = nixMemo(() =>
  [...largeArray].sort((a, b) => a.name.localeCompare(b.name)),
  [largeArray]
);`,
          notes: "Impact: Reduces computation time on re-renders",
        },
        {
          num: "02",
          title: "Memoize Callbacks Passed to Children",
          description:
            "Use nixCallback to keep function references stable. Prevents unnecessary child re-renders.",
          code: `// ❌ New function every render — child re-renders needlessly
<ChildComponent onSave={() => save(id)} />

// ✅ Stable reference — child skips re-render
const onSave = nixCallback(() => save(id), [id]);
<ChildComponent onSave={onSave} />`,
          notes: "Impact: Reduces child component re-renders",
        },
        {
          num: "03",
          title: "Debounce High-Frequency Updates",
          description:
            "Use nixDebounce to delay function execution until the user stops triggering it. Perfect for search and resize handlers.",
          code: `const debouncedSearch = nixDebounce((query) => {
  results.value = search(query);
}, 300);

<input r-input={(e) => debouncedSearch(e.target.value)} />`,
          notes: "Impact: Reduces API calls and computations",
        },
        {
          num: "04",
          title: "Lazy Load Heavy Components",
          description:
            "Use nixLazy to code-split components and load them only when needed. Reduces initial bundle size.",
          code: `const HeavyChart = nixLazy(() => import("./Chart"));

<Suspense fallback={<Spinner />}>
  <HeavyChart data={chartData} />
</Suspense>`,
          notes: "Impact: Smaller initial bundle, faster TTI",
        },
        {
          num: "05",
          title: "Use Batch Updates for Multiple Changes",
          description:
            "Wrap multiple state changes in batchUpdates to trigger a single re-render instead of many.",
          code: `batchUpdates(() => {
  items.value = newItems;
  count.value = newItems.length;
  lastUpdate.value = Date.now();
  // Single re-render for all three
});`,
          notes: "Impact: Reduces re-renders, smoother UX",
        },
        {
          num: "06",
          title: "Monitor with Performance Profiling",
          description:
            "Enable performance profiling to catch slow renders and identify bottlenecks early.",
          code: `enablePerformanceProfiling({
  enabled: true,
  slowRenderThreshold: 16.67,
  onMetrics: (m) => {
    if (m.totalTime > 16.67) console.warn("Slow render:", m);
  },
});`,
          notes: "Impact: Early warning system for performance issues",
        },
      ],
    },
    {
      id: "patterns",
      label: "Reusable Component Patterns",
      description:
        "Architectural patterns for building maintainable components",
      items: [
        {
          num: "01",
          title: "Composition Pattern",
          description:
            "Build flexible components by accepting other components as props instead of hard-coding children.",
          code: `function Layout(props: { header: VNode; children: VNode[] }): VNode {
  return (
    <div class="layout">
      <header>{props.header}</header>
      <main>{props.children}</main>
    </div>
  );
}

// Usage
<Layout header={<NavBar />}>
  <Dashboard />
</Layout>`,
          notes: "Benefit: Highly reusable, easy to customize",
        },
        {
          num: "02",
          title: "Higher-Order Component Pattern",
          description:
            "Wrap components to add behavior like loading states, error boundaries, or authentication checks.",
          code: `function withLoading(Component: ComponentFunction) {
  return function Wrapped(props: any): VNode {
    const loading = nixState(true);
    nixEffectOnce(() => { 
      setTimeout(() => loading.value = false, 500); 
    });

    if (loading.value) return <p>Loading...</p>;
    return <Component {...props} />;
  };
}

const SafeDashboard = withLoading(Dashboard);`,
          notes: "Benefit: Reusable cross-cutting concerns",
        },
      ],
    },
  ];

  return (
    <Docs>
      <div r-class="relative">
        <div r-class="max-w-4xl mx-auto px-6 py-16">
          {/* ── Hero ── */}
          <div r-class="mb-16">
            <p r-class="font-mono text-xs text-slate-400 uppercase tracking-widest mb-2">
              Advanced Topics
            </p>
            <h1 r-class="text-4xl font-bold text-slate-900 tracking-tight mb-6">
              Advanced Guides
            </h1>
            <p r-class="text-lg text-slate-600 leading-relaxed max-w-2xl">
              Techniques for building production-grade Fynix applications.
              Master state management, performance optimization, and reusable
              component patterns.
            </p>
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
                  <p r-class="text-slate-600 mt-3">{section.description}</p>
                </div>

                <div r-class="flex flex-col gap-8">
                  <For each={section.items}>
                    {(item) => (
                      <div r-class="group relative bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-violet-400/50 hover:shadow-md transition-all duration-300">
                        {/* Header */}
                        <div r-class="flex items-start gap-4 px-6 py-5 border-b border-slate-100">
                          <span r-class="font-mono text-xs text-slate-300 group-hover:text-violet-500 transition-colors duration-200 shrink-0 mt-0.5">
                            {item.num}
                          </span>
                          <div r-class="flex-1 min-w-0">
                            <h3 r-class="text-sm font-bold text-slate-900 tracking-tight font-mono mb-2">
                              {item.title}
                            </h3>
                            <p r-class="text-sm text-slate-600 leading-relaxed mb-4">
                              {item.description}
                            </p>
                            {item.notes && (
                              <p r-class="text-xs text-slate-500 font-mono bg-slate-50 border border-slate-100 rounded px-3 py-2">
                                <span r-class="text-violet-600 font-bold">
                                  Note:
                                </span>{" "}
                                {item.notes}
                              </p>
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
                            {item.code}
                          </pre>
                        </div>
                      </div>
                    )}
                  </For>
                </div>
              </div>
            )}
          </For>

          {/* ── Project Structure ── */}
          <div r-class="mb-28">
            <div r-class="mb-12">
              <p r-class="font-mono text-xs text-slate-400 uppercase tracking-widest mb-2">
                Architecture
              </p>
              <h2 r-class="text-3xl font-bold text-slate-900 tracking-tight">
                Recommended Project Structure
              </h2>
              <p r-class="text-slate-600 mt-3">
                Organize your project for scalability and maintainability
              </p>
            </div>

            <div r-class="group relative bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-violet-400/50 hover:shadow-md transition-all duration-300">
              {/* Code block */}
              <div r-class="bg-slate-900">
                <div r-class="flex items-center gap-2 px-5 py-2.5 border-b border-slate-800 bg-slate-950/60">
                  <span r-class="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                  <span r-class="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                  <span r-class="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                  <span r-class="ml-3 font-mono text-xs text-slate-600">
                    bash
                  </span>
                </div>
                <pre r-class="text-slate-300 font-mono text-xs leading-6 p-6 overflow-x-auto">
                  {`src/
├── components/          ← Shared reusable components
│   ├── Button.tsx
│   ├── Card.tsx
│   └── Modal.tsx
├── hooks/               ← Custom hooks
│   └── useAuth.ts
├── stores/              ← Global state definitions  
│   └── authStore.ts
├── home/
│   └── view.tsx         ← Route: /
├── dashboard/
│   ├── view.tsx         ← Route: /dashboard
│   └── [id]/
│       └── view.tsx     ← Route: /dashboard/:id
├── settings/
│   └── view.tsx         ← Route: /settings
├── styles/
│   └── global.css
└── main.ts              ← Entry point`}
                </pre>
              </div>
            </div>
          </div>

          {/* ── Nav ── */}
          <div r-class="flex items-center justify-between py-6 border-t border-slate-100">
            <div r-class="flex items-center gap-2 font-mono text-xs text-slate-400 hover:text-slate-600 cursor-pointer transition-colors">
              <span>←</span>
              Components Guide
            </div>
            <div r-class="flex items-center gap-2 font-mono text-xs text-violet-600 hover:text-violet-700 cursor-pointer transition-colors">
              Best Practices
              <span>→</span>
            </div>
          </div>
        </div>
      </div>
    </Docs>
  );
}
