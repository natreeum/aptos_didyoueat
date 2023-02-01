import Link from "next/link";
import Header from "@/src/components/Header";
export default function Failed() {
  return (
    <div className="failed">
      <Header />
      <div className="failed__main">
        <h1 className="failed__h1">Klip Connection Failed</h1>
        <h2 className="failed__h2">다시 시도해주세요</h2>
        <Link className="failed__button" href="/">
          <button className="failed__button">메인으로 돌아가기</button>
        </Link>
      </div>
    </div>
  );
}
