export type chatItemPropsTypes = {
    // !!test
    favorite?: boolean,
    first_user_id?: number,
    id: number,
    is_ignored_by_first_user?: 0 | 1,
    is_ignored_by_second_user?: 0 | 1,
    last_message?: lastMessageType,
    another_user: chatUserType,
    is_confirmed_user?: 1 | 0
    text?: string,
    active: boolean
}

export type lastMessageType = {
    chat_id?: number,
    chat_messageable_id?: number,
    chat_messageable_type?: string,
    created_at?: string,
    disabled?: 0 | 1,
    id?: number,
    is_read_by_recepient?: 0 | 1,
    recepient_user_id?: number,
    sender_user_id?: number,
    updated_at?: string,
    chat_messageable?: IMessageable
}

export type IMessageable = {
    created_at?: string,
    updated_at?: string
    gifts?: any[],
    id?: number,
    text?: string,
    from_user_id?: number,
    to_user_id?: number,
    thumbnail_url?: string,
    image_url?: string
}




export type dialogItemType = {
    chat_id?: number,
    chat_messageable?: IMessageable,
    chat_messageable_id?: number,
    chat_messageable_type?: string,
    created_at?: string,
    disabled?: 1 | 0,
    id: number,
    is_read_by_recepient?: 1 | 0,
    sender_user_id?: number
    me?: boolean,
    updated_at?: string
}



type chatUserType = {
    avatar_url?: string,
    avatar_url_thumbnail?: string,
    id?: number,
    name?: string,
}

export type messageStatuses = 'send' | 'read' | 'proccess' | 'unread'