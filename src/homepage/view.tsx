// src/homepage/view.tsx
import { Fynix, Path, VNode, For } from "fynixui";

// ─── Data constants ────

const STATS = [
  { val: "0", unit: "dependencies", label: "Zero Runtime Deps" },

  { val: "12+", unit: "hooks", label: "Built-in Hooks" },
  { val: "100%", unit: "TypeScript", label: "Full Type Safety" },
];

const NAV_LINKS = [
  { href: "#why", label: "Why Fynix" },
  { href: "#examples", label: "Examples" },
  { href: "#architecture", label: "Architecture" },
];

const WHY_FEATURES = [
  {
    icon: "fas fa-bolt",
    title: "Fiber-based Rendering",
    color: "violet",
    desc: "Work is split into small units processed within time budgets. High-priority updates (user input) preempt low-priority background work automatically, keeping interactions snappy.",
  },
  {
    icon: "fas fa-bullseye",
    title: "Surgical Re-renders",
    color: "cyan",
    desc: "nixState tracks exactly which fibers depend on which state values. When state changes, only the precise component fiber is re-queued — no wasted diffing of unrelated subtrees.",
  },
  {
    icon: "fas fa-lock",
    title: "Security by Default",
    color: "rose",
    desc: "XSS prevention is baked into the runtime: entity encoding, protocol blocking (javascript:, data:), inline handler blocking, and innerHTML restriction. Not a plugin — the core.",
  },
  {
    icon: "fas fa-puzzle-piece",
    title: "Rich Hook Ecosystem",
    color: "amber",
    desc: "12+ hooks covering every common pattern: async operations, forms, memoization, global stores, local storage, intervals, debouncing, and lazy loading — all composable.",
  },
  {
    icon: "fas fa-box",
    title: "Zero Dependencies",
    color: "emerald",
    desc: "The entire runtime has no external dependencies. No supply-chain risk, no bloated node_modules, no unexpected breaking changes from upstream packages.",
  },
  {
    icon: "fas fa-gem",
    title: "TypeScript Native",
    color: "sky",
    desc: "First-class JSX definitions, fully typed VNode and hook APIs, typed component props, and typed store selectors.",
  },
  {
    icon: "fas fa-layer-group",
    title: "Built-in Components",
    color: "violet",
    desc: "Pre-built, styled components like Button and Path ready to use out of the box. Extensible for custom UI patterns without reinventing the wheel.",
  },
];

const ARCH_STEPS = [
  {
    step: "01",
    stepColor: "text-violet-400",
    title: "h() / JSX → VNode Tree",
    desc: "Your JSX compiles to h() calls that produce lightweight, immutable VNode objects. No side effects happen here — just a plain JavaScript object tree describing your UI.",
  },
  {
    step: "02",
    stepColor: "text-cyan-400",
    title: "FiberReconciler — Render Phase",
    desc: "The reconciler builds a FynixFiber tree mirroring the VNode tree. Work is processed as time-sliced units via FynixScheduler. The phase can be interrupted and resumed between frames.",
  },
  {
    step: "03",
    stepColor: "text-emerald-400",
    title: "Commit Phase — DOM Mutation",
    desc: "Once all fibers are reconciled, the commit phase applies PLACEMENT, UPDATE, and DELETION effects to the real DOM in one synchronous pass. No partial updates, no layout thrash.",
  },
];

const SCHEDULER_PRIORITIES = [
  {
    level: "immediate",
    desc: "Flushed synchronously, right now.",
    color: "bg-rose-500",
    width: "w-full",
  },
  {
    level: "high",
    desc: "Next rAF — user-visible interactions.",
    color: "bg-amber-500",
    width: "w-5/6",
  },
  {
    level: "normal",
    desc: "Standard component state updates.",
    color: "bg-violet-500",
    width: "w-4/6",
  },
  {
    level: "low",
    desc: "Prefetching, background work.",
    color: "bg-cyan-600",
    width: "w-3/6",
  },
  {
    level: "idle",
    desc: "requestIdleCallback — truly background.",
    color: "bg-slate-600",
    width: "w-2/6",
  },
];

const SECURITY_PROTECTIONS = [
  {
    title: "HTML Entity Encoding",
    desc: "All text content is sanitized via sanitizeText() before being set as a DOM text node. Characters like <, >, &, \", and ' are entity-encoded automatically.",
  },
  {
    title: "Protocol Blocking",
    desc: "href, src, action, and formaction attributes are checked against a blocklist: javascript:, data:, vbscript:, file:, and about: are rejected at the property setter level.",
  },
  {
    title: "Inline Handler Blocking",
    desc: "Attributes beginning with on (onclick, onmouseover, etc.) are intercepted and rejected. Use r-click, r-input, r-submit instead — they use delegated event listeners.",
  },
  {
    title: "innerHTML Restriction",
    desc: "DANGEROUS_HTML_PROPS includes innerHTML, outerHTML, and srcdoc. Attempting to set these props logs a security error and the assignment is silently dropped.",
  },
];

