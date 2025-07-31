
import { fetchOrdersData } from './actions/fetchData'
import { orderTableColums } from './table/Colums.Const'
import { CustomTable } from '@/components/common/Table'

interface Props {
  searchParams: Promise<{ 
    page?: string
    search?: string
  }>
}

export default async function OrdersList({ searchParams }: Props) {
  const {page, search} = await searchParams
  const limit = 8

  const { data, total, page: currentPage, lastPage } = await fetchOrdersData(Number(page), limit, search)

  if (!data) return <p>Cargando...</p>
  return (
    <div className="container mt-5">
      <CustomTable
        columns={orderTableColums}
        data={data}
        total={total}
        page={currentPage}
        lastPage={lastPage}
        searchQuery={search}
        >
      </CustomTable>

    </div>
  )
}
