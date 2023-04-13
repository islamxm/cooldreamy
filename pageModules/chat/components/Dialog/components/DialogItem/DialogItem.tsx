import styles from './DialogItem.module.scss';
import {FC, useState, useEffect} from 'react';
import { dialogItemType } from '@/pageModules/chat/types';

const DialogItem:FC<dialogItemType> = ({
    me,
}) => {


    return (
        <div className={`${styles.wrapper} ${me ? styles.right : styles.left}`}>

        </div>
    )
}


export default DialogItem;