import React from 'react'
import { Control, FieldValues, Path } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'


interface SelectProps<T extends FieldValues> {
  name: Path<T>,
  label: string,
  placeholder: string,
  control: Control<T>,
  isRequired?: boolean,
  data:Array<any>,
}

const SelectForm = <T extends FieldValues>({name, label, placeholder, control, isRequired,data}: SelectProps<T>) => {
     return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel htmlFor={name} className='flex items-center'>
            {label} {
            isRequired ? 
            <p className='text-destructive'>*</p>:null}
          </FormLabel>
            <Select required={isRequired} onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className='w-full cursor-pointer' id={name}>
                    <SelectValue  placeholder={placeholder} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                    {
                        data.map((item:{name:string,id:string})=>(
                            <SelectItem className='cursor-pointer' key={item.id} value={item.id}>{item.name}</SelectItem>
                        ))
                    }
                </SelectContent>
              </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default SelectForm