const SECURITY_RECOMMENDATIONS = [
  {
    label: "Content Security Policy",
    detail:
      "Add a CSP header restricting script-src to 'self'. Fynix's event delegation requires no unsafe-inline script.",
  },
  {
    label: "Subresource Integrity",
    detail:
      "Use SRI hashes on any external scripts or stylesheets bundled with your app.",
  },
  {
    label: "Server-side Validation",
    detail:
      "Never trust client-submitted data. Validate and sanitize on your server regardless of client-side protections.",
  },
  {
    label: "Regular Security Audits",
    detail:
      "Periodically audit your application code for business-logic vulnerabilities that no framework can prevent.",
  },
];

const COMPARE_ROWS = [
  { label: "Fiber-based time slicing", fynix: true, others: true },
  { label: "Zero external dependencies", fynix: true, others: false },
  { label: "Security baked into runtime", fynix: true, others: false },
  { label: "Targeted fiber re-renders", fynix: true, others: false },
  { label: "Built-in async hooks", fynix: true, others: false },
  { label: "Built-in form management", fynix: true, others: false },
  { label: "File-based routing", fynix: true, others: true },
  { label: "Priority-based scheduling", fynix: true, others: true },
  { label: "Hierarchical global store", fynix: true, others: false },
  { label: "Full TypeScript w/o @types", fynix: true, others: false },
];

const FOOTER_RESOURCES = [
  { to: "/docs", label: "Docs" },
  { to: "/learn", label: "Learn" },
  { to: "/blog", label: "Blog" },
];

const FOOTER_COMMUNITY = [
  { href: "https://github.com/Lazycoder229/fynix.git", label: "GitHub" },
];

const FOOTER_COMPANY = [
  { to: "/privacy", label: "Privacy Policy" },
  { to: "/contact", label: "Contact" },
];

const FOOTER_SOCIAL = [
  { href: "https://github.com/Lazycoder229/fynix.git", label: "GitHub" },
];

// ─── Color lookup maps (avoids complex inline ternary chains) ──────────────────

const FEATURE_BORDER: Record<string, string> = {
  violet: "border-violet-500/15 hover:border-violet-400/40",
  cyan: "border-cyan-500/15 hover:border-cyan-400/40",
  rose: "border-rose-500/15 hover:border-rose-400/40",
  amber: "border-amber-500/15 hover:border-amber-400/40",
  emerald: "border-emerald-500/15 hover:border-emerald-400/40",
  sky: "border-sky-500/15 hover:border-sky-400/40",
};

const FEATURE_ICON_BG: Record<string, string> = {
  violet: "bg-violet-500/10",
  cyan: "bg-cyan-500/10",
  rose: "bg-rose-500/10",
  amber: "bg-amber-500/10",
  emerald: "bg-emerald-500/10",
  sky: "bg-sky-500/10",
};

const HOOK_GRADIENT: Record<string, string> = {
  violet:
    "from-violet-600/20 to-violet-400/5 border-violet-500/20 hover:border-violet-400/50",
  cyan: "from-cyan-600/20 to-cyan-400/5 border-cyan-500/20 hover:border-cyan-400/50",
  emerald:
    "from-emerald-600/20 to-emerald-400/5 border-emerald-500/20 hover:border-emerald-400/50",
  amber:
    "from-amber-600/20 to-amber-400/5 border-amber-500/20 hover:border-amber-400/50",
  rose: "from-rose-600/20 to-rose-400/5 border-rose-500/20 hover:border-rose-400/50",
  sky: "from-sky-600/20 to-sky-400/5 border-sky-500/20 hover:border-sky-400/50",
};

const HOOK_TEXT: Record<string, string> = {
  violet: "text-violet-300",
  cyan: "text-cyan-300",
  emerald: "text-emerald-300",
  amber: "text-amber-300",
  rose: "text-rose-300",
  sky: "text-sky-300",
};

// ─── Shared sub-components ─────────────────────────────────────────────────────

