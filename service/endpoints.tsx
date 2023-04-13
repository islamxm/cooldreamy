const BASE_DOMAIN = `https://api.cooldreamy.com/`;
const API_PATH = `${BASE_DOMAIN}api/`;

const endpoints = {
    //auth
    register: `${API_PATH}register`,

    //users
    search: `${API_PATH}users/search`,
    getPromptTargets: `${API_PATH}get_prompt_targets_table`,
    getPromptFinanceState: `${API_PATH}get_prompt_finance_states_table`,
    getCountries: `${API_PATH}get_countries`,
    getStates: `${API_PATH}get_states`,

    //feed
    feeds: `${API_PATH}feeds`,
    setLike: `${API_PATH}feed/set_like`,
    setSkip: `${API_PATH}feed/set_skipe`,


    //wink
    sendWink: `${API_PATH}wink/send_wink`,    


    getStickers: `${API_PATH}get_stickers`,
    getGifts: `${API_PATH}get_gifts`,


    //chat

    sendMessage_text: `${API_PATH}chats/send_chat_text_message`,
    sendMessage_sticker: `${API_PATH}chats/send_chat_sticker_message`,
    sendMessage_gift: `${API_PATH}chats/send_chat_gift_message`,

    getChat: `${API_PATH}chats/get_current_chat`,
    createChat: `${API_PATH}chats/get_chat_with_user`,
    getChatList: `${API_PATH}chats/get_my_chat_list`,
    readMessage: `${API_PATH}chats/set_chat_message_is_read`,



    //mail
    sendMail_text: `${API_PATH}letters/send_letter_text_message`,
    sendMail_sticker: `${API_PATH}letters/send_letter_sticker_message`,
    sendMail_gift: `${API_PATH}letters/send_letter_gift_message`,

    getMail: `${API_PATH}letters/get_current_letter`,
    createMail: `${API_PATH}letters/get_letter_with_user`,
    getMailList: `${API_PATH}letters/get_my_letter_list`,
    readMail: `${API_PATH}letters/set_letter_message_is_read`
    


}

export default endpoints;