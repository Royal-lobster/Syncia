import "@assets/styles/tailwind.css";
import { createRoot } from "react-dom/client";
import QuickMenu from "./components/QuickMenu";

function init() {
  const rootContainer = document.querySelector("#__root");
  if (!rootContainer) throw new Error("Can't find Panel root element");
  const root = createRoot(rootContainer);
  root.render(<QuickMenu />);
}

init();
