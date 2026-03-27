import { supabase } from "@/lib/supabaseClient"

export const getProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error(error)
    return []
  }

  return data
}
