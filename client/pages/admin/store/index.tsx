import AdminCollection from "@/src/components/AdminCollection";
import AdminFooter from "@/src/components/AdminFooter";
import AdminHeader from "@/src/components/AdminHeader";
import AdminLayout from "@/src/components/AdminLayout";
import Link from "next/link";

export default function Store() {
  return (
    <AdminLayout setLoginToggle={undefined}>
      <div className="admin-store">
        <div className="admin-store__heading">
          <h2>My Store</h2>
        </div>
        <h2 className="admin-store__title">나의 매장 목록</h2>
        <div>
          <div className="admin-store__collection-layout">
            <Link href="/admin/store/1">
              <AdminCollection></AdminCollection>
            </Link>
            <Link href="/admin/store/1">
              <AdminCollection></AdminCollection>
            </Link>
            <Link href="/admin/store/1">
              <AdminCollection></AdminCollection>
            </Link>
            <Link href="/admin/store/1">
              <AdminCollection></AdminCollection>
            </Link>
            <Link href="/admin/store/1">
              <AdminCollection></AdminCollection>
            </Link>
            <Link href="/admin/store/1">
              <AdminCollection></AdminCollection>
            </Link>
            <Link href="/admin/store/1">
              <AdminCollection></AdminCollection>
            </Link>
            <Link href="/admin/store/create">
              <div className="admin-store__create-collection">
                <span>새로운 매장 컬렉션을 생성합니다.</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
