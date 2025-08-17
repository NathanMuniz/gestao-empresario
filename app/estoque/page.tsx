import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { EstoqueContent } from "@/components/estoque-content"

export default function EstoquePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <EstoqueContent />
        </main>
      </div>
    </div>
  )
}
