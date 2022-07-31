import React from "react";
import { createRoot } from 'react-dom/client';
import "./index.css";
import App from "./components/App";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import reducer from "./reducers";
import middleware from "./middlewares";
import { createStore } from 'redux'


const store = createStore(reducer, middleware);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <Router >
      <App />
    </Router>
  </Provider>
);
