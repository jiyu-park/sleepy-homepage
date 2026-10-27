"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/product", label: "제품" },
  { href: "/faq", label: "FAQ" },
  { href: "/inquiry", label: "문의" },
];

export default function Header() {
  const path = usePathname();
  return (
    <header className="header">
      <div className="container header-inner">
        <Link href="/" className="logo" aria-label="슬리피 홈">
          <span aria-hidden="true">🌙</span> Sleepy
        </Link>
        <nav aria-label="주 메뉴">
          <ul className="nav">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} aria-current={path === l.href ? "page" : undefined}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
