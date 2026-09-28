import { RouterProvider } from "react-router-dom";
import { router } from "./router/routes.jsx";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme/theme.js";

import { store } from "./app/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
