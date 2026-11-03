"use client";
import { Loader } from "@/components/States";

export default function DemoC() {
  return (
    <Loader lines={4}>
      {({ home }) => (
        <>
          <section className="dc-hero">
            <h1>{home.hero.title.map((t) => <span key={t} style={{ display: "block" }}>{t}</span>)}</h1>
            <p>{home.hero.subtitle}</p>
            <img src={home.hero.image} alt={home.hero.imageAlt} />
          </section>
          <section>
            <h2>{home.advantagesTitle}</h2>
            <ul>{home.advantages.map((a) => <li key={a.title}><strong>{a.title}</strong> {a.desc}</li>)}</ul>
          </section>
          <section>
            <h2>{home.usecasesTitle}</h2>
            <ul>{home.usecases.map((u) => <li key={u.title}><strong>{u.title}</strong> {u.desc}</li>)}</ul>
          </section>
        </>
      )}
    </Loader>
  );
}
