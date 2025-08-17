import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { FinanceiroContent } from "@/components/financeiro-content"

export default function FinanceiroPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <FinanceiroContent />
        </main>
      </div>
    </div>
  )
}
