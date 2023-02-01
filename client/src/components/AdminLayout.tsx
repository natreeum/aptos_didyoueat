import { ReactNode } from "react";
import AdminFooter from "./AdminFooter";
import AdminHeader from "./AdminHeader";

export default function AdminLayout({ setLoginToggle, children }: { setLoginToggle: any; children: any }) {
  return (
    <div className="layout">
      <AdminHeader setLoginToggle={setLoginToggle}></AdminHeader>
      <div>{children}</div>
      <AdminFooter></AdminFooter>
    </div>
  );
}
