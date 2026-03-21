"use client"

import { Suspense } from "react"
import OrderCompleteClient from "./OrderCompleteClient"

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderCompleteClient />
    </Suspense>
  )
}