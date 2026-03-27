import { getProducts } from "@/services/product.service"

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <div style={{ padding: 20 }}>
      <h1>상품 목록</h1>

      {products.length === 0 && <p>상품 없음</p>}

      {products.map((p: any) => (
        <div
          key={p.id}
          style={{
            border: "1px solid #ccc",
            padding: 10,
            marginBottom: 10,
          }}
        >
          <h3>{p.name}</h3>
          <p>{p.description}</p>
          <strong>{p.price}원</strong>
        </div>
      ))}
    </div>
  )
}
