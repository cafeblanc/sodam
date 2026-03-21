import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // 🔥 중요
)

export async function POST(req: Request) {
  const body = await req.json()

  const { paymentKey, orderId, amount } = body

  // ✅ 1. DB에서 실제 금액 조회
  const { data: order } = await supabase
    .from("orders")
    .select("total_price")
    .eq("id", orderId)
    .single()

  if (!order) {
    return NextResponse.json({ error: "주문 없음" }, { status: 400 })
  }

  // 🚨 2. 금액 검증
  if (order.total_price !== Number(amount)) {
    return NextResponse.json(
      { error: "금액 위변조 감지" },
      { status: 400 }
    )
  }

  // ✅ 3. 토스 결제 승인
  const res = await fetch(
    "https://api.tosspayments.com/v1/payments/confirm",
    {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(process.env.TOSS_SECRET_KEY + ":").toString("base64"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paymentKey,
        orderId,
        amount: order.total_price, // 🔥 DB 금액 사용
      }),
    }
  )

  const data = await res.json()

  // ✅ 4. 결제 성공 시 상태 변경
  if (res.ok) {
    await supabase
      .from("orders")
      .update({ status: "paid" })
      .eq("id", orderId)
  }

  return NextResponse.json(data)
}