import { Fynix, Path, VNode } from "fynixui";
import Sidebar from "../sidebar/view";
export default function Docs({ children }): VNode {
  return (
    <div r-class="flex h-screen overflow-hidden">
      <Sidebar />
      <main r-class="flex-1 overflow-y-auto p-4">{children}</main>
    </div>
  );
}
