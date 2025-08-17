"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts"
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Filter,
  TrendingUp,
  TrendingDown,
  DollarSign,
  CreditCard,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"

const transacoes = [
  {
    id: "T001",
    tipo: "receita",
    descricao: "Venda - João Silva",
    categoria: "Vendas",
    valor: 450.0,
    data: "2024-01-15",
    status: "pago",
    vencimento: "2024-01-15",
  },
  {
    id: "T002",
    tipo: "despesa",
    descricao: "Aluguel do escritório",
    categoria: "Despesas Fixas",
    valor: 2500.0,
    data: "2024-01-10",
    status: "pago",
    vencimento: "2024-01-10",
  },
  {
    id: "T003",
    tipo: "receita",
    descricao: "Venda - Ana Costa",
    categoria: "Vendas",
    valor: 320.0,
    data: "2024-01-15",
    status: "pendente",
    vencimento: "2024-01-20",
  },
  {
    id: "T004",
    tipo: "despesa",
    descricao: "Energia elétrica",
    categoria: "Despesas Operacionais",
    valor: 380.0,
    data: "2024-01-12",
    status: "pendente",
    vencimento: "2024-01-18",
  },
  {
    id: "T005",
    tipo: "receita",
    descricao: "Venda - Carlos Oliveira",
    categoria: "Vendas",
    valor: 180.0,
    data: "2024-01-14",
    status: "pago",
    vencimento: "2024-01-14",
  },
]

const dadosFluxoCaixa = [
  { mes: "Jan", receitas: 4500, despesas: 3200, saldo: 1300 },
  { mes: "Fev", receitas: 5200, despesas: 3800, saldo: 1400 },
  { mes: "Mar", receitas: 4800, despesas: 3500, saldo: 1300 },
  { mes: "Abr", receitas: 6100, despesas: 4200, saldo: 1900 },
  { mes: "Mai", receitas: 5800, despesas: 4000, saldo: 1800 },
  { mes: "Jun", receitas: 6500, despesas: 4500, saldo: 2000 },
]

const dadosCategorias = [
  { name: "Vendas", value: 950, color: "#3b82f6" },
  { name: "Despesas Fixas", value: 2500, color: "#ef4444" },
  { name: "Despesas Operacionais", value: 380, color: "#f59e0b" },
  { name: "Outros", value: 200, color: "#10b981" },
]

