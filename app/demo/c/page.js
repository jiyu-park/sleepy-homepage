"use client";
import { Loader } from "@/components/States";
import Reveal from "@/components/site/Reveal";
import BuyLink from "@/components/demo/c/BuyLink";
import InquiryForm from "@/components/demo/c/InquiryForm";

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

export default function DemoC() {
  return (
    <Loader lines={4}>
      {({ home, company, product, faq }) => {
        const about = aboutSentences(company);
        return (
          <>
            {/* 1. 히어로 */}
            <section className="dc-hero" aria-labelledby="hero-title">
              <div className="dc-wrap">
                <Reveal as="p" className="dc-eyebrow">{product.name}</Reveal>
                <Reveal as="h1" id="hero-title" delay={80}>
                  {home.hero.title.map((t) => <span key={t}>{t}</span>)}
                </Reveal>
                <Reveal delay={200} className="dc-hero-media">
                  <img className="dc-hero-img" src={home.hero.image} alt={home.hero.imageAlt} />
                </Reveal>
                <Reveal as="p" delay={300} className="dc-sub">{home.hero.subtitle}</Reveal>
                <Reveal delay={400} className="dc-actions">
                  <BuyLink url={product.purchaseUrl} />
                  <a className="dc-textlink" href="#product" aria-label="제품 자세히 보기">제품 보기 <span aria-hidden="true">›</span></a>
                </Reveal>
                {!product.purchaseUrl && (
                  <p className="dc-hint">구매 링크는 준비 중입니다. 출시 소식은 <a href="#contact">문의</a>로 남겨 주세요.</p>
                )}
              </div>
            </section>

            {/* 2. 브랜드·기업 소개 (3문장 이내) */}
            <section className="dc-about" id="about" aria-labelledby="about-title">
              <div className="dc-wrap">
                <h2 id="about-title" className="sr-only">슬리피는 이런 회사입니다</h2>
                <Reveal as="p" className="dc-statement">
                  {about[0]}
                  {about.length > 1 && <span className="dc-muted"> {about.slice(1).join(" ")}</span>}
                </Reveal>
              </div>
            </section>

            {/* 3. 제품 상세와 주요 특징 3가지 */}
            <section className="dc-product" id="product" aria-labelledby="product-title">
              <div className="dc-wrap">
                <Reveal as="p" className="dc-kicker">제품</Reveal>
                <Reveal as="h2" id="product-title">{product.name}</Reveal>
                <Reveal as="p" className="dc-lead">{product.summary}</Reveal>
                <ul className="dc-cards" tabIndex={0} aria-label="슬리비 주요 특징 3가지 (좌우로 넘겨 보기)">
                  {product.features.slice(0, 3).map((t, i) => (
                    <Reveal as="li" key={t} delay={i * 120} className="dc-card">
                      <div className={`dc-crop dc-crop-${i + 1}`} role="img" aria-label={CROP_ALT[i]} />
                      <h3>특징 {String(i + 1).padStart(2, "0")}</h3>
                      <p>{t}</p>
                    </Reveal>
                  ))}
                </ul>
              </div>
            </section>

            {/* 4. 사용 방법 3단계 + 기대 효과 */}
            <section className="dc-usage" id="usage" aria-labelledby="usage-title">
              <div className="dc-wrap">
                <Reveal as="p" className="dc-kicker">사용 방법</Reveal>
                <Reveal as="h2" id="usage-title">이렇게 사용하세요</Reveal>
                <ol className="dc-steps">
                  {product.usage.slice(0, 3).map((t, i) => (
                    <Reveal as="li" key={t} delay={i * 120} className="dc-step">
                      <span className="dc-step-no" aria-hidden="true">{i + 1}</span>
                      <p>{t}</p>
                    </Reveal>
                  ))}
                </ol>
                <Reveal className="dc-effects">
                  <h3>기대 효과 <span className="dc-badge">확정 전 문구</span></h3>
                  <ul>{product.effects.map((t) => <li key={t}>{t}</li>)}</ul>
                </Reveal>
              </div>
            </section>

            {/* 5. FAQ 5개 */}
            <section className="dc-faq" id="faq" aria-labelledby="faq-title">
              <div className="dc-wrap">
                <Reveal as="p" className="dc-kicker">FAQ</Reveal>
                <Reveal as="h2" id="faq-title">자주 묻는 질문</Reveal>
                <div className="dc-faq-list" style={{ marginTop: 48 }}>
                  {faqFive(faq).map((f) => (
                    <details key={f.id}>
                      <summary><span>{f.q}{f.ph && <span className="dc-badge">확정 전</span>}</span></summary>
                      <p>{f.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            </section>

            {/* 6. 문의 폼 */}
            <section className="dc-contact" id="contact" aria-labelledby="contact-title">
              <div className="dc-wrap">
                <Reveal as="h2" id="contact-title">문의하기</Reveal>
                <Reveal as="p" className="dc-body">궁금한 점을 남겨 주시면 확인 후 연락드리겠습니다.</Reveal>
                <InquiryForm />
              </div>
            </section>

            {/* 마무리 띠: 데스크톱에서도 구매로 이어지는 길 (모바일은 하단 바가 대신함) */}
            <section className="dc-closing" aria-labelledby="closing-title">
              <div className="dc-wrap">
                <Reveal as="h2" id="closing-title">편안한 밤을 시작하세요</Reveal>
                <Reveal as="p" delay={120} className="dc-lead">{product.summary}</Reveal>
                <Reveal delay={240} className="dc-actions"><BuyLink url={product.purchaseUrl} /></Reveal>
              </div>
            </section>
          </>
        );
      }}
    </Loader>
  );
}
