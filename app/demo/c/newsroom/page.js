export const metadata = { title: "뉴스룸 — 슬리피 (C안)" };

export default function Newsroom() {
  return (
    <section className="dc-about" style={{ minHeight: "50vh" }}>
      <div className="dc-wrap">
        <h2>뉴스룸</h2>
        <p className="dc-body" style={{ marginTop: 16 }}>[뉴스룸 페이지: 내용 확정 후 입력] <span className="dc-badge">확정 전</span></p>
        <p className="dc-hint"><a href="/demo/c">홈으로</a></p>
      </div>
    </section>
  );
}
