// 머리말·푸터처럼 모든 화면에 나오는 정보. 화면 문구는 public/content/site.json에서 고칩니다.
export const NAV = [
  { href: "/company", label: "회사 소개" },
  { href: "/technology", label: "기술" },
  { href: "/product", label: "제품" },
  { href: "/newsroom", label: "뉴스룸" },
  { href: "/faq", label: "FAQ" },
];

// 새 디자인(공통 스타일 v1)을 쓰는 화면. 나머지 화면은 기존 머리말·푸터를 유지합니다.
export const SLEEPY_ROUTES = ["/", "/company"];

export const FOOTER = {
  legal: [{ label: "개인정보처리방침", strong: true }, { label: "이용약관" }],
  company: "주식회사 슬리피 · 대표 서정화 · 서울 성북구 화랑로 211 105호 · 사업자등록번호 417-88-03066 · 문의 sleeby00@gmail.com",
  copyright: "© Sleepy Inc. All rights reserved.",
  contacts: [
    { label: "일반 문의", text: "FAQ · 문의하기 →", href: "/inquiry" },
    { label: "제휴 문의", text: "병의원·항공사 등 · 제휴 문의하기 →", href: "/inquiry" },
  ],
  // SNS 주소가 정해지면 url을 채우세요. 비어 있으면 아이콘이 숨겨집니다.
  sns: [
    { label: "인스타그램", url: "" },
    { label: "유튜브", url: "" },
    { label: "블로그", url: "" },
  ],
};
