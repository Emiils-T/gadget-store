import { RouterProvider } from "react-router-dom";
import { router } from "./router/routes.jsx";
import { ThemeProvider, createTheme } from "@mui/material";
import { createContext, useState, useContext } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
  };

  const getSingularCount = (id) => {
    let count = 0;
    cartItems.map((product) => {
      if (product.id === id) {
        count += 1;
      }
    });
    return count;
  };
  //TODO: add functionality
  const removeFromCart = (product) => {
    setCartItems((prev) => {
      const index = cartItems.indexOf(product);
      if (index == -1) {
        return prev;
      }

      return [...prev.slice(0, index), ...prev.slice(index + 1)];
    });
  };
  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, getSingularCount, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => {
  return useContext(CartContext);
};

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
