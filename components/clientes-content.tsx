"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Phone, Mail, MapPin, Edit, Trash2 } from "lucide-react"
import { useState } from "react"

const mockClientes = [
  {
    id: 1,
    nome: "João Silva",
    email: "joao@email.com",
    telefone: "(11) 99999-9999",
    endereco: "Rua das Flores, 123",
    status: "Ativo",
    totalCompras: 15420.5,
    ultimaCompra: "2024-01-15",
  },
  {
    id: 2,
    nome: "Maria Santos",
    email: "maria@email.com",
    telefone: "(11) 88888-8888",
    endereco: "Av. Principal, 456",
    status: "Ativo",
    totalCompras: 8750.3,
    ultimaCompra: "2024-01-10",
  },
  {
    id: 3,
    nome: "Pedro Costa",
    email: "pedro@email.com",
    telefone: "(11) 77777-7777",
    endereco: "Rua do Comércio, 789",
    status: "Inativo",
    totalCompras: 3200.0,
    ultimaCompra: "2023-12-20",
  },
]

export function ClientesContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showModal, setShowModal] = useState(false)

  const filteredClientes = mockClientes.filter(
    (cliente) =>
      cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalClientes = mockClientes.length
  const clientesAtivos = mockClientes.filter((c) => c.status === "Ativo").length
  const totalFaturamento = mockClientes.reduce((sum, c) => sum + c.totalCompras, 0)

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Gestão de Clientes</h1>
        <Button onClick={() => setShowModal(true)} className="bg-blue-900 hover:bg-blue-800">
          <Plus className="w-4 h-4 mr-2" />
          Novo Cliente
        </Button>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClientes}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{clientesAtivos}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faturamento Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {totalFaturamento.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e Busca */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar por nome ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Clientes */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Clientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredClientes.map((cliente) => (
              <div key={cliente.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{cliente.nome}</h3>
                      <Badge variant={cliente.status === "Ativo" ? "default" : "secondary"}>{cliente.status}</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {cliente.email}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        {cliente.telefone}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {cliente.endereco}
                      </div>
                      <div>
                        <strong>Total em Compras:</strong> R${" "}
                        {cliente.totalCompras.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Modal Novo Cliente */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Novo Cliente</h2>
            <div className="space-y-4">
              <Input placeholder="Nome completo" />
              <Input placeholder="Email" type="email" />
              <Input placeholder="Telefone" />
              <Input placeholder="Endereço" />
            </div>
            <div className="flex gap-2 mt-6">
              <Button onClick={() => setShowModal(false)} variant="outline" className="flex-1">
                Cancelar
              </Button>
              <Button onClick={() => setShowModal(false)} className="flex-1 bg-blue-900 hover:bg-blue-800">
                Salvar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
