'use client'
import { ColumnDef, flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, PaginationState, SortingState, useReactTable } from "@tanstack/react-table";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

interface DataTableProps<TData, TValue>{
  columns: ColumnDef<TData,  TValue>[],
  data: TData[],
  total: number;
  page: number;
  lastPage: number;
  searchQuery?: string
}

export function CustomTable<TData, TValue>({columns,data, total, page, lastPage, searchQuery}:DataTableProps<TData, TValue>){

  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState("")
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState('');


  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('search', value);
    params.set('page', '1'); 
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    router.replace(`${pathname}?${params.toString()}`);
  };

  const table = useReactTable({
      data,
      columns,
      state: {
        sorting,
        globalFilter,
      },
      onSortingChange: setSorting,
      onGlobalFilterChange: setGlobalFilter,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getSortedRowModel: getSortedRowModel(),
      manualPagination: true,
      
  })
  return (
    <div className="rounded-md border mt-2 bg-white">
      <div className="flex items-center py-4 px-2 gap-2">
        <Input
          placeholder="Buscar por cliente, tipo, estado o fecha..."
          value={globalFilter}
          onChange={(e) => {
            setGlobalFilter(e.target.value);
          }}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch(globalFilter)}
          className="max-w-md"
        />
        <Button onClick={() => handleSearch(globalFilter)}>Buscar</Button>
      </div>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No se encontraron resultados
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {/* Paginación controlada por el servidor */}
      <div className="flex items-center justify-between px-4 py-5 text-sm">
        <div>
          Mostrando página {page} de {lastPage} - Total registros: {total}
        </div>
        <div className="flex items-center justify-end space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(page + 1)}
            disabled={page === lastPage}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  )
}