"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { markOrderPaid } from "@/services/order.service"
import { useCartStore } from "@/store/cart.store"

export default function CheckoutClient() {
  const params = useSearchParams()
  const router = useRouter()
  const clearCart = useCartStore((s: any) => s.clearCart)

  const orderId = params.get("orderId")

  const handleMockPayment = async () => {
    if (!orderId) return

    await markOrderPaid(orderId)

    clearCart()

    router.push(`/order-complete?orderId=${orderId}`)
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>결제 페이지</h1>

      <p>주문 ID: {orderId}</p>

      <button onClick={handleMockPayment}>
        Mock 결제 진행
      </button>
    </div>
  )
}