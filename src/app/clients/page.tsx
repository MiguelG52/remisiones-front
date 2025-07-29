import React, { Suspense } from 'react'
import RegisterClient from './components/RegisterClient'
import { fetchClients } from './actions/actions'
import ClientsTable from './components/ClientsTable'
interface Props {
  searchParams: Promise<{ 
    page?: string
    search?: string
  }>
}
const Clients = async({ searchParams }: Props) => {
    const {page, search} = await searchParams
    const limit = 10
    const response = await fetchClients(Number(page), limit, search)

    if (!response) return <p>Cargando...</p>
    return (
    <div className='mt-4'>
      <div className='flex justify-between'>
        <h2>
            Clientes
        </h2>
        <div>
            <RegisterClient/>
        </div>
      </div>

      <div>
        <Suspense fallback={<div>cargando</div>}>
          <ClientsTable response={response} />
        </Suspense>
      </div>
    </div>
  )
}

export default Clients