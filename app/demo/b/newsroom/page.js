export const metadata = { title: "뉴스룸 — 슬리피 (B안)" };

export default function Newsroom() {
  return (
    <section className="db-about" style={{ borderTop: 0 }}>
      <div className="db-wrap">
        <h2>뉴스룸</h2>
        <p className="db-lead">[뉴스룸 페이지: 내용 확정 후 입력] <span className="db-badge">확정 전</span></p>
        <p className="db-hint"><a href="/demo/b">홈으로</a></p>
      </div>
    </section>
  );
}
