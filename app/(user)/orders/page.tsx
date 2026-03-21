"use client"

import { useEffect, useState } from "react"
import { getMyOrders } from "@/services/order.service"

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([])

  useEffect(() => {
    const load = async () => {
      const data = await getMyOrders()
      setOrders(data)
    }
    load()
  }, [])

  return (
    <div>
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