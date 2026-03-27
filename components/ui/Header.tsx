"use client"

import Link from "next/link"
import { useUser } from "@/lib/hooks/useUser"
import { signOut } from "@/services/auth.service"

export default function Header() {
  const { user, role, loading } = useUser()

  if (loading) return null

  const linkStyle = {
    color: "#ffffff",
    textDecoration: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    backgroundColor: "#374151",
  }

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 12,
        backgroundColor: "#1f2937",
      }}
    >
      {/* 좌측 메뉴 */}
      <div style={{ display: "flex", gap: 10 }}>
        <Link href="/" style={linkStyle}>Home</Link>
        <Link href="/products" style={linkStyle}>Products</Link>
        <Link href="/cart" style={linkStyle}>Cart</Link>
        <Link href="/orders" style={linkStyle}>Orders</Link>

        {role === "admin" && (
          <Link
            href="/admin"
            style={{ ...linkStyle, backgroundColor: "#f59e0b" }}
          >
            Admin
          </Link>
        )}
      </div>

      {/* 우측 사용자 영역 */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {user ? (
          <>
            {/* 👉 여기 들어간다 (핵심 위치) */}
            <span style={{ color: "#fbbf24", fontWeight: "bold" }}>
              {role === "admin" ? "관리자" : "사용자"}
            </span>

            <button
              onClick={signOut}
              style={{
                backgroundColor: "#ef4444",
                color: "#fff",
                border: "none",
                padding: "8px 12px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link href="/login" style={linkStyle}>
            Login
          </Link>
        )}
      </div>
    </header>
  )
}