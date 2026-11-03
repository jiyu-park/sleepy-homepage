"use client";
import { useEffect, useRef, useState } from "react";

/** 화면에 들어오면 한 번만 true가 되는 훅 */
export function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") { setInView(true); return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); io.disconnect(); }
    }, { threshold, rootMargin: "0px 0px -6% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/** 스크롤하면 아래에서 위로 부드럽게 나타나는 래퍼 (모션 감소 설정이면 CSS에서 바로 표시) */
export default function Reveal({ as: Tag = "div", delay = 0, className = "", children, ...rest }) {
  const [ref, inView] = useInView(0.12);
  return (
    <Tag
      ref={ref}
      className={`sl-reveal${inView ? " is-in" : ""}${className ? ` ${className}` : ""}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
