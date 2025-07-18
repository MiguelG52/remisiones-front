import { Checkbox } from '@/components/ui/checkbox'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { LucideProps } from 'lucide-react'
import React from 'react'
import { Control, FieldValues, Path } from 'react-hook-form'

interface CheckBoxProps<T extends FieldValues> {
  name: Path<T>,
  label: string,
  control: Control<T>,
  isRequired?: boolean,
  Icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>  
}
const CheckBoxForm = <T extends FieldValues>({
  name,
  label,
  control,
  isRequired,
  Icon,
}: CheckBoxProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
          <FormControl>
            <div className='w-full flex items-center gap-2'>
                <Checkbox
                    id={name}
                    className='cursor-pointer'
                    required={isRequired}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                />
                <FormLabel htmlFor={name} className='flex items-center gap-2 text-sm font-normal cursor-pointer'
                >
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    {label}
                </FormLabel>
             
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default CheckBoxForm