import "./globals.css";
import Header from "@/components/Header";
import { ContentProvider } from "@/lib/content";

export const metadata = {
  title: "슬리피 — 앱 없이 쓰는 디지털 귀마개 슬리비",
  description: "약물이 아닌 방법으로 수면을 돕는 슬리피. 디지털 귀마개 슬리비의 원리, 사용법, FAQ를 확인하세요.",
  openGraph: {
    title: "슬리피",
    description: "앱 없이 귀에 꽂기만 하는 디지털 귀마개 슬리비",
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
