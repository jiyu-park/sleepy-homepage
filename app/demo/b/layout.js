import "./css/00-tokens.css";
import "./css/10-base.css";
import "./css/20-header-footer.css";
import "./css/30-hero.css";
import "./css/40-sections.css";
import "./css/50-faq.css";
import "./css/60-contact.css";
import "./css/65-closing.css";
import "./css/70-buybar.css";
import "./css/80-dawn.css";
import SiteHeader from "@/components/demo/b/SiteHeader";
import BuyBar from "@/components/demo/b/BuyBar";

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "슬리피 — 앱 없이 쓰는 디지털 귀마개 슬리비 (B안)",
  description: "약물이 아닌 방법으로 수면을 돕는 슬리피. 디지털 귀마개 슬리비의 원리, 사용법, FAQ를 확인하세요.",
  openGraph: {
    title: "슬리피",
    description: "앱 없이 귀에 꽂기만 하는 디지털 귀마개 슬리비",
    type: "website",
    locale: "ko_KR",
    images: [{ url: "/images/demo-b/og.jpg", width: 1200, height: 630, alt: "해 질 녘 안개 낀 숲" }],
  },
};

export default function DemoBLayout({ children }) {
  return (
    <div className="db">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css" precedence="default" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@300;400&display=swap" precedence="default" />
      <div className="db-notice-bar">디자인 시안 (B안) · [ ]로 표시된 곳과 "확정 전" 문구는 최종 내용이 아닙니다</div>
      <SiteHeader />
      <main id="main">{children}</main>
      <footer className="db-footer">
        <div className="db-wrap">
          <span className="db-footer-logo">SLEEPY</span>
          <p>주식회사 슬리피 · 대표 서정화 · 서울 성북구 화랑로 211 105호 · 사업자등록번호 417-88-03066 · 문의 sleeby00@gmail.com</p>
          <p>© Sleepy Inc. All rights reserved.</p>
        </div>
      </footer>
      <BuyBar />
    </div>
  );
}
