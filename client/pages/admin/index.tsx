import AdminFooter from "@/src/components/AdminFooter";
import AdminHeader from "@/src/components/AdminHeader";
import AdminLayout from "@/src/components/AdminLayout";
import AdminLogin from "@/src/components/AdminLogin";
import Link from "next/link";
import { useState } from "react";

export default function Admin() {
  const [loginToggle, setLoginToggle] = useState(false);

  return (
    <AdminLayout setLoginToggle={setLoginToggle}>
      <div className="admin">
        {loginToggle && <AdminLogin setLoginToggle={setLoginToggle}></AdminLogin>}

        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
        <div className="admin__heading-container">
          <h1 className="admin__h1">
            Introducing the new <br /> POAP and DID information offering system.
          </h1>
          <div className="admin-button__container">
            <Link href="/admin/store">
              <div className="admin__button">Start using "Did You Eat" system</div>
            </Link>
          </div>
        </div>
        <div className="admin__contact">
          <div className="admin__contact__content">
            도움이 더 필요하신가요? &nbsp;&nbsp;디쥬잇팀에게 직접 문의하고 필요한 기능을 제공받으세요.
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
