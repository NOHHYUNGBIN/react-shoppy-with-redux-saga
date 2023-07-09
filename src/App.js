import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AuthContextProvider } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import { Provider } from "react-redux";
import rootSagas, { rootReducers } from "./store";

const queryClient = new QueryClient();
const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSagas);
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <Provider store={store}>
          <Navbar />
          <Outlet />
        </Provider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
