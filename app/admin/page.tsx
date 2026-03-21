"use client"

import { useState } from "react"
import { createProduct } from "@/services/product.service"
import { uploadImage } from "@/services/storage.service"

export default function AdminPage() {
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState(0)
  const [stock, setStock] = useState(0)
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const handleCreate = async () => {
    try {
      setLoading(true)

      let image_url = ""

      // 🔹 이미지 업로드
      if (file) {
        image_url = await uploadImage(file)
      }

      // 🔹 상품 생성 (재고 포함)
      await createProduct({
        title,
        price,
        stock,
        image_url,
      })

      alert("상품 등록 완료")

      // 🔹 초기화
      setTitle("")
      setPrice(0)
      setStock(0)
      setFile(null)

    } catch (e: any) {
      alert(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>관리자 - 상품 등록</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 300 }}>
        
        {/* 상품명 */}
        <input
          placeholder="상품명"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* 가격 */}
        <input
          type="number"
          placeholder="가격"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />

        {/* 재고 */}
        <input
          type="number"
          placeholder="재고"
          value={stock}
          onChange={(e) => setStock(Number(e.target.value))}
        />

        {/* 이미지 */}
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        {/* 버튼 */}
        <button onClick={handleCreate} disabled={loading}>
          {loading ? "등록 중..." : "상품 등록"}
        </button>

      </div>
    </div>
  )
}