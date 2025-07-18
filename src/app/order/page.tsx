import React, { Suspense } from 'react'
import CreateOrderForm from '@/components/common/forms/CreateOrderForm/CreateOrderForm'
import { fetchData } from './actions/fetchData'
const CreateOrder = () => {

  const data= fetchData()


  return (
    <div className=''>
      <h2>
        Crear nota de remisión
      </h2>

      <div>
        <Suspense fallback={<div>cargando</div>}>
          <CreateOrderForm data={data}/>
        </Suspense>
      </div>
    </div>
  )
}

export default CreateOrder