import { Fynix, VNode } from "fynixui";
import Docs from "../view";

export default function GettingStarted(): VNode {
  const steps = [
    {
      step: "01",
      title: "Scaffold the project",
      description:
        "Run the CLI to create a fully configured project with Vite, TypeScript, and the Fynix runtime.",
      code: `npx fynixcli my-app\ncd my-app\nnpm run dev`,
      lang: "bash",
    },
    {
      step: "02",
      title: "Create your entry point",
      description: "Wire up the router in src/main.ts and mount it to the DOM.",
      code: `import createFynix from "fynixui/router";\n\nconst app = createFynix();\napp.mountRouter("#app");`,
      lang: "typescript",
    },
    {
      step: "03",
      title: "Create your first component",
      description:
        "Add src/home/view.tsx — Fynix's file-based router maps this automatically to /.",
      code: `import { VNode } from "fynixui";\n\nexport default function Home(): VNode {\n  return (\n    <div>\n      <h1>Hello, Fynix!</h1>\n      <p>Welcome to your first Fynix app.</p>\n    </div>\n  );\n}`,
      lang: "tsx",
    },
    {
      step: "04",
      title: "Add reactivity",
      description:
        "Use nixState to create reactive state. Only the affected fiber re-renders — not the whole tree.",
      code: `import { nixState, VNode } from "fynixui";\n\nexport default function Home(): VNode {\n  const count = nixState<number>(0);\n\n  return (\n    <div>\n      <h1>Count: {count}</h1>\n      <button r-click={() => count.value++}>\n        Increment\n      </button>\n    </div>\n  );\n}`,
      lang: "tsx",
    },
  ];

  const requirements = [
    { label: "Node.js", value: "≥ 18.0.0" },
    { label: "npm", value: "≥ 9.0.0" },
  ];

  const structure = [
    { path: "src/", type: "dir" },
    { path: "  home/", type: "dir" },
    { path: "    view.tsx", type: "file", note: "route: /" },
    { path: "  about/", type: "dir" },
    { path: "    view.tsx", type: "file", note: "route: /about" },
    { path: "  main.ts", type: "file", note: "app entry point" },
    { path: "index.html", type: "file" },
    { path: "vite.config.ts", type: "file" },
    { path: "tsconfig.json", type: "file" },
    { path: "package.json", type: "file" },
  ];

  return (
    <Docs>
      <div r-class="min-h-screen bg-white text-slate-800 relative overflow-x-hidden text-base md:text-lg font-normal">
        <div r-class="relative z-10 max-w-5xl mx-auto py-6 px-6 lg:px-10">
          {/* ── Badge ── */}
          <div r-class="mb-10 flex items-center gap-2">
            <span r-class="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-cyan-600 bg-cyan-50 border border-cyan-200 px-3 py-1.5 rounded-sm">
              <span r-class="w-1.5 h-1.5 rounded-full bg-cyan-500" />
              Getting Started
            </span>
          </div>

          {/* ── Hero ── */}
          <div r-class="mb-16">
            <p r-class="font-mono text-xs text-slate-400 tracking-widest uppercase mb-5">
              Setup — Under 5 Minutes
            </p>
            <h1 r-class="font-extrabold leading-none tracking-tight text-5xl lg:text-6xl mb-8 text-slate-900">
              Get{" "}
              <span r-class="bg-gradient-to-r from-cyan-500 to-violet-500 bg-clip-text text-transparent">
                Running
              </span>
            </h1>
            <p r-class="text-xl text-slate-500 leading-relaxed max-w-2xl font-normal">
              From zero to a working Fynix app in minutes. Install via CLI or
              add manually to an existing project.
            </p>
          </div>

          {/* ── Requirements ── */}
          <div r-class="mb-16">
            <p r-class="font-mono text-xs text-slate-400 uppercase tracking-widest mb-4">
              Prerequisites
            </p>
            <div r-class="flex flex-wrap gap-3">
              {requirements.map((req) => (
                <div r-class="flex items-center gap-2 bg-white border border-slate-200 rounded-sm px-4 py-2 shadow-sm">
                  <span r-class="font-mono text-xs text-slate-400 uppercase tracking-wider">
                    {req.label}
                  </span>
                  <span r-class="w-px h-3 bg-slate-200" />
                  <span r-class="font-mono text-xs text-cyan-600 font-semibold">
                    {req.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Steps ── */}
          <div r-class="mb-28">
            <div r-class="mb-12">
              <p r-class="font-mono text-xs text-slate-400 uppercase tracking-widest mb-2">
                Installation
              </p>
              <h2 r-class="text-3xl font-bold text-slate-900 tracking-tight">
                Four Steps to Hello World
              </h2>
            </div>

            <div r-class="flex flex-col gap-6">
              {steps.map((step) => (
                <div r-class="group relative bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-cyan-400/50 hover:shadow-md transition-all duration-300">
                  {/* Step header */}
                  <div r-class="flex items-center gap-4 px-6 py-4 border-b border-slate-100">
                    <span r-class="font-mono text-xs text-slate-300 group-hover:text-cyan-500 transition-colors duration-200">
                      {step.step}
                    </span>
                    <div>
                      <h3 r-class="text-base font-semibold text-slate-800 tracking-tight">
                        {step.title}
                      </h3>
                      <p r-class="text-sm text-slate-400 mt-0.5">
                        {step.description}
                      </p>
                    </div>
                    <span r-class="ml-auto font-mono text-xs text-slate-300 group-hover:text-slate-400 transition-colors">
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
                </div>
              ))}
            </div>
          </div>

          {/* ── Project Structure ── */}
          <div r-class="mb-28">
            <p r-class="font-mono text-xs text-slate-400 uppercase tracking-widest mb-2">
              File System
            </p>
            <h2 r-class="text-3xl font-bold text-slate-900 tracking-tight mb-4">
              Project Structure
            </h2>
            <p r-class="text-slate-400 text-base mb-8 max-w-xl">
              Fynix uses file-based routing. The folder structure under{" "}
              <code r-class="font-mono text-cyan-600 bg-cyan-50 border border-cyan-200 px-1.5 py-0.5 rounded-sm text-xs">
                src/
              </code>{" "}
              determines your routes automatically.
            </p>

            <div r-class="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
              <div r-class="flex items-center gap-2 px-5 py-3 border-b border-slate-800 bg-slate-950/60">
                <span r-class="w-3 h-3 rounded-full bg-red-500/50" />
                <span r-class="w-3 h-3 rounded-full bg-yellow-500/50" />
                <span r-class="w-3 h-3 rounded-full bg-green-500/50" />
                <span r-class="ml-3 font-mono text-xs text-slate-600">
                  my-app/
                </span>
              </div>
              <div r-class="p-6">
                {structure.map((item) => (
                  <div r-class="flex items-center gap-3 py-0.5">
                    <span r-class="font-mono text-xs text-slate-400 flex-1">
                      {item.type === "dir" ? (
                        <span r-class="text-violet-400">{item.path}</span>
                      ) : (
                        <span r-class="text-slate-300">{item.path}</span>
                      )}
                    </span>
                    {item.note && (
                      <span r-class="font-mono text-xs text-slate-600">
                        ← {item.note}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <p r-class="text-slate-400 mt-6 text-base leading-relaxed">
              <span r-class="text-slate-700 font-medium">Key Insight: </span>A
              file named{" "}
              <code r-class="font-mono text-cyan-600 bg-cyan-50 border border-cyan-200 px-1.5 py-0.5 rounded-sm text-xs">
                view.tsx
              </code>{" "}
              inside{" "}
              <code r-class="font-mono text-cyan-600 bg-cyan-50 border border-cyan-200 px-1.5 py-0.5 rounded-sm text-xs">
                src/about/
              </code>{" "}
              maps to the{" "}
              <code r-class="font-mono text-cyan-600 bg-cyan-50 border border-cyan-200 px-1.5 py-0.5 rounded-sm text-xs">
                /about
              </code>{" "}
              route automatically — no config needed.
            </p>
          </div>

          {/* ── Security Note ── */}
          <div r-class="mb-20">
            <div r-class="bg-white border border-amber-200 rounded-lg p-6">
              <div r-class="flex items-start gap-4">
                <span r-class="text-amber-400 text-xl mt-0.5">⚠</span>
                <div>
                  <h3 r-class="text-base font-semibold text-slate-800 mb-2 tracking-tight">
                    Why{" "}
                    <code r-class="font-mono text-cyan-600 bg-cyan-50 border border-cyan-200 px-1.5 py-0.5 rounded-sm text-xs">
                      r-click
                    </code>{" "}
                    instead of{" "}
                    <code r-class="font-mono text-cyan-600 bg-cyan-50 border border-cyan-200 px-1.5 py-0.5 rounded-sm text-xs">
                      onClick
                    </code>
                    ?
                  </h3>
                  <p r-class="text-sm text-slate-400 leading-relaxed">
                    Fynix blocks inline event handlers (
                    <code r-class="font-mono text-xs text-slate-500">
                      onclick
                    </code>
                    ,{" "}
                    <code r-class="font-mono text-xs text-slate-500">
                      onmouseover
                    </code>
                    ) for XSS security. All events go through Fynix's delegated
                    event system using{" "}
                    <code r-class="font-mono text-cyan-600 bg-cyan-50 border border-cyan-200 px-1.5 py-0.5 rounded-sm text-xs">
                      r-
                    </code>{" "}
                    prefixed attributes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Next ── */}
          <div r-class="flex items-center justify-between py-6 border-t border-slate-100">
            <span r-class="font-mono text-xs text-slate-400 uppercase tracking-widest">
              Up Next
            </span>
            <div r-class="flex items-center gap-2 font-mono text-xs text-cyan-600 hover:text-cyan-700 cursor-pointer transition-colors">
              Core Concepts
              <span>→</span>
            </div>
          </div>
        </div>
      </div>
    </Docs>
  );
}
