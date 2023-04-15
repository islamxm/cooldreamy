import styles from './ChatBody.module.scss';
import ChatSide from '../ChatSide/ChatSide';
import Dialog from '../Dialog/Dialog';
import ChatAction from '../ChatAction/ChatAction';
import { useAppSelector } from '@/hooks/useTypesRedux';
import ApiService from '@/service/apiService';
import { useEffect, useState } from 'react';
import Button from '@/components/Button/Button';
import testimg from '@/public/assets/images/test.jpg';
import Image from 'next/image';
import {FC} from 'react';
import { IDialogs, IChat } from '../../types';

import ChatStart from '../ChatStart/ChatStart';
import ChatMock from '../ChatMock/ChatMock';


type testType = {
    updateChat: (...args: any[]) => any
}


const ChatBody:FC<IDialogs & IChat & testType> = ({
    // для диалогов
    dialogsList,
    activeDialogId,
    updateDialogsPage,

    // для чата
    chatList,
    id,
    updateChatListPage,



    // !! тестовый проп
    updateChat
}) => {
    
    
    const [pb, setPb] = useState<number>(70)




    
    

    return (
        <div className={styles.wrapper}>
            <div className={styles.sidebar}>

                <ChatSide
                    updateDialogsPage={updateDialogsPage}
                    dialogsList={dialogsList}
                    activeDialogId={activeDialogId}
                    /> 


            </div>         
            <div className={styles.main} style={{maxHeight: `calc(100% - ${pb})`}}>
                <div className={styles.body} >

                    <Dialog
                        chatList={chatList}
                        id={id || activeDialogId}
                        updateChatListPage={updateChatListPage}
                        />

                    {/* <ChatStart/> */}

                    {/* <ChatMock/> */}

                </div>
                <div className={styles.action}>

                    
                    <ChatAction 
                        updateChat={updateChat}
                        setHeight={setPb}/>


                </div>
            </div>   
           
        </div>
    )
}

export default ChatBody;