import CashierSidebar from "./CashierSidebar";
import { Outlet } from "react-router-dom";

export const CashierLayout = () => {
  return (
    <div className="d-flex ">
      <section className="d-none d-md-flex">
        <CashierSidebar></CashierSidebar>
      </section>
      <section className="d-md-none ">
        {/* <AdminMobileNav></AdminMobileNav> */}
      </section>

      <section className="w-100">
        <Outlet></Outlet>
      </section>
    </div>
  );
};
