import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider as ReduxProvider } from "react-redux";
import Home from "./routes/Home.tsx";
import { store } from "./redux/store.ts";
import { Route, Switch } from "wouter";
import Edit from "./routes/Edit.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <Switch>
        <Route path="/" component={Home} />

        <Route path="/edit/:id">{(params) => <Edit id={params.id} />}</Route>

        <Route>404: No such page!</Route>
      </Switch>
    </ReduxProvider>
  </StrictMode>,
);
