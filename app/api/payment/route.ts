import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()

  const { orderId, amount } = body

  const res = await fetch(
    "https://api.tosspayments.com/v1/payments",
    {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(process.env.TOSS_SECRET_KEY + ":").toString("base64"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        orderId,
        orderName: "Sodam 주문",
      }),
    }
  )

  const data = await res.json()

  return NextResponse.json(data)
}