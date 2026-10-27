import "./globals.css";
import Header from "@/components/Header";
import { ContentProvider } from "@/lib/content";

export const metadata = {
  title: "슬리피 — 편안한 밤을 위한 수면 루틴",
  description: "잠들기 전 10분, 차분한 밤을 만드는 슬리피. 제품 특징과 사용법, FAQ를 확인하세요.",
  openGraph: {
    title: "슬리피",
    description: "편안한 밤을 위한 수면 루틴 서비스",
    type: "website",
    locale: "ko_KR",
  },
};

export const viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <a className="skip" href="#main">본문 바로가기</a>
        <ContentProvider>
          <Header />
          <main id="main" className="container">{children}</main>
          <footer className="footer">
            <div className="container">© Sleepy. 본 서비스는 의료 행위나 치료를 대체하지 않습니다.</div>
          </footer>
        </ContentProvider>
      </body>
    </html>
  );
}
