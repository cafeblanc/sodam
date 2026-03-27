"use client"

import { useSearchParams } from "next/navigation"
import { loadTossPayments } from "@tosspayments/payment-sdk"

export default function CheckoutClient() {
  const params = useSearchParams()
  const orderId = params.get("orderId")

  const handlePayment = async () => {
    const toss = await loadTossPayments(
      process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY!
    )

    await toss.requestPayment("카드", {
      amount: 10000, // TODO: 실제 금액 연결
      orderId: orderId!,
      orderName: "Sodam 상품",
      successUrl: `${window.location.origin}/payment-success`,
      failUrl: `${window.location.origin}/payment-fail`,
    })
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>결제</h1>

      <button onClick={handlePayment}>
        토스 결제하기
      </button>
    </div>
  )
}