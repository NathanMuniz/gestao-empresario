import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { ConfiguracoesContent } from "@/components/configuracoes-content"

export default function ConfiguracoesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <ConfiguracoesContent />
        </main>
      </div>
    </div>
  )
}
