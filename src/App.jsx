import { RouterProvider } from "react-router-dom";
import { router } from "./router/routes.jsx";
import { ThemeProvider, createTheme } from "@mui/material";
import { CartProvider } from "./contexts/CartContext";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3F51B5",
    },
    secondary: {
      main: "#f5e48b",
    },
  },
  components: {
    MuiFilledInput: {
      styleOverrides: {
        root: {
          "&:before, &:after": {
            borderBottom: "none",
          },
          "&:hover:not(.Mui-disabled):before": {
            borderBottom: "none",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.MuiInputLabel-root.Mui-focused": {
            color: "#000000",
            opacity: 0.5,
          },
        },
      },
    },
  },
});

function App() {
  return (
    <CartProvider>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </CartProvider>
  );
}

export default App;
