import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import "./Navbar.css";

function Navbar() {

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const role =
    localStorage.getItem("role");

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  const [
    pendingCount,
    setPendingCount,
  ] = useState(0);

  const [
    notificationCount,
    setNotificationCount,
  ] = useState(0);

  const [
    mobileMenu,
    setMobileMenu,
  ] = useState(false);

  useEffect(() => {

    if (role === "supplier") {

      fetchPendingOrders();

    }

    fetchNotifications();

  }, [role]);

  const fetchPendingOrders =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await axios.get(
            "https://scrambled-vagabond-payer.ngrok-free.dev/api/orders/pending-count",
            {
              headers: {
                Authorization:
                  token,
              },
            }
          );

        setPendingCount(
          res.data.count
        );

      } catch (error) {

        console.log(error);

      }

    };

  const fetchNotifications =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await axios.get(
            "https://scrambled-vagabond-payer.ngrok-free.dev/api/notifications",
            {
              headers: {
                Authorization:
                  token,
              },
            }
          );

        setNotificationCount(
          res.data.length
        );

      } catch (error) {

        console.log(error);

      }

    };

  const handleLogout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "role"
    );

    localStorage.removeItem(
      "user"
    );

    navigate("/");

  };

  const isActive = (path) => {

    return location.pathname === path;

  };

  return (

    <nav className="navbar">

      <div className="navbar-logo">

        <h1>
          TechFood 🚀
        </h1>

      </div>

      <div
        className={`navbar-links ${
          mobileMenu
            ? "active"
            : ""
        }`}
      >

        <NavLink
          to="/dashboard"
          label="Dashboard"
          active={isActive("/dashboard")}
        />

        <NavLink
          to="/products"
          label="Products"
          active={isActive("/products")}
        />

        <NavLink
          to="/profile"
          label="Profile"
          active={isActive("/profile")}
        />

        <NavLink
          to="/notifications"
          label={`Notifications (${notificationCount})`}
          active={isActive("/notifications")}
        />

        {role === "supplier" && (

          <>

            <NavLink
              to="/add-product"
              label="Add Product"
              active={isActive("/add-product")}
            />

            <NavLink
              to="/supplier-orders"
              label={`Orders (${pendingCount})`}
              active={isActive("/supplier-orders")}
            />

          </>

        )}

        {role ===
          "restaurant" && (

          <>

            <NavLink
              to="/cart"
              label="Cart"
              active={isActive("/cart")}
            />

            <NavLink
              to="/restaurant-orders"
              label="My Orders"
              active={isActive("/restaurant-orders")}
            />

          </>

        )}

      </div>

      <div className="navbar-right">

        <div className="navbar-user">

          <div className="user-avatar">
            {
              user?.name
                ?.charAt(0)
                ?.toUpperCase() || "U"
            }
          </div>

          <div className="user-info">

            <span>
              {
                user?.name ||
                "User"
              }
            </span>

            <small>
              {role}
            </small>

          </div>

        </div>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

        <button
          className="mobile-menu-btn"
          onClick={() =>
            setMobileMenu(
              !mobileMenu
            )
          }
        >
          ☰
        </button>

      </div>

    </nav>

  );

}

function NavLink({
  to,
  label,
  active,
}) {

  return (

    <Link
      to={to}
      className={
        active
          ? "nav-link active-link"
          : "nav-link"
      }
    >
      {label}
    </Link>

  );

}

export default Navbar;