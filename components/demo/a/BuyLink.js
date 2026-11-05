/** 구매 링크가 있으면 구매 페이지로, 아직 없으면 출시 소식 문의로 연결 (비활성 버튼을 두지 않음) */
export default function BuyLink({ url, className = "da-btn da-btn-buy" }) {
  if (url) {
    return (
      <a className={className} href={url} target="_blank" rel="noopener noreferrer" aria-label="구매하러 가기 (새 창에서 열림)">
        구매하러 가기
      </a>
    );
  }
  return (
    <a className={className} href="#contact" aria-label="출시 소식 받기 (구매 링크 준비 중, 문의 입력란으로 이동)">
      출시 소식 받기
    </a>
  );
}
