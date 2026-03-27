import Link from "next/link"

export default function Footer() {
  return (
    <footer style={{ padding: 20, marginTop: 50 }}>
      <Link href="/terms">이용약관</Link> |
      <Link href="/privacy">개인정보처리방침</Link> |
      <Link href="/refund">환불정책</Link>
    </footer>
  )
}