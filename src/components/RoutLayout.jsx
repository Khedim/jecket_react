import { useSelector } from "react-redux";
import { Link, NavLink, Outlet } from "react-router-dom";

export const RootLayout = () => {
  const cart = useSelector((state) => state.cart.cart.items);
  const {token} = useSelector(state => state.cart)

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand text-light" to="/">
            Jacket
          </Link>
          <button
            className="navbar-toggler  bg-light"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="navbar-nav me-auto mb-2 mb-lg-0">
              <form action="/search" method="get" className="search-query">
                <input type="text" placeholder="Search products" name="query" />
                <button>
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </form>
            </div>
            <div className="d-flex">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-center">
                <li className="nav-item">
                  <NavLink to="/products/summer">Summer</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/products/winter">Winter</NavLink>
                </li>
                <li className="nav-item btn btn-light">
                  {token !== "" ? (
                    <NavLink to="/account" className="text-dark">
                      Profile
                    </NavLink>
                  ) : (
                    <NavLink to="/log-in" className="text-dark">
                      Login
                    </NavLink>
                  )}
                </li>
                <li className="nav-item btn btn-success">
                  {token !== "" ? (
                    <NavLink to="/cart">
                      <i className="fa-solid fa-cart-shopping"></i> Cart (
                      {cart.length})
                    </NavLink>
                  ) : (
                    <NavLink to="/sign-up" className="text-light">
                      Sign up
                    </NavLink>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
      <footer className="bg-light text-center p-5">Copyright (c) 2023</footer>
    </div>
  );
};
