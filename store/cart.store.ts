import { create } from "zustand"

export const useCartStore = create((set: any) => ({
  items: [],

  addItem: (item: any) =>
    set((state: any) => {
      const exist = state.items.find((i: any) => i.id === item.id)

      if (exist) {
        return {
          items: state.items.map((i: any) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        }
      }

      return {
        items: [...state.items, { ...item, quantity: 1 }],
      }
    }),

  removeItem: (id: string) =>
    set((state: any) => ({
      items: state.items.filter((i: any) => i.id !== id),
    })),

  clearCart: () => set({ items: [] }),
}))