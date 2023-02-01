import Header from "@/src/components/Header";
import { useForm } from "react-hook-form";

export default function Info() {
  function handleSubmit() {
    console.log("submit");
  }
  return (
    <div className="info">
      <Header />
      <p className="info__p">사장님께 공유될 정보를 선택해주세요</p>

      <form onSubmit={handleSubmit}>
        <div className="info__row">
          <input type="checkbox"></input>
          <p className="info__p">나이</p>
        </div>
        <div className="info__row">
          <input type="checkbox"></input>
          <p className="info__p">성별</p>
        </div>
        <div className="info__row">
          <input type="checkbox"></input>
          <p className="info__p">거주지역</p>
        </div>

        <div className="info__row2">
          <p className="info__p">개인정보는 n개월간 보관됩니다</p>
          <button type="submit" className="info__submit">
            개인정보 공유에 동의합니다
          </button>
        </div>
      </form>
    </div>
  );
}
