import { Fynix } from "fynixui";
import Header from "../header/view";

export default function Homepage() {
  return (
    <div r-class="min-h-screen bg-[#0a0a0f] text-white font-sans overflow-x-hidden">
      <Header />

      <main>

        {/* ── HERO ── */}
        <section r-class="relative overflow-hidden bg-[image:linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] min-h-screen flex items-center justify-center">
          <div r-class="orb orb-1" />
          <div r-class="orb orb-2" />
          <div r-class="orb orb-3" />

          <div r-class="relative z-10 text-center px-4 max-w-[890px] mx-auto">

            {/* Badge */}
            <div r-class="animate-fade-up delay-100 mb-7  mt-5 ">
              <span r-class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-mono font-medium border border-[#4f6ef7]/30 bg-[#4f6ef7]/10 text-[#93b4ff]">
                <span r-class="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                v1.0.10 — Just Released
              </span>
            </div>

            {/* Logo */}
            <div r-class="animate-fade-up delay-100 mb-6 flex items-center justify-center">
              <img src="/fynixlogo.png" alt="Fynix" r-class="w-16 h-16 rounded-2xl" />
            </div>

            {/* Headline */}
            <h1 r-class="font-display gradient-text animate-fade-up delay-200 font-extrabold leading-[1.0] tracking-[-0.03em] mb-6 text-[clamp(48px,7vw,88px)]">
              Simplicity meets<br />Perfomance
            </h1>

            {/* Sub */}
            <p r-class="animate-fade-up delay-300 text-[19px] text-white/50 leading-[1.7] mb-10 max-w-[560px] mx-auto">
              Reactive state, fiber architecture, and file-based routing — all with zero dependencies. Build fast, stay secure.
            </p>

            {/* CTAs */}
            <div r-class="animate-fade-up delay-450 flex items-center justify-center gap-3 flex-wrap mb-10">
              <a href="/docs" r-class="btn-primary-glow inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-[#4f6ef7] to-[#7c3aed] rounded-[10px] font-semibold text-[15px] text-white transition-transform hover:-translate-y-px">
                Get Started
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <a href="https://github.com/restygonzales/fynix" r-class="inline-flex items-center gap-2 px-6 py-3 border border-white/[0.12] rounded-[10px] font-medium text-[15px] text-white/80 bg-white/[0.02] transition hover:border-white/25 hover:bg-white/5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                GitHub
              </a>
            </div>

            {/* Install bar */}
            <div r-class="animate-fade-up delay-450 flex justify-center">
              <div r-class="inline-flex items-center gap-3 px-[18px] py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-[10px] font-mono-code text-[13px] text-white/70">
                <span r-class="text-green-400">$</span> npx fynixcli {`<app name>`}
                <button r-class="ml-2 opacity-40 bg-transparent border-none cursor-pointer text-white text-sm" title="Copy">⎘</button>
              </div>
            </div>
          </div>

          {/* Bottom fade */}
          <div r-class="absolute bottom-0 left-0 right-0 h-[120px] bg-gradient-to-b from-transparent to-[#0a0a0f]" />
        </section>

        {/* ── CODE PREVIEW ── */}
        <section r-class="px-4 pt-20 pb-20 max-w-[1100px] mx-auto">
          <div r-class="grid grid-cols-2 gap-6 items-start">

            {/* Reactive State */}
            <div>
              <div r-class="font-mono-code text-[11px] font-medium uppercase tracking-[0.15em] text-[#4f6ef7] mb-3">Reactive State</div>
              <h2 r-class="font-display text-[32px] font-bold mb-4 tracking-[-0.02em]">
                State that just <em r-class="not-italic text-[#93b4ff]">works</em>
              </h2>
              <p r-class="text-white/45 text-[15px] leading-[1.7] mb-7">
                No boilerplate, no reducers. <code r-class="font-mono-code bg-white/[0.06] px-1.5 py-0.5 rounded text-[13px]">nixState</code> tracks dependencies automatically — components re-render only when needed.
              </p>
              <div r-class="bg-[#0d0d18] border border-white/[0.06] rounded-xl p-5 font-mono-code text-[13px] leading-[1.8]">
                <div r-class="flex gap-1.5 mb-4">
                  <span r-class="w-3 h-3 rounded-full bg-[#ff5f56] inline-block" />
                  <span r-class="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block" />
                  <span r-class="w-3 h-3 rounded-full bg-[#27c93f] inline-block" />
                </div>
                <pre r-class="m-0 overflow-x-auto"><code><span r-class="syn-keyword">import</span> <span r-class="syn-punc">{"{"}</span> <span r-class="syn-fn">nixState</span><span r-class="syn-punc">, </span><span r-class="syn-fn">nixComputed</span> <span r-class="syn-punc">{"}"}</span> <span r-class="syn-keyword">from</span> <span r-class="syn-string">'fynixui'</span>{"\n\n"}<span r-class="syn-keyword">function</span> <span r-class="syn-fn">Counter</span><span r-class="syn-punc">()</span> <span r-class="syn-punc">{"{"}</span>{"\n"}{"  "}<span r-class="syn-keyword">const</span> <span r-class="syn-var">count</span> <span r-class="syn-punc">=</span> <span r-class="syn-fn">nixState</span><span r-class="syn-punc">(</span><span r-class="syn-type">0</span><span r-class="syn-punc">)</span>{"\n"}{"  "}<span r-class="syn-keyword">const</span> <span r-class="syn-var">doubled</span> <span r-class="syn-punc">=</span> <span r-class="syn-fn">nixComputed</span><span r-class="syn-punc">(</span>{"\n"}{"    "}() <span r-class="syn-punc">{"=>"}</span> <span r-class="syn-var">count</span><span r-class="syn-punc">.</span>value <span r-class="syn-punc">*</span> <span r-class="syn-type">2</span>{"\n"}{"  "}<span r-class="syn-punc">)</span>{"\n\n"}{"  "}<span r-class="syn-keyword">return</span> <span r-class="syn-punc">(</span>{"\n"}{"    "}<span r-class="syn-tag">{"<div>"}</span>{"\n"}{"      "}<span r-class="syn-tag">{"<p>"}</span>Count: <span r-class="syn-punc">{"{"}</span><span r-class="syn-var">count</span>.value<span r-class="syn-punc">{"}"}</span> → <span r-class="syn-punc">{"{"}</span><span r-class="syn-var">doubled</span>.value<span r-class="syn-punc">{"}"}</span><span r-class="syn-tag">{"</p>"}</span>{"\n"}{"      "}<span r-class="syn-tag">{"<button"}</span> <span r-class="syn-attr">r-click</span><span r-class="syn-punc">={"{()"}</span> <span r-class="syn-punc">{"=>"}</span> <span r-class="syn-var">count</span>.value++<span r-class="syn-punc">{"}"}</span><span r-class="syn-tag">{">"}</span>{"\n"}{"        "}Increment{"\n"}{"      "}<span r-class="syn-tag">{"</button>"}</span>{"\n"}{"    "}<span r-class="syn-tag">{"</div>"}</span>{"\n"}{"  "}<span r-class="syn-punc">)</span>{"\n"}<span r-class="syn-punc">{"}"}</span></code></pre>
              </div>
            </div>

            {/* File-Based Routing */}
            <div>
              <div r-class="font-mono-code text-[11px] font-medium uppercase tracking-[0.15em] text-[#4f6ef7] mb-3">File-Based Routing</div>
              <h2 r-class="font-display text-[32px] font-bold mb-4 tracking-[-0.02em]">
                Routes from your <em r-class="not-italic text-[#c792ea]">filesystem</em>
              </h2>
              <p r-class="text-white/45 text-[15px] leading-[1.7] mb-7">
                Drop a <code r-class="font-mono-code bg-white/[0.06] px-1.5 py-0.5 rounded text-[13px]">view.tsx</code> in a folder, get a route. Dynamic segments with <code r-class="font-mono-code bg-white/[0.06] px-1.5 py-0.5 rounded text-[13px]">[param]</code> brackets. No config needed.
              </p>
              <div r-class="bg-[#0d0d18] border border-white/[0.06] rounded-xl p-5 font-mono-code text-[13px] leading-[1.8]">
                <div r-class="flex gap-1.5 mb-4">
                  <span r-class="w-3 h-3 rounded-full bg-[#ff5f56] inline-block" />
                  <span r-class="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block" />
                  <span r-class="w-3 h-3 rounded-full bg-[#27c93f] inline-block" />
                </div>
                <pre r-class="m-0 text-[13px] leading-[1.9] text-white/60"><code><span r-class="text-white/20">src/</span>
users/<span r-class="text-[#ffcb6b]">[id]/</span>
        <span r-class="text-[#82aaff]">view.tsx</span></code></pre>
                <hr r-class="border-none h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent my-4" />
                <pre r-class="m-0"><code><span r-class="syn-comment">{"// src/users/[id]/view.tsx"}</span>{"\n"}<span r-class="syn-keyword">export default function</span> <span r-class="syn-fn">UserPage</span><span r-class="syn-punc">({"{"} </span><span r-class="syn-var">params</span> <span r-class="syn-punc">{"}"}</span>) <span r-class="syn-punc">{"{"}</span>{"\n"}{"  "}<span r-class="syn-keyword">return</span> <span r-class="syn-tag">{"<h1>"}</span>User: <span r-class="syn-punc">{"{"}</span><span r-class="syn-var">params</span>.id<span r-class="syn-punc">{"}"}</span><span r-class="syn-tag">{"</h1>"}</span>{"\n"}<span r-class="syn-punc">{"}"}</span></code></pre>
              </div>
            </div>
          </div>
        </section>

        <hr r-class="border-none h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent max-w-[1100px] mx-auto" />

        {/* ── FEATURES ── */}
        <section r-class="px-4 pt-[100px] pb-[100px] max-w-[1100px] mx-auto">
          <div r-class="text-center mb-16">
            <div r-class="font-mono-code text-[11px] font-medium uppercase tracking-[0.15em] text-[#4f6ef7] mb-3">Capabilities</div>
            <h2 r-class="font-display font-extrabold tracking-[-0.03em] mb-4 text-[clamp(32px,4vw,48px)]">
              Everything you need.<br /><span r-class="gradient-text">Nothing you don't.</span>
            </h2>
            <p r-class="text-white/40 text-[17px] max-w-[500px] mx-auto leading-[1.6]">
              Fynix ships with a complete toolkit — no plugin hunting, no ecosystem fatigue.
            </p>
          </div>

          <div r-class="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-4">
            {[
            { 
  icon: "⚡", 
  bg: "bg-[#4f6ef7]/10", 
  title: "Reactive State", 
  desc: "Automatic dependency tracking with nixState, nixComputed, and nixStore. No selectors, no reducers." 
},
              { icon: "🧵", bg: "bg-[#7c3aed]/10", title: "Fiber Architecture", desc: "Non-blocking rendering with priority-based scheduling. User interactions always stay responsive." },
              { icon: "🗂️", bg: "bg-[#06b6d4]/10", title: "File-Based Routing", desc: "Convention-over-configuration routing with static, dynamic, and nested routes out of the box." },
              { icon: "🔒", bg: "bg-[#4ade80]/10", title: "Security First", desc: "XSS protection, URL validation, and props sanitization built-in. Dangerous patterns blocked by default." },
              { icon: "📦", bg: "bg-[#fbbf24]/10", title: "Zero Dependencies", desc: "The entire runtime weighs less than your average npm package. Ship less, run faster." },
              { icon: "🔥", bg: "bg-[#f43f5e]/10", title: "HMR & Vite Plugin", desc: "First-class Vite integration. Instant hot module replacement that preserves component state." },
              { icon: "🔷", bg: "bg-[#6366f1]/10", title: "TypeScript Native", desc: "Full type safety from the ground up. Generic hooks, typed props, and inferred state shapes." },
              { icon: "🎣", bg: "bg-[#ec4899]/10", title: "Rich Hooks API", desc: "25+ hooks for async data, forms, debounce, intervals, lazy loading, and more — all tree-shakeable." },
            ].map(({ icon, bg, title, desc }) => (
              <div r-class="feature-card-hover relative bg-white/[0.02] border border-white/[0.06] rounded-2xl p-7 transition-all duration-300 overflow-hidden">
                <div r-class={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center text-xl mb-4`}>{icon}</div>
                <h3 r-class="font-display text-[18px] font-bold mb-2">{title}</h3>
                <p r-class="text-white/40 text-[14px] leading-[1.7]">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <hr r-class="border-none h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent max-w-[1100px] mx-auto" />

        {/* ── PHILOSOPHY ── */}
        <section r-class="px-4 pt-[100px] pb-[100px] max-w-[1100px] mx-auto">
          <div r-class="grid grid-cols-2 gap-20 items-center">
            <div>
              <div r-class="font-mono-code text-[11px] font-medium uppercase tracking-[0.15em] text-[#4f6ef7] mb-3">Philosophy</div>
              <h2 r-class="font-display font-extrabold tracking-[-0.03em] leading-[1.1] mb-6 text-[clamp(30px,3.5vw,44px)]">
                Three principles.<br />Infinite possibilities.
              </h2>
              <p r-class="text-white/40 text-[16px] leading-[1.8] mb-8">
                Fynix was designed with clear convictions. Not every feature under the sun — just the right ones, done exceptionally well.
              </p>
              <a href="/docs" r-class="inline-flex items-center gap-2 px-6 py-3 border border-white/[0.12] rounded-[10px] font-medium text-[15px] text-white/80 bg-white/[0.02] transition hover:border-white/25 hover:bg-white/5">
                Read the docs
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>

            <div r-class="flex flex-col gap-4">
              {[
                { icon: "✦", bg: "bg-[#4f6ef7]/15", title: "Simplicity", desc: "Clean, intuitive API designed to be learnable in an afternoon and scalable to production." },
                { icon: "⚡", bg: "bg-[#7c3aed]/15", title: "Performance", desc: "Fiber-based rendering with priority scheduling ensures your UI is always snappy and responsive." },
                { icon: "🔐", bg: "bg-[#4ade80]/15", title: "Security", desc: "Protection against XSS and injection attacks enabled by default — without slowing you down." },
              ].map(({ icon, bg, title, desc }) => (
                <div r-class="feature-card-hover relative flex items-start gap-4 bg-white/[0.02] border border-white/[0.06] rounded-2xl px-6 py-5 transition-all duration-300 overflow-hidden">
                  <div r-class={`w-9 h-9 rounded-[10px] ${bg} flex items-center justify-center text-lg flex-shrink-0`}>{icon}</div>
                  <div>
                    <h3 r-class="font-display text-[16px] font-bold mb-1">{title}</h3>
                    <p r-class="text-white/40 text-[14px] leading-[1.6] m-0">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr r-class="border-none h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent max-w-[1100px] mx-auto" />

        {/* ── QUICK START ── */}
        <section r-class="px-4 pt-[100px] pb-[100px] max-w-[1100px] mx-auto">
          <div r-class="text-center mb-14">
            <div r-class="font-mono-code text-[11px] font-medium uppercase tracking-[0.15em] text-[#4f6ef7] mb-3">Quick Start</div>
            <h2 r-class="font-display font-extrabold tracking-[-0.03em] mb-4 text-[clamp(30px,4vw,46px)]">
              Up and running in <span r-class="gradient-text">60 seconds</span>
            </h2>
          </div>

          <div r-class="grid grid-cols-3 gap-4">
            {[
              { step: "01", title: "Install", code: "npx fynixcli <app name>", accent: "#4f6ef7" },
              { step: "02", title: "Configure Vite", code: "import {fynixPlugin} from 'fynixui/plugins/vite-plugin-res'\n\nexport default defineConfig({\n  plugins: [fynixPlugin({\n    jsxFactory: 'Fynix'\n  })]\n})", accent: "#7c3aed" },
              { step: "03", title: "Build", code: "import { mount, Fynix } from 'fynixui'\n\nfunction App() {\n  return <h1>Hello, Fynix!</h1>\n}\n\nmount(App, '#root')", accent: "#06b6d4" },
            ].map(({ step, title, code, accent }) => (
              <div r-class="feature-card-hover relative bg-white/[0.02] border border-white/[0.06] rounded-2xl p-7 transition-all duration-300 overflow-hidden" style={`border-top: 2px solid ${accent}30;`}>
                <div r-class="font-mono-code text-[11px] tracking-[0.1em] mb-3" style={`color: ${accent};`}>{step}</div>
                <h3 r-class="font-display text-[18px] font-bold mb-4">{title}</h3>
                <pre r-class="font-mono-code text-[12px] leading-[1.8] text-white/55 m-0 overflow-x-auto whitespace-pre-wrap">{code}</pre>
              </div>
            ))}
          </div>
        </section>

        {/* ── STATS ── */}
        <section r-class="bg-[#4f6ef7]/[0.04] border-t border-b border-[#4f6ef7]/10 py-[60px] px-4">
          <div r-class="max-w-[900px] mx-auto grid grid-cols-4 gap-10 text-center">
            {[
              { num: "~0", unit: " deps", label: "Runtime dependencies" },
              { num: "25+", unit: "", label: "Built-in hooks" },
              { num: "5", unit: " levels", label: "Priority scheduling" },
              { num: "MIT", unit: "", label: "Open source license" },
            ].map(({ num, unit, label }) => (
              <div>
                <div r-class="font-display text-[36px] font-extrabold stat-gradient">
                  {num}<span r-class="text-[22px] opacity-60">{unit}</span>
                </div>
                <div r-class="text-white/35 text-[13px] mt-1">{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section r-class="px-4 pt-[120px] pb-[120px] max-w-[700px] mx-auto text-center">
          <div r-class="font-mono-code text-[11px] font-medium uppercase tracking-[0.15em] text-[#4f6ef7] mb-4">Get Involved</div>
          <h2 r-class="font-display gradient-text font-extrabold tracking-[-0.03em] mb-5 text-[clamp(36px,5vw,60px)]">
            Build the next generation of the web
          </h2>
          <p r-class="text-white/40 text-[17px] leading-[1.7] mb-10">
            Join a community of developers who believe the web deserves better tools. Contribute, discuss, and help shape Fynix's future.
          </p>
          <div r-class="flex gap-3 justify-center flex-wrap">
            <a href="/docs" r-class="btn-primary-glow inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-[#4f6ef7] to-[#7c3aed] rounded-[10px] font-semibold text-[15px] text-white transition-transform hover:-translate-y-px">Start building</a>
            <a href="/contributing" r-class="inline-flex items-center gap-2 px-6 py-3 border border-white/[0.12] rounded-[10px] font-medium text-[15px] text-white/80 bg-white/[0.02] transition hover:border-white/25 hover:bg-white/5">Contribute</a>
          </div>
        </section>

      </main>

      {/* ── FOOTER ── */}
      <footer r-class="bg-[#080810] border-t border-white/[0.05] pt-[60px] pb-10 px-4">
        <div r-class="max-w-[1100px] mx-auto">
          <div r-class="grid grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-12">

            <div>
              <div r-class="flex items-center gap-2.5 mb-4">
                <img src="/fynixlogo.png" alt="Fynix" r-class="w-7 h-7 rounded-[7px]" />
                <span r-class="font-display text-[18px] font-bold">Fynix</span>
              </div>
              <p r-class="text-white/30 text-[14px] leading-[1.7] mb-5 max-w-[260px]">
                Modern reactive framework built for performance, security, and developer happiness.
              </p>
              <div r-class="flex gap-2">
                <a href="https://github.com/restygonzales/fynix" r-class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/[0.08] text-[13px] text-white/60 transition hover:bg-white/[0.08] hover:text-white">GitHub</a>
                <a href="https://discord.gg/fynix" r-class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/[0.08] text-[13px] text-white/60 transition hover:bg-white/[0.08] hover:text-white">Discord</a>
              </div>
            </div>

            {[
              { heading: "Docs", links: [["Introduction", "/docs"], ["Getting Started", "/docs/setup"], ["API Reference", "/docs/api"], ["Examples", "/docs/examples"]] },
              { heading: "Framework", links: [["Runtime", "/docs/runtime"], ["Router", "/docs/router"], ["State", "/docs/state"], ["Hooks", "/docs/hooks"]] },
              { heading: "Community", links: [["Contributing", "/contributing"], ["Report Issue", "/issues"], ["Changelog", "/changelog"], ["License", "/license"]] },
            ].map(({ heading, links }) => (
              <div>
                <div r-class="text-[12px] font-semibold uppercase tracking-[0.1em] text-white/30 mb-4">{heading}</div>
                <div r-class="flex flex-col gap-2.5">
                  {links.map(([label, href]) => (
                    <a href={href} r-class="footer-link text-white/45 text-[14px] no-underline transition-colors duration-200">{label}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <hr r-class="border-none h-px bg-white/[0.06] mb-6" />

          <div r-class="flex justify-between items-center flex-wrap gap-3">
            <p r-class="text-white/20 text-[13px]">© {new Date().getFullYear()} Fynix — MIT License</p>
            <p r-class="text-white/20 text-[13px]">
             Developed by <a href="https://github.com/restygonzales" r-class="text-[#93b4ff] no-underline border-b border-[#93b4ff]/30 transition hover:border-[#93b4ff]">Resty Gonzales</a>
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
