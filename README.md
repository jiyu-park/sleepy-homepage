# 슬리피 브랜드 홈페이지 (MVP)

Next.js(App Router) 기반 반응형 홈페이지. 화면: 메인 `/`, 제품 `/product`, FAQ `/faq`, 문의 `/inquiry`.

## 실행
```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## 콘텐츠 수정 (코드 수정 없이)
모든 문구는 [`public/content/site.json`](public/content/site.json) 한 파일에서 관리합니다.
- `product.purchaseUrl` — 스마트스토어 등 구매 URL. **비어 있으면 구매 버튼이 비활성화**되고 문의로 안내됩니다.
- `faq` — 비우면 "준비 중" 안내가 표시됩니다.
- `contact.channelUrl` — 외부 문의 채널(카카오 채널 등) 링크. 비우면 숨김.
- `product.images` — 이미지 경로 배열(`public/` 아래에 파일 추가).

## 문의 접수
`POST /api/inquiry`가 입력을 검증합니다. 환경변수 `INQUIRY_WEBHOOK_URL`(Slack/Discord/Make 등 웹훅)을 설정하면 접수 내용을 그곳으로 전달하고, 없으면 서버 로그에만 남깁니다. (Vercel은 파일 저장 불가)

## 배포 (Vercel)
GitHub 저장소를 Vercel에 연결하면 자동 배포됩니다. 웹훅을 쓰려면 Vercel 환경변수에 `INQUIRY_WEBHOOK_URL`을 추가하세요.

## 구현된 상태/접근성
로딩 스켈레톤, 오류 시 재시도, 빈 데이터 "준비 중", 문의 전송 중 버튼 비활성화, 본문 바로가기, 키보드 포커스 표시, `lang="ko"`, 모션 감소 대응.

## 확인 필요
샘플 문구와 의료·효능 표현은 기업 가이드 확인 후 교체해야 합니다. 도전 과제(관리 화면·이메일 발송·지표)는 미구현.
