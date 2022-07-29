import React from "react";
import { createRoot } from 'react-dom/client';
import "./index.css";
import App from "./components/App";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react';
import storage from './store.config';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <Provider store={storage.store}>
    <PersistGate loading={null} persistor={storage.persistor}>
    <Router >
      <App />
    </Router>
    </PersistGate>
  </Provider>
);
