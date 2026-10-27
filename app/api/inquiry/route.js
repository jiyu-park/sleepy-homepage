import { NextResponse } from "next/server";

// 문의 접수. INQUIRY_WEBHOOK_URL(예: Slack/Discord/Make/Zapier 웹훅)이 설정되면 그곳으로 전달합니다.
// 설정이 없으면 서버 로그에만 남습니다. (Vercel은 파일 저장이 불가)
export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  const clean = (v, max) => String(v ?? "").trim().slice(0, max);
  const inquiry = {
    name: clean(body.name, 100),
    contact: clean(body.contact, 200),
    message: clean(body.message, 3000),
    createdAt: new Date().toISOString(),
  };
  if (!inquiry.name || !inquiry.contact || !inquiry.message) {
    return NextResponse.json({ error: "missing" }, { status: 400 });
  }

  const hook = process.env.INQUIRY_WEBHOOK_URL;
  if (hook) {
    try {
      const r = await fetch(hook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: `[슬리피 문의] ${inquiry.name} / ${inquiry.contact}\n${inquiry.message}`,
          ...inquiry,
        }),
      });
      if (!r.ok) throw new Error();
    } catch {
      return NextResponse.json({ error: "forward" }, { status: 502 });
    }
  } else {
    console.log("[inquiry]", inquiry);
  }
  return NextResponse.json({ ok: true });
}
