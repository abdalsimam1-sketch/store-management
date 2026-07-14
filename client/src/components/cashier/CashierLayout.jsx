import CashierSidebar from "./CashierSidebar";
import { Outlet } from "react-router-dom";
import { CashierMobileNav } from "./CashierMobileNav";

export const CashierLayout = () => {
  return (
    <div className="d-flex ">
      <section className="d-none d-md-flex">
        <CashierSidebar></CashierSidebar>
      </section>
      <section className="d-md-none">
        <CashierMobileNav></CashierMobileNav>
      </section>

      <section className="w-100">
        <Outlet></Outlet>
      </section>
    </div>
  );
};
