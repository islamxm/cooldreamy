export type chatItemPropsTypes = {
    isActive?: boolean,
    isFavourite?: boolean,
    unreadMesssageCount?: number,
    status?: messageStatuses,
    id?: string
}

export type messageStatuses = 'send' | 'read' | 'proccess' | 'unread'