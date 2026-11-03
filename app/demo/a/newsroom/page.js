import Link from "next/link";

export const metadata = { title: "뉴스룸 — 슬리피 (A안)" };

export default function Page() {
  return (
    <div className="sl-plain">
      <h1>뉴스룸</h1>
      <p className="lead">[뉴스룸 페이지: 내용 확정 후 입력]</p>
      <Link className="sl-btn sl-btn-secondary" href="/demo/a">홈으로</Link>
    </div>
  );
}
