import "./c.css";
import DemoCHeader from "@/components/demo/DemoCHeader";

export const metadata = { title: "슬리피 — C안" };

export default function DemoCLayout({ children }) {
  return (
    <div className="dc">
      <DemoCHeader />
      <main id="main">{children}</main>
      <footer className="dc-footer">© Sleepy Inc. · C안 데모</footer>
    </div>
  );
}
