"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "@/lib/siteInfo";

const BASE = "/demo/a";

export default function SiteHeader() {
  const path = usePathname();
  return (
    <header className="sl-header">
      <div className="sl-header-in">
        <Link href={BASE} className="sl-logo" aria-label="슬리피 홈">SLEEPY</Link>
        <nav aria-label="주 메뉴">
          <ul className="sl-nav">
            {NAV.map((n) => {
              const href = BASE + n.href;
              return (
                <li key={href}>
                  <Link href={href} aria-current={path === href || path.startsWith(`${href}/`) ? "page" : undefined}>
                    {n.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <span className="sl-lang" aria-label="언어: 한국어">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <circle cx="12" cy="12" r="10" /><ellipse cx="12" cy="12" rx="4.2" ry="10" /><path d="M2 12h20M4 6.5h16M4 17.5h16" />
          </svg>
          KR
        </span>
      </div>
    </header>
  );
}