export function FinanceiroContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [tipoFilter] = useState("todos")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [isNewTransacaoOpen, setIsNewTransacaoOpen] = useState(false)

  const filteredTransacoes = transacoes.filter((transacao) => {
    const matchesSearch =
      transacao.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transacao.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTipo = tipoFilter === "todos" || transacao.tipo === tipoFilter
    const matchesStatus = statusFilter === "todos" || transacao.status === statusFilter
    return matchesSearch && matchesTipo && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pago":
        return "bg-green-100 text-green-800"
      case "pendente":
        return "bg-yellow-100 text-yellow-800"
      case "vencido":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTipoColor = (tipo: string) => {
    return tipo === "receita" ? "text-green-600" : "text-red-600"
  }

  const totalReceitas = transacoes.filter((t) => t.tipo === "receita").reduce((acc, t) => acc + t.valor, 0)
  const totalDespesas = transacoes.filter((t) => t.tipo === "despesa").reduce((acc, t) => acc + t.valor, 0)
  const saldoAtual = totalReceitas - totalDespesas
  const receitasPendentes = transacoes
    .filter((t) => t.tipo === "receita" && t.status === "pendente")
    .reduce((acc, t) => acc + t.valor, 0)
  const despesasPendentes = transacoes
    .filter((t) => t.tipo === "despesa" && t.status === "pendente")
    .reduce((acc, t) => acc + t.valor, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-heading font-bold text-gray-900">Financeiro</h2>
          <p className="text-gray-600 mt-1">Controle suas receitas, despesas e fluxo de caixa</p>
        </div>
        <Dialog open={isNewTransacaoOpen} onOpenChange={setIsNewTransacaoOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Nova Transação
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="font-heading">Nova Transação</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label>Tipo</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="receita">Receita</SelectItem>
                    <SelectItem value="despesa">Despesa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Categoria</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vendas">Vendas</SelectItem>
                    <SelectItem value="despesas-fixas">Despesas Fixas</SelectItem>
                    <SelectItem value="despesas-operacionais">Despesas Operacionais</SelectItem>
                    <SelectItem value="outros">Outros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2 space-y-2">
                <Label>Descrição</Label>
                <Input placeholder="Descrição da transação" />
              </div>
              <div className="space-y-2">
                <Label>Valor</Label>
                <Input type="number" placeholder="0,00" />
              </div>
              <div className="space-y-2">
                <Label>Data</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>Vencimento</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pago">Pago</SelectItem>
                    <SelectItem value="pendente">Pendente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2 space-y-2">
                <Label>Observações</Label>
                <Textarea placeholder="Observações adicionais..." />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsNewTransacaoOpen(false)}>
                Cancelar
              </Button>
              <Button className="bg-primary hover:bg-primary/90">Salvar Transação</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <DollarSign className="w-4 h-4 mr-1" />
              Saldo Atual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${saldoAtual >= 0 ? "text-green-600" : "text-red-600"}`}>
              R$ {Math.abs(saldoAtual).toFixed(2).replace(".", ",")}
            </div>
            <div className="flex items-center mt-1">
              {saldoAtual >= 0 ? (
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
              )}
              <span className="text-sm text-gray-500">Saldo disponível</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <ArrowUpRight className="w-4 h-4 mr-1 text-green-600" />
              Receitas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">R$ {totalReceitas.toFixed(2).replace(".", ",")}</div>
            <p className="text-sm text-gray-500 mt-1">Total recebido</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <ArrowDownRight className="w-4 h-4 mr-1 text-red-600" />
              Despesas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">R$ {totalDespesas.toFixed(2).replace(".", ",")}</div>
            <p className="text-sm text-gray-500 mt-1">Total gasto</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <Calendar className="w-4 h-4 mr-1" />A Receber
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">R$ {receitasPendentes.toFixed(2).replace(".", ",")}</div>
            <p className="text-sm text-gray-500 mt-1">Receitas pendentes</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <CreditCard className="w-4 h-4 mr-1" />A Pagar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              R$ {despesasPendentes.toFixed(2).replace(".", ",")}
            </div>
            <p className="text-sm text-gray-500 mt-1">Despesas pendentes</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="font-heading">Fluxo de Caixa</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                receitas: { label: "Receitas", color: "#10b981" },
                despesas: { label: "Despesas", color: "#ef4444" },
                saldo: { label: "Saldo", color: "#3b82f6" },
              }}
              className="h-80"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dadosFluxoCaixa}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="receitas" stroke="#10b981" strokeWidth={2} />
                  <Line type="monotone" dataKey="despesas" stroke="#ef4444" strokeWidth={2} />
                  <Line type="monotone" dataKey="saldo" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="font-heading">Distribuição por Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                vendas: { label: "Vendas", color: "#3b82f6" },
                despesasFixas: { label: "Despesas Fixas", color: "#ef4444" },
                despesasOperacionais: { label: "Despesas Operacionais", color: "#f59e0b" },
                outros: { label: "Outros", color: "#10b981" },
              }}
              className="h-80"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dadosCategorias}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {dadosCategorias.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tabs para Transações */}
      <Tabs defaultValue="todas" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="todas">Todas</TabsTrigger>
            <TabsTrigger value="receitas">Receitas</TabsTrigger>
            <TabsTrigger value="despesas">Despesas</TabsTrigger>
            <TabsTrigger value="pendentes">Pendentes</TabsTrigger>
          </TabsList>

          {/* Filtros */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar transações..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="pago">Pago</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="vencido">Vencido</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="todas">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="font-heading">Todas as Transações</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">ID</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Tipo</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Descrição</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Categoria</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Valor</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Data</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransacoes.map((transacao) => (
                      <tr key={transacao.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium text-gray-900">{transacao.id}</td>
                        <td className="py-3 px-4">
                          <Badge variant="outline" className={getTipoColor(transacao.tipo)}>
                            {transacao.tipo === "receita" ? "Receita" : "Despesa"}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-gray-900">{transacao.descricao}</td>
                        <td className="py-3 px-4 text-gray-600">{transacao.categoria}</td>
                        <td className={`py-3 px-4 font-medium ${getTipoColor(transacao.tipo)}`}>
                          {transacao.tipo === "receita" ? "+" : "-"}R$ {transacao.valor.toFixed(2).replace(".", ",")}
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          {new Date(transacao.data).toLocaleDateString("pt-BR")}
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={getStatusColor(transacao.status)}>
                            {transacao.status === "pago" ? "Pago" : "Pendente"}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="receitas">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="font-heading text-green-600">Receitas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Lista de todas as receitas...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="despesas">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="font-heading text-red-600">Despesas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Lista de todas as despesas...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pendentes">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="font-heading text-yellow-600">Transações Pendentes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Lista de transações pendentes...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
