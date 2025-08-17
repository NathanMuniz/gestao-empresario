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
import { Plus, Search, Eye, Edit, Trash2, Filter } from "lucide-react"

const vendas = [
  {
    id: "V001",
    cliente: "João Silva",
    data: "2024-01-15",
    valor: 450.0,
    status: "Pago",
    produtos: 3,
    vendedor: "Maria Santos",
  },
  {
    id: "V002",
    cliente: "Ana Costa",
    data: "2024-01-15",
    valor: 320.0,
    status: "Pendente",
    produtos: 2,
    vendedor: "Pedro Lima",
  },
  {
    id: "V003",
    cliente: "Carlos Oliveira",
    data: "2024-01-14",
    valor: 180.0,
    status: "Pago",
    produtos: 1,
    vendedor: "Maria Santos",
  },
  {
    id: "V004",
    cliente: "Lucia Ferreira",
    data: "2024-01-14",
    valor: 750.0,
    status: "Cancelado",
    produtos: 5,
    vendedor: "Pedro Lima",
  },
]

export function VendasContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [isNewVendaOpen, setIsNewVendaOpen] = useState(false)

  const filteredVendas = vendas.filter((venda) => {
    const matchesSearch =
      venda.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venda.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "todos" || venda.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pago":
        return "bg-green-100 text-green-800"
      case "Pendente":
        return "bg-yellow-100 text-yellow-800"
      case "Cancelado":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-heading font-bold text-gray-900">Vendas</h2>
          <p className="text-gray-600 mt-1">Gerencie todas as suas vendas</p>
        </div>
        <Dialog open={isNewVendaOpen} onOpenChange={setIsNewVendaOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Nova Venda
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="font-heading">Nova Venda</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="cliente">Cliente</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="joao">João Silva</SelectItem>
                    <SelectItem value="ana">Ana Costa</SelectItem>
                    <SelectItem value="carlos">Carlos Oliveira</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="vendedor">Vendedor</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o vendedor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="maria">Maria Santos</SelectItem>
                    <SelectItem value="pedro">Pedro Lima</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="produto">Produto</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o produto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="produto1">Produto A</SelectItem>
                    <SelectItem value="produto2">Produto B</SelectItem>
                    <SelectItem value="produto3">Produto C</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantidade">Quantidade</Label>
                <Input type="number" placeholder="1" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="valor">Valor Unitário</Label>
                <Input type="number" placeholder="0,00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="desconto">Desconto (%)</Label>
                <Input type="number" placeholder="0" />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea placeholder="Observações sobre a venda..." />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsNewVendaOpen(false)}>
                Cancelar
              </Button>
              <Button className="bg-primary hover:bg-primary/90">Salvar Venda</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filtros e Busca */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar por cliente ou ID da venda..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Status</SelectItem>
                <SelectItem value="pago">Pago</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="cancelado">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Vendas */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="font-heading">Lista de Vendas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Cliente</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Data</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Valor</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Produtos</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Vendedor</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredVendas.map((venda) => (
                  <tr key={venda.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{venda.id}</td>
                    <td className="py-3 px-4 text-gray-900">{venda.cliente}</td>
                    <td className="py-3 px-4 text-gray-600">{new Date(venda.data).toLocaleDateString("pt-BR")}</td>
                    <td className="py-3 px-4 font-medium text-gray-900">
                      R$ {venda.valor.toFixed(2).replace(".", ",")}
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getStatusColor(venda.status)}>{venda.status}</Badge>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{venda.produtos}</td>
                    <td className="py-3 px-4 text-gray-600">{venda.vendedor}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
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

      {/* Resumo das Vendas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total de Vendas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              R${" "}
              {vendas
                .reduce((acc, venda) => acc + venda.valor, 0)
                .toFixed(2)
                .replace(".", ",")}
            </div>
            <p className="text-sm text-gray-500 mt-1">{vendas.length} vendas registradas</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Vendas Pagas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{vendas.filter((v) => v.status === "Pago").length}</div>
            <p className="text-sm text-gray-500 mt-1">
              R${" "}
              {vendas
                .filter((v) => v.status === "Pago")
                .reduce((acc, venda) => acc + venda.valor, 0)
                .toFixed(2)
                .replace(".", ",")}
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Vendas Pendentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {vendas.filter((v) => v.status === "Pendente").length}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              R${" "}
              {vendas
                .filter((v) => v.status === "Pendente")
                .reduce((acc, venda) => acc + venda.valor, 0)
                .toFixed(2)
                .replace(".", ",")}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
