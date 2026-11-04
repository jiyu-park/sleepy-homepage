"use client";
import { useEffect, useRef, useState } from "react";

const KEY = "sleepy-c-cursor";
const OFFSET = 26;                          // 커서에서 기기까지의 거리(px)
const HIDE_SEL = ".dc-contact, input, textarea, select"; // 입력을 방해하지 않도록 기기를 숨기는 곳
const BUY_SEL = ".dc-pill-buy, a.dc-pill, .dc-textlink";

/**
 * 제품 컷(슬리비 본체 한쪽)이 마우스 커서를 약간 늦게 따라다니는 장식.
 * - 마우스가 있는 기기: 기본 커서는 그대로 두고 옆에서 따라옴. 구매 버튼·특징 카드·사용 방법 위에서 작은 액션, 클릭하면 물결.
 * - 터치 기기: 스크롤하면 화면 오른쪽 가장자리를 천천히 따라 내려오는 동반자
 * - 움직임 줄이기 설정이면 아예 표시하지 않음. 클릭을 가로채지 않음(pointer-events: none)
 */
export default function EarbudCursor() {
  const [mode, setMode] = useState("off"); // off | pointer | touch
  const [on, setOn] = useState(true);
  const ear = useRef(null);
  const img = useRef(null);
  const rip = useRef(null);

  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const decide = () => setMode(rm.matches ? "off" : fine.matches ? "pointer" : "touch");
    decide();
    rm.addEventListener("change", decide);
    fine.addEventListener("change", decide);
    try { if (localStorage.getItem(KEY) === "off") setOn(false); } catch {}
    return () => { rm.removeEventListener("change", decide); fine.removeEventListener("change", decide); };
  }, []);

  useEffect(() => {
    try { localStorage.setItem(KEY, on ? "on" : "off"); } catch {}
  }, [on]);

  // ── 마우스 기기 ──
  useEffect(() => {
    if (mode !== "pointer" || !on) return;
    const el = ear.current, im = img.current, box = rip.current;
    if (!el || !im) return;
    let mx = -200, my = -200, x = -200, y = -200, vx = 0, raf = 0, lastStep = null, plugTimer = 0;
    const st = { scale: 1, rot: 45, tx: null };

    const tick = () => {
      const tx = st.tx ? st.tx.x : mx + OFFSET;
      const ty = st.tx ? st.tx.y : my + OFFSET;
      const dx = tx - x, dy = ty - y;
      x += dx * 0.16; y += dy * 0.16;
      vx = vx * 0.8 + dx * 0.16 * 0.4;
      const tilt = Math.max(-22, Math.min(22, vx * 2));
      el.style.transform = `translate3d(${x - 27}px, ${y - 20}px, 0) rotate(${st.rot + tilt}deg) scale(${st.scale})`;
      raf = Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1 || Math.abs(vx) > 0.1 ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };

    const onMove = (e) => {
      if (e.pointerType && e.pointerType !== "mouse") return;
      mx = e.clientX; my = e.clientY;
      const t = e.target instanceof Element ? e.target : null;
      el.dataset.ready = "1";
      el.dataset.hidden = t && t.closest(HIDE_SEL) ? "1" : "0";
      const buy = t && t.closest(BUY_SEL);
      const card = t && t.closest(".dc-card");
      const step = t && t.closest(".dc-step");
      st.tx = null; st.scale = 1; st.rot = 45;
      if (buy) {                       // 구매 버튼: 버튼 쪽으로 살짝 끌려가 붙음
        const r = buy.getBoundingClientRect();
        st.tx = { x: mx + (r.left + r.width / 2 - mx) * 0.35 + 12, y: my + (r.top + r.height / 2 - my) * 0.35 + 12 };
        st.scale = 1.25; st.rot = 0;
      } else if (card) {               // 특징 카드: 살짝 커지며 기울어짐
        st.scale = 1.15; st.rot = 70;
      }
      if (step && step !== lastStep) { // 사용 방법: 귀에 꽂는 동작을 한 번
        lastStep = step;
        im.classList.remove("is-plug"); void im.offsetWidth; im.classList.add("is-plug");
        clearTimeout(plugTimer); plugTimer = setTimeout(() => im.classList.remove("is-plug"), 1300);
      } else if (!step) lastStep = null;
      kick();
    };
    const onLeave = () => { el.dataset.hidden = "1"; };
    const onDown = (e) => {
      if (e.pointerType && e.pointerType !== "mouse") return;
      if (el.dataset.hidden === "1" || !box) return;
      const s = document.createElement("span");
      s.style.left = `${e.clientX}px`; s.style.top = `${e.clientY}px`;
      box.appendChild(s);
      setTimeout(() => s.remove(), 750);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerdown", onDown, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerdown", onDown);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf); clearTimeout(plugTimer);
    };
  }, [mode, on]);

  // ── 터치 기기: 스크롤 동반자 ──
  useEffect(() => {
    if (mode !== "touch") return;
    const el = ear.current;
    if (!el) return;
    let last = window.scrollY, v = 0, ticking = false;
    const update = () => {
      ticking = false;
      const vh = window.innerHeight;
      const max = document.documentElement.scrollHeight - vh;
      const p = max > 0 ? window.scrollY / max : 0;
      const top = vh * 0.2 + p * vh * 0.45;           // 하단 구매 바와 겹치지 않는 범위
      v = v * 0.8 + (window.scrollY - last) * 0.2; last = window.scrollY;
      const tilt = Math.max(-25, Math.min(25, v * 1.5));
      el.style.transform = `translate3d(0, ${top}px, 0) rotate(${35 + tilt}deg)`;
      const contact = document.getElementById("contact");
      el.dataset.hidden = contact && contact.getBoundingClientRect().top < vh * 0.85 ? "1" : "0";
      el.dataset.ready = "1";
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, [mode]);

  if (mode === "off") return null;
  return (
    <>
      {(mode === "touch" || on) && (
        <div ref={ear} className={`dc-ear dc-ear-${mode}`} aria-hidden="true">
          <img ref={img} src="/images/demo-c/earbud.png" alt="" draggable={false} />
        </div>
      )}
      <div ref={rip} className="dc-ripples" aria-hidden="true" />
      {mode === "pointer" && (
        <button type="button" className="dc-ear-toggle" aria-pressed={on} onClick={() => setOn((v) => !v)}>
          {on ? "기기 커서 끄기" : "기기 커서 켜기"}
        </button>
      )}
    </>
  );
}
