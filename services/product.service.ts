import { createClient } from "@/lib/supabaseClient"

const supabase = createClient()

export async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

export async function getProductById(id: string) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single()

  if (error) throw error
  return data
}

export async function createProduct(product: any) {
  const { data: userData } = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from("products")
    .insert({
      ...product,
      user_id: userData.user?.id,
    })
    .select()
    .single()

  if (error) throw error
  return data
}