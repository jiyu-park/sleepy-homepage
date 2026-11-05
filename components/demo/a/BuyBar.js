"use client";
import { useContent } from "@/lib/content";
import BuyLink from "@/components/demo/a/BuyLink";

/** 하단 고정 구매 바. 모바일(719px 이하)에서만 보입니다. */
export default function BuyBar() {
  const { data } = useContent();
  return (
    <div className="da-buybar">
      <BuyLink url={data?.product?.purchaseUrl} />
    </div>
  );
}
