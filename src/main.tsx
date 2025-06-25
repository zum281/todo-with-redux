import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider as ReduxProvider } from "react-redux";
import Home from "./routes/Home.tsx";
import { store } from "./redux/store.ts";
import { Route, Switch } from "wouter";
import EditTask from "./routes/edit/EditTask.tsx";
import Categories from "./routes/Categories.tsx";
import EditCategory from "./routes/edit/EditCategory.tsx";
import { Navbar } from "./components/navigation/Navbar.tsx";
import AddCategory from "./routes/add/AddCategory.tsx";
import AddTask from "./routes/add/AddTask.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <header>
        <Navbar />
      </header>
      <main className="p-6 max-w-3xl mx-auto">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/categories" component={Categories} />

          <Route path="/add/task/" component={AddTask} />
          <Route path="/add/category/" component={AddCategory} />

          <Route path="/edit/task/:id">
            {(params) => <EditTask id={params.id} />}
          </Route>
          <Route path="/edit/category/:id">
            {(params) => <EditCategory id={params.id} />}
          </Route>

          <Route>404: No such page!</Route>
        </Switch>
      </main>
    </ReduxProvider>
  </StrictMode>,
);
