import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/redux-store";
import { SnackbarProvider } from "notistack";
import { Preloader } from "./untils/preloader/preloader";

const root=document.getElementById("root")
//если прлохо грузит или дом не готов то прелоадер
ReactDOM.render(<Preloader></Preloader>,root)

//если firebase готов то рендерим дом
store.firebaseAuthIsReady.then(()=>{
  ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        <App />
      </SnackbarProvider>
    </Provider>
  </BrowserRouter>,
  root
);
})

