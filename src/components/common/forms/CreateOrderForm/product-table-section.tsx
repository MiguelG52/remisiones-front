"use client"

import type { Control } from "react-hook-form"
import { ListChecksIcon as ListCheck, Plus, Trash2 } from "lucide-react"
import type { OrderData } from "@/schemas/Order.Schema"
import type { ProductType } from "@/schemas/Product.Schema"
import { Button } from "@/components/ui/button"
import { FormField, FormItem, FormControl, FormMessage, FormLabel } from "@/components/ui/form"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"

interface ProductsSectionProps {
  control: Control<OrderData>
  products: ProductType[]
  onAddProduct: () => void
  onRemoveProduct: (id: number) => void
  onUpdateProduct: (id: number, key: keyof ProductType, value: string | number) => void
}

export function ProductsSection({
  control,
  products,
  onAddProduct,
  onRemoveProduct,
  onUpdateProduct,
}: ProductsSectionProps) {
  const getTotalAmount = () => {
    return products.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
  }

  return (
    <div className="p-3 md:p-5 bg-white border rounded-xl">
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center justify-start gap-2">
            <ListCheck className="text-primary" />
            <h3 className="font-semibold">Listado de productos</h3>
          </div>
          <p className="text-foreground/45 text-sm">Aquí se añaden el listado de productos, su cantidad y precio.</p>
        </div>
        <Button
          type="button"
          variant="secondary"
          onClick={onAddProduct}
          className="border cursor-pointer hover:bg-primary/15"
        >
          <Plus className="text-primary" />
          Añadir producto
        </Button>
      </div>

      <div className="mt-5 flex flex-col gap-5">
        <FormField
          control={control}
          name="detail.products"
          render={() => (
            <FormItem>
              <FormControl>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        <FormLabel>Cantidad</FormLabel>
                      </TableHead>
                      <TableHead>
                        <FormLabel>Descripción</FormLabel>
                      </TableHead>
                      <TableHead>
                        <FormLabel>Precio Unitario</FormLabel>
                      </TableHead>
                      <TableHead>
                        <FormLabel>Precio</FormLabel>
                      </TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <Input
                            type="number"
                            required
                            min="1"
                            value={product.quantity}
                            onChange={(e) =>
                              onUpdateProduct(product.id, "quantity", Number.parseInt(e.target.value) || 1)
                            }
                            className="w-20"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            required
                            value={product.description}
                            onChange={(e) => onUpdateProduct(product.id, "description", e.target.value)}
                            placeholder="Descripción del producto"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            required
                            type="number"
                            min="0"
                            step="0.01"
                            value={product.price}
                            onChange={(e) =>
                              onUpdateProduct(product.id, "price", Number.parseFloat(e.target.value) || 0)
                            }
                            className="w-32"
                          />
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">${(product.price * product.quantity).toFixed(2)}</span>
                        </TableCell>
                        <TableCell>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => onRemoveProduct(product.id)}
                            disabled={products.length === 1}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <div className="text-lg font-semibold">Total: ${getTotalAmount().toFixed(2)}</div>
        </div>
      </div>
    </div>
  )
}