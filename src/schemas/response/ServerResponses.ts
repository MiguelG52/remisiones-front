import { ApiError } from "../error/error";

export interface SuccesfullResponse {
    success: true, message:string, data:any 
}
export interface ErrorResponse{
    success: false, error: ApiError 
}