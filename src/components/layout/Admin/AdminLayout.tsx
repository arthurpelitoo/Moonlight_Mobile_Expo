import { Outlet } from "react-router-dom";
import { AdminHeader } from "./Header/AdminHeader";


export function AdminLayout(){
  return (
    <>
      <AdminHeader />
      <Outlet/>
    </>
  );

}