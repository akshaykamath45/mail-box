import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { MailContext, MailProvider } from "./context/MailContext";
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

export { MailContext };
root.render(
  <StrictMode>
    <Router>
      <MailProvider>
        <App />
      </MailProvider>
    </Router>
  </StrictMode>
);
