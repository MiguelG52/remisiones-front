import React from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Control, FieldValues, Path, type UseFormRegister } from 'react-hook-form'
import { LucideProps, User } from 'lucide-react'
import { Badge } from '../ui/badge'

interface InputTextProps<T extends FieldValues> {
  name: Path<T>,
  label: string,
  placeholder: string,
  control: Control<T>,
  isRequired?: boolean
  Icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
  type?:string
  register?: UseFormRegister<any>
}

  
const InputText = <T extends FieldValues>({control, name, label, placeholder, isRequired,Icon, type}: InputTextProps<T>) => {

  if(!type) type="text"
  
  return (
    <FormField
      control={control}
      name={name}
      render={({field}) =>(
        <FormItem className='w-full'>
          <FormLabel htmlFor={name} className='flex items-center'>
            {label} 
            {isRequired ? 
            <p className='text-destructive'>*</p>:null}
          </FormLabel>
          <FormControl>
            <div className='w-full relative'>
              <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              {
                type && type=="number"?(

                  <Input
                    type={type}
                    id={name}
                    className='pl-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20 pb-2"'
                    placeholder={placeholder}
                    {...field}
                    onChange={event => field.onChange(+event.target.value)}
                  />

                ):(
                  <Input
                  
                    type={type}
                    id={name}
                    className='pl-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20 pb-2"'
                    placeholder={placeholder}
                    {...field}
                  />
                )
              }

            </div>

          </FormControl>
           <FormMessage className='form-message' />
        </FormItem>
      )}
    >
    </FormField>
  )
}

export default InputText