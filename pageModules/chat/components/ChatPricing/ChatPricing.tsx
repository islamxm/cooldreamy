import styles from './ChatPricing.module.scss';
import ApiService from '@/service/apiService';
import { useAppSelector } from '@/hooks/useTypesRedux';
import {useEffect, useState} from 'react';

const service = new ApiService()


const ChatPricing = () => {
    const {token, locale, actionsPricing} = useAppSelector(s => s)

    return (
        <div className={styles.wrapper}>
            <div className={styles.head}>{locale?.chatPage.pricing.title}</div>
            <div className={styles.body}>
                {
                    actionsPricing?.length > 0 && actionsPricing?.map(i => (
                        <div key={i.id} className={styles.item}>{i.name}: {i.price}</div>
                    ))
                }
            </div>
        </div>
    )
}


export default ChatPricing;