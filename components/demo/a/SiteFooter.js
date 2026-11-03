import Link from "next/link";
import { FOOTER } from "@/lib/siteInfo";

const BASE = "/demo/a";

export default function SiteFooter() {
  const sns = FOOTER.sns.filter((s) => s.url);
  return (
    <footer className="sl-footer">
      <div className="sl-footer-in">
        <div className="sl-footer-top">
          <span className="sl-footer-logo">SLEEPY</span>
          {sns.length > 0 && (
            <ul className="sl-sns">
              {sns.map((s) => (
                <li key={s.label}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={`${s.label} (새 창에서 열림)`}>
                    {s.label.slice(0, 1)}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="sl-footer-body">
          <div>
            <p className="sl-legal">
              {FOOTER.legal.map((l) => (
                <span key={l.label} className={l.strong ? "is-strong" : undefined}>{l.label}</span>
              ))}
            </p>
            <p className="sl-small">{FOOTER.company}</p>
            <p className="sl-small">{FOOTER.copyright}</p>
          </div>
          <ul className="sl-contacts">
            {FOOTER.contacts.map((c) => (
              <li key={c.label}>
                <strong>{c.label}</strong>
                <Link href={BASE + c.href}>{c.text}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
