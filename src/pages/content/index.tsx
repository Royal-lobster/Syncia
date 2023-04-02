import ReactDOM from "react-dom";
import Sidebar from "./Sidebar";
import "@assets/styles/tailwind.css";

chrome.runtime.onMessage.addListener((message) => {
  console.log("content script received message", message);
});

const sidebarContainer = document.createElement("div");
sidebarContainer.id = "my-sidebar-container";
document.body.appendChild(sidebarContainer);

ReactDOM.render(<Sidebar />, sidebarContainer);
