"use client"

import { useRouter } from "next/navigation"

const router = useRouter()

const handleOrder = async () => {
  const order = await createOrder(items)

  // 👉 결제 페이지로 이동
  router.push(`/checkout?orderId=${order.id}`)
}