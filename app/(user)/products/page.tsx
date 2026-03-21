"use client"

import { useEffect, useState } from "react"
import { getProducts } from "@/services/product.service"
import type { Product } from "@/types/product"

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const load = async () => {
      const data = await getProducts()
      setProducts(data)
    }

    load()
  }, [])

  return (
    <div>
      <h1>상품 목록</h1>

      {products.map((p) => (
        <div key={p.id} style={{ border: "1px solid #ccc", margin: 10 }}>
          <h3>{p.title}</h3>
          <p>{p.price}원</p>
          {p.image_url && <img src={p.image_url} width={120} />}
        </div>
      ))}
    </div>
  )
}