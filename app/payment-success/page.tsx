"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"

export default function SuccessPage() {
  const params = useSearchParams()

  useEffect(() => {
    const confirm = async () => {
      const paymentKey = params.get("paymentKey")
      const orderId = params.get("orderId")
      const amount = params.get("amount")

      await fetch("/api/payment/confirm", {
        method: "POST",
        body: JSON.stringify({
          paymentKey,
          orderId,
          amount,
        }),
      })
    }

    confirm()
  }, [])

  return <h1>결제 완료</h1>
}