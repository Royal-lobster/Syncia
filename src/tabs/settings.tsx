import { DndContext } from "@dnd-kit/core";
import Settings from "../components/Settings";
import "src/style.css";

export default function settingsTab() {
  return (
    <DndContext>
      <Settings />
    </DndContext>
  );
}
