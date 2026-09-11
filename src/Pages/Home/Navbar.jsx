import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";

import logo from "../../logo.jpg";
import "../Home CSS/Navbar.css";

import { useSelector, useDispatch } from "react-redux";
import { setSearch } from "../../Redux/SearchSlice";

function Navbar() {

  // For My Order
  const [openMyOrder, setOpenMyOrder] = useState(false);

  // For Login
  const user = JSON.parse(localStorage.getItem("user"));

  // For user dropdown
  const [showUserMenu, setShowUserMenu] = useState(false);

  // For logout page re-render
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const searchText = useSelector(
    (state) => state.search.searchText
  );

  const cart = useSelector(
    (state) => state.cart.cart
  );

  // Category scroll
  const scrollToSection = (id) => {
    navigate("/");

    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth"
      });
    }, 100);
  };

  // Close user dropdown when clicking outside
  useEffect(() => {
    const closeMenu = () => {
      setShowUserMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, []);

  return (
    <>

      <nav className="navbar">

        {/* Logo */}
        <div
          className="logo"
          onClick={() => {
            navigate("/");
            window.location.reload();
          }}
        >
          <img src={logo} alt="Foodie Logo" />
        </div>


        {/* Center */}
        <div className="navbar-center">

          {/* Search */}
          <div className="search-box">

            <SearchIcon className="search-icon" />

            <input
              type="text"
              placeholder="Search food..."
              value={searchText}
              onChange={(e) =>
                dispatch(setSearch(e.target.value))
              }
            />

          </div>


          {/* Categories */}
          <div className="categories">

            <span
              onClick={() => scrollToSection("all-food")}
            >
              All
            </span>

            <span
              onClick={() => scrollToSection("indian-food")}
            >
              Indian Food
            </span>

            <span
              onClick={() => scrollToSection("chinese-food")}
            >
              Chinese Food
            </span>

            <span
              onClick={() => scrollToSection("veg-food")}
            >
              Vegetarian
            </span>

            <span
              onClick={() => scrollToSection("non-veg-food")}
            >
              Non Vegetarian
            </span>

          </div>

        </div>


        {/* Right Icons */}
        <div className="navbar-icons">

          {/* Cart */}
          <Link
            to="/cart"
            state={{ cart }}
            className="nav-icon cart-icon"
          >

            <ShoppingCartIcon />

            <p className="cart-count">
              {cart.reduce(
                (total, food) =>
                  total + food.quantity,
                0
              )}
            </p>

          </Link>


          {/* User */}
          <div className="nav-icon">

            {isLoggedIn ? (

              <div
                className="user-name"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowUserMenu(!showUserMenu);
                }}
              >

                {user?.name
                  ?.split(" ")
                  .slice(0, 2)
                  .map(
                    (word) =>
                      word[0].toUpperCase()
                  )
                  .join("")}

              </div>

            ) : (

              <Link to="/login">
                <PersonIcon />
              </Link>

            )}


            {/* User Dropdown */}
            {showUserMenu && (

              <div
                className="user-dropdown"
                onClick={(e) =>
                  e.stopPropagation()
                }
              >

                <p>{user?.name}</p>

                <p>{user?.email}</p>


                {/* My Order */}
                <button
                  onClick={() => {
                    setOpenMyOrder(true);
                    setShowUserMenu(false);
                  }}
                >
                  My Order
                </button>


                {/* Logout */}
                <button
                  onClick={() => {

                    localStorage.removeItem(
                      "isLoggedIn"
                    );

                    localStorage.removeItem(
                      "user"
                    );

                    window.location.reload();

                  }}
                >
                  Logout
                </button>

              </div>

            )}

          </div>

        </div>

      </nav>


      {/* My Order Modal */}
      {openMyOrder && (

        <div className="order-list">

          <div
            className="order-box"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <h1>My Order</h1>


            <table>

              <thead>

                <tr>

                  <th>Food Name</th>

                  <th>Payment Status</th>

                  <th>Delivery Status</th>

                  <th>Price</th>

                  <th>Quantity</th>

                </tr>

              </thead>


              <tbody>

                <tr>
                 
                </tr>

              </tbody>

            </table>


            <button
              onClick={() =>
                setOpenMyOrder(false)
              }
            >
              Close
            </button>

          </div>

        </div>

      )}

    </>

  );
}

export default Navbar;