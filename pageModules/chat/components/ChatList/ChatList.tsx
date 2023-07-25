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
import ChatPricing from '../ChatPricing/ChatPricing';
import { useWindowSize } from 'usehooks-ts';
import { useAppSelector } from '@/hooks/useTypesRedux';
import SkeletonChatList from './components/SkeletonChatList/SkeletonChatList';

const service = new ApiService()


const ChatList:FC<IDialogs> = ({
    activeDialogId,
    dialogsList = [],
    updateDialogsPage,
    totalDialogItemCount,

    updateDialogsList,
    filter
}) => {
   
    const {inView, ref} = useInView({
        rootMargin: '150px'
    })
    const [loadMore, setLoadMore] = useState(false)
    const [search, setSearch] = useState('')
    const {width} = useWindowSize()
    const [updated, setUpdated] = useState(0);

    useEffect(() => {
        dialogsList?.length === totalDialogItemCount ? setLoadMore(false) : setLoadMore(true)
    }, [dialogsList, totalDialogItemCount])

    setTimeout(() => {
        setUpdated(updated + 1);
    }, 1000)

    useEffect(() => {
        if(loadMore && inView) {
            updateDialogsPage && updateDialogsPage((s: number) => s + 1)
        }
    }, [inView, loadMore, updateDialogsPage, updated])





  
    return (
        <div className={`${styles.wrapper} custom-scroll-vertical`}>
            <PromoBadge/>
            {
                dialogsList?.length > 0 ? dialogsList?.map((item, index) => (
                    item?.id ? (
                        <ChatItem
                            key={index}
                            {...item}
                            active={item?.id === activeDialogId}
                            updateDialogsList={updateDialogsList}
                            filter={filter}
                        />
                    ) : ''
                )) : null
                // <div className={styles.empty}>Нет переписок</div>
            }
            {
                dialogsList && dialogsList?.length > 0 ? (
                    loadMore ? (
                        <div ref={ref} className={styles.loader}><SkeletonChatList/></div>
                    ) : null
                ) : null
            }
            {width > 768 && <ChatPricing/>}
            
        </div>  
    )
}

export default ChatList;