"use client";
import { useRef, useState } from "react";
import { FOOTER } from "@/lib/siteInfo";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX = 500;
const TIMEOUT_MS = 10000;
const MAIL = (FOOTER.company.match(/[\w.+-]+@[\w.-]+\.\w+/) || [""])[0];

/** 이름·이메일(형식 검사)·내용(500자 이내) 필수. 전송은 원래 문의 API(/api/inquiry)를 사용 */
export default function InquiryForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | done | error | slow
  const refs = { name: useRef(null), email: useRef(null), message: useRef(null) };

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "이름을 입력해 주세요.";
    if (!form.email.trim()) e.email = "이메일을 입력해 주세요.";
    else if (!EMAIL_RE.test(form.email.trim())) e.email = "이메일 형식이 올바르지 않습니다. 예: name@example.com";
    if (!form.message.trim()) e.message = "문의 내용을 입력해 주세요.";
    setErrors(e);
    const first = ["name", "email", "message"].find((k) => e[k]);
    if (first) refs[first].current?.focus();
    return !first;
  }

  async function submit(ev) {
    ev.preventDefault();
    setStatus("idle");
    if (!validate()) return;
    setStatus("sending");
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, contact: form.email, message: form.message }),
        signal: ctrl.signal,
      });
      if (res.status === 503) { setStatus("unavailable"); return; }
      if (!res.ok) throw new Error();
      setForm({ name: "", email: "", message: "" });
      setStatus("done");
    } catch (err) {
      setStatus(err?.name === "AbortError" ? "slow" : "error");
    } finally {
      clearTimeout(timer);
    }
  }

  const atLimit = form.message.length >= MAX;

  return (
    <form className="dd-form" onSubmit={submit} noValidate>
      {status === "done" && <p className="dd-notice" role="status">문의가 접수되었습니다. 감사합니다.</p>}
      {status === "error" && <p className="dd-notice is-err" role="alert">전송에 실패했습니다. 입력하신 내용은 남아 있어요. 잠시 후 다시 시도해 주세요.</p>}
      {status === "unavailable" && <p className="dd-notice is-err" role="alert">문의 접수가 아직 준비되지 않았습니다. 입력하신 내용은 남아 있어요. {MAIL ? `${MAIL} 주소로 보내 주세요.` : "잠시 후 다시 시도해 주세요."}</p>}
      {status === "slow" && <p className="dd-notice is-err" role="alert">연결이 느립니다. 입력하신 내용은 남아 있어요. 다시 시도해 주세요.</p>}
      <div>
        <label htmlFor="d-name">이름 (필수)</label>
        <input id="d-name" ref={refs.name} value={form.name} onChange={set("name")} autoComplete="name" aria-invalid={!!errors.name} aria-describedby="d-name-e" />
        <p className="dd-err" id="d-name-e" role="alert">{errors.name}</p>
      </div>
      <div>
        <label htmlFor="d-email">이메일 (필수)</label>
        <input id="d-email" ref={refs.email} type="email" value={form.email} onChange={set("email")} autoComplete="email" aria-invalid={!!errors.email} aria-describedby="d-email-e" />
        <p className="dd-err" id="d-email-e" role="alert">{errors.email}</p>
      </div>
      <div>
        <label htmlFor="d-msg">내용 (필수, {MAX}자 이내)</label>
        <textarea id="d-msg" ref={refs.message} rows={6} maxLength={MAX} value={form.message} onChange={set("message")} aria-invalid={!!errors.message} aria-describedby="d-msg-e b-msg-c" />
        <p className="dd-count" id="d-msg-c" aria-live="polite">
          {atLimit ? `${MAX}자까지 입력할 수 있어요. 넘는 부분은 입력되지 않습니다.` : `${form.message.length} / ${MAX}`}
        </p>
        <p className="dd-err" id="d-msg-e" role="alert">{errors.message}</p>
      </div>
      <button className="dd-btn dd-btn-dark" type="submit" disabled={status === "sending"} aria-label="문의 보내기">
        {status === "sending" ? "전송 중…" : "문의 보내기"}
      </button>
    </form>
  );
}
