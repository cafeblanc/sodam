import Header from "@/components/ui/Header"
import Footer from "@/components/ui/Footer"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body
        style={{
          margin: 0,
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#f9fafb",
        }}
      >
        {/* 상단 네비게이션 */}
        <Header />

        {/* 메인 컨텐츠 */}
        <main style={{ minHeight: "80vh", padding: 20 }}>
          {children}
        </main>

        {/* 하단 (심사용 필수) */}
        <Footer />
      </body>
    </html>
  )
}