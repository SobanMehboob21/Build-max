
import logo from "../assets/logo.jpeg";

import "../styles/Header.css";
import { NavLink, Link } from "react-router-dom";
// import RetailerMain from "../pages/retailer/RetailerMain";
// import MainPage from "../pages/MainPage";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";


const Header = () => {
   const cartItems = useSelector((state: RootState) => state.cart.items);

  // Calculate total cart count: sum of item quantities
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <section className="nav-bar">
        <div className="header">
          <div className="header_logo">
            <Link to="/Main-page">
              <img className="header_logo_img" src={logo} />
            </Link>
          </div>
          <div className="header_search">
            <input
              className="header_input"
              placeholder="Search for construction materials..."
            />
            <i className="ri-search-line"></i>
          </div>
          <div className="other_options">
            <Link className="header_link" to="/adminMainPanal">
              <i className="ri-user-line"></i>admin
            </Link>
            <div className="cart_header_btn">
              <Link className="header_link" to="/cart">
                <i className="ri-shopping-cart-line"></i> Cart ({cartCount})
              </Link>
              <Link className="header_link" to="/retailerForm">
                <i className="ri-user-line"></i>retailer
              </Link>
            </div>
          </div>
        </div>

        <div className="tabs">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "tab_link active" : "tab_link"
            }
          >
            All Products
          </NavLink>

          <NavLink
            to="/core-materials"
            className={({ isActive }) =>
              isActive ? "tab_link active" : "tab_link"
            }
          >
            Core Materials
          </NavLink>

          <NavLink
            to="/tools"
            className={({ isActive }) =>
              isActive ? "tab_link active" : "tab_link"
            }
          >
            Tools & Equipment
          </NavLink>

          <NavLink
            to="/finishing"
            className={({ isActive }) =>
              isActive ? "tab_link active" : "tab_link"
            }
          >
            Finishing
          </NavLink>

          <NavLink
            to="/electrical"
            className={({ isActive }) =>
              isActive ? "tab_link active" : "tab_link"
            }
          >
            Electrical
          </NavLink>

          <NavLink
            to="/plumbing"
            className={({ isActive }) =>
              isActive ? "tab_link active" : "tab_link"
            }
          >
            Plumbing
          </NavLink>

          <NavLink
            to="/roofing"
            className={({ isActive }) =>
              isActive ? "tab_link active" : "tab_link"
            }
          >
            Roofing
          </NavLink>
        </div>
      </section>
    </>
  );
};

export default Header;
