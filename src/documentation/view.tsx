import { For, Fynix, Path } from "fynixui";
import Header from "../header/view";

const sidebarItems = [
  {
    group: "Introduction",
    links: [
      { to: "/documentation/gettingstarted", value: "Getting Started" },
    ],
  },
  {
    group: "Core Concepts",
    links: [
      { to: "/documentation/state", value: "Reactive State" },
      { to: "/documentation/router", value: "File-Based Routing" },
      { to: "/documentation/hooks", value: "Hooks API" },
    ],
  },
  {
    group: "Advanced",
    links: [
      { to: "/documentation/fiber", value: "Fiber Architecture" },
      { to: "/documentation/security", value: "Security" },
      { to: "/documentation/plugins", value: "Vite Plugin" },
    ],
  },
];

export default function DocsLayout({ children }) {
  return (
    <div r-class="flex flex-col h-screen bg-[#0a0a0f] text-white font-sans">
      <Header />

      <div r-class="flex flex-grow overflow-hidden">

        {/* Sidebar */}
        <aside r-class="w-[220px] flex-shrink-0 bg-[#080810] border-r border-white/[0.05] overflow-y-auto py-6 px-3">

          {/* Search hint */}
          <div r-class="flex items-center gap-2 px-3 py-2 mb-6 bg-white/[0.03] border border-white/[0.06] rounded-lg cursor-pointer hover:bg-white/[0.05] transition">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" r-class="text-white/30">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <span r-class="text-white/25 text-[12px] font-mono-code">Search docs...</span>
          </div>

          <For each={sidebarItems}>
            {(section, si) => (
              <div key={si} r-class="mb-6">
                {/* Group label */}
                <div r-class="font-mono-code text-[10px] font-semibold uppercase tracking-[0.15em] text-white/25 px-3 mb-2">
                  {section.group}
                </div>

                <For each={section.links}>
                  {(item, li) => (
                    <div key={li} r-class="mb-0.5">
                      <Path
                        to={item.to}
                        value={item.value}
                        r-class="flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] font-medium text-white/45 transition-all duration-150 hover:text-white/80 hover:bg-white/[0.05] w-full"
                        r-active-class="text-[#93b4ff] bg-[#4f6ef7]/[0.1] hover:bg-[#4f6ef7]/[0.15] hover:text-[#93b4ff]"
                      />
                    </div>
                  )}
                </For>
              </div>
            )}
          </For>

          {/* Bottom version badge */}
          <div r-class="mt-6 px-3">
            <div r-class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono-code border border-[#4f6ef7]/20 bg-[#4f6ef7]/[0.07] text-[#93b4ff]/70">
              <span r-class="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
              v1.0.10
            </div>
          </div>
        </aside>

        {/* Main content area */}
        <main r-class="flex-grow overflow-y-auto">
          <div r-class="w-full px-10 py-12">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}