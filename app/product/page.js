"use client";
import { Loader, EmptyBox, BuyButton } from "@/components/States";

function Section({ id, title, children }) {
  return (
    <section aria-labelledby={id}>
      <h2 id={id}>{title}</h2>
      {children}
    </section>
  );
}

const Empty = () => <p>준비 중입니다.</p>;

export default function Product() {
  return (
    <Loader lines={5}>
      {({ product }) =>
        !product?.name ? (
          <EmptyBox what="제품 정보" />
        ) : (
          <>
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
            <div className="actions"><BuyButton url={product.purchaseUrl} /></div>
          </>
        )
      }
    </Loader>
  );
}
