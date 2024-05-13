import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./components/app/app";
import "./index.css";
import { Provider } from "react-redux";
import store from "./services/store";
const root = document.getElementById("root");
ReactDOM.createRoot(root as Element).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
