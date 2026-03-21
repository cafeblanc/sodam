"use client"

import { useSearchParams } from "next/navigation"

export default function OrderCompletePage() {
  const params = useSearchParams()
  const orderId = params.get("orderId")

  return (
    <div>
      <h1>주문 완료</h1>
      <p>주문번호: {orderId}</p>
      <p>결제가 완료되었습니다.</p>
    </div>
  )
}