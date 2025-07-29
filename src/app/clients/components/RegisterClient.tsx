'use client'
import RegisterClientForm from '@/app/clients/components/RegisterClientForm'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useIsMobile } from '@/hooks/use-mobile'
import { UserPlus } from 'lucide-react'
import { useState } from 'react'


const RegisterClient = () => {
    const isMobile = useIsMobile()
    const [open, setOpen] = useState(false)

  const handleSuccess = () => {
    setOpen(false)
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className='border p-1.5 bg-white rounded-3xl cursor-pointer  hover:text-foreground transition-all ease-in-out duration-200 hover:bg-accent'>
            <div className='flex gap-2 text-sm items-center'>
                <UserPlus className='w-5'/>
                {!isMobile ? "Registro de cliente":""}
            </div>
        </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Registro de cliente</DialogTitle>
                    <RegisterClientForm onCloseDialog={handleSuccess}/>
                </DialogHeader>
            </DialogContent>
    </Dialog>
  )
}

export default RegisterClient