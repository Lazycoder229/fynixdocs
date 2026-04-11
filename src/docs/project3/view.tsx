import { Fynix, VNode } from "fynixui";
import Docs from "../view";

// ── Live Dashboard demo component ─────────────────────────────────────────────

import { nixState, nixEffect, For } from "fynixui";

interface DashboardStats {
  totalUsers: number;
  activeNow: number;
  revenue: number;
  growth: number;
}

interface ActivityItem {
  id: string;
  action: string;
  timestamp: number;
  user: string;
}

function LiveDashboardApp(): VNode {
  const stats = nixState<DashboardStats>({
    totalUsers: 12483,
    activeNow: 142,
    revenue: 48291.5,
    growth: 7.4,
  });

  const activityFeed = nixState<ActivityItem[]>([
    {
      id: "1",
      action: "New user signed up",
      timestamp: Date.now() - 12000,
      user: "alice@example.com",
    },
    {
      id: "2",
      action: "Purchase completed",
      timestamp: Date.now() - 45000,
      user: "bob@example.com",
    },
    {
      id: "3",
      action: "Report exported",
      timestamp: Date.now() - 90000,
      user: "carol@example.com",
    },
  ]);

  const loading = nixState(false);
  const selectedTab = nixState<"overview" | "activity">("overview");

  const actions = [
    "New user signed up",
    "Purchase completed",
    "Report exported",
    "Settings updated",
    "File uploaded",
  ];
  const users = [
    "alice@example.com",
    "bob@example.com",
    "carol@example.com",
    "dave@example.com",
  ];

  let tickCount = 0;
  let paused = false;

  function tick() {
    // Skip if explicitly paused or browser tab is hidden
    if (paused || document.hidden) return;

    tickCount += 1;

    stats.value = {
      totalUsers: stats.value.totalUsers + Math.floor(Math.random() * 5),
      activeNow: 100 + Math.floor(Math.random() * 50),
      revenue: stats.value.revenue + Math.random() * 100,
      growth: +(Math.random() * 10).toFixed(1),
    };

    // Stable incrementing ID — <For> only diffs one new item, not the whole list
    activityFeed.value = [
      {
        id: `activity-${tickCount}`,
        action: actions[Math.floor(Math.random() * actions.length)],
        timestamp: Date.now(),
        user: users[Math.floor(Math.random() * users.length)],
      },
      ...activityFeed.value.slice(0, 4),
    ];
  }

  const intervalId = setInterval(tick, 5000);

  // Pause ticking when tab goes hidden — resumes instantly when visible again
  function onVisibilityChange() {
    paused = document.hidden;
  }
  document.addEventListener("visibilitychange", onVisibilityChange);

  // Guaranteed cleanup on ANY navigation away — pagehide fires before
  // the page is unloaded even on SPA router transitions that skip unload
  function onPageHide() {
    paused = true;
    clearInterval(intervalId);
    document.removeEventListener("visibilitychange", onVisibilityChange);
    window.removeEventListener("pagehide", onPageHide);
  }
  window.addEventListener("pagehide", onPageHide);

  // Also clean up via Fynix unmount as a second safety net
  nixEffect(() => () => {
    paused = true;
    clearInterval(intervalId);
    document.removeEventListener("visibilitychange", onVisibilityChange);
    window.removeEventListener("pagehide", onPageHide);
  });

  function StatCard(props: {
    label: string;
    value: string | number;
    icon: string;
    sub?: string;
  }): VNode {
    return (
      <div r-class="bg-white border border-slate-200 rounded-lg p-5 flex items-start gap-4">
        <span r-class="text-2xl">{props.icon}</span>
        <div>
          <p r-class="text-xl font-bold text-slate-900">{props.value}</p>
          <p r-class="text-xs text-slate-400 font-mono mt-0.5">{props.label}</p>
        </div>
      </div>
    );
  }

  // Read .value inline in JSX so Fynix re-subscribes on every render
  return (
    <div r-class="max-w-2xl mx-auto">
      <h2 r-class="text-2xl font-bold text-slate-900 tracking-tight mb-2">
        📊 Dashboard
      </h2>
      <p r-class="font-mono text-xs text-slate-400 mb-6">
        Updates every 5 seconds — watch the numbers change
      </p>

      {/* Tabs — r-class reads selectedTab.value inline so active style re-renders reactively */}
      <div r-class="flex gap-1 mb-6 border border-slate-200 rounded-lg p-1 w-fit">
        <button
          r-click={() => (selectedTab.value = "overview")}
          r-class={
            selectedTab.value === "overview"
              ? "font-mono text-xs px-4 py-1.5 rounded-md transition-all bg-slate-900 text-white"
              : "font-mono text-xs px-4 py-1.5 rounded-md transition-all text-slate-400 hover:text-slate-600"
          }
        >
          Overview
        </button>
        <button
          r-click={() => (selectedTab.value = "activity")}
          r-class={
            selectedTab.value === "activity"
              ? "font-mono text-xs px-4 py-1.5 rounded-md transition-all bg-slate-900 text-white"
              : "font-mono text-xs px-4 py-1.5 rounded-md transition-all text-slate-400 hover:text-slate-600"
          }
        >
          Activity
        </button>
      </div>

      <div key={selectedTab.value}>
        {selectedTab.value === "overview" ? (
          <div r-class="flex flex-col gap-4">
            <div r-class="grid grid-cols-2 gap-3">
              <StatCard
                label="TOTAL USERS"
                value={stats.value.totalUsers.toLocaleString()}
                icon="👥"
              />
              <StatCard
                label="ACTIVE NOW"
                value={stats.value.activeNow}
                icon="🟢"
              />
              <StatCard
                label="REVENUE"
                value={`$${stats.value.revenue.toFixed(2)}`}
                icon="💰"
              />
              <StatCard
                label="GROWTH"
                value={`${stats.value.growth}%`}
                icon="📈"
              />
            </div>
          </div>
        ) : (
          <div r-class="flex flex-col gap-2">
            <For each={activityFeed.value}>
              {(item) => (
                <div
                  key={item.id}
                  r-class="border border-slate-200 bg-white rounded-lg px-4 py-3 flex items-start justify-between"
                >
                  <div>
                    <p r-class="text-sm text-slate-700">{item.action}</p>
                    <p r-class="text-xs text-slate-400 font-mono mt-0.5">
                      {item.user}
                    </p>
                  </div>
                  <time r-class="font-mono text-[10px] text-slate-300 shrink-0 mt-1">
                    {new Date(item.timestamp).toLocaleTimeString()}
                  </time>
                </div>
              )}
            </For>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export default function Project3(): VNode {
  const whatYoullBuild = [
    { num: "01", text: "Multiple dashboard widgets (stats, activity feed)" },
    { num: "02", text: "Async data fetching with loading/error states" },
    { num: "03", text: "Global store for shared state" },
    { num: "04", text: "Interval-based data refresh" },
    { num: "05", text: "Multi-page app with router navigation" },
    { num: "06", text: "SEO meta tags per route" },
  ];

  const whatYoullLearn = [
    {
      icon: "⊕",
      concept: "nixAsync",
      detail:
        "Data fetching with automatic loading/error states and cancellation",
    },
    {
      icon: "⬢",
      concept: "nixStore",
      detail: "Global reactive state shared across multiple components",
    },
    {
      icon: "⟁",
      concept: "nixInterval",
      detail: "Periodic updates with automatic cleanup on unmount",
    },
    {
      icon: "◇",
      concept: "nixLazy / Suspense",
      detail: "Code splitting for better performance",
    },
    {
      icon: "◈",
      concept: "Router + SEO",
      detail: "Dynamic routes, navigation, and per-route meta tags",
    },
  ];

  const steps = [
    {
      num: "01",
      title: "App Setup with Router",
      description:
        "Bootstrap the Fynix router and define a file-based route structure for the dashboard, detail pages, and settings.",
      details: [
        "createFynix() from fynixui/router initializes the app and returns a singleton router instance. Calling it multiple times in different components is safe — you always get the same instance.",
        "mountRouter('#app') attaches the router to the DOM element with that id and starts listening for URL changes. It reads the current URL on startup and renders the matching route immediately.",
        "Routes are resolved by folder structure under src/. A file at src/dashboard/view.tsx serves /dashboard. A folder named [id] creates a dynamic segment — src/dashboard/[id]/view.tsx serves /dashboard/:id.",
        "Each view.tsx exports a default component function. The router imports it, extracts any dynamic params, and passes them as props. No manual route registration is needed.",
      ],
      concept:
        "Fynix uses file-system routing. Folders map to URL segments, [brackets] create dynamic params, and each view.tsx is a self-contained route component.",
      lang: "typescript",
      code: `// src/main.ts
import createFynix from "fynixui/router";

const app = createFynix();
app.mountRouter("#app");

// Project structure:
// src/
// ├── dashboard/
// │   └── view.tsx        → /dashboard
// ├── dashboard/
// │   └── [id]/
// │       └── view.tsx    → /dashboard/:id  (dynamic route)
// ├── settings/
// │   └── view.tsx        → /settings
// └── main.ts`,
    },
    {
      num: "02",
      title: "Global State with nixStore",
      description:
        "Use nixStore to create named global reactive state that any component can subscribe to, and nixInterval for periodic data refresh.",
      details: [
        "nixStore<T>(key, initialValue) creates or retrieves a named global reactive state. The key is a dot-separated namespace string — 'dashboard.stats' lives under the 'dashboard' namespace. Any component that reads this store key is subscribed automatically.",
        "Unlike nixState, which is local to a component instance, nixStore values persist and stay synchronized across all components that reference the same key — even if those components are in completely different parts of the tree.",
        "nixInterval(callback, delay) calls the callback at the given interval in milliseconds. It registers an automatic cleanup with the active component context so the interval is cleared on unmount. No manual clearInterval needed.",
        "Inside the interval callback, updating stats.value = {...} triggers re-renders in every component reading that store key — the dashboard stats cards update in all subscribed views simultaneously.",
        "StatCard is a plain function component that receives label, value, and icon as props. It has no state of its own — it just renders whatever the parent passes. This makes it trivially reusable across different parts of the dashboard.",
      ],
      concept:
        "nixStore creates cross-component global state identified by a dot-namespaced key. nixInterval fires at a set cadence and cleans up automatically on unmount.",
      lang: "tsx",
      code: `import { nixStore, nixInterval, For, VNode } from "fynixui";

interface DashboardStats {
  totalUsers: number;
  activeNow: number;
  revenue: number;
  growth: number;
}

export default function Dashboard(): VNode {
  const stats = nixStore<DashboardStats>("dashboard.stats", {
    totalUsers: 0, activeNow: 0, revenue: 0, growth: 0,
  });

  // Simulate real-time data updates every 5 seconds
  nixInterval(() => {
    stats.value = {
      totalUsers: stats.value.totalUsers + Math.floor(Math.random() * 5),
      activeNow: 100 + Math.floor(Math.random() * 50),
      revenue: stats.value.revenue + Math.random() * 100,
      growth: +(Math.random() * 10).toFixed(1),
    };
  }, 5000);

  return (
    <div class="dashboard">
      <h1>📊 Dashboard</h1>
      <div class="stats-grid">
        <StatCard label="Total Users" value={stats.value.totalUsers} icon="👥" />
        <StatCard label="Active Now" value={stats.value.activeNow} icon="🟢" />
        <StatCard label="Revenue" value={\`$\${stats.value.revenue.toFixed(2)}\`} icon="💰" />
        <StatCard label="Growth" value={\`\${stats.value.growth}%\`} icon="📈" />
      </div>
    </div>
  );
}

// Reusable stat card component
function StatCard(props: { label: string; value: any; icon: string }): VNode {
  return (
    <div class="stat-card">
      <span class="icon">{props.icon}</span>
      <div>
        <p class="value">{props.value}</p>
        <p class="label">{props.label}</p>
      </div>
    </div>
  );
}`,
    },
    {
      num: "03",
      title: "Async Data Fetching",
      description:
        "Use nixAsync to fetch data with automatic loading and error state management, and AbortController support for cleanup.",
      details: [
        "nixAsync<T>(fetcher, deps) runs the async fetcher immediately and returns reactive handles: data, loading, error, and refetch. All four are reactive values — any component that reads them during render is subscribed.",
        "The fetcher receives an AbortSignal as its only argument. Pass it to fetch() as { signal } so the in-flight request is cancelled automatically when the component unmounts or deps change.",
        "loading.value is true while the promise is pending and false when it resolves or rejects. Use it to conditionally render a skeleton or spinner. error.value holds the thrown Error when the fetch fails, or null on success.",
        "The deps array works like a watch list. When any dep value changes, nixAsync cancels the current request (via the AbortSignal) and starts a new one. Passing [] means fetch once on mount, never again.",
        "refetch is a function that manually re-triggers the fetcher without changing deps. Wire it to a Retry button so users can recover from transient network errors without refreshing the page.",
      ],
      concept:
        "nixAsync handles async lifecycle automatically. The signal param enables clean cancellation. refetch gives users a manual recovery path on error.",
      lang: "tsx",
      code: `import { nixAsync } from "fynixui/hooks/nixAsync";

function ActivityFeed(): VNode {
  const { data, loading, error, refetch } = nixAsync<any[]>(
    async (signal) => {
      const res = await fetch("/api/activity", { signal });
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
    [] // deps — refetch when these change
  );

  if (loading.value) return <p>Loading activity...</p>;
  if (error.value) return (
    <div>
      <p class="error">Error: {error.value.message}</p>
      <button r-click={refetch}>Retry</button>
    </div>
  );

  return (
    <div class="activity-feed">
      <h2>Recent Activity</h2>
      <For each={data.value || []}>
        {(item: any) => (
          <div key={item.id} class="activity-item">
            <span>{item.action}</span>
            <time>{new Date(item.timestamp).toLocaleString()}</time>
          </div>
        )}
      </For>
    </div>
  );
}`,
    },
    {
      num: "04",
      title: "Dynamic Routes with Params",
      description:
        "Create file-based dynamic route segments using [bracket] folder naming, and attach per-route SEO metadata via a static .meta function.",
      details: [
        "A folder named [id] creates a dynamic URL segment. The router matches /dashboard/42 against src/dashboard/[id]/view.tsx, extracts { id: '42' }, and passes it as props.params to the component.",
        "Inside the component, props.params.id is a plain string — use it directly in fetch calls, titles, or display. Because params are props, the component is purely functional: same params always produce the same output.",
        "Passing [props.params.id] as the deps array to nixAsync means the fetch re-runs automatically whenever the user navigates to a different detail page — you never need to manually trigger a reload.",
        "A static .meta function on the component gives the router a way to generate per-route <title> and <meta> tags. It receives the extracted params and returns an object with title, description, and ogTitle. The router calls this server-side or on navigation.",
        "Because meta is a static function (not a hook), it can be evaluated before the component mounts — which allows frameworks and crawlers to read accurate titles without waiting for JavaScript to execute.",
      ],
      concept:
        "Dynamic route folders use [param] naming. params flow in as props. A static .meta function gives the router accurate SEO data for each route without running the component.",
      lang: "tsx",
      code: `// src/dashboard/[id]/view.tsx
import { nixAsync, VNode } from "fynixui";

export default function DetailView(props: { params: { id: string } }): VNode {
  const { data, loading } = nixAsync(
    async () => {
      const res = await fetch(\`/api/items/\${props.params.id}\`);
      return res.json();
    },
    [props.params.id] // re-fetch when id changes
  );

  if (loading.value) return <p>Loading...</p>;

  return (
    <div>
      <h1>Detail: {props.params.id}</h1>
      <pre>{JSON.stringify(data.value, null, 2)}</pre>
    </div>
  );
}

// SEO metadata — auto-applied by router
DetailView.meta = (params: { id: string }) => ({
  title: \`Dashboard - Item \${params.id}\`,
  description: \`Details for item \${params.id}\`,
  ogTitle: \`Item \${params.id} | My Dashboard\`,
});`,
    },
    {
      num: "05",
      title: "Navigation Between Pages",
      description:
        "Use the router singleton to navigate programmatically, pass props between pages, and traverse browser history.",
      details: [
        "createFynix() is a singleton factory — calling it anywhere in your app returns the same router instance. Import it in any component that needs to navigate without prop-drilling a router reference.",
        "navigate(path, props?) pushes a new entry onto the browser history stack and renders the matched route. The optional props object is cached and passed to the destination component alongside any URL params.",
        "Props passed via navigate() survive browser back/forward navigation — the router caches them by history index. This lets you pass rich objects (like a pre-fetched record) without re-encoding them into the URL.",
        "replace(path, props?) works like navigate but replaces the current history entry instead of pushing a new one. Use it for redirects after form submission so the user can't accidentally resubmit by pressing Back.",
        "back() calls history.back() and re-renders the previous route with its cached props and params. It's equivalent to the browser's back button but callable from any component event handler.",
      ],
      concept:
        "The router singleton is callable anywhere. navigate() pushes history; replace() swaps it; back() rewinds. Props are cached per history entry and survive back/forward.",
      lang: "tsx",
      code: `import createFynix from "fynixui/router";

function NavBar(): VNode {
  const router = createFynix(); // singleton — safe to call again

  return (
    <nav>
      <button r-click={() => router.navigate("/dashboard")}>
        Dashboard
      </button>
      <button r-click={() => router.navigate("/settings")}>
        Settings
      </button>
      <button
        r-click={() =>
          router.navigate("/dashboard/42", { source: "nav" })
        }
      >
        Item 42
      </button>
      <button r-click={() => router.back()}>← Back</button>
    </nav>
  );
}

// Router API summary:
// navigate(path, props?) — Push navigation with optional props
// replace(path, props?)  — Replace current history entry
// back()                 — Go back in history
// Props are cached and survive browser back/forward`,
    },
  ];

  const takeaways = [
    { label: "nixStore", detail: "Global cross-component state" },
    { label: "nixAsync", detail: "Data fetching with loading/error handling" },
    { label: "nixInterval", detail: "Periodic updates with automatic cleanup" },
    {
      label: "Dynamic routes",
      detail: "[param] folders with extracted params",
    },
    { label: "Route SEO meta", detail: "Per-route title and meta tags" },
    { label: "Router singleton", detail: "navigate(), replace(), back()" },
  ];

  return (
    <Docs>
      <div r-class="min-h-screen bg-white text-slate-800 relative overflow-x-hidden text-base md:text-lg font-normal">
        <div r-class="relative z-10 max-w-5xl mx-auto py-6 px-6 lg:px-10">
          {/* ── Badge ── */}
          <div r-class="mb-10 flex items-center gap-2">
            <span r-class="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-violet-600 bg-violet-50 border border-violet-200 px-3 py-1.5 rounded-sm">
              <span r-class="w-1.5 h-1.5 rounded-full bg-violet-500" />
              Project 3 — Advanced
            </span>
          </div>

          {/* ── Hero ── */}
          <div r-class="mb-16">
            <p r-class="font-mono text-xs text-slate-400 tracking-widest uppercase mb-5">
              Tutorial — Async, Global State & Routing
            </p>
            <h1 r-class="font-extrabold leading-none tracking-tight text-5xl lg:text-6xl mb-8 text-slate-900">
              Real-Time{" "}
              <span r-class="bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent">
                Dashboard
              </span>
            </h1>
            <p r-class="text-xl text-slate-500 leading-relaxed max-w-2xl font-normal">
              Build a dynamic dashboard with async data fetching, global state
              management, interval-based refresh, and file-system routing with
              Fynix.
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
                      <code r-class="font-mono text-xs text-violet-600 bg-violet-50 border border-violet-200 px-1.5 py-0.5 rounded-sm">
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
                Building the Dashboard
              </h2>
            </div>

            <div r-class="flex flex-col gap-8">
              {steps.map((step) => (
                <div r-class="group relative bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-violet-400/50 hover:shadow-md transition-all duration-300">
                  {/* Step header */}
                  <div r-class="flex items-start gap-4 px-6 py-5 border-b border-slate-100">
                    <span r-class="font-mono text-xs text-slate-300 group-hover:text-violet-500 transition-colors duration-200 shrink-0 mt-0.5">
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
                            <span r-class="font-mono text-[10px] text-violet-400 shrink-0 mt-[3px]">
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
                  <div r-class="px-6 py-4 bg-violet-50/40 border-t border-violet-100">
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
                The finished dashboard running live. Stats update every 5
                seconds via nixInterval — switch between the Overview and
                Activity tabs to explore both widgets.
              </p>
            </div>

            <div r-class="rounded-lg border border-slate-200 overflow-hidden shadow-sm">
              {/* Browser chrome */}
              <div r-class="flex items-center gap-2 px-4 py-3 bg-slate-100 border-b border-slate-200">
                <span r-class="w-3 h-3 rounded-full bg-red-400/70" />
                <span r-class="w-3 h-3 rounded-full bg-yellow-400/70" />
                <span r-class="w-3 h-3 rounded-full bg-green-400/70" />
                <span r-class="ml-3 font-mono text-xs text-slate-400 bg-white border border-slate-200 rounded px-3 py-1">
                  localhost:5173/dashboard
                </span>
              </div>

              {/* App */}
              <div r-class="bg-white px-8 py-8 min-h-[500px]">
                <LiveDashboardApp />
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
              Project 2: Notes Manager
            </div>
            <div r-class="flex items-center gap-2 font-mono text-xs text-violet-600 hover:text-violet-700 cursor-pointer transition-colors">
              Components Guide
              <span>→</span>
            </div>
          </div>
        </div>
      </div>
    </Docs>
  );
}
