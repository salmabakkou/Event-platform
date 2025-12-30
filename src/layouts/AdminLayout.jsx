import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";

export default function AdminLayout() {
  return (
    <AdminSidebar>
      <div className="h-full">
        <Outlet />
      </div>
    </AdminSidebar>
  );
}