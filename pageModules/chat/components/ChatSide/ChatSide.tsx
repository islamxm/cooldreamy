import styles from './ChatSide.module.scss';
import {Row, Col} from 'antd';
import Input from '@/components/Input/Input';
import {FiSearch} from 'react-icons/fi';
import ChatList from '../ChatList/ChatList';
import { IDialogs } from '../../types';
import {FC} from 'react';

interface I {
    dialogSearch?: string,
    setDialogSearch?: (...args: any[]) => any
}


const ChatSide:FC<IDialogs & I> = ({
    dialogsList,
    activeDialogId,
    updateDialogsPage,
    updateDialogsList,
    totalDialogItemCount,
    dialogSearch,
    setDialogSearch
}) => {

    return (
        <div className={styles.wrapper}>
            <ChatList
                dialogSearch={dialogSearch}
                setDialogSearch={setDialogSearch}
                totalDialogItemCount={totalDialogItemCount}
                updateDialogsPage={updateDialogsPage}
                updateDialogsList={updateDialogsList}
                dialogsList={dialogsList}
                activeDialogId={activeDialogId}
                />
        </div>
    )
}

export default ChatSide;