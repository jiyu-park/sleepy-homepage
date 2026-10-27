"use client";
import Link from "next/link";
import { Loader, BuyButton } from "@/components/States";

export default function Home() {
  return (
    <Loader lines={4}>
      {({ company, product }) => (
        <>
          <section className="hero">
            <p className="eyebrow">Sleepy</p>
            <h1>{product.summary || company.intro}</h1>
            <p className="lead">{company.intro}</p>
            <div className="actions">
              <BuyButton url={product.purchaseUrl} />
              <Link className="btn" href="/product">제품 알아보기</Link>
            </div>
          </section>

          <section aria-labelledby="story">
            <h2 id="story">브랜드 이야기</h2>
            <p>{company.brandStory}</p>
          </section>

          <section aria-labelledby="highlights">
            <h2 id="highlights">주요 특징</h2>
            {product.features?.length ? (
              <ul className="cards">
                {product.features.slice(0, 3).map((f) => <li key={f} className="card">{f}</li>)}
              </ul>
            ) : (
              <p>준비 중입니다. <Link href="/inquiry">문의하기</Link></p>
            )}
          </section>
        </>
      )}
    </Loader>
  );
}
