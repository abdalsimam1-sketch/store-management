import { Link, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const location = useLocation();
  const activeLink = (path) =>
    location.pathname === path ? "active-nav-link" : "";
  return (
    <div className="admin-sidebar d-flex flex-column px-5 py-3 gap-5 border-end ">
      <div className="logo">
        <h1>Till</h1>
      </div>
      <div className="d-flex flex-column gap-5 ">
        <div className="d-flex flex-column">
          <span className="nav-section text-muted">Overview</span>
          <Link to="/admin" className={`btn ${activeLink("/admin")}`}>
            <i className="bi-grid-1x2 me-3"></i>
            Dashboard
          </Link>
        </div>
        <div className="d-flex flex-column">
          <span className="nav-section text-muted">Manage</span>
          <div className="d-flex flex-column gap-3">
            <Link
              to="/admin/products"
              className={`btn ${activeLink("/admin/products")}`}
            >
              <i className="bi-box-seam me-3"></i>
              Products
            </Link>
            <Link
              to="/admin/cashiers"
              className={`btn ${activeLink("/admin/cashiers")}`}
            >
              <i className="bi-person me-3"></i>
              Cashiers
            </Link>
          </div>
        </div>
        <div className="d-flex flex-column">
          <span className="nav-section text-muted">Insights</span>
          <Link
            to="/admin/reports"
            className={`btn ${activeLink("/admin/reports")}`}
          >
            <i className="bi-bar-chart-line me-3"></i>
            Sales Reports
          </Link>
        </div>
      </div>
    </div>
  );
};
export default AdminSidebar;
