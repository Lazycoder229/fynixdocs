import {
  Fynix,
  nixState,
  nixComputed,
  nixEffect,
  nixEffectOnce,
  nixEffectAlways,
  nixRef,
  nixMemo,
  nixCallback,
  nixPrevious,
  nixDebounce,
  nixInterval,
  nixForm,
} from "fynixui";
import DocsLayout from "../view";

// ─────────────────────────────────────────────
// Shared UI primitives
// ─────────────────────────────────────────────

const LiveBadge = () => (
  <div r-class="flex items-center gap-1.5 mb-5">
    <span r-class="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
    <span r-class="font-mono-code text-[10px] uppercase tracking-[0.15em] text-white/30">Live Preview</span>
  </div>
);

const DotRow = () => (
  <div r-class="flex gap-1.5 mb-4">
    <span r-class="w-2.5 h-2.5 rounded-full bg-[#ff5f56] inline-block" />
    <span r-class="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] inline-block" />
    <span r-class="w-2.5 h-2.5 rounded-full bg-[#27c93f] inline-block" />
  </div>
);

const PreviewShell = ({ children }) => (
  <div r-class="bg-[#0d0d18] border border-white/[0.06] rounded-xl p-6">
    <DotRow />
    <LiveBadge />
    {children}
  </div>
);

const CodeBlock = ({ children }: { children: string }) => (
  <div r-class="bg-[#0d0d18] border border-white/[0.06] rounded-xl p-4 font-mono-code mt-3">
    <DotRow />
    <pre r-class="text-[13px] leading-[1.8] m-0 text-white/65 overflow-x-auto whitespace-pre">{children}</pre>
  </div>
);

const SectionHeader = ({ num, label, bg, text }) => (
  <div r-class="flex items-center gap-3 mb-6">
    <div r-class={`w-7 h-7 rounded-md flex items-center justify-center text-[11px] font-bold font-mono-code ${bg} ${text}`}>
      {num}
    </div>
    <h2 r-class="font-display text-[22px] font-bold tracking-[-0.02em]">{label}</h2>
  </div>
);

const SubSection = ({ title }: { title: string }) => (
  <h3 r-class="font-display text-[15px] font-semibold text-white/75 mt-8 mb-3 flex items-center gap-2">
    <span r-class="w-[3px] h-4 rounded-full bg-[#4f6ef7] inline-block flex-shrink-0" />
    {title}
  </h3>
);

