import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const AdminMobileNav = () => {
  const { pathname } = useLocation();
  const { signOut } = useAuth();
  const activeLink = (path) => {
    return pathname === path ? "active-mobile-nav" : "";
  };
  return (
    <div className="mobile-nav z-1 text-light w-100 rounded-top d-flex justify-content-between">
      <div>
        <Link to="/admin" className={`btn  ${activeLink("/admin")}`}>
          <i className="bi-grid-1x2 "></i>
        </Link>
      </div>
      <div>
        <Link
          to="/admin/products"
          className={`btn ${activeLink("/admin/products")}`}
        >
          <i className="bi-box-seam "></i>
        </Link>
      </div>
      <div>
        <Link
          to="/admin/cashiers"
          className={`btn ${activeLink("/admin/cashiers")}`}
        >
          <i className="bi-person "></i>
        </Link>
      </div>
      <div>
        <Link
          to="/admin/reports"
          className={`btn ${activeLink("/admin/reports")}`}
        >
          <i className="bi-bar-chart-line "></i>
        </Link>
      </div>
      <div>
        <button
          className="btn"
          onClick={() => {
            if (window.confirm("Are you sure you want to log out?")) {
              signOut();
            }
          }}
        >
          <i className=" bi bi-box-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};
