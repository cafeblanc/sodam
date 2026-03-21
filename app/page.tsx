"use client"

import Link from "next/link"

export default function Home() {
  const btnStyle = {
    backgroundColor: "#2563eb",   // 파란색
    color: "#ffffff",             // 흰색 글자
    padding: "10px 16px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Sodam Shop</h1>
      <p>쇼핑몰 메인 페이지</p>

      <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
        <Link href="/products">
          <button style={btnStyle}>상품 보기</button>
        </Link>

        <Link href="/cart">
          <button style={btnStyle}>장바구니</button>
        </Link>

        <Link href="/orders">
          <button style={btnStyle}>주문 조회</button>
        </Link>

        <Link href="/admin">
          <button style={btnStyle}>관리자</button>
        </Link>
      </div>
    </div>
  )
}