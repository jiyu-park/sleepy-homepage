"use client";
import Link from "next/link";
import { useContent } from "@/lib/content";

export function Skeleton({ lines = 3 }) {
  return (
    <div className="skeleton-wrap" role="status" aria-live="polite" aria-busy="true">
      <span className="sr-only">내용을 불러오는 중입니다</span>
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="skeleton" style={{ width: `${95 - i * 12}%` }} />
      ))}
    </div>
  );
}

export function ErrorBox() {
  const { retry } = useContent();
  return (
    <div className="state-box" role="alert">
      <p>내용을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.</p>
      <button className="btn" onClick={retry}>다시 시도</button>
    </div>
  );
}

export function EmptyBox({ what }) {
  return (
    <div className="state-box">
      <p>{what} 내용은 준비 중입니다.</p>
      <Link className="btn" href="/inquiry">문의하기</Link>
    </div>
  );
}

/** 로딩/오류 상태를 처리하고, 준비되면 render(data)를 호출 */
export function Loader({ lines, children }) {
  const { status, data } = useContent();
  if (status === "loading") return <Skeleton lines={lines} />;
  if (status === "error") return <ErrorBox />;
  return children(data);
}

export function BuyButton({ url }) {
  if (!url) {
    return (
      <>
        <Link className="btn btn-primary" href="/inquiry">출시 소식 받기</Link>
        <button className="btn" disabled aria-disabled="true">구매하러 가기</button>
        <p className="hint hint-row">구매 링크는 아직 준비 중입니다. 문의를 남겨 주시면 출시 소식을 안내드립니다.</p>
      </>
    );
  }
  return (
    <a className="btn btn-primary" href={url} target="_blank" rel="noopener noreferrer">
      구매하러 가기 <span className="sr-only">(새 창에서 열림)</span>
    </a>
  );
}
