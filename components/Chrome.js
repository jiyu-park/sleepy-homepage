"use client";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";

/** /demo 아래 화면은 안마다 자체 머리말·푸터를 쓰고, 나머지는 기존 틀을 그대로 사용 */
export default function Chrome({ children }) {
  const path = usePathname();
  if (path === "/demo" || path.startsWith("/demo/")) return children;
  return (
    <>
      <Header />
      <main id="main" className="container">{children}</main>
      <footer className="footer">
        <div className="container">© Sleepy. 본 서비스는 의료 행위나 치료를 대체하지 않습니다.</div>
      </footer>
    </>
  );
}
