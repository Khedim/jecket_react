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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/log-in" element={<LogIn />} />
      <Route path="products/:category_slug/" element={<Category />} />
      <Route path="products/:category_slug/:product_slug/" element={<ProductDetail />} />
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
