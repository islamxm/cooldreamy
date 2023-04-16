

export const updateToken = (token: string) => ({type: 'UPDATE_TOKEN', token})
export const updateSocket = (socket: unknown) => ({type: 'UPDATE_SOCKET', socket})
export const updateUserId = (id: number) => ({type: 'UPDATE_USER_ID', id})