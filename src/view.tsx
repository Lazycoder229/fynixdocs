//src/view.tsx
import { Fynix } from "fynixui";
import Homepage from "./homepage/view";

export default function Home() {
  return (
    <Homepage/>
  );
}

Home.meta = {
  title: "Fynix - A Modern JavaScript Framework for Reactive Web Apps",
  description:
    "Fynix is a modern, lightweight JavaScript framework for building reactive web applications. It combines the simplicity of a virtual DOM with advanced features like fiber architecture, priority-based scheduling, and built-in security mechanisms.",
  keywords:
    "Fynix, JavaScript, Framework, Reactive, Web Apps, Fiber Architecture, State Management, File-Based Routing",
};
