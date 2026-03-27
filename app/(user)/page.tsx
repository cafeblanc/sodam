import { supabase } from "@/lib/supabaseClient"

export default async function HomePage() {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div style={{ padding: 20 }}>
      <h1>쇼핑몰</h1>

      {user ? (
        <p>로그인됨: {user.email}</p>
      ) : (
        <p>비로그인 상태</p>
      )}
    </div>
  )
}