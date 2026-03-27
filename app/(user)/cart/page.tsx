"use client"

import { useRouter } from "next/navigation"
import { useCartStore } from "@/store/cart.store"
import { createOrder } from "@/services/order.service"

export default function CartPage() {
  const router = useRouter()

  const { items, removeItem, clearCart } = useCartStore()

  const total = items.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  )

  const handleOrder = async () => {
    if (items.length === 0) {
      alert("장바구니가 비어 있습니다")
      return
    }

    const order = await createOrder(items)

    router.push(`/checkout?orderId=${order.id}`)
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>장바구니</h1>

      {items.length === 0 && <p>장바구니가 비어 있습니다</p>}

      {items.map((item: any) => (
        <div key={item.id} style={{ border: "1px solid #ccc", margin: 10 }}>
          <h3>{item.title}</h3>
          <p>
            {item.price} x {item.quantity}
          </p>

          <button onClick={() => removeItem(item.id)}>삭제</button>
        </div>
      ))}

      <h2>총액: {total}원</h2>

      <button onClick={handleOrder}>주문하기</button>
      <button onClick={clearCart}>전체 삭제</button>
    </div>
  )
}