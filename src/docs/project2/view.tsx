import { Fynix, VNode } from "fynixui";
import Docs from "../view";

// ── Live Notes demo component ─────────────────────────────────────────────────

import { nixState, For, nixDebounce, nixLocalStorage, nixRef } from "fynixui";

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
}

function LiveNotesApp(): VNode {
  // nixLocalStorage for persistence — but we use .value = assignment
  // (same pattern as Project 1's todos.value = [...]) so Fynix tracks
  // the dependency correctly during render.
  const notes = nixLocalStorage<Note[]>("app-notes", []);

  const titleInput = nixState("");
  const contentInput = nixState("");
  const searchQuery = nixState("");
  const editingId = nixState<string | null>(null);
  const editTitle = nixState("");
  const editContent = nixState("");
  const titleError = nixState("");
  const contentError = nixState("");

  const titleInputRef = nixRef<HTMLInputElement>(null);

  const debouncedSearch = nixDebounce((value: string) => {
    searchQuery.value = value;
  }, 300);

  function getFiltered(): Note[] {
    const q = searchQuery.value.toLowerCase();
    if (!q) return notes.value;
    return notes.value.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.content.toLowerCase().includes(q),
    );
  }

  function validate(): boolean {
    let ok = true;
    if (titleInput.value.trim().length < 2) {
      titleError.value = "Title is required (min 2 chars)";
      ok = false;
    } else {
      titleError.value = "";
    }
    if (contentInput.value.trim().length < 5) {
      contentError.value = "Content is required (min 5 chars)";
      ok = false;
    } else {
      contentError.value = "";
    }
    return ok;
  }

  function createNote(e: any) {
    e.preventDefault();
    if (!validate()) return;
    const now = Date.now();
    // Mirror Project 1: direct .value = assignment, not .set()
    notes.value = [
      {
        id: crypto.randomUUID(),
        title: titleInput.value.trim(),
        content: contentInput.value.trim(),
        createdAt: now,
        updatedAt: now,
      },
      ...notes.value,
    ];
    titleInput.value = "";
    contentInput.value = "";
    titleError.value = "";
    contentError.value = "";
    if (titleInputRef.current) titleInputRef.current.focus();
  }

  function deleteNote(id: string) {
    notes.value = notes.value.filter((n) => n.id !== id);
    if (editingId.value === id) editingId.value = null;
  }

  function startEdit(note: Note) {
    editingId.value = note.id;
    editTitle.value = note.title;
    editContent.value = note.content;
  }

  function saveEdit(id: string) {
    if (
      editTitle.value.trim().length < 2 ||
      editContent.value.trim().length < 5
    )
      return;
    notes.value = notes.value.map((n) =>
      n.id === id
        ? {
            ...n,
            title: editTitle.value.trim(),
            content: editContent.value.trim(),
            updatedAt: Date.now(),
          }
        : n,
    );
    editingId.value = null;
  }

  // Read ALL reactive values during render so Fynix subscribes to each.
  // editingId.value MUST be read here — this is what causes the component
  // to re-render when edit mode is toggled, so the ternary inside <For>
  // can swap between view and edit mode correctly.
  const currentEditingId = editingId.value;
  const filtered = getFiltered();
  const noteCount = filtered.length;

  return (
    <div r-class="max-w-2xl mx-auto">
      <h2 r-class="text-2xl font-bold text-slate-900 tracking-tight mb-6">
        📒 Notes Manager
      </h2>

      {/* Create form */}
      <form
        action=""
        method="post"
        r-submit={createNote}
        r-class="bg-slate-50 border border-slate-200 rounded-lg p-5 mb-6"
      >
        <p r-class="font-mono text-xs text-slate-400 uppercase tracking-widest mb-4">
          New Note
        </p>
        <div r-class="flex flex-col gap-3">
          <div>
            <input
              type="text"
              ref={titleInputRef}
              value={titleInput.value}
              r-input={(e: any) => (titleInput.value = e.target.value)}
              placeholder="Note title"
              r-class="w-full text-sm border border-slate-200 rounded-md px-3 py-2 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 placeholder:text-slate-300 bg-white transition"
            />
            {titleError.value && (
              <p r-class="text-xs text-red-400 mt-1">{titleError.value}</p>
            )}
          </div>
          <div>
            <textarea
              value={contentInput.value}
              r-input={(e: any) => (contentInput.value = e.target.value)}
              placeholder="Write your note..."
              rows={3}
              r-class="w-full text-sm border border-slate-200 rounded-md px-3 py-2 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 placeholder:text-slate-300 bg-white transition resize-none"
            />
            {contentError.value && (
              <p r-class="text-xs text-red-400 mt-1">{contentError.value}</p>
            )}
          </div>
          <button
            type="submit"
            r-class="self-end font-mono text-xs font-semibold text-white bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-md transition-colors"
          >
            SAVE NOTE
          </button>
        </div>
      </form>

      {/* Search */}
      <div r-class="relative mb-5">
        <span r-class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 text-sm">
          🔍
        </span>
        <input
          type="search"
          value={searchQuery.value}
          r-input={(e: any) => debouncedSearch(e.target.value)}
          placeholder="Search notes..."
          r-class="w-full text-sm border border-slate-200 rounded-md pl-8 pr-3 py-2 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 placeholder:text-slate-300 transition"
        />
      </div>

      {/* Count — reads noteCount derived from render-body, always fresh */}
      <p r-class="font-mono text-xs text-slate-400 mb-4">
        {noteCount} {noteCount === 1 ? "note" : "notes"}
        {searchQuery.value ? ` matching "${searchQuery.value}"` : ""}
      </p>

      {/* Mirror Project 1's key={filter.value} trick:
          key changes on every notes mutation AND editingId change,
          which forces the reconciler to fully remount the list section —
          no stale fibers, no ghost cards, edit/cancel always works. */}
      <div key={`${noteCount}|${searchQuery.value}`}>
        {noteCount === 0 ? (
          <div r-class="py-16 text-center text-sm text-slate-300 font-mono border border-slate-200 rounded-lg">
            No notes found.
          </div>
        ) : (
          <For each={filtered}>
            {(note) =>
              currentEditingId === note.id ? (
                /* Edit mode */
                <div
                  key={note.id}
                  r-class="border border-cyan-200 bg-cyan-50/30 rounded-lg p-4 mb-3"
                >
                  <input
                    type="text"
                    value={editTitle.value}
                    r-input={(e: any) => (editTitle.value = e.target.value)}
                    r-class="w-full text-sm font-semibold border border-slate-200 rounded-md px-3 py-2 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 bg-white mb-2 transition"
                  />
                  <textarea
                    value={editContent.value}
                    r-input={(e: any) => (editContent.value = e.target.value)}
                    rows={3}
                    r-class="w-full text-sm border border-slate-200 rounded-md px-3 py-2 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 bg-white mb-3 resize-none transition"
                  />
                  <div r-class="flex gap-2 justify-end">
                    <button
                      r-click={() => (editingId.value = null)}
                      r-class="font-mono text-xs text-slate-400 hover:text-slate-600 px-3 py-1.5 border border-slate-200 rounded-md transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      r-click={() => saveEdit(note.id)}
                      r-class="font-mono text-xs font-semibold text-white bg-cyan-500 hover:bg-cyan-600 px-3 py-1.5 rounded-md transition-colors"
                    >
                      💾 Save
                    </button>
                  </div>
                </div>
              ) : (
                /* View mode */
                <div
                  key={note.id}
                  r-class="border border-slate-200 bg-white rounded-lg p-4 mb-3 hover:border-cyan-200 hover:shadow-sm transition-all duration-200"
                >
                  <div r-class="flex items-start justify-between gap-3 mb-2">
                    <h3 r-class="text-sm font-semibold text-slate-800 leading-snug">
                      {note.title}
                    </h3>
                    <div r-class="flex gap-1 shrink-0">
                      <button
                        r-click={() => startEdit(note)}
                        r-class="text-xs text-slate-400 hover:text-cyan-500 px-2 py-1 rounded transition-colors"
                      >
                        ✏️
                      </button>
                      <button
                        r-click={() => deleteNote(note.id)}
                        r-class="text-xs text-slate-400 hover:text-red-400 px-2 py-1 rounded transition-colors"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                  <p r-class="text-sm text-slate-400 leading-relaxed mb-3">
                    {note.content}
                  </p>
                  <p r-class="font-mono text-[10px] text-slate-300">
                    {new Date(note.updatedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              )
            }
          </For>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export default function Project2(): VNode {
  const whatYoullBuild = [
    { num: "01", text: "Create notes with title and content" },
    { num: "02", text: "Edit notes inline" },
    { num: "03", text: "Delete notes" },
    { num: "04", text: "Search and filter notes" },
    { num: "05", text: "Form validation with error messages" },
  ];

  const whatYoullLearn = [
    {
      icon: "⊕",
      concept: "nixForm",
      detail: "Form handling, validation, and async submit",
    },
    {
      icon: "⬢",
      concept: "nixLocalStorage",
      detail: "Persist state across page reloads automatically",
    },
    {
      icon: "⟁",
      concept: "nixDebounce",
      detail: "Delay search execution for performance",
    },
    {
      icon: "◇",
      concept: "nixRef",
      detail: "Direct DOM access when reactive bindings aren't enough",
    },
    {
      icon: "◈",
      concept: "Component composition",
      detail: "Pass callbacks as props between parent and child components",
    },
  ];

  const steps = [
    {
      num: "01",
      title: "Data Model and State",
      description:
        "Define the Note interface and set up nixLocalStorage so notes survive page reloads without any extra code.",
      details: [
        "The Note interface carries an id, title, content, and two timestamps — createdAt and updatedAt. Separating these gives you free sorting and a last-edited display without storing extra state.",
        "nixLocalStorage<Note[]>('app-notes', []) works exactly like nixState but serializes its value to localStorage on every write and hydrates from it on first read. The second argument is the default used when the key doesn't exist yet.",
        "searchQuery is a plain nixState<string>. The filtered list is derived from it during render — the same render-body tracking pattern from Project 1 applies here too. No nixComputed needed for local derived values.",
        "filteredNotes is computed by reading notes.value and searchQuery.value inside a plain function called during render. Both states are subscribed automatically, so the list updates whenever either changes.",
      ],
      concept:
        "nixLocalStorage persists reactive state to localStorage automatically. Reading .value during render registers both notes and searchQuery as dependencies — no manual subscriptions.",
      lang: "tsx",
      code: `import { nixState, nixLocalStorage, For, VNode } from "fynixui";

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
}

export default function NotesManager(): VNode {
  // Persists to localStorage automatically — survives page reload
  const notes = nixLocalStorage<Note[]>("app-notes", []);
  const searchQuery = nixState("");

  // Derived during render — both notes and searchQuery are tracked
  function getFiltered() {
    const q = searchQuery.value.toLowerCase();
    if (!q) return notes.value;
    return notes.value.filter((n) =>
      n.title.toLowerCase().includes(q) ||
      n.content.toLowerCase().includes(q)
    );
  }

  const filtered = getFiltered();

  return (
    <div class="notes-app">
      <h1>📒 Notes Manager</h1>
      <p>{filtered.length} notes</p>
    </div>
  );
}`,
    },
    {
      num: "02",
      title: "Note Creation with Form Validation",
      description:
        "Use nixForm to handle input, validate fields, and manage submit state — all reactively.",
      details: [
        "nixForm takes an initial values object and a validation rules object. Each rule can specify required, minLength, maxLength, and a custom message. It returns reactive form state: values, errors, isSubmitting, and helper methods.",
        "getFieldProps(fieldName) returns an object with value, r-input, and r-blur already wired up. Spread it onto your input or textarea to get full two-way binding and blur-triggered validation in one line.",
        "form.handleSubmit(async (values) => {...}) wraps your submit logic. It runs validation first, sets isSubmitting.value = true, calls your callback, then resets isSubmitting. If validation fails the callback never runs.",
        "notes.set([newNote, ...notes.value]) prepends the new note to the front of the array. Using set() (instead of direct assignment) is the nixLocalStorage API — it writes the new value and persists it to localStorage in one call.",
        "form.reset() clears all field values and errors back to their initial state. Always call it after a successful submit so the form is ready for the next entry.",
      ],
      concept:
        "nixForm provides reactive validation, error tracking, and async submit handling. getFieldProps() wires value and event handlers in one spread. notes.set() updates and persists in a single call.",
      lang: "tsx",
      code: `import { nixForm } from "fynixui";

// Inside NotesManager:
const form = nixForm(
  { title: "", content: "" },
  {
    title:   { required: true, minLength: 2, message: "Title is required (min 2 chars)" },
    content: { required: true, minLength: 5, message: "Content is required (min 5 chars)" },
  }
);

function createNote() {
  form.handleSubmit(async (values) => {
    const now = Date.now();
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: values.title,
      content: values.content,
      createdAt: now,
      updatedAt: now,
    };
    notes.set([newNote, ...notes.value]); // prepend + persist
    form.reset();
  });
}

// JSX:
<form r-submit={(e: any) => { e.preventDefault(); createNote(); }}>
  <div class="field">
    <input
      type="text"
      placeholder="Note title"
      {...form.getFieldProps("title")}
    />
    {form.errors.value.title && (
      <span class="error">{form.errors.value.title}</span>
    )}
  </div>
  <div class="field">
    <textarea
      placeholder="Write your note..."
      {...form.getFieldProps("content")}
    />
    {form.errors.value.content && (
      <span class="error">{form.errors.value.content}</span>
    )}
  </div>
  <button type="submit" disabled={form.isSubmitting.value}>
    {form.isSubmitting.value ? "Saving..." : "Save Note"}
  </button>
</form>`,
    },
    {
      num: "03",
      title: "Search with Debouncing",
      description:
        "Delay search execution until the user pauses typing to avoid redundant re-renders on every keystroke.",
      details: [
        "Without debouncing, every keystroke sets searchQuery.value and triggers a full re-render including the filter pass over every note. For small lists this is fine. For hundreds of notes it causes visible lag.",
        "nixDebounce(fn, delay) returns a wrapped function that postpones execution until delay milliseconds after the last call. If the user types three characters in quick succession, the callback only fires once — after they pause.",
        "The searchQuery state is still updated inside the debounced callback, so reactivity works exactly the same way. The only difference is timing: instead of updating every 16ms, it updates at most every 300ms.",
        "nixDebounce internally cleans up its timer on component unmount via the active component context — you do not need to store a cleanup reference or call cancel() manually.",
      ],
      concept:
        "nixDebounce delays callback execution until the user stops interacting. The reactive state update still happens inside — debouncing only controls when, not how.",
      lang: "tsx",
      code: `import { nixDebounce } from "fynixui";

// Inside NotesManager:
const debouncedSearch = nixDebounce((value: string) => {
  searchQuery.value = value; // state update fires at most every 300ms
}, 300);

// JSX — r-input calls the debounced function, not searchQuery directly:
<input
  type="search"
  placeholder="Search notes..."
  r-input={(e: any) => debouncedSearch(e.target.value)}
/>

// Without debounce — re-renders on every keystroke:
// r-input={(e: any) => (searchQuery.value = e.target.value)}

// With debounce — re-renders only after 300ms pause:
// r-input={(e: any) => debouncedSearch(e.target.value)}`,
    },
    {
      num: "04",
      title: "Edit and Delete Notes",
      description:
        "Track which note is being edited with a single nixState<string | null> and swap between view and edit mode conditionally.",
      details: [
        "editingId is a nixState<string | null> that holds the id of the note currently being edited, or null when no note is in edit mode. A single piece of state controls the entire edit UI — no boolean flags per note needed.",
        "When editingId.value === note.id the For render function returns the NoteEditor component instead of the view card. The ternary runs inside the For callback so each note independently checks whether it is the one being edited.",
        "deleteNote filters the notes array by id, producing a new array without the deleted item. If the deleted note was being edited, reset editingId.value = null to close the editor.",
        "updateNote maps over the array, finds the matching id, and returns a new object with updated title, content, and a fresh updatedAt timestamp. Every other note is returned unchanged.",
        "Passing editingId.value = null as the onCancel callback to NoteEditor keeps the parent in control of edit state. The child never touches editingId directly — it only calls the callback it was given.",
      ],
      concept:
        "One nixState<string | null> controls which note is in edit mode. Conditional rendering inside For swaps between view and edit UI per item. Child components call parent callbacks — they never own shared state.",
      lang: "tsx",
      code: `const editingId = nixState<string | null>(null);

function deleteNote(id: string) {
  notes.set(notes.value.filter((n) => n.id !== id));
  if (editingId.value === id) editingId.value = null;
}

function updateNote(id: string, title: string, content: string) {
  notes.set(notes.value.map((n) =>
    n.id === id
      ? { ...n, title, content, updatedAt: Date.now() }
      : n
  ));
  editingId.value = null; // exit edit mode
}

// getFiltered() called inline — Fynix tracks notes.value reactively.
// <For> is a direct child of the ternary so it fully unmounts when empty.
{getFiltered().filter((n) => n && n.id).length === 0 ? (
  <div class="empty-state">No notes found.</div>
) : (
  <For each={getFiltered().filter((n) => n && n.id)}>
    {(note) => (
      <div key={note.id} class="note-card">
        {editingId.value === note.id ? (
          <NoteEditor
            note={note}
            onSave={updateNote}
            onCancel={() => (editingId.value = null)}
          />
        ) : (
          <div>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <small>{new Date(note.updatedAt).toLocaleDateString()}</small>
            <div class="actions">
              <button r-click={() => (editingId.value = note.id)}>✏️ Edit</button>
              <button r-click={() => deleteNote(note.id)}>🗑️ Delete</button>
            </div>
          </div>
        )}
      </div>
    )}
  </For>
)}`,
    },
    {
      num: "05",
      title: "NoteEditor Subcomponent",
      description:
        "Extract the edit form into its own component that receives the note as a prop and calls parent callbacks on save and cancel.",
      details: [
        "NoteEditor is a plain component function — no hooks registry, no class. It receives note, onSave, and onCancel as props typed with a NoteEditorProps interface.",
        "Local nixState values for title and content are initialized from props.note. These are private to NoteEditor — changing them does not affect the parent until onSave is explicitly called.",
        "When the Save button is clicked, onSave is called with the current id, title.value, and content.value. The parent's updateNote function handles the actual state mutation and closes the editor by setting editingId.value = null.",
        "onCancel is called by the Cancel button. It comes from the parent as () => (editingId.value = null). The child does not know about editingId — it just calls the function it was given. This is the core principle of controlled components.",
        "Because the editor's local state is initialized from props at mount time, re-mounting the editor for a different note (different key) gives it fresh state. Never share mutable local state across component instances.",
      ],
      concept:
        "Subcomponents own their local state privately. Callbacks from the parent keep shared state under parent control. The child calls onSave and onCancel — it never reads or writes the parent's state directly.",
      lang: "tsx",
      code: `interface NoteEditorProps {
  note: Note;
  onSave: (id: string, title: string, content: string) => void;
  onCancel: () => void;
}

function NoteEditor(props: NoteEditorProps): VNode {
  // Local state initialized from props — private to this instance
  const title   = nixState(props.note.title);
  const content = nixState(props.note.content);

  return (
    <div class="note-editor">
      <input
        value={title.value}
        r-input={(e: any) => (title.value = e.target.value)}
        placeholder="Note title"
      />
      <textarea
        value={content.value}
        r-input={(e: any) => (content.value = e.target.value)}
        placeholder="Note content"
      />
      <div class="actions">
        <button
          r-click={() =>
            props.onSave(props.note.id, title.value, content.value)
          }
        >
          💾 Save
        </button>
        <button r-click={props.onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}`,
    },
  ];

  const takeaways = [
    { label: "nixLocalStorage", detail: "Persist state across reloads" },
    { label: "nixForm", detail: "Validated, async-ready form handling" },
    { label: "nixDebounce", detail: "Performance-optimized search" },
    { label: "nixRef", detail: "Direct DOM access when needed" },
    { label: "Controlled components", detail: "Child calls parent callbacks" },
    { label: "editingId pattern", detail: "One state controls all edit modes" },
  ];

  return (
    <Docs>
      <div r-class="min-h-screen bg-white text-slate-800 relative overflow-x-hidden text-base md:text-lg font-normal">
        <div r-class="relative z-10 max-w-5xl mx-auto py-6 px-6 lg:px-10">
          {/* ── Badge ── */}
          <div r-class="mb-10 flex items-center gap-2">
            <span r-class="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-violet-600 bg-violet-50 border border-violet-200 px-3 py-1.5 rounded-sm">
              <span r-class="w-1.5 h-1.5 rounded-full bg-violet-500" />
              Project 2 — Intermediate
            </span>
          </div>

          {/* ── Hero ── */}
          <div r-class="mb-16">
            <p r-class="font-mono text-xs text-slate-400 tracking-widest uppercase mb-5">
              Tutorial — Forms, Persistence & Composition
            </p>
            <h1 r-class="font-extrabold leading-none tracking-tight text-5xl lg:text-6xl mb-8 text-slate-900">
              Notes{" "}
              <span r-class="bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent">
                Manager
              </span>
            </h1>
            <p r-class="text-xl text-slate-500 leading-relaxed max-w-2xl font-normal">
              Build a multi-feature Notes Manager and learn form validation,
              localStorage persistence, debounced search, and component
              composition with Fynix.
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
                Building the Notes Manager
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
                The finished Notes Manager running live. Create a note, search
                for it, edit it inline, and delete it — all with the same
                patterns from the steps above.
              </p>
            </div>

            <div r-class="rounded-lg border border-slate-200 overflow-hidden shadow-sm">
              {/* Browser chrome */}
              <div r-class="flex items-center gap-2 px-4 py-3 bg-slate-100 border-b border-slate-200">
                <span r-class="w-3 h-3 rounded-full bg-red-400/70" />
                <span r-class="w-3 h-3 rounded-full bg-yellow-400/70" />
                <span r-class="w-3 h-3 rounded-full bg-green-400/70" />
                <span r-class="ml-3 font-mono text-xs text-slate-400 bg-white border border-slate-200 rounded px-3 py-1">
                  localhost:5173/notes
                </span>
              </div>

              {/* App */}
              <div r-class="bg-white px-8 py-8 min-h-[500px]">
                <LiveNotesApp />
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
              Project 1: Todo App
            </div>
            <div r-class="flex items-center gap-2 font-mono text-xs text-violet-600 hover:text-violet-700 cursor-pointer transition-colors">
              Project 3: Dashboard
              <span>→</span>
            </div>
          </div>
        </div>
      </div>
    </Docs>
  );
}
