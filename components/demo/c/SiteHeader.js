"use client";
import { useEffect, useState } from "react";
import { useContent } from "@/lib/content";

const NAV = [
  { href: "#about", label: "회사 소개", id: "about" },
  { href: "#usage", label: "기술", id: "usage" },
  { href: "#product", label: "제품", id: "product" },
  { href: "/demo/c/newsroom", label: "뉴스룸" },
  { href: "#faq", label: "FAQ", id: "faq" },
];

export default function SiteHeader() {
  const { status } = useContent();
  const [active, setActive] = useState("");

  // 지금 보고 있는 구역의 메뉴를 강조. 구역은 내용을 불러온 뒤에 생기므로 스크롤 위치로 계산
  useEffect(() => {
    if (status !== "ready") return;
    // 화면에 나타나는 순서(메뉴 순서와 다름). 문의 구역은 메뉴가 없어 강조를 끔
    const order = ["about", "product", "usage", "faq", "contact"];
    const inNav = new Set(NAV.filter((n) => n.id).map((n) => n.id));
    const update = () => {
      const line = window.innerHeight * 0.5;
      let cur = "";
      for (const id of order) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) cur = id;
      }
      setActive(inNav.has(cur) ? cur : "");
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [status]);

  return (
    <header className="dc-header">
      <div className="dc-header-in">
        <a href="/demo/c" className="dc-logo" aria-label="슬리피 홈">SLEEPY</a>
        <nav aria-label="주 메뉴">
          <ul className="dc-nav">
            {NAV.map((n) => (
              <li key={n.label}>
                <a
                  href={n.href.startsWith("#") ? `/demo/c${n.href}` : n.href}
                  aria-current={n.id && n.id === active ? "location" : undefined}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <span className="dc-lang" aria-label="언어: 한국어">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <circle cx="12" cy="12" r="10" /><ellipse cx="12" cy="12" rx="4.2" ry="10" /><path d="M2 12h20M4 6.5h16M4 17.5h16" />
          </svg>
          KR
        </span>
      </div>
    </header>
  );
}
