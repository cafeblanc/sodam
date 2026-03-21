"use client"

import Link from "next/link"
import { useUser } from "@/lib/hooks/useUser"
import { signOut } from "@/services/auth.service"

export default function Header() {
  const { user, loading } = useUser()

  if (loading) return null

  return (
    <header
      style={{
        display: "flex",
        gap: 10,
        padding: 10,
        backgroundColor: "#1f2937",
      }}
    >
      <Link href="/" style={{ color: "white" }}>Home</Link>
      <Link href="/products" style={{ color: "white" }}>Products</Link>
      <Link href="/cart" style={{ color: "white" }}>Cart</Link>
      <Link href="/orders" style={{ color: "white" }}>Orders</Link>
      <Link href="/admin" style={{ color: "white" }}>Admin</Link>

      {user ? (
        <>
          <span style={{ color: "white" }}>{user.email}</span>
          <button onClick={signOut}>Logout</button>
        </>
      ) : (
        <Link href="/login" style={{ color: "white" }}>
          Login
        </Link>
      )}
    </header>
  )
}