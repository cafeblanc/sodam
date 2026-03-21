"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn, signUp } from "@/services/auth.service"

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {
    try {
      await signIn(email, password)
      router.push("/")
    } catch (e: any) {
      alert(e.message)
    }
  }

  const handleSignup = async () => {
    try {
      await signUp(email, password)
      alert("회원가입 완료")
    } catch (e: any) {
      alert(e.message)
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>로그인</h1>

      <input
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div style={{ marginTop: 10 }}>
        <button onClick={handleLogin}>로그인</button>
        <button onClick={handleSignup}>회원가입</button>
      </div>
    </div>
  )
}