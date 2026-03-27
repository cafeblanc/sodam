"use client"

import { useEffect, useState } from "react"
import {
  getAllOrders,
  updateOrderStatus,
} from "@/services/order.service"

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([])

  const load = async () => {
    const data = await getAllOrders()
    setOrders(data)
  }

  useEffect(() => {
    load()
  }, [])

  const handleUpdate = async (id: string, status: string) => {
    await updateOrderStatus(id, status)
    await load()
  }

  return (
    <div>
      <h1>관리자 주문 관리</h1>

      {orders.map((order) => (
        <div key={order.id} style={{ border: "1px solid #ccc", margin: 10 }}>
          <h3>{order.id}</h3>
          <p>상태: {order.status}</p>

          {order.order_items.map((item: any, i: number) => (
            <div key={i}>
              {item.title} / {item.price} x {item.quantity}
            </div>
          ))}

          <button onClick={() => handleUpdate(order.id, "paid")}>
            결제완료 처리
          </button>

          <button onClick={() => handleUpdate(order.id, "cancelled")}>
            취소
          </button>
        </div>
      ))}
    </div>
  )
}