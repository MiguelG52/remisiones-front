import { FindClientsResponse } from '../schema/response/FindClientsResponse';
import { CustomTable } from '@/components/common/Table';
import { clientsTableColums } from './clients-table-headers';

interface props{
  response:FindClientsResponse
}

const ClientsTable = ({response}:props) => {
  const {data,total,page,lastPage} = response
   return (
    <CustomTable columns={clientsTableColums} data={data} total={total} page={page} lastPage={lastPage}/>
  )
}

export default ClientsTable