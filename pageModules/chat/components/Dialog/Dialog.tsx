import styles from './Dialog.module.scss';
import ApiService from '@/service/apiService';
import { useRouter } from 'next/router';
import {useState, useEffect, FC} from 'react';
import DialogItem from './components/DialogItem/DialogItem';
import { dialogItemType, IChat } from '../../types';
import { PulseLoader } from 'react-spinners';
import { useInView } from 'react-intersection-observer';
import { useAppSelector } from '@/hooks/useTypesRedux';

const Dialog:FC<IChat> = ({
    chatList,
    updateChatListPage,
    id
}) => {
    const {userId} = useAppSelector(s => s)
    const {inView, ref} = useInView()
    const [loadMore, setLoadMore] = useState(false)


    // !! для теста
    const [testList, setTestList] = useState<any[]>([])


    useEffect(() => {
        chatList && setTestList(chatList?.reverse())
    }, [chatList])

    return (
        <div className={styles.wrapper}>
            {
                chatList && chatList?.length > 10 ? (
                    loadMore ? (
                        <div ref={ref} className={styles.load}>
                            <PulseLoader color='var(--violet)'/>
                        </div>
                    ) : null
                ) : null
            }
            {
                testList?.map((item, index) => (
                    <DialogItem
                        {...item}
                        me={item.sender_user_id === Number(userId)} 
                        key={index}/>
                ))
            }
        </div>
    )
}

export default Dialog;