import "./App.css";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { RootLayout } from "./components/RoutLayout";
import { Home } from "./pages/Home";
import { ProductDetail } from "./pages/ProductDetail";
import { Category } from './pages/Category'
import { Search } from "./pages/Search";
import { Cart } from "./pages/Cart";
import { SignUp } from "./pages/SignUp";
import { LogIn } from "./pages/LogIn";
import { useSelector } from "react-redux";
import axios from "axios";
import { MyAcount } from "./pages/MyAccount";
import { ProtectedRoutes } from "./components/ProtectedRoutes";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/cart" element={<Cart />} />
        <Route path="/account" element={<MyAcount />} />
      </Route>
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/log-in" element={<LogIn />} />
      <Route path="/products/:category_slug" element={<Category />} />
      <Route path="/products/:category_slug/:product_slug" element={<ProductDetail />} />
    </Route>
  )
)

function App() {
  const {token} = useSelector(state => state.cart)
  console.log(token)

  if (token) {
    axios.defaults.headers.common['Authorization'] = "Token " + token
  } else {
    axios.defaults.headers.common['Authorization'] = ""
  }

  return (
    <RouterProvider router={router} />
  );
}

export default App;
