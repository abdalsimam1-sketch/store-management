import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const CashierMobileNav = () => {
  const { pathname } = useLocation();
  const { signOut } = useAuth();
  const activeLink = (path) => {
    return pathname === path ? "active-mobile-nav" : "";
  };
  return (
    <div className="mobile-nav z-1 text-light w-100 rounded-top d-flex justify-content-around">
      <div>
        <Link
          to="/cashier"
          className={`btn d-flex flex-column ${activeLink("/cashier")}`}
        >
          <i className="bi-grid-1x2 "></i>
          <span>Dashboard</span>
        </Link>
      </div>
      <div>
        <Link
          to="/cashier/checkout"
          className={`btn d-flex flex-column ${activeLink("/cashier/checkout")}`}
        >
          <i className="bi-cart "></i>
          <span>Checkout</span>
        </Link>
      </div>
      <div>
        <button
          className="btn d-flex flex-column"
          onClick={() => {
            if (window.confirm("Are you sure you want to log out?")) {
              signOut();
            }
          }}
        >
          <i className=" bi bi-box-arrow-right"></i>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};
