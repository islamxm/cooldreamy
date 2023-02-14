import styles from './StreamItem.module.scss';
import {FC} from 'react';
import { streamItemType } from '../../types';
import Image from 'next/image'; 

const StreamItem:FC<streamItemType> = ({
    image,
    index,
    id
}) => {
    return (
        <div className={styles.item}>
            <div className={styles.icon}></div>
            <div className={styles.img}>
                <Image src={image} alt={""}/>
            </div>
        </div>
    )
}

export default StreamItem;