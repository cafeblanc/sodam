export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <h1>ADMIN PANEL</h1>
      {children}
    </div>
  )
}