const Tag = ({ children, color = "blue" }) => {
  const colors = {
    blue: "bg-[#4f6ef7]/10 text-[#93b4ff] border-[#4f6ef7]/20",
    green: "bg-[#4ade80]/10 text-[#4ade80] border-[#4ade80]/20",
    red: "bg-[#f43f5e]/10 text-[#fb7185] border-[#f43f5e]/20",
  };
  return (
    <span r-class={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono-code border ${colors[color]}`}>
      {children}
    </span>
  );
};

// ─────────────────────────────────────────────
// DEMO: nixState — Counter
// ─────────────────────────────────────────────
function CounterDemo() {
  const count = nixState(0);
  return (
    <PreviewShell>
      <div r-class="flex flex-col items-center gap-5">
        <h2 r-class="font-display font-extrabold text-[64px] leading-none tracking-[-0.04em] gradient-text tabular-nums">
          {count.value}
        </h2>
        <div r-class="flex items-center gap-3">
          <button r-click={() => count.value--}
            r-class="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white/60 text-xl transition hover:bg-white/[0.08] hover:text-white active:scale-95">−</button>
          <button r-click={() => count.value = 0}
            r-class="px-4 h-9 rounded-lg bg-white/[0.03] border border-white/[0.06] font-mono-code text-[11px] text-white/30 transition hover:text-white/60 hover:bg-white/[0.06]">reset</button>
          <button r-click={() => count.value++}
            r-class="w-11 h-11 rounded-xl bg-[#4f6ef7]/20 border border-[#4f6ef7]/30 text-[#93b4ff] text-xl transition hover:bg-[#4f6ef7]/30 active:scale-95">+</button>
        </div>
      </div>
    </PreviewShell>
  );
}

// ─────────────────────────────────────────────
// DEMO: nixComputed — Shopping Cart
// ─────────────────────────────────────────────
const CART_ITEMS = [
  { name: "Apple",  price: 1.5 },
  { name: "Bread",  price: 2.0 },
  { name: "Coffee", price: 4.5 },
];

function CartRow({ name, price, qty, onDec, onInc }: {
  name: string; price: number; qty: number;
  onDec: () => void; onInc: () => void;
}) {
  return (
    <div r-class="flex items-center justify-between px-4 py-3 bg-white/[0.03] border border-white/[0.05] rounded-xl">
      <span r-class="text-white/70 text-[14px] font-medium w-[80px]">{name}</span>
      <span r-class="text-white/30 text-[13px] font-mono-code w-[60px]">${price.toFixed(2)}</span>
      <div r-class="flex items-center gap-2">
        <button r-click={onDec}
          r-class="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white/50 text-sm transition hover:bg-white/[0.08] active:scale-95">−</button>
        <span r-class="font-mono-code text-[14px] text-white/80 w-4 text-center tabular-nums">{qty}</span>
        <button r-click={onInc}
          r-class="w-7 h-7 rounded-lg bg-[#4f6ef7]/15 border border-[#4f6ef7]/25 text-[#93b4ff] text-sm transition hover:bg-[#4f6ef7]/25 active:scale-95">+</button>
      </div>
    </div>
  );
}

function ComputedDemo() {
  const qty0 = nixState(1);
  const qty1 = nixState(1);
  const qty2 = nixState(1);

  const qtys = [qty0, qty1, qty2];

  const total = nixComputed(() =>
    CART_ITEMS.reduce((s, item, i) => s + item.price * qtys[i].value, 0)
  );

  return (
    <PreviewShell>
      <div r-class="flex flex-col gap-3">
        <CartRow name={CART_ITEMS[0].name} price={CART_ITEMS[0].price} qty={qty0.value}
          onDec={() => qty0.value = Math.max(0, qty0.value - 1)}
          onInc={() => qty0.value++} />
        <CartRow name={CART_ITEMS[1].name} price={CART_ITEMS[1].price} qty={qty1.value}
          onDec={() => qty1.value = Math.max(0, qty1.value - 1)}
          onInc={() => qty1.value++} />
        <CartRow name={CART_ITEMS[2].name} price={CART_ITEMS[2].price} qty={qty2.value}
          onDec={() => qty2.value = Math.max(0, qty2.value - 1)}
          onInc={() => qty2.value++} />
        <div r-class="flex justify-between items-center pt-3 border-t border-white/[0.06] mt-1">
          <span r-class="text-white/40 text-[13px]">Total</span>
          <span r-class="font-display font-bold text-[22px] gradient-text tabular-nums">${total.value.toFixed(2)}</span>
        </div>
      </div>
    </PreviewShell>
  );
}

// ─────────────────────────────────────────────
// DEMO: nixEffect — document title tracker
// ─────────────────────────────────────────────
function EffectDemo() {
  const name = nixState("World");
  const log = nixState<string[]>([]);

  nixEffect(() => {
    log.value = [`→ title set to "Hello, ${name.value}!"`, ...log.value.slice(0, 3)];
  }, [name.value]);

  return (
    <PreviewShell>
      <div r-class="flex flex-col gap-4">
        <div r-class="flex items-center gap-3">
          <label r-class="text-white/40 text-[13px] font-mono-code min-w-[80px]">name</label>
          <input
            value={name.value}
           r-input={(e) => name.value = (e.target as HTMLInputElement).value}
            r-class="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-[13px] text-white/80 font-mono-code outline-none focus:border-[#4f6ef7]/50"
            placeholder="Type a name..."
          />
        </div>
        <div r-class="bg-black/20 rounded-lg px-4 py-3 font-mono-code text-[12px] text-white/50 min-h-[80px]">
          {log.value.length === 0
            ? <span r-class="text-white/20">// effect log appears here</span>
            : log.value.map((l, i) => <div key={i} r-class={`${i === 0 ? "text-green-400/80" : "text-white/25"}`}>{l}</div>)
          }
        </div>
        <p r-class="text-white/25 text-[12px]">nixEffect re-runs every time <code r-class="text-[#93b4ff]">name.value</code> changes.</p>
      </div>
    </PreviewShell>
  );
}

// ─────────────────────────────────────────────
// DEMO: nixEffectOnce — mount / unmount log
// ─────────────────────────────────────────────
function EffectOnceInner() {
  const log = nixState<string[]>(["✓ Component mounted (nixEffectOnce ran)"]);

  nixEffectOnce(() => {
    log.value = [...log.value, "✓ nixEffectOnce fired on mount"];
    return () => {};
  });

  return (
    <div r-class="bg-black/20 rounded-lg px-4 py-3 font-mono-code text-[12px] flex flex-col gap-1">
      {log.value.map((l, i) => (
        <div key={i} r-class="text-green-400/80">{l}</div>
      ))}
      <div r-class="text-white/25 mt-1">// will NOT re-run on re-renders</div>
    </div>
  );
}

function EffectOnceDemo() {
  const show = nixState(true);
  return (
    <PreviewShell>
      <div r-class="flex flex-col gap-4">
        <button
          r-click={() => show.value = !show.value}
          r-class="self-start px-4 py-2 rounded-lg bg-[#7c3aed]/20 border border-[#7c3aed]/30 text-[#c792ea] text-[13px] font-medium transition hover:bg-[#7c3aed]/30"
        >
          {show.value ? "Unmount component" : "Mount component"}
        </button>
        {show.value && <EffectOnceInner />}
        {!show.value && (
          <div r-class="bg-black/20 rounded-lg px-4 py-3 font-mono-code text-[12px] text-white/25">
            // component unmounted
          </div>
        )}
      </div>
    </PreviewShell>
  );
}

// ─────────────────────────────────────────────
// DEMO: nixRef — focus without re-render
// ─────────────────────────────────────────────
function RefDemo() {
  const renderCount = nixState(0);
  const inputRef = nixRef<HTMLInputElement | null>(null);

  const focusInput = nixCallback(() => {
    inputRef.current?.focus();
    // nixRef mutation does NOT increment renderCount
  }, []);

  return (
    <PreviewShell>
      <div r-class="flex flex-col gap-4">
        <div r-class="flex items-center gap-3">
          <input
            ref={inputRef}
            r-class="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-[13px] text-white/70 font-mono-code outline-none focus:border-[#4f6ef7]/50"
            placeholder="Click the button to focus me"
          />
          <button
            r-click={focusInput}
            r-class="px-4 py-2 rounded-lg bg-[#4f6ef7]/20 border border-[#4f6ef7]/30 text-[#93b4ff] text-[13px] transition hover:bg-[#4f6ef7]/30"
          >Focus</button>
        </div>
        <div r-class="flex items-center gap-3 px-4 py-3 bg-white/[0.03] border border-white/[0.05] rounded-xl">
          <span r-class="text-white/40 text-[13px]">Re-render count:</span>
          <span r-class="font-mono-code text-[#93b4ff] text-[14px] font-bold tabular-nums">{renderCount.value}</span>
          <button r-click={() => renderCount.value++}
            r-class="ml-auto px-3 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-white/40 text-[12px] hover:text-white/60 transition">
            Force re-render
          </button>
        </div>
        <p r-class="text-white/25 text-[12px]">
          Focusing via <code r-class="text-[#93b4ff]">nixRef</code> does not trigger a re-render — count stays the same.
        </p>
      </div>
    </PreviewShell>
  );
}

// ─────────────────────────────────────────────
// DEMO: nixMemo — expensive computation
// ─────────────────────────────────────────────
function MemoDemo() {
  const n = nixState(8);
  const callLog = nixState<string[]>([]);

  const fib = (x: number): number => x <= 1 ? x : fib(x - 1) + fib(x - 2);

  const result = nixMemo(() => {
    const r = fib(n.value);
    callLog.value = [`fib(${n.value}) = ${r}  ← recomputed`, ...callLog.value.slice(0, 3)];
    return r;
  }, [n.value]);

  return (
    <PreviewShell>
      <div r-class="flex flex-col gap-4">
        <div r-class="flex items-center gap-4">
          <label r-class="text-white/40 text-[13px] font-mono-code">n =</label>
          <input
            type="range" min="1" max="20" value={n.value}
           r-input={(e) => n.value = parseInt((e.target as HTMLInputElement).value)}
            r-class="flex-1 accent-[#4f6ef7]"
          />
          <span r-class="font-mono-code text-[#93b4ff] text-[14px] w-6 text-right tabular-nums">{n.value}</span>
        </div>
        <div r-class="flex items-center justify-between px-4 py-4 bg-white/[0.03] border border-white/[0.05] rounded-xl">
          <span r-class="text-white/40 text-[13px]">fib({n.value})</span>
          <span r-class="font-display font-bold text-[28px] gradient-text tabular-nums">{result}</span>
        </div>
        <div r-class="bg-black/20 rounded-lg px-4 py-3 font-mono-code text-[12px] flex flex-col gap-0.5">
          {callLog.value.map((l, i) => (
            <div key={i} r-class={i === 0 ? "text-green-400/80" : "text-white/20"}>{l}</div>
          ))}
          {callLog.value.length === 0 && <span r-class="text-white/20">// move the slider to compute</span>}
        </div>
      </div>
    </PreviewShell>
  );
}

// ─────────────────────────────────────────────
// DEMO: nixCallback — stable reference
// ─────────────────────────────────────────────
function CallbackDemo() {
  const multiplier = nixState(2);
  const input = nixState(5);

  const compute = nixCallback((val: number) => {
    return val * multiplier.value;
  }, [multiplier.value]);

  const result = nixComputed(() => compute(input.value));

  return (
    <PreviewShell>
      <div r-class="flex flex-col gap-4">
        <div r-class="grid grid-cols-2 gap-3">
          <div r-class="flex flex-col gap-2">
            <label r-class="text-white/30 text-[11px] font-mono-code uppercase tracking-wider">input value</label>
            <div r-class="flex items-center gap-2">
              <button r-click={() => input.value = Math.max(0, input.value - 1)}
                r-class="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white/50 transition hover:bg-white/[0.08]">−</button>
              <span r-class="font-mono-code text-[20px] text-white/80 w-8 text-center tabular-nums">{input.value}</span>
              <button r-click={() => input.value++}
                r-class="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white/50 transition hover:bg-white/[0.08]">+</button>
            </div>
          </div>
          <div r-class="flex flex-col gap-2">
            <label r-class="text-white/30 text-[11px] font-mono-code uppercase tracking-wider">multiplier</label>
            <div r-class="flex items-center gap-2">
              <button r-click={() => multiplier.value = Math.max(1, multiplier.value - 1)}
                r-class="w-8 h-8 rounded-lg bg-[#7c3aed]/15 border border-[#7c3aed]/25 text-[#c792ea] transition hover:bg-[#7c3aed]/25">−</button>
              <span r-class="font-mono-code text-[20px] text-[#c792ea] w-8 text-center tabular-nums">{multiplier.value}</span>
              <button r-click={() => multiplier.value++}
                r-class="w-8 h-8 rounded-lg bg-[#7c3aed]/15 border border-[#7c3aed]/25 text-[#c792ea] transition hover:bg-[#7c3aed]/25">+</button>
            </div>
          </div>
        </div>
        <div r-class="flex items-center justify-between px-4 py-4 bg-white/[0.03] border border-white/[0.05] rounded-xl mt-1">
          <span r-class="font-mono-code text-white/40 text-[13px]">compute({input.value}) =</span>
          <span r-class="font-display font-bold text-[32px] gradient-text tabular-nums">{result.value}</span>
        </div>
        <p r-class="text-white/25 text-[12px]">
          <code r-class="text-[#93b4ff]">nixCallback</code> only recreates the function when <code r-class="text-[#c792ea]">multiplier</code> changes.
        </p>
      </div>
    </PreviewShell>
  );
}

// ─────────────────────────────────────────────
// DEMO: nixPrevious — current vs previous
// ─────────────────────────────────────────────
function PreviousDemo() {
  const value = nixState(0);
  const prev = nixPrevious(value.value);

  return (
    <PreviewShell>
      <div r-class="flex flex-col gap-4">
        <div r-class="grid grid-cols-2 gap-3">
          <div r-class="flex flex-col items-center gap-1 px-4 py-4 bg-white/[0.03] border border-white/[0.05] rounded-xl">
            <span r-class="text-white/30 text-[11px] font-mono-code uppercase tracking-wider mb-1">previous</span>
            <span r-class="font-display font-bold text-[36px] text-white/30 tabular-nums">{prev ?? "—"}</span>
          </div>
          <div r-class="flex flex-col items-center gap-1 px-4 py-4 bg-[#4f6ef7]/[0.08] border border-[#4f6ef7]/20 rounded-xl">
            <span r-class="text-[#4f6ef7] text-[11px] font-mono-code uppercase tracking-wider mb-1">current</span>
            <span r-class="font-display font-bold text-[36px] gradient-text tabular-nums">{value.value}</span>
          </div>
        </div>
        <div r-class="flex gap-3 justify-center">
          <button r-click={() => value.value -= 5}
            r-class="px-4 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white/50 font-mono-code text-[13px] transition hover:bg-white/[0.08]">−5</button>
          <button r-click={() => value.value += 1}
            r-class="px-4 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white/50 font-mono-code text-[13px] transition hover:bg-white/[0.08]">+1</button>
          <button r-click={() => value.value += 10}
            r-class="px-4 py-2 rounded-lg bg-[#4f6ef7]/20 border border-[#4f6ef7]/30 text-[#93b4ff] font-mono-code text-[13px] transition hover:bg-[#4f6ef7]/30">+10</button>
        </div>
      </div>
    </PreviewShell>
  );
}

// ─────────────────────────────────────────────
// DEMO: nixDebounce — search input
// ─────────────────────────────────────────────
function DebounceDemo() {
  const raw = nixState("");
  const searchCount = nixState(0);
  const displayed = nixState("");

  const debounced = nixDebounce(() => {
    if (raw.value) {
      displayed.value = raw.value;
      searchCount.value++;
    }
  }, 600);

  return (
    <PreviewShell>
      <div r-class="flex flex-col gap-4">
        <input
          value={raw.value}
          r-input={(e) => {
            raw.value = (e.target as HTMLInputElement).value;
            debounced();
          }}
          r-class="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2.5 text-[14px] text-white/80 font-mono-code outline-none focus:border-[#4f6ef7]/50 placeholder-white/20"
          placeholder="Type to search... (600ms debounce)"
        />
        <div r-class="grid grid-cols-2 gap-3">
          <div r-class="flex flex-col gap-1 px-4 py-3 bg-white/[0.03] border border-white/[0.05] rounded-xl">
            <span r-class="text-white/25 text-[11px] font-mono-code uppercase tracking-wider">raw value</span>
            <span r-class="font-mono-code text-[13px] text-white/60 truncate">{raw.value || <span r-class="text-white/20">empty</span>}</span>
          </div>
          <div r-class="flex flex-col gap-1 px-4 py-3 bg-[#4f6ef7]/[0.06] border border-[#4f6ef7]/15 rounded-xl">
            <span r-class="text-[#4f6ef7] text-[11px] font-mono-code uppercase tracking-wider">debounced (600ms)</span>
            <span r-class="font-mono-code text-[13px] text-[#93b4ff] truncate">{displayed.value || <span r-class="text-white/20">waiting...</span>}</span>
          </div>
        </div>
        <div r-class="flex items-center justify-between px-4 py-2 bg-white/[0.02] rounded-lg">
          <span r-class="text-white/25 text-[12px] font-mono-code">search() called</span>
          <span r-class="font-mono-code text-[#93b4ff] font-bold tabular-nums">{searchCount.value}x</span>
        </div>
      </div>
    </PreviewShell>
  );
}
// ─────────────────────────────────────────────
// DEMO: nixInterval — live clock
// ─────────────────────────────────────────────
function IntervalDemo() {
  const ticks = nixState(0);
  const running = nixState(true);

  nixInterval(() => {
    if (running.value) ticks.value++;
  }, 1000);

  const mins = Math.floor(ticks.value / 60).toString().padStart(2, "0");
  const secs = (ticks.value % 60).toString().padStart(2, "0");

  return (
    <PreviewShell>
      <div r-class="flex flex-col items-center gap-5">
        <div r-class="flex items-baseline gap-1 font-mono-code">
          <span r-class="text-[56px] font-bold gradient-text tabular-nums leading-none">{mins}</span>
          <span r-class="text-[40px] text-white/30 leading-none">:</span>
          <span r-class="text-[56px] font-bold gradient-text tabular-nums leading-none">{secs}</span>
        </div>
        <div r-class="flex gap-3">
          <button
            r-click={() => running.value = !running.value}
            r-class={`px-5 py-2 rounded-lg font-medium text-[13px] border transition ${running.value
              ? "bg-[#f43f5e]/15 border-[#f43f5e]/30 text-[#fb7185] hover:bg-[#f43f5e]/25"
              : "bg-[#4ade80]/15 border-[#4ade80]/30 text-[#4ade80] hover:bg-[#4ade80]/25"
            }`}
          >
            {running.value ? "⏸ Pause" : "▶ Resume"}
          </button>
          <button
            r-click={() => ticks.value = 0}
            r-class="px-5 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06] text-white/40 text-[13px] transition hover:bg-white/[0.06] hover:text-white/60"
          >↺ Reset</button>
        </div>
        <div r-class="flex items-center gap-1.5">
          <span r-class={`w-1.5 h-1.5 rounded-full inline-block ${running.value ? "bg-green-400 animate-pulse" : "bg-white/20"}`} />
          <span r-class="text-white/25 font-mono-code text-[11px]">{running.value ? "nixInterval firing every 1s" : "paused"}</span>
        </div>
      </div>
    </PreviewShell>
  );
}

// ─────────────────────────────────────────────
// DEMO: nixAsync (simulated) — fake fetch
// ─────────────────────────────────────────────
function AsyncDemo() {
  const loading = nixState(false);
  const data = nixState<{ title: string; body: string } | null>(null);
  const error = nixState<string | null>(null);
  const fetchCount = nixState(0);

  const fakeFetch = () => {
    loading.value = true;
    data.value = null;
    error.value = null;
    fetchCount.value++;

    const shouldFail = fetchCount.value % 3 === 0;

    setTimeout(() => {
      if (shouldFail) {
        error.value = "Network error (simulated every 3rd fetch)";
      } else {
        data.value = {
          title: `Post #${Math.floor(Math.random() * 100) + 1}`,
          body: "Reactive data loaded successfully from the simulated API endpoint.",
        };
      }
      loading.value = false;
    }, 1200);
  };

  return (
    <PreviewShell>
      <div r-class="flex flex-col gap-4">
        <button
          r-click={fakeFetch}
          disabled={loading.value}
          r-class="self-start px-5 py-2.5 rounded-lg bg-gradient-to-br from-[#4f6ef7] to-[#7c3aed] text-white text-[13px] font-semibold transition hover:-translate-y-px disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading.value ? "Fetching..." : "Fetch data"}
        </button>

        {loading.value && (
          <div r-class="flex items-center gap-3 px-4 py-4 bg-white/[0.02] border border-white/[0.05] rounded-xl">
            <div r-class="w-4 h-4 rounded-full border-2 border-[#4f6ef7] border-t-transparent animate-spin" />
            <span r-class="text-white/40 text-[13px] font-mono-code">loading...</span>
          </div>
        )}

        {error.value && (
          <div r-class="px-4 py-4 bg-[#f43f5e]/[0.08] border border-[#f43f5e]/20 rounded-xl">
            <span r-class="text-[#fb7185] text-[13px] font-mono-code">✕ {error.value}</span>
          </div>
        )}

        {data.value && (
          <div r-class="px-4 py-4 bg-[#4ade80]/[0.06] border border-[#4ade80]/15 rounded-xl flex flex-col gap-1">
            <span r-class="text-[#4ade80] text-[12px] font-mono-code uppercase tracking-wider">✓ data</span>
            <span r-class="text-white/80 text-[15px] font-semibold">{data.value.title}</span>
            <span r-class="text-white/40 text-[13px] leading-[1.6]">{data.value.body}</span>
          </div>
        )}

        {fetchCount.value === 0 && !loading.value && (
          <div r-class="text-white/20 text-[12px] font-mono-code">// click fetch to simulate nixAsync</div>
        )}

        {fetchCount.value > 0 && (
          <div r-class="text-white/20 text-[11px] font-mono-code">
            Tip: every 3rd fetch simulates an error ({fetchCount.value} fetches so far)
          </div>
        )}
      </div>
    </PreviewShell>
  );
}

