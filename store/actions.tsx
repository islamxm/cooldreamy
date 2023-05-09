import { IUser } from "@/models/IUser";
import { PusherPrivateChannel, Channel } from "laravel-echo/dist/channel";


export const updateToken = (token: string | { [property: string]: string; } | null | undefined) => ({type: 'UPDATE_TOKEN', token: token})
export const updateSocket = (socket: PusherPrivateChannel | Channel |  null) => ({type: 'UPDATE_SOCKET', socket: socket})
export const updateUserId = (id: string | { [property: string]: string; } | number | null | undefined) => ({type: 'UPDATE_USER_ID', id: id})
export const updateUserData = (data: IUser | null) => ({type: 'UPDATE_USER_DATA', data})
export const updateMenu = () => ({type: 'UPDATE_MENU'})



export const updateNewMessage = (data: any) => ({type: 'UPDATE_NEW_MESSAGE', data})
export const updateNewMail = (data: any) => ({type: 'UPDATE_NEW_MAIL', data})