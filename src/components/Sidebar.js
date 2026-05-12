import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import "./Sidebar.css";

function Sidebar() {

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
    mobile,
    setMobile,
  ] = useState(
    window.innerWidth <= 900
  );

  const [
    sidebarOpen,
    setSidebarOpen,
  ] = useState(false);

  useEffect(() => {

    const handleResize = () => {

      setMobile(
        window.innerWidth <= 900
      );

    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () =>
      window.removeEventListener(
        "resize",
        handleResize
      );

  }, []);

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

    return (
      location.pathname === path
    );

  };

  const closeSidebar = () => {

    if (mobile) {

      setSidebarOpen(false);

    }

  };

  return (

    <>

      {mobile && (

        <button
          className="mobile-menu-btn"
          onClick={() =>
            setSidebarOpen(
              !sidebarOpen
            )
          }
        >

          ☰

        </button>

      )}

      {mobile &&
        sidebarOpen && (

        <div
          className="sidebar-overlay"
          onClick={() =>
            setSidebarOpen(false)
          }
        />

      )}

      <div
        className={
          mobile
            ? sidebarOpen
              ? "sidebar mobile-sidebar-open"
              : "sidebar mobile-sidebar"
            : "sidebar"
        }
      >

        <div className="sidebar-top">

          <Link
            to="/dashboard"
            className="sidebar-logo-link"
            onClick={closeSidebar}
          >

            <h1 className="sidebar-logo">
              TechFood
            </h1>

          </Link>

          <div className="sidebar-avatar">

            {
              user?.name
                ?.charAt(0)
                ?.toUpperCase()
            }

          </div>

        </div>

        <div className="sidebar-links">

          <SidebarLink
            to="/dashboard"
            icon="📊"
            label="Dashboard"
            active={isActive("/dashboard")}
            closeSidebar={closeSidebar}
          />

          <SidebarLink
            to="/products"
            icon="🛒"
            label="Products"
            active={isActive("/products")}
            closeSidebar={closeSidebar}
          />

          <SidebarLink
            to="/notifications"
            icon="🔔"
            label="Notifications"
            active={isActive("/notifications")}
            closeSidebar={closeSidebar}
          />

          <SidebarLink
            to="/profile"
            icon="👤"
            label="Profile"
            active={isActive("/profile")}
            closeSidebar={closeSidebar}
          />

          {role ===
            "supplier" && (

            <>

              <SidebarLink
                to="/add-product"
                icon="➕"
                label="Add Product"
                active={isActive("/add-product")}
                closeSidebar={closeSidebar}
              />

              <SidebarLink
                to="/supplier-orders"
                icon="📦"
                label="Orders"
                active={isActive("/supplier-orders")}
                closeSidebar={closeSidebar}
              />

            </>

          )}

          {role ===
            "restaurant" && (

            <>

              <SidebarLink
                to="/cart"
                icon="🧾"
                label="Cart"
                active={isActive("/cart")}
                closeSidebar={closeSidebar}
              />

              <SidebarLink
                to="/restaurant-orders"
                icon="📦"
                label="My Orders"
                active={isActive("/restaurant-orders")}
                closeSidebar={closeSidebar}
              />

            </>

          )}

        </div>

        <div className="logout-wrapper">

          <button
            className="logout-btn"
            onClick={handleLogout}
          >

            Logout

          </button>

        </div>

      </div>

    </>

  );

}

function SidebarLink({
  to,
  icon,
  label,
  active,
  closeSidebar,
}) {

  return (

    <Link
      to={to}
      onClick={closeSidebar}
      className={
        active
          ? "sidebar-link active-sidebar-link"
          : "sidebar-link"
      }
    >

      <span className="sidebar-icon">
        {icon}
      </span>

      <span>{label}</span>

    </Link>

  );

}

export default Sidebar;