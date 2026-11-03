"use client";
import { useState } from "react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX = 500;

/** 이름·이메일(형식 검사)·내용(500자 이내) 필수. 전송은 원래 문의 API(/api/inquiry)를 그대로 사용 */
export default function InquiryForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | done | error

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "이름을 입력해 주세요.";
    if (!form.email.trim()) e.email = "이메일을 입력해 주세요.";
    else if (!EMAIL_RE.test(form.email.trim())) e.email = "이메일 형식이 올바르지 않습니다.";
    if (!form.message.trim()) e.message = "문의 내용을 입력해 주세요.";
    else if (form.message.length > MAX) e.message = `${MAX}자 이내로 입력해 주세요.`;
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function submit(ev) {
    ev.preventDefault();
    setStatus("idle");
    if (!validate()) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, contact: form.email, message: form.message }),
      });
      if (!res.ok) throw new Error();
      setForm({ name: "", email: "", message: "" });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="sl-form" onSubmit={submit} noValidate>
      {status === "done" && <p className="sl-notice" role="status">문의가 접수되었습니다. 감사합니다.</p>}
      {status === "error" && <p className="sl-notice is-err" role="alert">전송에 실패했습니다. 잠시 후 다시 시도해 주세요.</p>}
      <div>
        <label htmlFor="inq-name">이름 (필수)</label>
        <input id="inq-name" value={form.name} onChange={set("name")} autoComplete="name" aria-invalid={!!errors.name} aria-describedby="inq-name-e" />
        <p className="sl-err" id="inq-name-e" role="alert">{errors.name}</p>
      </div>
      <div>
        <label htmlFor="inq-email">이메일 (필수)</label>
        <input id="inq-email" type="email" value={form.email} onChange={set("email")} autoComplete="email" aria-invalid={!!errors.email} aria-describedby="inq-email-e" />
        <p className="sl-err" id="inq-email-e" role="alert">{errors.email}</p>
      </div>
      <div>
        <label htmlFor="inq-msg">내용 (필수, {MAX}자 이내)</label>
        <textarea id="inq-msg" rows={6} maxLength={MAX} value={form.message} onChange={set("message")} aria-invalid={!!errors.message} aria-describedby="inq-msg-e inq-msg-c" />
        <p className="sl-count" id="inq-msg-c">{form.message.length} / {MAX}</p>
        <p className="sl-err" id="inq-msg-e" role="alert">{errors.message}</p>
      </div>
      <button className="sl-btn sl-btn-primary" type="submit" disabled={status === "sending"} aria-label="문의 보내기">
        {status === "sending" ? "전송 중…" : "문의 보내기"}
      </button>
    </form>
  );
}
