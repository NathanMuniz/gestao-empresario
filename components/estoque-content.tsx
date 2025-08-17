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
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plus, Search, Edit, Trash2, Filter, AlertTriangle, Package } from "lucide-react"

const produtos = [
  {
    id: "P001",
    nome: "Smartphone Galaxy A54",
    categoria: "Eletrônicos",
    preco: 1299.99,
    quantidade: 15,
    minimo: 5,
    fornecedor: "Samsung",
    localizacao: "A1-B2",
    status: "normal",
  },
  {
    id: "P002",
    nome: "Notebook Dell Inspiron",
    categoria: "Informática",
    preco: 2499.99,
    quantidade: 3,
    minimo: 5,
    fornecedor: "Dell",
    localizacao: "B1-C3",
    status: "baixo",
  },
  {
    id: "P003",
    nome: "Fone Bluetooth JBL",
    categoria: "Acessórios",
    preco: 199.99,
    quantidade: 25,
    minimo: 10,
    fornecedor: "JBL",
    localizacao: "C2-A1",
    status: "normal",
  },
  {
    id: "P004",
    nome: "Carregador USB-C",
    categoria: "Acessórios",
    preco: 49.99,
    quantidade: 0,
    minimo: 20,
    fornecedor: "Anker",
    localizacao: "A3-B1",
    status: "esgotado",
  },
  {
    id: "P005",
    nome: "Tablet iPad Air",
    categoria: "Eletrônicos",
    preco: 3299.99,
    quantidade: 8,
    minimo: 3,
    fornecedor: "Apple",
    localizacao: "B2-C1",
    status: "normal",
  },
]

export function EstoqueContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoriaFilter, setCategoriaFilter] = useState("todas")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [isNewProdutoOpen, setIsNewProdutoOpen] = useState(false)
  const [isMovimentacaoOpen, setIsMovimentacaoOpen] = useState(false)

  const filteredProdutos = produtos.filter((produto) => {
    const matchesSearch =
      produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      produto.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategoria = categoriaFilter === "todas" || produto.categoria === categoriaFilter
    const matchesStatus = statusFilter === "todos" || produto.status === statusFilter
    return matchesSearch && matchesCategoria && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "bg-green-100 text-green-800"
      case "baixo":
        return "bg-yellow-100 text-yellow-800"
      case "esgotado":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "normal":
        return "Normal"
      case "baixo":
        return "Estoque Baixo"
      case "esgotado":
        return "Esgotado"
      default:
        return "Desconhecido"
    }
  }

  const produtosBaixoEstoque = produtos.filter((p) => p.status === "baixo" || p.status === "esgotado")
  const valorTotalEstoque = produtos.reduce((acc, produto) => acc + produto.preco * produto.quantidade, 0)
  const totalProdutos = produtos.reduce((acc, produto) => acc + produto.quantidade, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-heading font-bold text-gray-900">Estoque</h2>
          <p className="text-gray-600 mt-1">Gerencie seus produtos e controle de estoque</p>
        </div>
        <div className="flex space-x-2">
          <Dialog open={isMovimentacaoOpen} onOpenChange={setIsMovimentacaoOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Package className="w-4 h-4 mr-2" />
                Movimentação
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-heading">Movimentação de Estoque</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Produto</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o produto" />
                    </SelectTrigger>
                    <SelectContent>
                      {produtos.map((produto) => (
                        <SelectItem key={produto.id} value={produto.id}>
                          {produto.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Tipo de Movimentação</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entrada">Entrada</SelectItem>
                      <SelectItem value="saida">Saída</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Quantidade</Label>
                  <Input type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label>Motivo</Label>
                  <Textarea placeholder="Descreva o motivo da movimentação..." />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsMovimentacaoOpen(false)}>
                  Cancelar
                </Button>
                <Button className="bg-primary hover:bg-primary/90">Confirmar</Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isNewProdutoOpen} onOpenChange={setIsNewProdutoOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Novo Produto
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="font-heading">Novo Produto</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label>Nome do Produto</Label>
                  <Input placeholder="Digite o nome do produto" />
                </div>
                <div className="space-y-2">
                  <Label>Categoria</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="eletronicos">Eletrônicos</SelectItem>
                      <SelectItem value="informatica">Informática</SelectItem>
                      <SelectItem value="acessorios">Acessórios</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Preço</Label>
                  <Input type="number" placeholder="0,00" />
                </div>
                <div className="space-y-2">
                  <Label>Quantidade Inicial</Label>
                  <Input type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label>Estoque Mínimo</Label>
                  <Input type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label>Fornecedor</Label>
                  <Input placeholder="Nome do fornecedor" />
                </div>
                <div className="space-y-2">
                  <Label>Localização</Label>
                  <Input placeholder="Ex: A1-B2" />
                </div>
                <div className="space-y-2">
                  <Label>Código de Barras</Label>
                  <Input placeholder="Código de barras" />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label>Descrição</Label>
                  <Textarea placeholder="Descrição detalhada do produto..." />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsNewProdutoOpen(false)}>
                  Cancelar
                </Button>
                <Button className="bg-primary hover:bg-primary/90">Salvar Produto</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Alertas de Estoque Baixo */}
      {produtosBaixoEstoque.length > 0 && (
        <Alert className="border-yellow-200 bg-yellow-50">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            <strong>Atenção!</strong> {produtosBaixoEstoque.length} produto(s) com estoque baixo ou esgotado.
            <Button variant="link" className="p-0 h-auto text-yellow-800 underline ml-1">
              Ver detalhes
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total de Produtos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{totalProdutos}</div>
            <p className="text-sm text-gray-500 mt-1">{produtos.length} tipos diferentes</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Valor Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">R$ {valorTotalEstoque.toFixed(2).replace(".", ",")}</div>
            <p className="text-sm text-gray-500 mt-1">Valor do estoque</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Estoque Baixo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {produtos.filter((p) => p.status === "baixo").length}
            </div>
            <p className="text-sm text-gray-500 mt-1">Produtos abaixo do mínimo</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Esgotados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {produtos.filter((p) => p.status === "esgotado").length}
            </div>
            <p className="text-sm text-gray-500 mt-1">Produtos sem estoque</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e Busca */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar por produto ou código..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoriaFilter} onValueChange={setCategoriaFilter}>
              <SelectTrigger className="w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas as Categorias</SelectItem>
                <SelectItem value="Eletrônicos">Eletrônicos</SelectItem>
                <SelectItem value="Informática">Informática</SelectItem>
                <SelectItem value="Acessórios">Acessórios</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Status</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="baixo">Estoque Baixo</SelectItem>
                <SelectItem value="esgotado">Esgotado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Produtos */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="font-heading">Lista de Produtos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Código</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Produto</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Categoria</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Preço</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Quantidade</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Localização</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredProdutos.map((produto) => (
                  <tr key={produto.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{produto.id}</td>
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium text-gray-900">{produto.nome}</div>
                        <div className="text-sm text-gray-500">{produto.fornecedor}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{produto.categoria}</td>
                    <td className="py-3 px-4 font-medium text-gray-900">
                      R$ {produto.preco.toFixed(2).replace(".", ",")}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <span className="font-medium text-gray-900">{produto.quantidade}</span>
                        <span className="text-sm text-gray-500 ml-1">/ min: {produto.minimo}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getStatusColor(produto.status)}>{getStatusLabel(produto.status)}</Badge>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{produto.localizacao}</td>
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
    </div>
  )
}
