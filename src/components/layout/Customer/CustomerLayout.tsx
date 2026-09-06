import { Outlet } from "react-router-dom";
import { CustomerHeader } from "./Header/CustomerHeader";
import { CustomerFooter } from "./Footer/CustomerFooter";

export function CustomerLayout(){
  return (
    <>
      <CustomerHeader />
      <Outlet/>
      <CustomerFooter />
    </>
  );

}