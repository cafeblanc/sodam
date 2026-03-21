export interface Order {
  id: string
  status: string
  total_price: number
  created_at: string
  order_items: OrderItem[]
}

export interface OrderItem {
  id: string
  title: string
  price: number
  quantity: number
}