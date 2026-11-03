import Link from "next/link";

export default function DemoCHeader() {
  return (
    <header className="dc-header">
      <Link href="/demo/c" className="dc-logo">슬리피</Link>
      <Link href="/demo">데모 목록</Link>
    </header>
  );
}
