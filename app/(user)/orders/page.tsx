"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getMyOrders } from "@/services/order.service"

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getMyOrders()
        setOrders(data)
      } catch (e: any) {
        if (e.message.includes("로그인이 필요합니다")) {
          router.push("/login")
        }
      }
    }

    load()
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <h1>내 주문</h1>

      {orders.map((order) => (
        <div key={order.id} style={{ border: "1px solid #ccc", margin: 10 }}>
          <h3>주문 ID: {order.id}</h3>
          <p>상태: {order.status}</p>
          <p>총액: {order.total_price}원</p>

          {order.order_items.map((item: any) => (
            <div key={item.id}>
              {item.title} / {item.price} x {item.quantity}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}