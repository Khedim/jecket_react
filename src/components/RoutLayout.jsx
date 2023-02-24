import { Link, NavLink, Outlet } from "react-router-dom";

export const RootLayout = () => {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand text-light" href="#">
            Navbar
          </a>
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
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
            <div className="d-flex" role="search">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-center">
                <li className="nav-item">
                  <NavLink to="/">
                    Summer
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="about">
                    Winter
                  </NavLink>
                </li>
                <li className="nav-item btn btn-light">
                  <NavLink to="about" className="text-dark">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item btn btn-success">
                  <NavLink to="about">
                  <i className="fa-solid fa-cart-shopping"></i> Cart
                  </NavLink>
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
