"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { getProductById } from "@/services/product.service"
import { useCartStore } from "@/store/cart.store"

export default function ProductDetailPage() {
  const { id } = useParams()

  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const addItem = useCartStore((s) => s.addItem)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getProductById(id as string)
        setProduct(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }

    if (id) load()
  }, [id])

  // 🔹 로딩 상태
  if (loading) return <div>Loading...</div>

  // 🔹 상품 없음
  if (!product) return <div>상품을 찾을 수 없습니다</div>

  // 🔹 장바구니 추가
  const handleAddCart = () => {
    if (product.stock <= 0) {
      alert("재고가 없습니다")
      return
    }

    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
    })

    alert("장바구니에 추가되었습니다")
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>{product.title}</h1>

      {/* 이미지 */}
      {product.image_url && (
        <img
          src={product.image_url}
          alt={product.title}
          width={200}
        />
      )}

      {/* 가격 */}
      <p>가격: {product.price}원</p>

      {/* 재고 */}
      <p>재고: {product.stock}</p>

      {/* 버튼 */}
      <button
        onClick={handleAddCart}
        disabled={product.stock <= 0}
      >
        {product.stock > 0 ? "장바구니 추가" : "품절"}
      </button>
    </div>
  )
}