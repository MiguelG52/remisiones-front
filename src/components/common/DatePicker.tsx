import React from 'react'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from '../ui/form'
import { Control, FieldValues, Path } from 'react-hook-form'
import { Button } from '../ui/button'
import { CalendarIcon } from 'lucide-react'
import { PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { Calendar } from '../ui/calendar'
import { cn } from '@/utils/utils'
import { format } from 'date-fns'
import { Popover } from '../ui/popover'


interface DatePickerProps<T extends FieldValues> {
  name: Path<T>,
  label: string,
  placeholder: string,
  control: Control<T>,
  isRequired?: boolean
}

const DatePicker = <T extends FieldValues>({control, name, placeholder, isRequired, label}: DatePickerProps<T>) => {
  return (
    <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>{label}</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>{placeholder}</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
        )}
    >
    </FormField>
    
  )
}

export default DatePicker