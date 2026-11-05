export const metadata = { title: "슬리피 디자인 시안 모아보기" };

/** 대표님 확인용: 1·2안은 팀 배포본(외부 링크), 3~5안은 이 사이트의 데모 */
const DEMOS = [
  { href: "https://sleepy-v1.vercel.app/ko", name: "1안", note: "기존 제작본 · 보라색 브랜드 톤", external: true },
  { href: "https://sleepy-uqof.vercel.app/index.html?motion=on", name: "2안", note: "인터랙션이 눈에 띄는 젊은 느낌 (제품 페이지)", external: true },
  { href: "/demo/a", name: "3안", note: "부드러운 라이트 톤, 단색 면, 파란 포인트 하나" },
  { href: "/demo/b", name: "4안", note: "새벽 느낌의 어두운 톤, 숲 사진 히어로" },
  { href: "/demo/c", name: "5안", note: "Apple 제품 페이지 같은 밝고 조용한 톤" },
];

export default function DemoIndex() {
  return (
    <div style={{ minHeight: "100vh", background: "#1d1f26", color: "#b4b7c3", fontFamily: "-apple-system, 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif" }}>
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "64px 24px 80px", lineHeight: 1.8 }}>
        <h1 style={{ color: "#dcdde3", fontSize: 32, margin: "0 0 12px" }}>슬리피 디자인 시안 모아보기</h1>
        <p style={{ margin: "0 0 12px" }}>시안 5개를 한 곳에 모았습니다. 컴퓨터와 휴대폰 모두에서 열어 보시면 좋아요.</p>
        <p style={{ margin: "0 0 40px", color: "#dcdde3" }}>
          <strong>1순위와 2순위, 그리고 이유 한 줄</strong>을 알려 주세요. [ ]로 표시된 곳은 확정 전 내용입니다.
        </p>
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 12 }}>
          {DEMOS.map((d) => (
            <li key={d.name} style={{ border: "1px solid #363a47", borderRadius: 16, background: "#252831" }}>
              <a
                href={d.href}
                {...(d.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                style={{ display: "block", padding: "20px 24px", color: "inherit", textDecoration: "none" }}
              >
                <span style={{ color: "#a6d9c1", fontWeight: 700, fontSize: 18 }}>{d.name} 보기 →</span>
                <span style={{ display: "block", marginTop: 4, color: "#9a9eae", fontSize: 15 }}>{d.note}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
