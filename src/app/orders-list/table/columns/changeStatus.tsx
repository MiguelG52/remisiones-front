'use client'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { changeOrderStatusData, changeOrderStatusSchema } from '@/schemas/ChangeOrderStatus.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogDescription } from '@radix-ui/react-dialog'
import React, { Dispatch, SetStateAction, Suspense, useState } from 'react'
import { useForm } from 'react-hook-form'
import { handleChangeOrderStatus } from '../../actions/fetchData'
import { toast } from 'sonner'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
interface props{
    open:boolean | undefined,
    setOpen: Dispatch<SetStateAction<boolean>>
}

const ChangeStatus = ({open, setOpen}:props)=>{
  const [loading, setIsLoading]= useState<boolean>(false)
    const changeOrderStatusForm = useForm<changeOrderStatusData>({
      resolver:zodResolver(changeOrderStatusSchema),
      defaultValues:{
        statusId:''
      }
    })
  
    async function onSubmit(data: changeOrderStatusData) {
        setIsLoading(true)
        try {
            const result = await handleChangeOrderStatus("asdasd",data);
            if (!result.success) {
              toast.error(result.error.message || 'Error desconocido al iniciar sesión');
              return;
            }
            if (result.success) {
              toast.success(result.message);
            }

        } catch (error) {
            toast.error('Ocurrió un error al iniciar sesión')
        } finally {
          setIsLoading(false)
        }
    }
    return(
      <Suspense>
        <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className='border p-1.5 bg-white rounded-3xl cursor-pointer  hover:text-foreground transition-all ease-in-out duration-200 hover:bg-accent'>
        </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                  <DialogTitle>Cerrar Orden</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                  Esta acción cerrada la ordern de remisión
                    <Form {...changeOrderStatusForm}>
                      <form onSubmit={changeOrderStatusForm.handleSubmit(onSubmit)} className='flex flex-col gap-5 mt-5 sm:w-1/2 xl:w-1/4'>
                          <Button className='cursor-pointer'>
                              {loading? <Loader2 size={15} className='animate-spin'></Loader2>:"Cerrar Orden"} 
                          </Button>
                      </form>
                  </Form>
                </DialogDescription>
            </DialogContent>
      </Dialog>
      </Suspense>
    )
  }
export default ChangeStatus