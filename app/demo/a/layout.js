import "./css/00-tokens.css";
import "./css/10-base.css";
import "./css/20-header-footer.css";
import "./css/30-home.css";
import "./css/40-company.css";
import "./css/50-plain.css";
import "./css/60-inquiry.css";
import "./css/70-buybar.css";
import SiteHeader from "@/components/demo/a/SiteHeader";
import SiteFooter from "@/components/demo/a/SiteFooter";
import BuyBar from "@/components/demo/a/BuyBar";

export const metadata = { title: "슬리피 — A안" };

export default function DemoALayout({ children }) {
  return (
    <div className="sl da">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css" precedence="default" />
      <SiteHeader />
      <main id="main" className="sl-main">{children}</main>
      <SiteFooter />
      <BuyBar />
    </div>
  );
}
