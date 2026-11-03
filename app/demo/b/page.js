"use client";
import { Loader } from "@/components/States";
import Reveal from "@/components/site/Reveal";
import BuyLink from "@/components/demo/b/BuyLink";
import InquiryForm from "@/components/demo/b/InquiryForm";

const CROP_ALT = ["슬리비 본체 두 개를 확대한 사진", "슬리비 충전 케이스를 확대한 사진", "슬리비 사용 설명서를 확대한 사진"];

/** 소개 글: 회사 소개 한 줄 + 브랜드 이야기 문장들(초안 안내 괄호는 제외), 3문장 이내 */
function aboutSentences(company) {
  const story = (company.brandStory || "").replace(/\(※[^)]*\)/g, "").trim();
  const parts = story.split(/(?<=다\.)\s+/).filter(Boolean);
  return [company.intro, ...parts].filter(Boolean).slice(0, 3);
}

/** FAQ는 5개로 맞추고, 비어 있는 칸은 자리표시로 둡니다 */
function faqFive(faq = []) {
  const items = faq.slice(0, 5).map((f) => ({ id: f.id, q: f.question, a: f.answer }));
  for (let i = items.length; i < 5; i++) items.push({ id: `ph-${i}`, q: `[질문 ${i + 1}]`, a: `[답변 ${i + 1}]`, ph: true });
  return items;
}

export default function DemoB() {
  return (
    <Loader lines={4}>
      {({ home, company, product, faq }) => (
        <>
          {/* 1. 히어로 */}
          <section className="db-hero" aria-labelledby="hero-title">
            {/* 히어로 배경 사진(장식): 해 질 녘 안개 낀 숲. 이미지는 30-hero.css에서 지정 */}
            <div className="db-hero-bg" aria-hidden="true" />
            <div className="db-wrap db-hero-in">
              <div className="db-hero-text">
                <Reveal as="h1" id="hero-title">
                  {home.hero.title.map((t) => <span key={t}>{t}</span>)}
                </Reveal>
                <Reveal as="p" delay={150} className="db-sub">{home.hero.subtitle}</Reveal>
                <Reveal as="p" delay={300} className="db-lead">{company.intro}</Reveal>
                <Reveal delay={450} className="db-actions">
                  <BuyLink url={product.purchaseUrl} />
                  <a className="db-pill" href="#product" aria-label="제품 자세히 보기">제품 보기</a>
                </Reveal>
                {!product.purchaseUrl && (
                  <p className="db-hint">구매 링크는 준비 중입니다. 출시 소식은 <a href="#contact">문의</a>로 남겨 주세요.</p>
                )}
              </div>
            </div>
            <a className="db-scrollcue" href="#about" aria-label="아래로 스크롤: 회사 소개로 이동">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
            </a>
          </section>

          {/* 2. 브랜드·기업 소개 (3문장 이내) */}
          <section className="db-about" id="about" aria-labelledby="about-title">
            <div className="db-wrap">
              <Reveal as="p" className="db-eyebrow">01 · 소개</Reveal>
              <Reveal as="h2" id="about-title">슬리피는 이런 회사입니다</Reveal>
              {aboutSentences(company).map((t, i) => (
                <Reveal as="p" key={t} delay={i * 120} className="db-lead">{t}</Reveal>
              ))}
            </div>
          </section>

          {/* 3. 제품 상세와 주요 특징 3가지 */}
          <section className="db-product" id="product" aria-labelledby="product-title">
            <div className="db-wrap">
              <Reveal as="p" className="db-eyebrow">02 · 제품</Reveal>
              <Reveal as="h2" id="product-title">{product.name}</Reveal>
              <Reveal as="p" className="db-lead">{product.summary}</Reveal>
              {/* 실제 제품 사진 (원래 홈페이지에서 쓰던 사진) */}
              <Reveal delay={120}>
                <img className="db-product-img" src={home.hero.image} alt={home.hero.imageAlt} />
              </Reveal>
              <ul className="db-features">
                {product.features.slice(0, 3).map((t, i) => (
                  <Reveal as="li" key={t} delay={i * 120} className="db-feature">
                    <div className={`db-crop db-crop-${i + 1}`} role="img" aria-label={CROP_ALT[i]} />
                    <h3>특징 {String(i + 1).padStart(2, "0")}</h3>
                    <p>{t}</p>
                  </Reveal>
                ))}
              </ul>
            </div>
          </section>

          {/* 4. 사용 방법 3단계 + 기대 효과 */}
          <section className="db-usage" id="usage" aria-labelledby="usage-title">
            <div className="db-wrap">
              <Reveal as="p" className="db-eyebrow">03 · 사용 방법</Reveal>
              <Reveal as="h2" id="usage-title">이렇게 사용하세요</Reveal>
              <ol className="db-steps">
                {product.usage.slice(0, 3).map((t, i) => (
                  <Reveal as="li" key={t} delay={i * 120} className="db-step">
                    <span className="db-step-no" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                    <p>{t}</p>
                  </Reveal>
                ))}
              </ol>
              <Reveal className="db-effects">
                <h3>기대 효과 <span className="db-badge">확정 전 문구</span></h3>
                <ul>{product.effects.map((t) => <li key={t}>{t}</li>)}</ul>
              </Reveal>
            </div>
          </section>

          {/* 5. FAQ 5개 */}
          <section className="db-faq" id="faq" aria-labelledby="faq-title">
            <div className="db-wrap">
              <Reveal as="p" className="db-eyebrow">04 · FAQ</Reveal>
              <Reveal as="h2" id="faq-title">자주 묻는 질문</Reveal>
              <div className="db-faq-list">
                {faqFive(faq).map((f) => (
                  <details key={f.id}>
                    <summary><span>{f.q}{f.ph && <span className="db-badge">확정 전</span>}</span></summary>
                    <p>{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* 6. 문의 폼 */}
          <section className="db-contact" id="contact" aria-labelledby="contact-title">
            <div className="db-wrap db-contact-in">
              <div>
                <Reveal as="p" className="db-eyebrow">05 · 문의</Reveal>
                <Reveal as="h2" id="contact-title">문의하기</Reveal>
                <Reveal as="p" className="db-lead">궁금한 점을 남겨 주시면 확인 후 연락드리겠습니다.</Reveal>
              </div>
              <InquiryForm />
            </div>
          </section>

          {/* 마무리 띠: 데스크톱에서도 구매로 이어지는 길 (모바일은 하단 바가 대신함) */}
          <section className="db-closing" aria-labelledby="closing-title">
            <div className="db-wrap">
              <Reveal as="h2" id="closing-title">편안한 밤을 시작하세요</Reveal>
              <Reveal as="p" delay={120} className="db-sub">{product.summary}</Reveal>
              <Reveal delay={240} className="db-actions"><BuyLink url={product.purchaseUrl} /></Reveal>
            </div>
          </section>
        </>
      )}
    </Loader>
  );
}
