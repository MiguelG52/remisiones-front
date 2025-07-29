import React, { JSX, ReactNode } from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

interface props{
  content:string,
  trigger:JSX.Element
}


const CustomTooltip = ({content, trigger}:props) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {trigger}
      </TooltipTrigger>
      <TooltipContent>
        {content}
      </TooltipContent>
    </Tooltip>
  )
}

export default CustomTooltip