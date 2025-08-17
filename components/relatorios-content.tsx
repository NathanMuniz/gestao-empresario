"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Download, TrendingUp, TrendingDown } from "lucide-react"

const vendasMensais = [
  { mes: "Jan", vendas: 45000, meta: 50000 },
  { mes: "Fev", vendas: 52000, meta: 50000 },
  { mes: "Mar", vendas: 48000, meta: 50000 },
  { mes: "Abr", vendas: 61000, meta: 55000 },
  { mes: "Mai", vendas: 55000, meta: 55000 },
  { mes: "Jun", vendas: 67000, meta: 60000 },
]

const produtosMaisVendidos = [
  { nome: "Produto A", vendas: 1250, valor: 25000 },
  { nome: "Produto B", vendas: 980, valor: 19600 },
  { nome: "Produto C", vendas: 750, valor: 22500 },
  { nome: "Produto D", vendas: 620, valor: 18600 },
  { nome: "Produto E", vendas: 450, valor: 13500 },
]

const vendasPorCategoria = [
  { name: "Eletrônicos", value: 35, color: "#1e40af" },
  { name: "Roupas", value: 25, color: "#3b82f6" },
  { name: "Casa", value: 20, color: "#60a5fa" },
  { name: "Esportes", value: 12, color: "#93c5fd" },
  { name: "Outros", value: 8, color: "#dbeafe" },
]

export function RelatoriosContent() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Relatórios e Analytics</h1>
        <div className="flex gap-2">
          <Select defaultValue="30">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Últimos 7 dias</SelectItem>
              <SelectItem value="30">Últimos 30 dias</SelectItem>
              <SelectItem value="90">Últimos 90 dias</SelectItem>
              <SelectItem value="365">Último ano</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Cards de KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 328.200</div>
            <p className="text-xs text-green-600">+12.5% vs mês anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vendas Realizadas</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.247</div>
            <p className="text-xs text-green-600">+8.2% vs mês anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 263</div>
            <p className="text-xs text-red-600">-2.1% vs mês anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Novos Clientes</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-green-600">+15.3% vs mês anterior</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Gráfico de Vendas Mensais */}
        <Card>
          <CardHeader>
            <CardTitle>Vendas vs Meta Mensal</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={vendasMensais}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip formatter={(value) => [`R$ ${value.toLocaleString()}`, ""]} />
                <Bar dataKey="vendas" fill="#1e40af" name="Vendas" />
                <Bar dataKey="meta" fill="#e5e7eb" name="Meta" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Gráfico de Pizza - Vendas por Categoria */}
        <Card>
          <CardHeader>
            <CardTitle>Vendas por Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={vendasPorCategoria}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {vendasPorCategoria.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de Produtos Mais Vendidos */}
      <Card>
        <CardHeader>
          <CardTitle>Top 5 Produtos Mais Vendidos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {produtosMaisVendidos.map((produto, index) => (
              <div key={produto.nome} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-900 text-white rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold">{produto.nome}</h3>
                    <p className="text-sm text-gray-600">{produto.vendas} unidades vendidas</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">R$ {produto.valor.toLocaleString("pt-BR")}</p>
                  <p className="text-sm text-gray-600">Faturamento</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
