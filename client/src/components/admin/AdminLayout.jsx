import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { AdminMobileNav } from "./AdminMobileNav";

const AdminLayout = () => {
  return (
    <div className="d-flex ">
      <section className="d-none d-md-flex">
        <AdminSidebar></AdminSidebar>
      </section>
      <section className="d-md-none ">
        <AdminMobileNav></AdminMobileNav>
      </section>

      <section className="w-100">
        <Outlet></Outlet>
      </section>
    </div>
  );
};

export default AdminLayout;
