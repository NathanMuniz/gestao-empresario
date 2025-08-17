import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Package, Users } from "lucide-react"

const metrics = [
  {
    title: "Vendas Hoje",
    value: "R$ 12.450",
    change: "+12%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Pedidos",
    value: "156",
    change: "+8%",
    trend: "up",
    icon: ShoppingCart,
  },
  {
    title: "Produtos em Estoque",
    value: "2.847",
    change: "-3%",
    trend: "down",
    icon: Package,
  },
  {
    title: "Clientes Ativos",
    value: "1.234",
    change: "+15%",
    trend: "up",
    icon: Users,
  },
]

export function DashboardContent() {
  return (
    <div className="space-y-6">
      {/* Header do Dashboard */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-heading font-bold text-gray-900">Dashboard</h2>
          <p className="text-gray-600 mt-1">Visão geral do seu negócio</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">Novo Pedido</Button>
      </div>

      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <Card key={metric.title} className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{metric.title}</CardTitle>
              <metric.icon className="w-5 h-5 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
              <div className="flex items-center mt-1">
                {metric.trend === "up" ? (
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                )}
                <span className={`text-sm ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                  {metric.change}
                </span>
                <span className="text-sm text-gray-500 ml-1">vs. ontem</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Seção de Ações Rápidas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="font-heading">Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Nova Venda
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Package className="w-4 h-4 mr-2" />
              Adicionar Produto
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Users className="w-4 h-4 mr-2" />
              Cadastrar Cliente
            </Button>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="font-heading">Vendas Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { cliente: "João Silva", valor: "R$ 450,00", status: "Pago" },
                { cliente: "Maria Santos", valor: "R$ 320,00", status: "Pendente" },
                { cliente: "Pedro Costa", valor: "R$ 180,00", status: "Pago" },
              ].map((venda, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                >
                  <div>
                    <p className="font-medium text-gray-900">{venda.cliente}</p>
                    <p className="text-sm text-gray-500">{venda.valor}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      venda.status === "Pago" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {venda.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
