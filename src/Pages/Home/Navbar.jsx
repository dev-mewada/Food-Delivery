import { useState } from "react";
import { Link } from "react-router-dom";

import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";

import logo from "../../logo.jpg";
import "../Home CSS/Navbar.css";

function Navbar({cart}) {
  const [search, setSearch] = useState("");
  console.log(cart);
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth"
    });
  };

  return (
    <nav className="navbar">

      <div className="logo">
        <img src={logo} alt="Foodie Logo" />
      </div>

      <div className="navbar-center">

        <div className="search-box">
          <SearchIcon className="search-icon" />

          <input
            type="text"
            placeholder="Search food..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="categories">

          <span onClick={() => scrollToSection("all-food")}>
            All
          </span>

          <span onClick={() => scrollToSection("indian-food")}>
            Indian Food
          </span>

          <span onClick={() => scrollToSection("chinese-food")}>
            Chinese Food
          </span>

          <span onClick={() => scrollToSection("veg-food")}>
            Vegetarian
          </span>

          <span onClick={() => scrollToSection("non-veg-food")}>
            Non Vegetarian
          </span>

        </div>

      </div>

      <div className="navbar-icons">

        <Link
          to="/cart"
          state={{cart}}
             className="nav-icon cart-icon" 
           >
             <ShoppingCartIcon /><p className="cart-count">
  {cart.reduce((total, item) => total + item.quantity, 0)}
</p>
</Link>

        <div className="nav-icon">
          <Link to="/login">
            <PersonIcon />
          </Link>
        </div>

      </div>

    </nav>
  );
}

export default Navbar;