"use client";
import { Loader, EmptyBox } from "@/components/States";

export default function Faq() {
  return (
    <>
      <h1>자주 묻는 질문</h1>
      <Loader lines={4}>
        {({ faq }) =>
          !faq?.length ? (
            <EmptyBox what="FAQ" />
          ) : (
            <div>
              {faq.map((f) => (
                <details key={f.id} className="faq">
                  <summary>{f.question}</summary>
                  <p>{f.answer}</p>
                </details>
              ))}
            </div>
          )
        }
      </Loader>
    </>
  );
}
