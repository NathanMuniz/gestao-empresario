import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { RelatoriosContent } from "@/components/relatorios-content"

export default function RelatoriosPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <RelatoriosContent />
        </main>
      </div>
    </div>
  )
}
