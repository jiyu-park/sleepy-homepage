"use client";
import { useContent } from "@/lib/content";

/** 하단 고정 구매 바. 모바일(719px 이하)에서만 보입니다. */
export default function BuyBar() {
  const { data } = useContent();
  const url = data?.product?.purchaseUrl;
  return (
    <div className="sl-buybar">
      {url ? (
        <a className="sl-btn sl-btn-buy" href={url} target="_blank" rel="noopener noreferrer" aria-label="구매하러 가기 (새 창에서 열림)">구매하러 가기</a>
      ) : (
        <button className="sl-btn sl-btn-buy" disabled aria-disabled="true" aria-label="구매하러 가기 (링크 준비 중)">구매하러 가기</button>
      )}
    </div>
  );
}
