"use client";
import { Loader } from "@/components/States";
import Reveal from "@/components/site/Reveal";
import BuyLink from "@/components/demo/a/BuyLink";
import InquiryForm from "@/components/demo/a/InquiryForm";

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

/** 히어로 카드: 제품 정보(product.features·usage)에 있는 사실만 사용 */
const HERO_FACTS = [
  ["스마트폰 연결", "필요 없어요"],
  ["설정", "귀에 꽂으면 바로 재생"],
  ["소리 방식", "양쪽 귀에 다른 소리"],
];

const no = (i) => String(i + 1).padStart(2, "0");

export default function DemoA() {
  return (
    <Loader lines={4}>
      {({ home, company, product, faq }) => (
        <>
          {/* 1. 히어로 — 연한 파랑 면 */}
          <section className="da-hero" aria-labelledby="hero-title">
            <div className="da-wrap da-hero-in">
              <div>
                <Reveal as="h1" id="hero-title">
                  {home.hero.title.map((t) => <span key={t}>{t}</span>)}
                </Reveal>
                <Reveal as="p" delay={80} className="da-lead">{home.hero.subtitle}</Reveal>
                <Reveal delay={160} className="da-actions">
                  <BuyLink url={product.purchaseUrl} />
                  <a className="da-btn da-btn-secondary" href="#product" aria-label="제품 자세히 보기">제품 보기 <span aria-hidden="true">→</span></a>
                </Reveal>
                {!product.purchaseUrl && (
                  <p className="da-hint">구매 링크는 준비 중입니다. 출시 소식은 <a href="#contact">문의</a>로 남겨 주세요.</p>
                )}
              </div>
              <Reveal as="figure" delay={120} className="da-hero-fig">
                <img className="da-hero-img" src={home.hero.image} alt={home.hero.imageAlt} />
                <ul className="da-hero-card" aria-label="슬리비 한눈에 보기">
                  {HERO_FACTS.map(([k, v]) => (
                    <li key={k}><span className="da-dot" aria-hidden="true" /><strong>{k}</strong><span>{v}</span></li>
                  ))}
                </ul>
                <figcaption>{home.hero.imageAlt}</figcaption>
              </Reveal>
            </div>
          </section>

          {/* 2. 브랜드·기업 소개 (3문장 이내) — 흰 면 */}
          <section className="da-about" id="about" aria-labelledby="about-title">
            <div className="da-wrap da-about-in">
              <Reveal as="h2" id="about-title">슬리피는 어떤 회사일까요?</Reveal>
              <Reveal className="da-statement">
                {aboutSentences(company).map((t) => <p key={t}>{t}</p>)}
              </Reveal>
            </div>
          </section>

          {/* 3. 제품 상세와 주요 특징 3가지 — 연회색 면, 둥근 카드 */}
          <section className="da-product" id="product" aria-labelledby="product-title">
            <div className="da-wrap">
              <Reveal as="h2" id="product-title">{product.name}</Reveal>
              <Reveal as="p" className="da-lead">{product.summary}</Reveal>
              <ul className="da-cards" tabIndex={0} aria-label="슬리비 주요 특징 3가지 (좌우로 넘겨 보기)">
                {product.features.slice(0, 3).map((t, i) => (
                  <Reveal as="li" key={t} delay={i * 80} className="da-card">
                    <div className={`da-crop da-crop-${i + 1}`} role="img" aria-label={CROP_ALT[i]} />
                    <div className="da-card-body">
                      <h3><span className="da-tag">특징 {no(i)}</span></h3>
                      <p>{t}</p>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </section>

          {/* 4. 사용 방법 3단계 + 기대 효과 — 연한 분홍 면 */}
          <section className="da-usage" id="usage" aria-labelledby="usage-title">
            <div className="da-wrap">
              <Reveal as="h2" id="usage-title">어떻게 사용하나요?</Reveal>
              <ol className="da-steps">
                {product.usage.slice(0, 3).map((t, i) => (
                  <Reveal as="li" key={t} delay={i * 80} className="da-step">
                    <span className="da-step-no" aria-hidden="true">{no(i)}</span>
                    <p>{t}</p>
                  </Reveal>
                ))}
              </ol>
              <Reveal className="da-effects">
                <h3>기대 효과 <span className="da-tag">확정 전 문구</span></h3>
                <ul>{product.effects.map((t) => <li key={t}>{t}</li>)}</ul>
                <div className="da-evidence">
                  <strong>EVIDENCE</strong>
                  [허가·인증·임상 근거 정보: 확정 후 입력] <span className="da-tag">확정 전</span>
                </div>
              </Reveal>
            </div>
          </section>

          {/* 5. FAQ 5개 — 흰 면 */}
          <section className="da-faq" id="faq" aria-labelledby="faq-title">
            <div className="da-wrap">
              <Reveal as="h2" id="faq-title">궁금한 점이 있으신가요?</Reveal>
              <div className="da-faq-list">
                {faqFive(faq).map((f) => (
                  <details key={f.id}>
                    <summary><span>{f.q}{f.ph && <span className="da-tag">확정 전</span>}</span></summary>
                    <p>{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* 6. 문의 폼 — 연한 파랑 면 */}
          <section className="da-contact" id="contact" aria-labelledby="contact-title">
            <div className="da-wrap da-contact-in">
              <div>
                <Reveal as="h2" id="contact-title">더 궁금한 점이 있으신가요?</Reveal>
                <Reveal as="p" className="da-body">궁금한 점을 남겨 주시면 확인 후 연락드리겠습니다.</Reveal>
              </div>
              <InquiryForm />
            </div>
          </section>

          {/* 마무리 띠: 데스크톱에서도 구매로 이어지는 길 (모바일은 하단 바가 대신함) */}
          <section className="da-closing" aria-labelledby="closing-title">
            <div className="da-wrap">
              <div className="da-closing-in">
                <div>
                  <Reveal as="h2" id="closing-title">오늘 밤은 편안하게 시작해 볼까요?</Reveal>
                  <Reveal as="p" delay={80} className="da-lead">{product.summary}</Reveal>
                </div>
                <Reveal delay={160} className="da-actions"><BuyLink url={product.purchaseUrl} /></Reveal>
              </div>
            </div>
          </section>
        </>
      )}
    </Loader>
  );
}
