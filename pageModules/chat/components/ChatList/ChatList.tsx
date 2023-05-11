import styles from './ChatList.module.scss';
import ChatItem from '../ChatItem/ChatItem';
import { useRouter } from 'next/router';
import PromoBadge from '../PromoBadge/PromoBadge';
import ApiService from '@/service/apiService';
import {FC, useEffect, useRef, useState} from 'react';
import { chatItemPropsTypes } from '../../types';
import {useCallback} from 'react';
import { PulseLoader } from 'react-spinners';
import { useInView } from 'react-intersection-observer';
import { IDialogs } from '../../types';
import {Col} from 'antd';
import Input from '@/components/Input/Input';
import { FiSearch } from 'react-icons/fi';



const ChatList:FC<IDialogs> = ({
    activeDialogId,
    dialogsList = [],
    updateDialogsPage,
    totalDialogItemCount,

    updateDialogsList
}) => {
    const {inView, ref} = useInView()
    const [loadMore, setLoadMore] = useState(false)

    
    useEffect(() => {
        dialogsList?.length === totalDialogItemCount ? setLoadMore(false) : setLoadMore(true)
    }, [dialogsList, totalDialogItemCount])


    useEffect(() => {
        if(loadMore && inView) {
            updateDialogsPage && updateDialogsPage((s: number) => s + 1)
        }
    }, [inView, loadMore, updateDialogsPage])



    return (
        <div className={`${styles.wrapper} custom-scroll-vertical`}>
             <div style={{padding: '5px'}}>
                <Input
                    style={{
                        borderRadius: 8,
                        paddingTop: 5,
                        paddingBottom: 5,
                    }}
                    placeholder='Поиск...'
                    afterIcon={<FiSearch color='#888888'/>}

                    //beforeIcon={<FiSearch/>}
                    />
            </div>
            <PromoBadge/>
            {
                dialogsList?.length > 0 ? dialogsList?.map((item, index) => (
                    <ChatItem
                        key={index}
                        {...item}
                        active={item?.id === activeDialogId}
                        updateDialogsList={updateDialogsList}
                        />
                )) : null
                // <div className={styles.empty}>Нет переписок</div>
            }
            {
                dialogsList && dialogsList?.length > 0 ? (
                    loadMore ? (
                        <div ref={ref} className={styles.loader}><PulseLoader color='var(--violet)'/></div>
                    ) : null
                ) : null
            }
            
            
        </div>  
    )
}

export default ChatList;