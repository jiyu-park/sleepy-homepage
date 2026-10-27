"use client";
import { Loader, EmptyBox, BuyButton } from "@/components/States";

function List({ id, title, items, ordered }) {
  const Tag = ordered ? "ol" : "ul";
  return (
    <section aria-labelledby={id}>
      <h2 id={id}>{title}</h2>
      {items?.length ? <Tag className="list">{items.map((t) => <li key={t}>{t}</li>)}</Tag> : <p>준비 중입니다.</p>}
    </section>
  );
}

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
            <List id="features" title="주요 특징" items={product.features} />
            <List id="usage" title="사용 방법" items={product.usage} ordered />
            <List id="effects" title="기대 효과" items={product.effects} />
            <div className="actions"><BuyButton url={product.purchaseUrl} /></div>
          </>
        )
      }
    </Loader>
  );
}
