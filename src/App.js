import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootSagas, { rootReducers } from "./store";
import createSagaMiddleware from "@redux-saga/core";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSagas);

function App() {
  return (
    <Provider store={store}>
      <Outlet />
    </Provider>
  );
}

export default App;
