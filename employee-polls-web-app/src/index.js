import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react'
import storage from './configureStore'

ReactDOM.render(
  <Provider store={storage.store}>
    <PersistGate loading={null} persistor={storage.persistor}>
    <Router >
      <App />
    </Router>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
