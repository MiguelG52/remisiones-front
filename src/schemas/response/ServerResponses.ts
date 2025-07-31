import { ApiError } from "../error/error";

export interface SuccesfullResponse {
    success: true, data?:any, message:string 
}
export interface ErrorResponse{
    success: false, error: ApiError 
}