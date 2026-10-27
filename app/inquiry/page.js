"use client";
import { useState } from "react";
import { useContent } from "@/lib/content";

export default function Inquiry() {
  const { data } = useContent();
  const [form, setForm] = useState({ name: "", contact: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const channelUrl = data?.contact?.channelUrl;

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setForm({ name: "", contact: "", message: "" });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <h1>문의하기</h1>
      <p className="lead">궁금한 점을 남겨 주시면 확인 후 연락드리겠습니다.</p>

      {status === "done" && <p className="notice ok" role="status">문의가 접수되었습니다. 감사합니다.</p>}
      {status === "error" && (
        <p className="notice err" role="alert">전송에 실패했습니다. 잠시 후 다시 시도해 주세요.</p>
      )}

      <form onSubmit={submit} className="form">
        <label>이름
          <input required value={form.name} onChange={set("name")} autoComplete="name" />
        </label>
        <label>연락처 (이메일 또는 전화번호)
          <input required value={form.contact} onChange={set("contact")} autoComplete="email" />
        </label>
        <label>문의 내용
          <textarea required rows={6} value={form.message} onChange={set("message")} />
        </label>
        <button className="btn btn-primary" disabled={status === "sending"}>
          {status === "sending" ? "전송 중…" : status === "error" ? "다시 시도" : "문의 보내기"}
        </button>
      </form>

      {channelUrl && (
        <p className="hint">
          <a href={channelUrl} target="_blank" rel="noopener noreferrer">
            {data.contact.channelLabel || "외부 채널로 문의하기"}
          </a>
        </p>
      )}
    </>
  );
}