// ─────────────────────────────────────────────
// DEMO: nixForm — validated registration form
// ─────────────────────────────────────────────
function FormDemo() {
  const values = nixState({ email: "", password: "" });
  const errors = nixState<{ email?: string; password?: string }>({});
  const submitted = nixState(false);
  const submitting = nixState(false);

  const validate = () => {
    const e: { email?: string; password?: string } = {};
    if (!values.value.email.includes("@")) e.email = "Must be a valid email";
    if (values.value.password.length < 8) e.password = "Min 8 characters";
    errors.value = e;
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    submitting.value = true;
    setTimeout(() => {
      submitting.value = false;
      submitted.value = true;
      values.value = { email: "", password: "" };
      errors.value = {};
      setTimeout(() => submitted.value = false, 3000);
    }, 1000);
  };

  const inputClass = (field: "email" | "password") =>
    `w-full bg-white/[0.04] border rounded-lg px-3 py-2.5 text-[13px] text-white/80 font-mono-code outline-none transition ${
      errors.value[field]
        ? "border-[#f43f5e]/50 focus:border-[#f43f5e]/80"
        : "border-white/[0.08] focus:border-[#4f6ef7]/50"
    }`;

  return (
    <PreviewShell>
      {submitted.value ? (
        <div r-class="flex flex-col items-center gap-3 py-4">
          <div r-class="w-12 h-12 rounded-full bg-[#4ade80]/15 border border-[#4ade80]/30 flex items-center justify-center text-xl">✓</div>
          <p r-class="text-[#4ade80] font-medium text-[15px]">Submitted successfully!</p>
          <p r-class="text-white/30 text-[12px] font-mono-code">Form will reset in 3s...</p>
        </div>
      ) : (
        <div r-class="flex flex-col gap-4">
          <div r-class="flex flex-col gap-1.5">
            <label r-class="text-white/40 text-[12px] font-mono-code">email</label>
            <input
              type="email"
              value={values.value.email}
              r-input={(e) => { values.value = { ...values.value, email: (e.target as HTMLInputElement).value }; validate(); }}
              r-class={inputClass("email")}
              placeholder="you@example.com"
            />
            {errors.value.email && (
              <span r-class="text-[#fb7185] text-[12px] font-mono-code">{errors.value.email}</span>
            )}
          </div>

          <div r-class="flex flex-col gap-1.5">
            <label r-class="text-white/40 text-[12px] font-mono-code">password</label>
            <input
              type="password"
              value={values.value.password}
              r-input={(e) => { values.value = { ...values.value, password: (e.target as HTMLInputElement).value }; validate(); }}
              r-class={inputClass("password")}
              placeholder="min 8 characters"
            />
            {errors.value.password && (
              <span r-class="text-[#fb7185] text-[12px] font-mono-code">{errors.value.password}</span>
            )}
          </div>

          <button
            r-click={handleSubmit}
            disabled={submitting.value}
            r-class="w-full py-2.5 rounded-lg bg-gradient-to-br from-[#4f6ef7] to-[#7c3aed] text-white text-[13px] font-semibold transition hover:-translate-y-px disabled:opacity-60 disabled:cursor-not-allowed mt-1"
          >
            {submitting.value ? "Submitting..." : "Submit"}
          </button>
        </div>
      )}
    </PreviewShell>
  );
}

