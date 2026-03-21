"use client"

import { useSearchParams } from "next/navigation"

export default function OrderCompleteClient() {
  const params = useSearchParams()
  const orderId = params.get("orderId")

  return (
    <div style={{ padding: 20 }}>
      <h1>주문 완료</h1>
      <p>주문번호: {orderId}</p>
      <p>결제가 완료되었습니다.</p>
    </div>
  )
}