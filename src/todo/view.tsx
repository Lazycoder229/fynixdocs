import {
  batchUpdates,
  For,
  Fynix,
  nixComputed,
  nixState,
  VNode,
} from "fynixui";

interface Todo {
  id: number;
  text: string;
  done: boolean;
}
export default function TodoApp(): VNode {
  const todos = nixState<Todo[]>([{ id: 1, text: "Learn Fynix", done: false }]);
  const input = nixState("");
  const filter = nixState<"all" | "active" | "completed">("all");

  function getFiltered() {
    switch (filter.value) {
      case "active":
        return todos.value.filter((t) => !t.done);
      case "completed":
        return todos.value.filter((t) => t.done);
      default:
        return todos.value;
    }
  }

  function addTodo(e: any) {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    todos.value = [...todos.value, { id: Date.now(), text, done: false }];
    input.value = "";
  }

  function toggleTodo(id: number) {
    todos.value = todos.value.map((t) =>
      t.id === id ? { ...t, done: !t.done } : t,
    );
  }

  function deleteTodo(id: number) {
    todos.value = todos.value.filter((t) => t.id !== id);
  }

  //  Plain function — called during render, so todos.value access
  //    is tracked by the reconciler's activeContext subscription system
  const filtered = getFiltered();
  const activeCount = todos.value.filter((t) => !t.done).length;

  return (
    <div class="todo-app">
      <h1>My Todos</h1>
      <form action="" method="post" r-submit={addTodo}>
        <input
          type="text"
          value={input.value}
          r-input={(e: any) => (input.value = e.target.value)}
          placeholder="What needs to be done?"
        />
        <button type="submit">ADD</button>
      </form>

      <div>
        <p>This is a simple todo app.</p>
        <For each={filtered}>
          {(todo) => (
            <li key={todo.id}>
              <span r-click={() => toggleTodo(todo.id)}>
                {todo.done ? "✅" : "⬜"} {todo.text}
              </span>
              <button r-click={() => deleteTodo(todo.id)}>🗑️</button>
            </li>
          )}
        </For>
      </div>

      <p class="counter">{activeCount} items left</p>
    </div>
  );
}
