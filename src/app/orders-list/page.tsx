
import { fetchOrdersData, getOrdersPaginated } from './actions/fetchData'
import {OrderTable} from './table/OrderTable'
import { orderTableColums } from './table/Colums.Const'

interface Props {
  searchParams: { 
    page?: string
    search?: string
  }
}

export default async function OrdersList({ searchParams }: Props) {
  const page = Number(searchParams.page || '1')
  const limit = 10
  const search = searchParams.search || ''

  const { data, total, page: currentPage, lastPage } = await fetchOrdersData(page, limit, search)

  if (!data) return <p>Cargando...</p>

  return (
    <div className="container mx-auto py-4">
      <OrderTable
        columns={orderTableColums}
        data={data}
        total={total}
        page={currentPage}
        lastPage={lastPage}
        searchQuery={search}
      />
    </div>
  )
}
