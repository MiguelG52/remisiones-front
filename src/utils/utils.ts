import { ApiError } from "@/schemas/error/error";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}




export const zodNumber = (configure?: (num: z.ZodNumber) => z.ZodNumber) => 
  z.preprocess(
    (value) => {
      if (value === "" || value === undefined) return undefined;
      return Number(value);
    },
    configure ? configure(z.number()) : z.number()
  );


  export function isApiError(obj: any): obj is ApiError {
      return obj && typeof obj.message === 'string' && !obj.token;
    }