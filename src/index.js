import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./assets/styles/index.css";
import "./assets/styles/style.css";
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./redux/store.js";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
