import { createClient } from "@/lib/supabaseClient"

const supabase = createClient()

// 🔹 주문 생성 (재고 검증 + 차감 포함)
export async function createOrder(items: any[]) {
  const { data: userData } = await supabase.auth.getUser()

  if (!userData.user) {
    throw new Error("로그인이 필요합니다")
  }

  // 🔴 1. 재고 검증
  for (const item of items) {
    const { data: product, error } = await supabase
      .from("products")
      .select("stock")
      .eq("id", item.id)
      .single()

    if (error || !product) {
      throw new Error(`상품 조회 실패: ${item.title}`)
    }

    if (product.stock < item.quantity) {
      throw new Error(`재고 부족: ${item.title}`)
    }
  }

  // 🔴 2. 총액 계산
  const total_price = items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  )

  // 🔴 3. 주문 생성
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: userData.user.id,
      status: "pending",
      total_price,
    })
    .select()
    .single()

  if (orderError || !order) {
    throw new Error("주문 생성 실패")
  }

  // 🔴 4. 주문 아이템 생성
  const orderItems = items.map((i) => ({
    order_id: order.id,
    product_id: i.id,
    title: i.title,
    price: i.price,
    quantity: i.quantity,
  }))

  const { error: itemError } = await supabase
    .from("order_items")
    .insert(orderItems)

  if (itemError) {
    throw new Error("주문 상세 생성 실패")
  }

  // 🔴 5. 재고 차감 (DB 함수)
  for (const item of items) {
    const { error } = await supabase.rpc("decrease_stock", {
      product_id: item.id,
      qty: item.quantity,
    })

    if (error) {
      throw new Error("재고 차감 실패")
    }
  }

  return order
}

// 🔹 내 주문 조회
export async function getMyOrders() {
  const { data: userData } = await supabase.auth.getUser()

  if (!userData.user) {
    throw new Error("로그인이 필요합니다")
  }

  const { data, error } = await supabase
    .from("orders")
    .select(`
      id,
      status,
      total_price,
      created_at,
      order_items (
        id,
        title,
        price,
        quantity
      )
    `)
    .eq("user_id", userData.user.id)
    .order("created_at", { ascending: false })

  if (error) {
    throw new Error("주문 조회 실패")
  }

  return data
}

// 🔹 관리자 전체 주문 조회
export async function getAllOrders() {
  const { data, error } = await supabase
    .from("orders")
    .select(`
      id,
      status,
      total_price,
      created_at,
      order_items (
        title,
        price,
        quantity
      )
    `)
    .order("created_at", { ascending: false })

  if (error) {
    throw new Error("전체 주문 조회 실패")
  }

  return data
}

// 🔹 주문 상태 변경 (admin)
export async function updateOrderStatus(
  orderId: string,
  status: string
) {
  const { error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", orderId)

  if (error) {
    throw new Error("주문 상태 변경 실패")
  }
}

// 🔹 Mock 결제 (paid 처리)
export async function markOrderPaid(orderId: string) {
  const { error } = await supabase
    .from("orders")
    .update({ status: "paid" })
    .eq("id", orderId)

  if (error) {
    throw new Error("결제 처리 실패")
  }
}