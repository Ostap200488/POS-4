import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import App from "./App.jsx";
import store from "./redux/store.js";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000,
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <SnackbarProvider autoHideDuration={3000}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </SnackbarProvider>
  </Provider>
);
