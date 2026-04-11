import { Fynix, VNode } from "fynixui";
import Docs from "../view";

export default function Introduction(): VNode {
  const features = [
    {
      title: "Zero Runtime Dependencies",
      descriptions: "No supply chain risk. Everything is self-contained.",
      icon: "◈",
    },
    {
      title: "Security Built-in",
      descriptions:
        "XSS protection at the framework level. Dangerous protocols, inline event handlers, and innerHTML are blocked by default.",
      icon: "⬡",
    },
    {
      title: "Fiber Architecture",
      descriptions:
        "Time-sliced rendering with priority scheduling ensures your UI stays responsive even under heavy load.",
      icon: "⟁",
    },
    {
      title: "Surgical Re-renders",
      descriptions: "Only affected fibers update, not entire component trees.",
      icon: "⊕",
    },
    {
      title: "Full TypeScript",
      descriptions: "Native JSX support with complete type safety.",
      icon: "◇",
    },
    {
      title: "Built-in Components",
      descriptions:
        "Common components included out of the box, optimized for performance.",
      icon: "⬢",
    },
  ];

  const learningPath = [
    {
      section: "Getting Started",
      description: "Install, setup, and your first Hello World",
    },
    {
      section: "Core Concepts",
      description: "Components, state, effects, rendering",
    },
    {
      section: "Project Tutorials",
      description: "Build 3 real apps (Todo, Notes Manager, Dashboard)",
    },
    {
      section: "Components Guide",
      description: "Reusable components used across projects",
    },
    {
      section: "API Reference",
      description: "Every function, hook, and method documented",
    },
    {
      section: "Advanced Guides",
      description: "State patterns, optimization, project structure",
    },
    {
      section: "Best Practices",
      description: "Conventions, naming, folder structure",
    },
    {
      section: "Common Mistakes",
      description: "What to avoid and why",
    },
  ];

  return (
    <Docs>
      {/* Page root — plain white base, increased font size */}
      <div r-class="min-h-screen bg-white text-slate-800 relative overflow-x-hidden text-base md:text-lg font-normal">
        {/* Main content */}
        <div r-class="relative z-10 max-w-5xl mx-auto py-6 px-6 lg:px-10">
          {/* ── Badge ── */}
          <div r-class="mb-10 flex items-center gap-2">
            <span r-class="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-cyan-600 bg-cyan-50 border border-cyan-200 px-3 py-1.5 rounded-sm">
              <span r-class="w-1.5 h-1.5 rounded-full bg-cyan-500" />
              Documentation
            </span>
          </div>

          {/* ── Hero ── */}
          <div r-class="mb-24">
            <p r-class="font-mono text-xs text-slate-400 tracking-widest uppercase mb-5">
              v1.0 — Fiber-based Reactive UI
            </p>
            <h1 r-class="font-extrabold leading-none tracking-tight text-5xl lg:text-6xl mb-8 text-slate-900">
              Welcome to{" "}
              <span r-class="bg-gradient-to-r from-cyan-500 to-violet-500 bg-clip-text text-transparent">
                Fynix
              </span>
            </h1>
            <p r-class="text-xl text-slate-500 leading-relaxed mb-5 max-w-2xl font-normal">
              A lightweight, fiber-based reactive UI framework with built-in
              security and fine-grained reactivity. Experience React-like DX
              with dramatically better performance.
            </p>
            <p r-class="text-base text-slate-400 leading-relaxed max-w-xl mb-10">
              Fynix surgically updates only the exact components (fibers) that
              depend on changed state — resulting in blazing-fast performance
              and superior user experience.
            </p>

            {/* Stats pills */}
            <div r-class="flex flex-wrap gap-3">
              {[
                { label: "Bundle size", value: "~15KB" },
                { label: "Dependencies", value: "Zero" },
                { label: "TypeScript", value: "Native" },
              ].map((stat) => (
                <div r-class="flex items-center gap-2 bg-white border border-slate-200 rounded-sm px-4 py-2 shadow-sm">
                  <span r-class="font-mono text-xs text-slate-400 uppercase tracking-wider">
                    {stat.label}
                  </span>
                  <span r-class="w-px h-3 bg-slate-200" />
                  <span r-class="font-mono text-xs text-cyan-600 font-semibold">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Features Grid ── */}
          <div r-class="mb-28">
            <div r-class="flex items-end justify-between mb-12">
              <div>
                <p r-class="font-mono text-xs text-slate-400 uppercase tracking-widest mb-2">
                  Core capabilities
                </p>
                <h2 r-class="text-3xl font-bold text-slate-900 tracking-tight">
                  Why Choose Fynix?
                </h2>
              </div>
              <p r-class="text-base text-slate-400 max-w-xs text-right hidden md:block">
                Everything you need. Zero compromises.
              </p>
            </div>

            <div r-class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((feature, i) => (
                <div r-class="group relative bg-white border border-slate-200 rounded-lg p-6 hover:border-cyan-400/50 hover:shadow-md transition-all duration-300 overflow-hidden">
                  <span r-class="block text-2xl text-slate-300 mb-4 group-hover:text-cyan-500 transition-colors duration-200">
                    {feature.icon}
                  </span>
                  <h3 r-class="text-base font-semibold text-slate-800 mb-2 tracking-tight">
                    {feature.title}
                  </h3>
                  <p r-class="text-sm text-slate-400 leading-relaxed group-hover:text-slate-500 transition-colors duration-200">
                    {feature.descriptions}
                  </p>
                  <span r-class="absolute bottom-4 right-5 font-mono text-xs text-slate-200 group-hover:text-slate-300 transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Architecture Flow ── */}
          <div r-class="mb-28">
            <p r-class="font-mono text-xs text-slate-400 uppercase tracking-widest mb-2">
              Internals
            </p>
            <h2 r-class="text-3xl font-bold text-slate-900 tracking-tight mb-10">
              How Fynix Works
            </h2>

            <div r-class="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
              {/* Terminal top bar */}
              <div r-class="flex items-center gap-2 px-5 py-3 border-b border-slate-800 bg-slate-950/60">
                <span r-class="w-3 h-3 rounded-full bg-red-500/50" />
                <span r-class="w-3 h-3 rounded-full bg-yellow-500/50" />
                <span r-class="w-3 h-3 rounded-full bg-green-500/50" />
                <span r-class="ml-3 font-mono text-xs text-slate-600">
                  fynix — render pipeline
                </span>
              </div>
              <pre r-class="text-slate-400 font-mono text-xs leading-7 p-8 overflow-x-auto">
                {`┌─────────────────────────────────────┐
│         JSX / h() calls             │
└────────────────┬────────────────────┘
                 ↓
┌─────────────────────────────────────┐
│  VNode Tree (lightweight, immutable) │
└────────────────┬────────────────────┘
                 ↓
┌──────────────────────────────────────┐
│ Fiber Reconciler (builds fiber tree, │
│ diffs against previous)              │
└────────────────┬─────────────────────┘
                 ↓
┌──────────────────────────────────────┐
│ Priority Scheduler (time-sliced      │
│ work loop)                           │
└────────────────┬─────────────────────┘
                 ↓
┌──────────────────────────────────────┐
│ Commit Phase (all DOM mutations in   │
│ one synchronous pass)                │
└────────────────┬─────────────────────┘
                 ↓
            ╔════════════╗
            ║  Repaint   ║
            ╚════════════╝`}
              </pre>
            </div>

            <p r-class="text-slate-400 mt-6 text-base leading-relaxed">
              <span r-class="text-slate-700 font-medium">Key Insight: </span>
              State changes with{" "}
              <code r-class="font-mono text-cyan-600 bg-cyan-50 border border-cyan-200 px-1.5 py-0.5 rounded-sm text-xs">
                nixState
              </code>{" "}
              trigger a targeted fiber re-render on the exact component — not a
              full tree walk. This surgical approach is what makes Fynix
              exceptionally fast.
            </p>
          </div>

          {/* ── Target Audience ── */}
          <div r-class="mb-28">
            <p r-class="font-mono text-xs text-slate-400 uppercase tracking-widest mb-2">
              Built for
            </p>
            <h2 r-class="text-3xl font-bold text-slate-900 tracking-tight mb-10">
              Who is Fynix For?
            </h2>

            <div r-class="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: "React-like DX",
                  body: "Developers who want familiar paradigms with better performance defaults out of the box.",
                  border: "border-cyan-500/20",
                  dot: "bg-cyan-400",
                  glow: "text-cyan-400",
                },
                {
                  title: "Security First",
                  body: "Teams building security-sensitive applications that need XSS protection by default.",
                  border: "border-violet-500/20",
                  dot: "bg-violet-400",
                  glow: "text-violet-400",
                },
                {
                  title: "Lightweight Focus",
                  body: "Anyone who wants maximum power without the bloat. ~15KB is lean without compromise.",
                  border: "border-emerald-500/20",
                  dot: "bg-emerald-400",
                  glow: "text-emerald-400",
                },
                {
                  title: "TypeScript First",
                  body: "Developers who prefer full type safety with native JSX support and excellent tooling.",
                  border: "border-sky-500/20",
                  dot: "bg-sky-400",
                  glow: "text-sky-400",
                },
              ].map((card) => (
                <div
                  r-class={`p-6 bg-white border ${card.border} rounded-lg hover:shadow-md transition-all duration-200`}
                >
                  <div r-class="flex items-center gap-3 mb-3">
                    <span r-class={`w-2 h-2 rounded-full ${card.dot}`} />
                    <h3 r-class="font-semibold text-slate-800 text-base tracking-tight">
                      {card.title}
                    </h3>
                  </div>
                  <p r-class="text-base text-slate-400 leading-relaxed">
                    {card.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Learning Path ── */}
          <div r-class="mb-20">
            <p r-class="font-mono text-xs text-slate-400 uppercase tracking-widest mb-2">
              Curriculum
            </p>
            <h2 r-class="text-3xl font-bold text-slate-900 tracking-tight mb-3">
              Your Learning Journey
            </h2>
            <p r-class="text-slate-400 text-base mb-10">
              Start from the basics and progress to advanced topics at your own
              pace.
            </p>

            <div r-class="grid grid-cols-1 md:grid-cols-2 gap-3">
              {learningPath.map((item, idx) => (
                <div r-class="group flex items-start gap-4 p-5 bg-white border border-slate-200 rounded-lg hover:border-slate-300 hover:shadow-sm transition-all duration-200 cursor-pointer">
                  <span r-class="font-mono text-xs text-slate-300 group-hover:text-cyan-500 transition-colors pt-0.5 shrink-0 w-6 text-right">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div r-class="flex-1">
                    <h3 r-class="text-base font-semibold text-slate-700 group-hover:text-slate-900 transition-colors mb-1">
                      {item.section}
                    </h3>
                    <p r-class="text-sm text-slate-400 group-hover:text-slate-500 transition-colors">
                      {item.description}
                    </p>
                  </div>
                  <span r-class="text-slate-300 group-hover:text-slate-500 transition-colors text-sm shrink-0 mt-0.5">
                    →
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Docs>
  );
}
