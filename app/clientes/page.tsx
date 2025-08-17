import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { ClientesContent } from "@/components/clientes-content"

export default function ClientesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <ClientesContent />
        </main>
      </div>
    </div>
  )
}
