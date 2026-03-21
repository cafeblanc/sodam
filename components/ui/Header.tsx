"use client"

import Link from "next/link"
import { createClient } from "@/lib/supabaseClient"
import { useUser } from "@/lib/hooks/useUser"

export default function Header() {
  const supabase = createClient()
  const { user, loading } = useUser()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    location.reload()
  }

  if (loading) return null

  return (
    <header style={{ display: "flex", gap: 20 }}>
      <Link href="/">Home</Link>
      <Link href="/products">Products</Link>
      <Link href="/cart">Cart</Link>
      <Link href="/orders">Orders</Link>

      {user && <Link href="/admin">Admin</Link>}

      {user ? (
        <>
          <span>{user.email}</span>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link href="/login">Login</Link>
        </>
      )}
    </header>
  )
}