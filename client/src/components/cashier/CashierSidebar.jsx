import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { use } from "react";

const CashierSidebar = () => {
  const { signOut } = useAuth();
  const { pathname } = useLocation();
  const activeLink = (path) => {
    return pathname === path ? "active-nav-link" : "";
  };
  return (
    <div className="admin-sidebar d-flex flex-column px-5 py-3  border-end text-nowrap justify-content-between">
      <div className="d-flex flex-column gap-5">
        <div className="logo">
          <h1>Till</h1>
        </div>
        <div className="d-flex flex-column gap-5 ">
          <div className="d-flex flex-column">
            <span className="nav-section text-muted"> Overview</span>
            <Link to="/cashier" className={`btn ${activeLink("/cashier")}`}>
              <i className="bi bi-grid-1x2 me-3"></i>
              Dashboard
            </Link>
          </div>

          <div className="d-flex flex-column">
            <span className="nav-section text-muted">Sell</span>
            <Link
              to="/cashier/checkout"
              className={`btn ${activeLink("/cashier/checkout")}`}
            >
              <i className="bi bi-cart me-3"></i>
              Checkout
            </Link>
          </div>
        </div>
      </div>
      <button
        className="btn btn-danger"
        onClick={() => {
          if (window.confirm("Are you sure you want to log out?")) {
            signOut();
          }
        }}
      >
        Logout
      </button>
    </div>
  );
};
export default CashierSidebar;