function CodeBlock({ code }: { code: string }): VNode {
  return (
    <div r-class="relative group">
      <div r-class="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <pre r-class="relative bg-gray-100 border border-gray-300 rounded-2xl px-6 py-5 overflow-x-auto text-sm font-mono leading-relaxed text-gray-700 shadow-xl">
        <code>{code}</code>
      </pre>
      <div r-class="absolute top-3 right-3 flex gap-1.5">
        <span r-class="w-3 h-3 rounded-full bg-red-500/60" />
        <span r-class="w-3 h-3 rounded-full bg-yellow-500/60" />
        <span r-class="w-3 h-3 rounded-full bg-green-500/60" />
      </div>
    </div>
  );
}

function Badge({
  label,
  color = "violet",
}: {
  label: string;
  color?: string;
}): VNode {
  const cls: Record<string, string> = {
    violet: "bg-violet-500/15 text-violet-300 border-violet-500/25",
    cyan: "bg-cyan-500/15 text-cyan-300 border-cyan-500/25",
    green: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25",
    amber: "bg-amber-500/15 text-amber-300 border-amber-500/25",
    rose: "bg-rose-500/15 text-rose-300 border-rose-500/25",
    sky: "bg-sky-500/15 text-sky-300 border-sky-500/25",
  };
  return (
    <span
      r-class={`inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full border bg-gray-100 text-gray-700 border-gray-300`}
    >
      {label}
    </span>
  );
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}): VNode {
  return (
    <div r-class="text-center mb-20">
      <p r-class="text-xs font-bold tracking-[0.2em] uppercase text-gray-700 mb-4">
        {eyebrow}
      </p>
      <h2 r-class="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-[1.1] mb-5">
        {title}
      </h2>
      {subtitle && (
        <p r-class="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div
      r-class="min-h-screen bg-white text-gray-900 font-sans antialiased"
      style={{ scrollBehavior: "smooth" }}
    >
      {/* Noise texture overlay */}
      <div
        r-class="pointer-events-none fixed inset-0 z-50 opacity-[0.025]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />
      {/* Ambient glows */}
      <div r-class="pointer-events-none fixed top-[-20vh] left-1/2 -translate-x-1/2 w-[90vw] h-[60vh] rounded-full bg-violet-700/15 blur-[140px]" />
      <div r-class="pointer-events-none fixed bottom-0 right-0 w-[50vw] h-[40vh] rounded-full bg-cyan-600/8 blur-[120px]" />

      {/* ════════ NAV ════════ */}
      <nav r-class="sticky top-0 z-40 backdrop-blur-md bg-white/80 border-b border-gray-200">
        <div r-class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div r-class="flex items-center gap-2">
            <div r-class="w-8 h-8 rounded-md bg-gray-200 flex items-center justify-center text-xs font-black text-gray-900">
              <img src="/fynixlogo.png" alt="" srcset="" />
            </div>
            <span r-class="font-bold text-base tracking-tight text-gray-900">
              fynix
            </span>
          </div>

          {/* Nav links */}
          <div r-class="hidden md:flex items-center gap-8 text-sm text-slate-400">
            <For each={NAV_LINKS}>
              {(link) => (
                <a
                  href={link.href}
                  r-click={(e) => {
                    e.preventDefault();
                    const targetId = link.href.substring(1);
                    const element = document.getElementById(targetId);
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  r-class="text-gray-600 hover:text-gray-900 relative group transition-colors cursor-pointer"
                >
                  {link.label}
                  <span r-class="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300" />
                </a>
              )}
            </For>
          </div>

          <div r-class="flex items-center gap-3">
            <a
              href="https://github.com/Lazycoder229/fynix.git"
              target="_blank"
              rel="noopener noreferrer"
              r-class="text-gray-600 hover:text-gray-900 transition-colors text-sm"
            >
              GitHub
            </a>
            <Path
              to="/docs/pages"
              value="Get Started"
              r-class="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition-all"
            />
          </div>
        </div>
      </nav>

      {/* ════════ HERO ════════ */}
      <section r-class="relative max-w-7xl mx-auto px-6 pt-32 pb-28 text-center">
        <div r-class="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-gray-300 bg-gray-100 text-gray-600 text-xs font-semibold tracking-widest uppercase">
          <span r-class="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse" />
          This is not recommended for production use. Expect bugs, breaking
          changes, and incomplete features. Feedback is welcome!
        </div>

        <h1 r-class="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-6 text-gray-900">
          Build More, Write Less.
        </h1>

        <p r-class="mt-6 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Built with fiber reconciliation, fine-grained reactivity, and zero
          external dependencies. Ship fast, stay secure, never compromise on
          performance.
        </p>

        <p r-class="mt-4 text-gray-500 text-sm font-mono max-w-3xl mx-auto">
          <span r-class="text-gray-600">$</span> npx fynixcli
        </p>

        <div r-class="mt-12 flex flex-wrap justify-center gap-4">
          <Path
            to="/docs/pages"
            value="Get Started"
            r-class="px-8 py-3 rounded-lg bg-gray-900 text-white font-semibold text-base hover:bg-gray-800 transition-all"
          />
          <a
            href="https://github.com/Lazycoder229/fynix.git"
            target="_blank"
            rel="noopener noreferrer"
            r-class="px-8 py-3 rounded-lg border border-gray-300 hover:bg-gray-100 text-gray-900 font-semibold text-base transition-all"
          >
            GitHub
          </a>
        </div>

        {/* Stat strip */}
        <div r-class="mt-20 grid grid-cols-2 md:grid-cols-3 gap-8 justify-center place-items-center">
          <For each={STATS}>
            {(s) => (
              <div r-class="text-center">
                <p r-class="text-3xl md:text-4xl font-black text-gray-900 mb-2">
                  {s.val}
                </p>
                <p r-class="text-gray-600 text-sm">{s.label}</p>
              </div>
            )}
          </For>
        </div>
      </section>

      {/* ════════ WHAT IS FYNIX ════════ */}
      <section r-class="max-w-5xl mx-auto px-6 py-28">
        <div r-class="text-center mb-20">
          <h2 r-class="text-3xl md:text-4xl font-black text-gray-900 tracking-tight leading-[1.2] mb-4">
            Built on fiber reconciliation.
          </h2>
          <p r-class="text-gray-600 text-lg max-w-2xl mx-auto">
            Most frameworks re-render entire trees. Fynix uses targeted fiber
            updates — updating only the exact components that changed.
            Dramatically faster, even under heavy load.
          </p>
        </div>
        <CodeBlock
          code={`import { nixState, VNode } from "fynixui";

function Counter(): VNode {
  const count = nixState<number>(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button r-click={() => count.set(count.value + 1)}>
        Increment
      </button>
    </div>
  );
}`}
        />
      </section>

      {/* ════════ FEATURES ════════ */}
      <section id="why" r-class="py-28 border-t border-white/5">
        <div r-class="max-w-7xl mx-auto px-6">
          <SectionHeading
            eyebrow="Core Features"
            title="Performance-first architecture."
            subtitle="Designed for speed, security, and developer experience."
          />
          <div r-class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <For each={WHY_FEATURES}>
              {(f) => (
                <div r-class="bg-gray-50 border border-gray-300 rounded-xl p-6 transition-all duration-300 hover:border-gray-400 hover:bg-white">
                  <div r-class="text-3xl mb-4 text-gray-700">
                    <i r-class={f.icon}></i>
                  </div>
                  <h3 r-class="text-gray-900 font-bold text-lg mb-2">
                    {f.title}
                  </h3>
                  <p r-class="text-gray-600 text-sm leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              )}
            </For>
          </div>
        </div>
      </section>

      {/* ════════ EXAMPLES ════════ */}
      <section id="examples" r-class="py-28 border-t border-white/5">
        <div r-class="max-w-7xl mx-auto px-6">
          <SectionHeading
            eyebrow="Examples"
            title="Common patterns implemented."
            subtitle="All the APIs you need, distilled down to essentials."
          />

          {/* 01 — nixState */}
          <div r-class="mb-20">
            <div r-class="flex items-center gap-3 mb-6">
              <Badge label="01" color="violet" />
              <h3 r-class="text-2xl font-bold text-gray-900">
                Reactive State with nixState
              </h3>
            </div>
            <div r-class="grid lg:grid-cols-2 gap-8 items-start">
              <div>
                <p r-class="text-gray-600 leading-relaxed mb-4">
                  <code r-class="text-gray-700 font-mono bg-gray-100 px-1.5 py-0.5 rounded text-sm">
                    nixState
                  </code>{" "}
                  creates a reactive cell. Read it like a plain value; set it
                  with{" "}
                  <code r-class="text-gray-700 font-mono bg-gray-100 px-1.5 py-0.5 rounded text-sm">
                    .set()
                  </code>
                  . When state changes, only the fiber that accessed it
                  re-renders — no virtual DOM diffing across the whole tree.
                </p>
                <ul r-class="space-y-2 text-sm text-gray-600">
                  <li r-class="flex gap-2">
                    <span r-class="text-gray-700">→</span>Automatic dependency
                    tracking — no selector boilerplate
                  </li>
                  <li r-class="flex gap-2">
                    <span r-class="text-gray-700">→</span>Only the component
                    that accessed the state re-renders
                  </li>
                  <li r-class="flex gap-2">
                    <span r-class="text-gray-700">→</span>Works inside JSX
                    directly as reactive text
                  </li>
                </ul>
              </div>
              <CodeBlock
                code={`import { nixState, Fynix } from "fynixui";

function ThemeToggle() {
  const dark  = nixState(false);
  const label = nixState("Light Mode");

  function toggle() {
    dark.set(!dark.value);
    label.set(dark.value ? "Dark Mode" : "Light Mode");
  }

  return (
    <div r-class={dark ? "bg-gray-900 text-white" : "bg-white"}>
      <p>Current: {label}</p>
      <button r-click={toggle}>Toggle Theme</button>
    </div>
  );
}`}
              />
            </div>
          </div>

          {/* 02 — nixEffect */}
          <div r-class="mb-20">
            <div r-class="flex items-center gap-3 mb-6">
              <Badge label="02" color="cyan" />
              <h3 r-class="text-2xl font-bold text-gray-900">
                Side Effects with nixEffect
              </h3>
            </div>
            <div r-class="grid lg:grid-cols-2 gap-8 items-start">
              <div>
                <p r-class="text-gray-600 leading-relaxed mb-4">
                  <code r-class="text-gray-700 font-mono bg-gray-100 px-1.5 py-0.5 rounded text-sm">
                    nixEffect
                  </code>{" "}
                  runs after the component mounts and whenever dependencies
                  change. Return a cleanup function and Fynix calls it
                  automatically before re-running or on unmount.
                </p>
                <ul r-class="space-y-2 text-sm text-gray-600">
                  <li r-class="flex gap-2">
                    <span r-class="text-gray-700">→</span>nixEffectOnce — runs
                    exactly once on mount
                  </li>
                  <li r-class="flex gap-2">
                    <span r-class="text-gray-700">→</span>nixEffectAlways — runs
                    after every render
                  </li>
                  <li r-class="flex gap-2">
                    <span r-class="text-gray-700">→</span>Return a cleanup
                    function to avoid memory leaks
                  </li>
                </ul>
              </div>
              <CodeBlock
                code={`import { nixState, nixEffectOnce, Fynix } from "fynixui";

function WindowSize() {
  const width  = nixState(window.innerWidth);
  const height = nixState(window.innerHeight);

  nixEffectOnce(() => {
    const handler = () => {
      width.set(window.innerWidth);
      height.set(window.innerHeight);
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  });

  return <p>Window: {width} × {height}</p>;
}`}
              />
            </div>
          </div>

          {/* 03 — nixAsync */}
          <div r-class="mb-20">
            <div r-class="flex items-center gap-3 mb-6">
              <Badge label="03" color="green" />
              <h3 r-class="text-2xl font-bold text-gray-900">
                Async Data with nixAsync
              </h3>
            </div>
            <div r-class="grid lg:grid-cols-2 gap-8 items-start">
              <div>
                <p r-class="text-gray-600 leading-relaxed mb-4">
                  <code r-class="text-gray-700 font-mono bg-gray-100 px-1.5 py-0.5 rounded text-sm">
                    nixAsync
                  </code>{" "}
                  wraps any async function and returns reactive{" "}
                  <code r-class="text-gray-700 font-mono bg-gray-100 px-1.5 py-0.5 rounded text-sm">
                    loading
                  </code>
                  ,{" "}
                  <code r-class="text-gray-700 font-mono bg-gray-100 px-1.5 py-0.5 rounded text-sm">
                    data
                  </code>
                  , and{" "}
                  <code r-class="text-gray-700 font-mono bg-gray-100 px-1.5 py-0.5 rounded text-sm">
                    error
                  </code>{" "}
                  states. No useEffect + useState juggling required.
                </p>
                <ul r-class="space-y-2 text-sm text-gray-600">
                  <li r-class="flex gap-2">
                    <span r-class="text-gray-700">→</span>Runs immediately or
                    lazily on manual trigger
                  </li>
                  <li r-class="flex gap-2">
                    <span r-class="text-gray-700">→</span>Errors propagate via
                    the async error channel
                  </li>
                  <li r-class="flex gap-2">
                    <span r-class="text-emerald-400">→</span>Use nixAsyncCached
                    to deduplicate requests
                  </li>
                </ul>
              </div>
              <CodeBlock
                code={`import { nixAsync, Fynix } from "fynixui";

function UserProfile({ id }: { id: string }) {
  const { loading, data, error } = nixAsync(
    async () => {
      const res = await fetch(\`/api/users/\${id}\`);
      return res.json();
    },
    [id] // re-runs whenever id changes
  );

  if (loading.value) return <p>Loading profile…</p>;
  if (error.value)   return <p>Error: {error}</p>;

  return (
    <div>
      <h2>{data.value?.name}</h2>
      <p>{data.value?.email}</p>
    </div>
  );
}`}
              />
            </div>
          </div>

          {/* 04 — <For> */}
          <div r-class="mb-20">
            <div r-class="flex items-center gap-3 mb-6">
              <Badge label="04" color="amber" />
              <h3 r-class="text-2xl font-bold text-gray-900">
                List Rendering with &lt;For&gt;
              </h3>
            </div>
            <div r-class="grid lg:grid-cols-2 gap-8 items-start">
              <div>
                <p r-class="text-slate-600 leading-relaxed mb-4">
                  <code r-class="text-gray-600 font-mono bg-white/5 px-1.5 py-0.5 rounded text-sm">
                    &lt;For&gt;
                  </code>{" "}
                  is Fynix's idiomatic list-rendering component. Pass a plain
                  array or a{" "}
                  <code r-class="text-gray-600 font-mono bg-white/5 px-1.5 py-0.5 rounded text-sm">
                    nixState
                  </code>{" "}
                  reactive array to{" "}
                  <code r-class="text-gray-600 font-mono bg-white/5 px-1.5 py-0.5 rounded text-sm">
                    each
                  </code>
                  , and a render function as its child. When the array changes,
                  only the affected fiber re-renders — never the whole list. It
                  renders into a Fragment, adding no wrapper DOM node.
                </p>
                <ul r-class="space-y-2 text-sm text-gray-600">
                  <li r-class="flex gap-2">
                    <span r-class="text-gray-700">→</span>Works with plain
                    arrays or reactive nixState arrays
                  </li>
                  <li r-class="flex gap-2">
                    <span r-class="text-gray-700">→</span>Child render function
                    receives (item, index)
                  </li>
                  <li r-class="flex gap-2">
                    <span r-class="text-gray-700">→</span>Renders into a
                    Fragment — zero extra DOM nodes
                  </li>
                  <li r-class="flex gap-2">
                    <span r-class="text-gray-700">→</span>Add a key prop on
                    children for stable reconciliation
                  </li>
                </ul>
              </div>
              <CodeBlock
                code={`import { nixState, Fynix } from "fynixui";
import { For } from "../components/For";

const FEATURES = [
  { id: 1, name: "Fiber Reconciler" },
  { id: 2, name: "nixState"         },
  { id: 3, name: "Priority Scheduler" },
];

// Works with reactive arrays too:
// const list = nixState(FEATURES);
// <For each={list}>...</For>

function FeatureList() {
  return (
    <ul>
      <For each={FEATURES}>
        {(item, index) => (
          <li key={item.id}>
            {index + 1}. {item.name}
          </li>
        )}
      </For>
    </ul>
  );
}`}
              />
            </div>
          </div>

          {/* 05 — nixForm */}
          <div r-class="mb-20">
            <div r-class="flex items-center gap-3 mb-6">
              <Badge label="05" color="rose" />
              <h3 r-class="text-2xl font-bold text-gray-900">
                Forms with nixForm
              </h3>
            </div>
            <div r-class="grid lg:grid-cols-2 gap-8 items-start">
              <div>
                <p r-class="text-gray-600 leading-relaxed mb-4">
                  <code r-class="text-gray-700 font-mono bg-gray-100 px-1.5 py-0.5 rounded text-sm">
                    nixForm
                  </code>{" "}
                  manages all form state: field values, validation errors,
                  touched fields, dirty state, and submission status. No
                  controlled-component boilerplate.
                </p>
                <ul r-class="space-y-2 text-sm text-gray-600">
                  <li r-class="flex gap-2">
                    <span r-class="text-gray-700">→</span>Built-in field
                    validation with custom rule functions
                  </li>
                  <li r-class="flex gap-2">
                    <span r-class="text-gray-700">→</span>nixFormAsync for async
                    submission with loading guards
                  </li>
                  <li r-class="flex gap-2">
                    <span r-class="text-gray-700">→</span>Automatically tracks
                    touched, dirty, and valid state
                  </li>
                </ul>
              </div>
              <CodeBlock
                code={`import { nixForm, Fynix } from "fynixui";

function SignupForm() {
  const form = nixForm(
    { email: "", password: "" },
    {
      email:    (v) => /\S+@\S+\.\S+/.test(v) ? null : "Invalid email",
      password: (v) => v.length >= 8           ? null : "Min 8 characters",
    }
  );

  return (
    <form r-submit={form.handleSubmit}>
      <input
        value={form.fields.email}
        r-input={(e) => form.setField("email", e.target.value)}
      />
      {form.errors.email && <p>{form.errors.email}</p>}

      <button type="submit" disabled={!form.isValid}>
        Sign Up
      </button>
    </form>
  );
}`}
              />
            </div>
          </div>

          {/* 06 — nixStore */}
          <div>
            <div r-class="flex items-center gap-3 mb-6">
              <Badge label="06" color="sky" />
              <h3 r-class="text-2xl font-bold text-gray-900">
                Global State with nixStore
              </h3>
            </div>
            <div r-class="grid lg:grid-cols-2 gap-8 items-start">
              <div>
                <p r-class="text-gray-600 leading-relaxed mb-4">
                  <code r-class="text-gray-700 font-mono bg-gray-100 px-1.5 py-0.5 rounded text-sm">
                    nixStore
                  </code>{" "}
                  creates a global reactive store with path-based subscriptions.
                  Components only re-render when their specific slice of state
                  changes, backed by the internal{" "}
                  <code r-class="text-gray-700 font-mono bg-gray-100 px-1.5 py-0.5 rounded text-sm">
                    HierarchicalStore
                  </code>{" "}
                  engine.
                </p>
                <ul r-class="space-y-2 text-sm text-gray-600">
                  <li r-class="flex gap-2">
                    <span r-class="text-gray-700">→</span>Hierarchical path keys
                    avoid naming collisions
                  </li>
                  <li r-class="flex gap-2">
                    <span r-class="text-gray-700">→</span>Selector memoization
                    prevents unnecessary renders
                  </li>
                  <li r-class="flex gap-2">
                    <span r-class="text-gray-700">→</span>Optimistic updates
                    with automatic rollback support
                  </li>
                </ul>
              </div>
              <CodeBlock
                code={`import { nixStore, Fynix } from "fynixui";

const appStore = nixStore({
  user: null,
  cart: [],
  theme: "dark",
});

// Writer — any component can mutate the store
function AddToCart({ item }) {
  return (
    <button r-click={() =>
      appStore.set("cart", [...appStore.get("cart"), item])
    }>
      Add to Cart
    </button>
  );
}

// Reader — only re-renders when "cart" path changes
function CartCount() {
  const cart = appStore.use("cart");
  return <span>Cart: {cart.value.length} items</span>;
}`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ════════ ARCHITECTURE ════════ */}
      <section
        id="architecture"
        r-class="py-28 border-t border-gray-200 bg-[#ebe7e0]"
      >
        <div r-class="max-w-7xl mx-auto px-6">
          <SectionHeading
            eyebrow="Architecture"
            title="How Fynix renders your UI."
            subtitle="A two-phase pipeline: an interruptible render phase that builds the fiber tree, and a synchronous commit phase that applies all DOM mutations in one atomic pass."
          />

          {/* 3-step pipeline */}
          <div r-class="grid lg:grid-cols-3 gap-8 mb-16">
            <For each={ARCH_STEPS}>
              {(p) => (
                <div r-class="bg-gray-50 rounded-xl p-8 border border-gray-300">
                  <p r-class="text-4xl font-black mb-4 text-gray-900">
                    {p.step}
                  </p>
                  <h3 r-class="text-gray-900 font-bold text-lg mb-3">
                    {p.title}
                  </h3>
                  <p r-class="text-gray-600 text-sm leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              )}
            </For>
          </div>

          {/* Priority bars */}
          <div r-class="bg-gray-50 border border-gray-300 rounded-xl p-8">
            <h3 r-class="text-gray-900 font-bold text-xl mb-2">
              FynixScheduler — Priority Queue
            </h3>
            <p r-class="text-gray-600 text-sm mb-8 max-w-2xl">
              Every update is tagged with a priority level. The scheduler drains
              highest-priority work first, yielding between frames so the main
              thread stays responsive.
            </p>
            <div r-class="flex flex-col md:flex-row gap-6">
              <For each={SCHEDULER_PRIORITIES}>
                {(p) => (
                  <div r-class="flex-1">
                    <div
                      r-class={`${p.color} ${p.width} h-2 rounded-full mb-3`}
                    />
                    <p r-class="font-mono text-sm font-bold text-gray-900 mb-1">
                      {p.level}
                    </p>
                    <p r-class="text-xs text-gray-600 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                )}
              </For>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ SECURITY ════════ */}
      <section r-class="py-28 border-t border-gray-200">
        <div r-class="max-w-7xl mx-auto px-6">
          <SectionHeading
            eyebrow="Security"
            title="Protected by default."
            subtitle="Security isn't a plugin you install. In Fynix it's woven into the runtime itself — every attribute, URL, and event handler is validated before touching the DOM."
          />
          <div r-class="grid md:grid-cols-2 gap-8">
            {/* Protections list */}
            <div r-class="space-y-4">
              <For each={SECURITY_PROTECTIONS}>
                {(s) => (
                  <div r-class="flex gap-4 p-6 bg-gray-50 border border-gray-300 rounded-xl">
                    <span r-class="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-sm flex items-center justify-center font-bold mt-0.5">
                      ✓
                    </span>
                    <div>
                      <h4 r-class="text-gray-900 font-semibold mb-1">
                        {s.title}
                      </h4>
                      <p r-class="text-gray-600 text-sm leading-relaxed">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                )}
              </For>
            </div>

            <div r-class="space-y-4">
              {/* Recommendations list */}
              <div r-class="p-6 bg-gray-50 border border-amber-200 rounded-xl">
                <h4 r-class="text-amber-900 font-bold mb-4 text-sm tracking-widest uppercase">
                  Recommendations
                </h4>
                <For each={SECURITY_RECOMMENDATIONS}>
                  {(r) => (
                    <div r-class="flex gap-3 py-3 border-b border-gray-200 last:border-0">
                      <span r-class="text-amber-700 mt-0.5 flex-shrink-0">
                        →
                      </span>
                      <div>
                        <p r-class="text-gray-900 text-sm font-semibold">
                          {r.label}
                        </p>
                        <p r-class="text-gray-600 text-xs leading-relaxed mt-0.5">
                          {r.detail}
                        </p>
                      </div>
                    </div>
                  )}
                </For>
              </div>

              <CodeBlock
                code={`//  Safe — entity-encoded automatically
<p>{userInput}</p>

// Safe — javascript: blocked at the property setter
<a href={userUrl}>Visit</a>

// Blocked — inline handler attribute rejected
<button onclick="doThing()">Bad</button>

// Safe — delegated event listener via r-* prefix
<button r-click={() => doThing()}>Good</button>

// Blocked — DANGEROUS_HTML_PROP, silently dropped
<div innerHTML={html} />`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ════════ FOOTER ════════ */}
      <footer r-class="bg-white border-t border-gray-200">
        <div r-class="max-w-6xl mx-auto px-6 py-8 grid md:grid-cols-4 gap-12 text-sm">
          {/* Brand */}
          <div>
            <div r-class="flex items-center gap-2 mb-4">
              <div r-class="w-12 h-12 rounded-md  flex items-center justify-center text-xs font-black">
                <img src="/fynixlogo.png" alt="" srcset="" />
              </div>
              <span r-class="text-slate-600 font-black text-base">Fynix</span>
            </div>
            {/*   <p r-class="text-slate-500 leading-relaxed text-xs">
              A modern, lightweight framework for building reactive web
              applications with fiber architecture and built-in security.
            </p> */}
          </div>

          {/* Resources */}
          <div>
            <h4 r-class="text-slate-600 font-semibold mb-4">Resources</h4>
            <ul r-class="space-y-2 text-slate-500">
              <For each={FOOTER_RESOURCES}>
                {(link) => (
                  <li>
                    <Path
                      to={link.to}
                      value={link.label}
                      r-class="hover:text-violet-400 transition-colors"
                    />
                  </li>
                )}
              </For>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 r-class="text-slate-600 font-semibold mb-4">Community</h4>
            <ul r-class="space-y-2 text-slate-500">
              <For each={FOOTER_COMMUNITY}>
                {(link) => (
                  <li>
                    <a
                      href={link.href}
                      r-class="hover:text-violet-400 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                )}
              </For>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 r-class="text-slate-600 font-semibold mb-4">Company</h4>
            <ul r-class="space-y-2 text-slate-500">
              <For each={FOOTER_COMPANY}>
                {(link) => (
                  <li>
                    <Path
                      to={link.to}
                      value={link.label}
                      r-class="hover:text-violet-400 transition-colors"
                    />
                  </li>
                )}
              </For>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div r-class="border-t border-white/5">
          <div r-class="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-slate-600 gap-4">
            <p>© 2026 Fynix, Inc. All rights reserved.</p>
            <div r-class="flex gap-6">
              <For each={FOOTER_SOCIAL}>
                {(link) => (
                  <a
                    href={link.href}
                    r-class="hover:text-violet-400 transition-colors"
                  >
                    {link.label}
                  </a>
                )}
              </For>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
