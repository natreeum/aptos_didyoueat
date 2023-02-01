import Link from "next/link";
import KlipButton from "./KlipButton";
import { useRecoilValue } from "recoil";
import { ClientAddress } from "../recoil/states";
export default function Header() {
  const clientAddress = useRecoilValue(ClientAddress);
  return (
    <nav className="header">
      <div className="header__logo">
        <Link href="/" className="header__h1">
          DiD You Eat?
        </Link>
      </div>
      <div className="header__button">{clientAddress ? null : <KlipButton />}</div>
    </nav>
  );
}
