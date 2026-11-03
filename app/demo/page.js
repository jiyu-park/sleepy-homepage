import Link from "next/link";

export const metadata = { title: "슬리피 디자인 데모" };

const DEMOS = [
  { href: "/demo/b", name: "B안", note: "졸리게 톤다운한 어두운 테마, 풀블리드 숲 사진 히어로", ready: true },
  { name: "C안", note: "준비 중", ready: false },
];

export default function DemoIndex() {
  return (
    <div style={{ minHeight: "100vh", background: "#1d1f26", color: "#b4b7c3", fontFamily: "-apple-system, 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif" }}>
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "80px 24px", lineHeight: 1.8 }}>
        <h1 style={{ color: "#dcdde3", fontSize: 32, margin: "0 0 12px" }}>슬리피 디자인 데모</h1>
        <p style={{ margin: "0 0 40px" }}>안마다 둘러보고 투표해 주세요. 콘텐츠는 같고 디자인만 다릅니다. [ ]로 표시된 곳은 확정 전 내용입니다.</p>
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 12 }}>
          {DEMOS.map((d) => (
            <li key={d.name} style={{ border: "1px solid #363a47", borderRadius: 16, padding: "20px 24px", background: "#252831" }}>
              {d.ready ? (
                <Link href={d.href} style={{ color: "#a6d9c1", fontWeight: 700, fontSize: 18 }}>{d.name} 보기 →</Link>
              ) : (
                <strong style={{ color: "#dcdde3", fontSize: 18 }}>{d.name}</strong>
              )}
              <div style={{ marginTop: 4, color: "#9a9eae", fontSize: 15 }}>{d.note}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
