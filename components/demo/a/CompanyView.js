"use client";
import Link from "next/link";
import { Loader } from "@/components/States";
import Reveal, { useInView } from "@/components/site/Reveal";

function TechStage({ tech }) {
  const [ref, inView] = useInView(0.35);
  return (
    <div
      ref={ref}
      className={`sl-stage${inView ? " is-in" : ""}`}
      role="img"
      aria-label={`${tech.left}와 ${tech.right}에 서로 다른 소리가 전달되어 ${tech.center.join(" ")}가 만들어집니다`}
    >
      <div className="sl-ear left"><img src="/images/company/ear.svg" alt="" /><span>{tech.left}</span></div>
      <div className="sl-ear right"><img src="/images/company/ear.svg" alt="" /><span>{tech.right}</span></div>
      <img className="sl-line left" src="/images/company/line-left.svg" alt="" />
      <img className="sl-line right" src="/images/company/line-right.svg" alt="" />
      <div className="sl-head">
        <img src="/images/company/head.svg" alt="" />
        <span>{tech.center.map((t) => <span key={t}>{t}<br /></span>)}</span>
      </div>
      <p className="sl-cap left">{tech.caption}</p>
      <p className="sl-cap right">{tech.caption}</p>
    </div>
  );
}

function History({ items }) {
  const [ref, inView] = useInView(0.25);
  return (
    <ol ref={ref} className={`sl-steps${inView ? " is-in" : ""}`}>
      {items.map((h, i) => (
        <li
          key={`${h.year}-${h.label}`}
          className={`sl-step ${i % 2 === 0 ? "is-right" : "is-left"}`}
          style={{ transitionDelay: `${300 + i * 220}ms` }}
        >
          <img className="dot" src="/images/company/step-dot.svg" alt="" />
          <p className="item">
            <span className="y">{h.year}</span>
            <span>{h.label}</span>
          </p>
        </li>
      ))}
    </ol>
  );
}

export default function CompanyView() {
  return (
    <Loader lines={4}>
      {({ about }) => (
        <>
          <section className="sl-about-hero" aria-labelledby="about-title">
            <Reveal className="sl-wrap">
              <h1 id="about-title">{about.title}</h1>
              <p>{about.subtitle}</p>
            </Reveal>
          </section>

          <section className="sl-ceo" aria-label="대표 소개">
            <div className="sl-wrap sl-ceo-in">
              <Reveal as="div"><img src={about.ceo.photo} alt={about.ceo.photoAlt} /></Reveal>
              <Reveal delay={120}>
                <h2>{about.ceo.name}</h2>
                <p className="role">{about.ceo.role}</p>
                <div className="body">
                  {about.ceo.body.map((t) => <p key={t}>{t}</p>)}
                </div>
              </Reveal>
            </div>
          </section>

          <section className="sl-tech" aria-labelledby="tech-title">
            <div className="sl-wrap">
              <Reveal as="h2" id="tech-title">{about.tech.title}</Reveal>
              <TechStage tech={about.tech} />
              <Reveal as="p" delay={200} className="sl-tech-desc">
                {about.tech.desc.map((t) => <span key={t}>{t}<br /></span>)}
              </Reveal>
            </div>
          </section>

          <section className="sl-history" aria-labelledby="history-title">
            <div className="sl-wrap">
              <Reveal as="h2" id="history-title">{about.historyTitle}</Reveal>
            </div>
            <History items={about.history} />
          </section>

          <section className="sl-cta" aria-labelledby="cta-title">
            <Reveal className="sl-wrap">
              <h2 id="cta-title">슬리비가 궁금하신가요?</h2>
              <p>제품 소개를 보거나, 제휴·문의를 남겨 주세요.</p>
              <div className="sl-actions">
                <Link className="sl-btn sl-btn-primary" href="/demo/a/product">제품 보기</Link>
                <Link className="sl-btn sl-btn-secondary" href="/demo/a/inquiry">문의하기</Link>
              </div>
            </Reveal>
          </section>
        </>
      )}
    </Loader>
  );
}
