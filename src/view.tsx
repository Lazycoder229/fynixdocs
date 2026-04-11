//src/view.tsx
import { Fynix } from "fynixui";

import HomePage from "./homepage/view";
import {
  DangerButton,
  DarkButton,
  InfoButton,
  LightButton,
  OutlinePrimaryButton,
  PrimaryButton,
  SecondaryButton,
  SuccessButton,
  WarningButton,
} from "fynixui/custom/button";
import TodoApp from "../../todo/view";
import TableView from "../../table/view";

export default function Home() {
  return (
    <div r-class="">
      <HomePage />
      {/* <TodoApp /> */}
      {/*   <TableView/> */}
      {/*  <h1>Hello, Fynix!</h1>
      
      <PrimaryButton value="Click Me" />
      <SecondaryButton
      flex gap-2 items-center justify-center min-h-screen py-2
        value="Secondary Action"
        r-click={() => alert("Secondary Button Clicked")}
      />
      <SuccessButton
        value="Success Action"
        r-click={() => alert("Success Button Clicked")}
      />
      <DangerButton
        value="Danger Action"
        r-click={() => alert("Danger Button Clicked")}
      />
      <WarningButton value="Warning" />
      <InfoButton value="Info" size="md" />
      <DarkButton value="Dark" size="lg" />
      <LightButton value="Light" size="sm" />
      <OutlinePrimaryButton value="Outline Primary" size="md" /> */}
    </div>
  );
}

Home.meta = {
  title: "Fynix - A Modern JavaScript Framework for Reactive Web Apps",
  description:
    "Fynix is a modern, lightweight JavaScript framework for building reactive web applications. It combines the simplicity of a virtual DOM with advanced features like fiber architecture, priority-based scheduling, and built-in security mechanisms.",
  keywords:
    "Fynix, JavaScript, Framework, Reactive, Web Apps, Fiber Architecture, State Management, File-Based Routing",
};
