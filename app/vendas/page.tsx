import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { VendasContent } from "@/components/vendas-content"

export default function VendasPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <VendasContent />
        </main>
      </div>
    </div>
  )
}
