
import { PusherPrivateChannel, Channel } from "laravel-echo/dist/channel";


export const updateToken = (token: string | { [property: string]: string; } | null | undefined) => ({type: 'UPDATE_TOKEN', token})
export const updateSocket = (socket: PusherPrivateChannel | Channel |  null) => ({type: 'UPDATE_SOCKET', socket})
export const updateUserId = (id: string | { [property: string]: string; } | number | null | undefined) => ({type: 'UPDATE_USER_ID', id})