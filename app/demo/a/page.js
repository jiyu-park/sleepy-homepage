"use client";
import Link from "next/link";
import { Loader } from "@/components/States";
import Reveal from "@/components/site/Reveal";
import InquiryForm from "@/components/demo/a/InquiryForm";

function BuyPill({ url }) {
  if (!url) {
    return <button className="sl-btn sl-btn-buy" disabled aria-disabled="true">구매하러 가기</button>;
  }
  return (
    <a className="sl-btn sl-btn-buy" href={url} target="_blank" rel="noopener noreferrer">
      구매하러 가기 <span className="sr-only">(새 창에서 열림)</span>
    </a>
  );
}

export default function Home() {
  return (
    <Loader lines={4}>
      {({ home, product }) => (
        <>
          <section className="sl-hero" aria-labelledby="hero-title">
            <Reveal className="sl-wrap">
              <h1 id="hero-title">
                {home.hero.title.map((t) => <span key={t}>{t}<br /></span>)}
              </h1>
              <p className="sl-hero-sub">{home.hero.subtitle}</p>
              <div className="sl-actions">
                <Link className="sl-btn sl-btn-secondary" href="/demo/a/product">제품 보기</Link>
                <BuyPill url={product.purchaseUrl} />
              </div>
              {!product.purchaseUrl && (
                <p className="sl-hint">구매 링크는 아직 준비 중입니다. <Link href="/demo/a/inquiry">출시 소식 받기</Link></p>
              )}
            </Reveal>
            <Reveal delay={150}>
              <img className="sl-hero-img" src={home.hero.image} alt={home.hero.imageAlt} />
            </Reveal>
          </section>

          <section className="sl-adv" aria-labelledby="adv-title">
            <div className="sl-wrap">
              <Reveal as="h2" id="adv-title">{home.advantagesTitle}</Reveal>
              <ul className="sl-bento">
                {home.advantages.map((a, i) => (
                  <Reveal as="li" key={a.title} delay={i * 90} className={`sl-card${i === 0 ? " is-feature" : ""}`}>
                    <span className="icon"><img src={a.icon} alt="" /></span>
                    <h3>{a.title}</h3>
                    <p>{a.desc}</p>
                  </Reveal>
                ))}
              </ul>
            </div>
          </section>

          <section className="sl-use" aria-labelledby="use-title">
            <div className="sl-wrap">
              <Reveal as="h2" id="use-title">{home.usecasesTitle}</Reveal>
              <ul className="sl-cards3">
                {home.usecases.map((u, i) => (
                  <Reveal as="li" key={u.title} delay={i * 90} className="sl-use-card">
                    <img className="dot" src="/images/home/usecase-dot.svg" alt="" />
                    <h3>{u.title}</h3>
                    <p>{u.desc}</p>
                  </Reveal>
                ))}
              </ul>
            </div>
          </section>

          <section className="sl-sum" aria-label="회사 소개 요약">
            <Reveal className="sl-sum-box">
              <p>{home.summary.text.map((t) => <span key={t}>{t}<br /></span>)}</p>
              <Link className="sl-btn sl-btn-secondary" href="/demo/a/company">{home.summary.cta}</Link>
            </Reveal>
          </section>

          <section className="sl-inq" aria-labelledby="inq-title">
            <div className="sl-wrap sl-inq-in">
              <Reveal as="h2" id="inq-title">문의하기</Reveal>
              <Reveal delay={90}><InquiryForm /></Reveal>
            </div>
          </section>
        </>
      )}
    </Loader>
  );
}
