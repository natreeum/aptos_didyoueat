export default function AdminFooter() {
  return (
    <div className="admin-footer">
      <div className="admin-footer__note">
        <div>사업자등록번호: 456-23-01098</div>
        <div>최고경영자: Jung Yeon Park, Min Seob Kim | 최고기술경영자: Dong Min Kwon, Jin Woo Park </div>
        <div>메일주소: didyoueat@didyou.eat | 주소 : 서울시 강남구 드림플러스 </div>
        <div>대표전화: 080-1234-3000 | 팩스: 02-6230-4000</div>
        <div className="admin-footer__service-description">
          디쥬잇의 모든 서비스는 웹표준 did기술을 사용하여 제출된 고객 비밀 정보를 보호합니다. 보호정책에 대해
          더알아보기 ↙{" "}
        </div>
      </div>
      <div className="admin-footer__content">
        <div>
          다양한 활용 방법: 자주 방문하는 손님과 소통하고, 더 많은 정보를 제공받고, 증명된 고객 통계를 활용해 매출을
          증진하세요!
        </div>
        <div className="admin-footer__copyright">Copyright © 2023 Did You Eat? 모든 권리 보유.</div>
      </div>
    </div>
  );
}
