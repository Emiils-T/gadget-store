import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Products from "../pages/Products";
import Product from "../pages/ProductDetails";
import AppLayout from "../layouts/AppLayout";
import Cart from "../pages/Cart";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/products", element: <Products /> },
      { path: "/product/:id", element: <Product /> },
      { path: "/cart/", element: <Cart /> },
    ],
  },
]);
