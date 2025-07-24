import { User } from "../User.Model"

export interface UserData{
    accessToken:string,
}

export interface LoginResponse{
    message:string,
    accessToken:string,
}