import InquiryForm from "@/components/demo/a/InquiryForm";

export const metadata = { title: "문의하기 — 슬리피 (A안)" };

export default function Inquiry() {
  return (
    <div className="sl-plain">
      <h1>문의하기</h1>
      <p className="lead">궁금한 점을 남겨 주시면 확인 후 연락드리겠습니다.</p>
      <InquiryForm />
    </div>
  );
}
