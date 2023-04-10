import styles from './SearchInfo.module.scss';
import { tabsPropsTypes } from '../../types';
import {FC} from 'react';
import { searchInfoType } from './types';
import { tabItemPropsTypes } from '../../types';

const tabs:tabItemPropsTypes[] = [
    {label: 'Все', id: '1'},
    {label: 'Рядом', id: '2'},
    {label: 'Новые', id: '3'},
    {label: 'Онлайн', id: '4'},
]


const SearchInfo:FC<searchInfoType> = ({
    total,
    isNear,
    isNew,
    isOnline,
    setIsNear,
    setIsNew,
    setIsOnline
}) => {




    return (
        <div className={styles.wrapper}>
            <div className={styles.value}>
                Найдено: {total}
            </div>
            <div className={styles.tabs}>
                {
                    tabs?.map((item, index) => (
                        <button 
                            key={index} 
                            // onClick={() => onChange(item.id)}
                            className={`${styles.item}`}>
                                {item.label}
                            </button>
                    ))
                }
            </div>
        </div>
    )
}

export default SearchInfo;