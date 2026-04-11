import { Fynix, For, nixState, Path, VNode } from "fynixui";
import { location } from "fynixui";

export default function Sidebar(): VNode {
  const activePath = nixState(location.value.path);

  const sections = [
    {
      label: "Navigation",
      links: [
        { href: "/docs/pages", label: "Introduction", idx: 1 },
        { href: "/docs/gettingstarted", label: "Getting Started", idx: 2 },
        { href: "/docs/core", label: "Core Concepts", idx: 3 },
      ],
    },
    {
      label: "Tutorials",
      links: [
        { href: "/docs/project1", label: "Project 1", idx: 4 },
        { href: "/docs/project2", label: "Project 2", idx: 5 },
        { href: "/docs/project3", label: "Project 3", idx: 6 },
      ],
    },
    {
      label: "Reference",
      links: [
        { href: "/docs/component", label: "Component", idx: 7 },
        { href: "/docs/api", label: "API Reference", idx: 8 },
        { href: "/docs/advanced", label: "Advanced Concepts", idx: 9 },
        { href: "/docs/best-practices", label: "Best Practices", idx: 10 },
        { href: "/docs/common-mistake", label: "Common Mistakes", idx: 11 },
      ],
    },
  ];

  return (
    <aside r-class="w-64 h-screen bg-white border-r border-slate-200 flex flex-col p-6">
      {/* Brand */}
      <div r-class="flex items-center gap-2 mb-7">
        <span r-class="w-2 h-2 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500" />
        <h1 r-class="text-xl font-extrabold tracking-tight text-slate-900">
          Fynix
          <span r-class="bg-gradient-to-r from-cyan-500 to-violet-500 bg-clip-text text-transparent">
            JS
          </span>
        </h1>
      </div>

      {/* Badge */}
      <span r-class="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase text-cyan-600 bg-cyan-50 border border-cyan-200 px-2.5 py-1 rounded-sm mb-6 w-fit">
        <span r-class="w-1.5 h-1.5 rounded-full bg-cyan-500" />
        Documentation
      </span>

      {/* Nav */}
      <nav r-class="flex-1 flex flex-col">
        <For each={sections}>
          {(section, sectionIdx) => (
            <div
              key={section.label}
              r-class={sectionIdx === 0 ? "mb-1" : "mt-4 mb-1"}
            >
              {/* Section label */}
              <p r-class="font-mono text-[9px] tracking-widest uppercase text-slate-400 px-2.5 mb-1">
                {section.label}
              </p>

              {/* Links */}
              <div r-class="flex flex-col gap-0.5">
                <For each={section.links}>
                  {(link) => {
                    const isActive = activePath.value === link.href;
                    return (
                      <div
                        key={link.href}
                        r-class={
                          isActive
                            ? "flex items-center gap-2.5 px-2.5 py-2 rounded-md border border-cyan-200 bg-cyan-50 cursor-pointer"
                            : "flex items-center gap-2.5 px-2.5 py-2 rounded-md cursor-pointer hover:bg-slate-50 transition-all duration-150"
                        }
                      >
                        <span
                          r-class={`font-mono text-[10px] min-w-[18px] ${isActive ? "text-cyan-400" : "text-slate-300"}`}
                        >
                          {String(link.idx).padStart(2, "0")}
                        </span>
                        <Path
                          to={link.href}
                          value={link.label}
                          r-class={`text-sm font-medium flex-1 ${isActive ? "text-cyan-600" : "text-slate-600"}`}
                        />
                        <span
                          r-class={`text-xs ${isActive ? "text-cyan-400" : "text-slate-300"}`}
                        >
                          →
                        </span>
                      </div>
                    );
                  }}
                </For>
              </div>
            </div>
          )}
        </For>
      </nav>

      {/* Footer */}
      <div r-class="pt-4 border-t border-slate-100">
        <p r-class="font-mono text-[10px] text-slate-400 tracking-wide">
          v1.0 — Fiber-based Reactive UI
        </p>
      </div>
    </aside>
  );
}
