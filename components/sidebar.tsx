import { Button } from "@/components/ui/button"
import { LayoutDashboard, ShoppingCart, Package, DollarSign, Users, BarChart3, Settings } from "lucide-react"
import Link from "next/link"

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/", active: false },
  { icon: ShoppingCart, label: "Vendas", href: "/vendas", active: false },
  { icon: Package, label: "Estoque", href: "/estoque", active: false },
  { icon: DollarSign, label: "Financeiro", href: "/financeiro", active: false },
  { icon: Users, label: "Clientes", href: "/clientes", active: false },
  { icon: BarChart3, label: "Relatórios", href: "/relatorios", active: false },
  { icon: Settings, label: "Configurações", href: "/configuracoes", active: false },
]

export function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <Link key={item.label} href={item.href}>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </Button>
          </Link>
        ))}
      </nav>
    </aside>
  )
}
