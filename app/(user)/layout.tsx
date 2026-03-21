export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <h1>USER SHOP</h1>
      {children}
    </div>
  )
}