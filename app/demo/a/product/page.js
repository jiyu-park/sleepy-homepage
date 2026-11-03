"use client";
import Link from "next/link";
import { Loader, EmptyBox } from "@/components/States";

const BASE = "/demo/a";

function Section({ id, title, children }) {
  return (
    <section aria-labelledby={id}>
      <h2 id={id}>{title}</h2>
      {children}
    </section>
  );
}

const Empty = () => <p>준비 중입니다.</p>;

function Buy({ url }) {
  if (!url) {
    return (
      <>
        <Link className="sl-btn sl-btn-primary" href={`${BASE}/inquiry`}>출시 소식 받기</Link>
        <button className="sl-btn sl-btn-buy" disabled aria-disabled="true" aria-label="구매하러 가기 (준비 중)">구매하러 가기</button>
        <p className="sl-hint">구매 링크는 아직 준비 중입니다. 문의를 남겨 주시면 출시 소식을 안내드립니다.</p>
      </>
    );
  }
  return (
    <a className="sl-btn sl-btn-buy" href={url} target="_blank" rel="noopener noreferrer" aria-label="구매하러 가기 (새 창에서 열림)">
      구매하러 가기
    </a>
  );
}

export default function Product() {
  return (
    <Loader lines={5}>
      {({ product }) =>
        !product?.name ? (
          <EmptyBox what="제품 정보" />
        ) : (
          <div className="sl-plain">
            <h1>{product.name}</h1>
            <p className="lead">{product.summary}</p>
            {product.images?.length > 0 && (
              <div className="gallery">
                {product.images.map((src) => <img key={src} src={src} alt={`${product.name} 제품 이미지`} />)}
              </div>
            )}
            <Section id="features" title="주요 특징">
              {product.features?.length ? (
                <ul className="cards">
                  {product.features.map((t) => <li key={t} className="card">{t}</li>)}
                </ul>
              ) : <Empty />}
            </Section>
            <Section id="usage" title="사용 방법">
              {product.usage?.length ? (
                <ol className="steps">
                  {product.usage.map((t, i) => (
                    <li key={t}><span className="step-no" aria-hidden="true">{i + 1}</span><span>{t}</span></li>
                  ))}
                </ol>
              ) : <Empty />}
            </Section>
            <Section id="effects" title="기대 효과">
              {product.effects?.length ? (
                <div className="callout">
                  <ul>{product.effects.map((t) => <li key={t}>{t}</li>)}</ul>
                </div>
              ) : <Empty />}
            </Section>
            <div className="sl-actions sl-actions-left"><Buy url={product.purchaseUrl} /></div>
          </div>
        )
      }
    </Loader>
  );
}