// ─────────────────────────────────────────────
// DEMO: nixLocalStorage — theme persistence
// ─────────────────────────────────────────────
function LocalStorageDemo() {
  const theme = nixState<"light" | "dark">(
    (typeof localStorage !== "undefined" && localStorage.getItem("demo-theme") as any) || "dark"
  );

  nixEffect(() => {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("demo-theme", theme.value);
    }
  }, [theme.value]);

  return (
    <PreviewShell>
      <div r-class="flex flex-col gap-4">
        <div r-class={`rounded-xl border p-5 transition-all duration-300 ${
          theme.value === "dark"
            ? "bg-[#0a0a0f] border-white/[0.08]"
            : "bg-white border-gray-200"
        }`}>
          <h3 r-class={`font-display text-[16px] font-bold mb-1 ${theme.value === "dark" ? "text-white" : "text-gray-900"}`}>
            Preview Card
          </h3>
          <p r-class={`text-[13px] ${theme.value === "dark" ? "text-white/40" : "text-gray-500"}`}>
            This card reflects the persisted theme.
          </p>
        </div>

        <div r-class="flex gap-3">
          {(["dark", "light"] as const).map((t) => (
            <button
              key={t}
              r-click={() => theme.value = t}
              r-class={`flex-1 py-2.5 rounded-lg text-[13px] font-medium border transition ${
                theme.value === t
                  ? "bg-[#4f6ef7]/20 border-[#4f6ef7]/40 text-[#93b4ff]"
                  : "bg-white/[0.03] border-white/[0.06] text-white/40 hover:bg-white/[0.06]"
              }`}
            >
              {t === "dark" ? "🌙 Dark" : "☀️ Light"}
            </button>
          ))}
        </div>

        <div r-class="flex items-center justify-between px-4 py-2.5 bg-white/[0.02] rounded-lg border border-white/[0.04]">
          <span r-class="text-white/25 text-[12px] font-mono-code">localStorage["demo-theme"]</span>
          <span r-class="font-mono-code text-[#93b4ff] text-[12px]">"{theme.value}"</span>
        </div>
        <p r-class="text-white/20 text-[12px]">Refresh the page — the theme persists!</p>
      </div>
    </PreviewShell>
  );
}


// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────
export default function GettingStarted() {
  return (
    <DocsLayout>
      <div r-class="min-h-screen bg-[#0a0a0f] text-white font-sans px-8 py-12 max-w-[860px]">

        {/* PAGE HEADER */}
        <div r-class="mb-12">
          <div r-class="font-mono-code text-[11px] font-medium uppercase tracking-[0.15em] text-[#4f6ef7] mb-3">Documentation</div>
          <h1 r-class="font-display font-extrabold tracking-[-0.03em] text-[clamp(32px,4vw,48px)] leading-[1.1] mb-4">Getting Started</h1>
          <p r-class="text-white/45 text-[17px] leading-[1.7] max-w-[620px]">
            Everything you need — installation, state, all hooks with live previews, routing, and security.
          </p>
          <div r-class="flex flex-wrap gap-2 mt-6">
            {["Requirements", "Installation", "State", "Hooks", "Async", "Forms", "Lazy", "Routing", "Security"].map((label) => (
              <span r-class="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-mono-code border border-white/[0.08] bg-white/[0.03] text-white/40 hover:text-white/70 hover:border-white/20 transition cursor-pointer">
                {label}
              </span>
            ))}
          </div>
        </div>

        <hr r-class="border-none h-px bg-gradient-to-r from-white/[0.07] via-white/[0.07] to-transparent mb-12" />

        {/* 01 REQUIREMENTS */}
        <section r-class="mb-14">
          <SectionHeader num="01" label="Requirements" bg="bg-[#4f6ef7]/20" text="text-[#4f6ef7]" />
          <div r-class="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
            <div r-class="flex flex-col gap-3">
              {[
                { icon: "🟢", name: "Node.js", note: "v16 or higher" },
                { icon: "🌐", name: "Modern Browser", note: "Chrome, Firefox, Safari, Edge" },
              ].map(({ icon, name, note }) => (
                <div r-class="flex items-center gap-3 px-4 py-3 bg-white/[0.03] border border-white/[0.05] rounded-xl">
                  <span>{icon}</span>
                  <span r-class="font-mono-code text-[14px] text-white/80 font-medium">{name}</span>
                  <span r-class="text-white/30 text-[13px]">— {note}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 02 INSTALLATION */}
        <section r-class="mb-14">
          <SectionHeader num="02" label="Installation" bg="bg-[#7c3aed]/20" text="text-[#c792ea]" />
          <div r-class="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 flex flex-col gap-4">
            <CodeBlock>{`$ npx fynixcli fynix-app`}</CodeBlock>
            <SubSection title="vite.config.ts" />
            <CodeBlock>{`import { defineConfig } from 'vite';
import { fynixPlugin } from 'fynixui/plugins/vite-plugin-res';

export default defineConfig({
  plugins: [fynixPlugin()]
});`}</CodeBlock>
            <SubSection title="tsconfig.json" />
            <CodeBlock>{`{
  "compilerOptions": {
    "jsx": "preserve",
    "jsxFactory": "Fynix",
    "jsxFragmentFactory": "Fynix.Fragment",
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "types": ["fynixui/types/jsx"]
  }
}`}</CodeBlock>
            <SubSection title="src/main.ts" />
            <CodeBlock>{`import { createFynix } from 'fynixui';
const router = createFynix();
router.mountRouter('#app-root');`}</CodeBlock>
            <SubSection title="Run" />
            <div r-class="flex flex-col gap-2">
              {[
                { cmd: "cd fynix-app", desc: "Enter project directory" },
                { cmd: "npm run dev", desc: "Start dev server at localhost:5173" },
              ].map(({ cmd, desc }) => (
                <div r-class="flex items-center gap-4 bg-[#0d0d18] border border-white/[0.06] rounded-xl px-4 py-3">
                  <span r-class="text-green-400 font-mono-code text-[13px]">$</span>
                  <span r-class="font-mono-code text-[13px] text-white/80 min-w-[160px]">{cmd}</span>
                  <span r-class="text-white/20">—</span>
                  <span r-class="text-white/40 text-[13px]">{desc}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 03 STATE MANAGEMENT */}
        <section r-class="mb-14">
          <SectionHeader num="03" label="State Management" bg="bg-[#06b6d4]/20" text="text-[#67e8f9]" />
          <div r-class="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 flex flex-col gap-1">

            <SubSection title="nixState — Basic Reactive State" />
          <p r-class="text-white/40 text-[14px] leading-[1.7] mb-2">
  Runs a side effect after every render where a listed dependency changed.
  Pass an array of values to watch — if any value differs from the previous
  render, the effect re-runs. Optionally return a <code r-class="font-mono-code bg-white/[0.06] px-1 py-0.5 rounded text-[12px] text-[#93b4ff]">cleanup</code> function
  to undo the effect before the next run or when the component unmounts
  (e.g. clearing timers, removing event listeners).
</p>
            <CounterDemo />
            <CodeBlock>{`const count = nixState(0);
<h2>{count.value}</h2>
<button r-click={() => count.value++}>+</button>
<button r-click={() => count.value--}>−</button>
<button r-click={() => count.value = 0}>reset</button>`}</CodeBlock>

            <SubSection title="nixComputed — Derived State" />
            <p r-class="text-white/40 text-[14px] leading-[1.7] mb-2">Re-evaluates automatically when dependencies change.</p>
            <ComputedDemo />
            <CodeBlock>{`const total = nixComputed(() =>
  items.value.reduce((s, i) => s + i.price * i.qty, 0)
);
<h2>Total: \${total.value.toFixed(2)}</h2>`}</CodeBlock>

            <SubSection title="nixLocalStorage — Persistent State" />
            <p r-class="text-white/40 text-[14px] leading-[1.7] mb-2">State that survives page refreshes via localStorage.</p>
            <LocalStorageDemo />
            <CodeBlock>{`const theme = nixLocalStorage('theme', 'dark');
theme.value = 'light'; // persisted automatically`}</CodeBlock>
          </div>
        </section>

        {/* 04 BASIC HOOKS */}
        <section r-class="mb-14">
          <SectionHeader num="04" label="Basic Hooks" bg="bg-[#4ade80]/20" text="text-[#4ade80]" />
          <div r-class="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 flex flex-col gap-1">

            <SubSection title="nixEffect — Reactive Side Effects" />
            <p r-class="text-white/40 text-[14px] leading-[1.7] mb-2">Runs whenever listed dependencies change. Return a cleanup function.</p>
            <EffectDemo />
            <CodeBlock>{`nixEffect(() => {
  document.title = \`Hello, \${name.value}!\`;
  return () => { document.title = 'App'; };
}, [name.value]);`}</CodeBlock>

            <SubSection title="nixEffectOnce — Mount / Unmount" />
            <p r-class="text-white/40 text-[14px] leading-[1.7] mb-2">Runs exactly once when the component mounts.</p>
            <EffectOnceDemo />
            <CodeBlock>{`nixEffectOnce(() => {
  console.log('Mounted!');
  return () => console.log('Unmounted!');
});`}</CodeBlock>

            <SubSection title="nixRef — Mutable Ref (no re-render)" />
            <p r-class="text-white/40 text-[14px] leading-[1.7] mb-2">Stores a mutable value that does <em>not</em> trigger re-renders.</p>
            <RefDemo />
            <CodeBlock>{`const inputRef = nixRef(null);
// Attach: <input ref={inputRef} />
// Use:    inputRef.value?.focus()`}</CodeBlock>

            <SubSection title="nixMemo — Memoized Computation" />
            <p r-class="text-white/40 text-[14px] leading-[1.7] mb-2">Caches expensive calculations, recomputes only when dependencies change.</p>
            <MemoDemo />
            <CodeBlock>{`const result = nixMemo(() => fib(n.value), [n.value]);`}</CodeBlock>

            <SubSection title="nixCallback — Stable Function Reference" />
            <p r-class="text-white/40 text-[14px] leading-[1.7] mb-2">Returns a memoized callback — only recreated when dependencies change.</p>
            <CallbackDemo />
            <CodeBlock>{`const compute = nixCallback((val) => {
  return val * multiplier.value;
}, [multiplier.value]);`}</CodeBlock>

            <SubSection title="nixPrevious — Previous Value" />
            <p r-class="text-white/40 text-[14px] leading-[1.7] mb-2">Holds the value from the last render.</p>
            <PreviousDemo />
            <CodeBlock>{`const prevCount = nixPrevious(count.value);
// After count goes 3 → 5: prevCount === 3`}</CodeBlock>

            <SubSection title="nixDebounce — Debounced Value" />
            <p r-class="text-white/40 text-[14px] leading-[1.7] mb-2">Delays updating the value until the user stops typing.</p>
            <DebounceDemo />
            <CodeBlock>{`const debounced = nixDebounce(search.value, 600);
nixEffect(() => {
  if (debounced.value) fetchResults(debounced.value);
}, [debounced.value]);`}</CodeBlock>

            <SubSection title="nixInterval — Repeating Timer" />
            <p r-class="text-white/40 text-[14px] leading-[1.7] mb-2">Calls a function on a fixed interval. Auto-cleared on unmount.</p>
            <IntervalDemo />
            <CodeBlock>{`nixInterval(() => {
  ticks.value++;
}, 1000);`}</CodeBlock>
          </div>
        </section>

        {/* 05 ASYNC HOOKS */}
        <section r-class="mb-14">
          <SectionHeader num="05" label="Async Hooks" bg="bg-[#f43f5e]/20" text="text-[#fb7185]" />
          <div r-class="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 flex flex-col gap-1">

            <SubSection title="nixAsync — Async Data Fetching" />
            <p r-class="text-white/40 text-[14px] leading-[1.7] mb-2">
              Returns <code r-class="font-mono-code bg-white/[0.06] px-1 py-0.5 rounded text-[12px] text-[#93b4ff]">{"{ loading, error, data }"}</code>. Simulated below — every 3rd fetch triggers an error.
            </p>
            <AsyncDemo />
            <CodeBlock>{`const result = nixAsync(async () => {
  const res = await fetch('/api/data');
  return res.json();
}, []);

if (result.value.loading) return <div>Loading...</div>;
if (result.value.error)   return <div>{result.value.error.message}</div>;
return <div>{result.value.data.title}</div>;`}</CodeBlock>

            <SubSection title="nixAsyncQuery" />
            <CodeBlock>{`const userData = nixAsyncQuery(
  'user',
  async () => (await fetch(\`/api/users/\${userId}\`)).json(),
  { enabled: !!userId, refetchInterval: 30000, retry: 3 }
);`}</CodeBlock>

            <SubSection title="nixAsyncCached" />
            <CodeBlock>{`const data = nixAsyncCached(
  'cache-key',
  async () => fetchExpensiveData(),
  { ttl: 60000 }
);`}</CodeBlock>

            <SubSection title="nixAsyncDebounce" />
            <CodeBlock>{`const results = nixAsyncDebounce(
  async (term) => (await fetch(\`/api/search?q=\${term}\`)).json(),
  searchTerm.value,
  500
);`}</CodeBlock>
          </div>
        </section>

        {/* 06 FORM HOOKS */}
        <section r-class="mb-14">
          <SectionHeader num="06" label="Form Hooks" bg="bg-[#fbbf24]/20" text="text-[#fbbf24]" />
          <div r-class="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 flex flex-col gap-1">

            <SubSection title="nixForm — Validated Form" />
            <p r-class="text-white/40 text-[14px] leading-[1.7] mb-2">Live validation on every keystroke. Submit simulates a 1s network call.</p>
            <FormDemo />
            <CodeBlock>{`const form = nixForm({
  initialValues: { email: '', password: '' },
  validate: (values) => {
    const errors = {};
    if (!values.email.includes('@')) errors.email = 'Invalid email';
    if (values.password.length < 8)  errors.password = 'Min 8 chars';
    return errors;
  },
  onSubmit: async (values) => {
    await fetch('/api/login', { method: 'POST', body: JSON.stringify(values) });
    form.reset();
  }
});`}</CodeBlock>

            <SubSection title="nixFormAsync" />
            <CodeBlock>{`const form = nixFormAsync({
  initialValues: { username: '' },
  validate: async (values) => {
    const ok = await checkUsername(values.username);
    return ok ? {} : { username: 'Already taken' };
  },
  onSubmit: async (values) => createAccount(values),
});`}</CodeBlock>
          </div>
        </section>

        {/* 07 LAZY LOADING */}
        <section r-class="mb-14">
          <SectionHeader num="07" label="Lazy Loading" bg="bg-[#6366f1]/20" text="text-[#a5b4fc]" />
          <div r-class="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 flex flex-col gap-1">
            <p r-class="text-white/40 text-[14px] leading-[1.7]">
              These are structural/build-time hooks — no interactive preview possible, but the patterns are straightforward.
            </p>
            <SubSection title="nixLazy" />
            <CodeBlock>{`const LazyChart = nixLazy(() => import('./HeavyChart'));

function Dashboard() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyChart />
    </Suspense>
  );
}`}</CodeBlock>
            <SubSection title="nixLazyAsync" />
            <CodeBlock>{`const AsyncComp = nixLazyAsync(async () => {
  await someSetup();
  return () => <div>Ready!</div>;
});`}</CodeBlock>
          </div>
        </section>

        {/* 08 FILE-BASED ROUTING */}
        <section r-class="mb-14">
          <SectionHeader num="08" label="File-Based Routing" bg="bg-[#ec4899]/20" text="text-[#f472b6]" />
          <div r-class="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 flex flex-col gap-1">
            <SubSection title="Folder Structure → Routes" />
            <CodeBlock>{`src/
├── home/view.tsx         →  /home
├── about/view.tsx        →  /about
└── users/
    ├── view.tsx          →  /users
    └── [id]/view.tsx     →  /users/:id`}</CodeBlock>
            <SubSection title="Dynamic Route" />
            <CodeBlock>{`export default function UserProfile({ params }) {
  return <h1>User: {params.id}</h1>;
}
UserProfile.meta = (params) => ({
  title: \`User \${params.id}\`,
});`}</CodeBlock>
            <SubSection title="Programmatic Navigation" />
            <CodeBlock>{`const router = createFynix();
router.mountRouter('#root');
router.navigate('/users/123', { fromDashboard: true });
router.replace('/login');
router.back();
await router.preloadRoute('/dashboard');`}</CodeBlock>
          </div>
        </section>

        {/* 09 SECURITY */}
        <section r-class="mb-14">
          <SectionHeader num="09" label="Security" bg="bg-[#4ade80]/20" text="text-[#4ade80]" />
          <div r-class="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 flex flex-col gap-4">
            <CodeBlock>{`// ❌ Blocked
<div innerHTML={userInput} />
<a href="javascript:alert('XSS')">Link</a>
<button onclick="evil()">Click</button>

// ✅ Safe
<div>{userInput}</div>
<a href="https://example.com">Link</a>
<button r-click={handleClick}>Click</button>`}</CodeBlock>
          </div>
        </section>

        <hr r-class="border-none h-px bg-gradient-to-r from-white/[0.07] via-white/[0.07] to-transparent mb-10" />

        <div r-class="flex items-center justify-between flex-wrap gap-4">
          <p r-class="text-white/30 text-[14px]">Ready to go deeper?</p>
          <div r-class="flex gap-3">
            <a href="/docs/api" r-class="inline-flex items-center gap-2 px-5 py-2.5 border border-white/[0.12] rounded-[10px] font-medium text-[14px] text-white/70 bg-white/[0.02] transition hover:border-white/25 hover:bg-white/5">
              API Reference
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </a>
            <a href="/docs/examples" r-class="btn-primary-glow inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-br from-[#4f6ef7] to-[#7c3aed] rounded-[10px] font-semibold text-[14px] text-white transition-transform hover:-translate-y-px">
              View Examples
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </a>
          </div>
        </div>

      </div>
    </DocsLayout>
  );
}