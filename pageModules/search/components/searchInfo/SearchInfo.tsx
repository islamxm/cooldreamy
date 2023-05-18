import styles from './SearchInfo.module.scss';
import { tabsPropsTypes } from '../../types';
import {FC, useState, useEffect} from 'react';
import { searchInfoType } from './types';
import { tabItemPropsTypes } from '../../types';
import { useSelector } from 'react-redux';
import { useAppSelector } from '@/hooks/useTypesRedux';



const SearchInfo:FC<searchInfoType> = ({
    total,
    isNear,
    isNew,
    isOnline,
    setIsNear,
    setIsNew,
    setIsOnline
}) => {
    const {locale} = useAppSelector(s => s)
    const [activeId, setActiveId] = useState<string>('1');

    const tabs:tabItemPropsTypes[] = [
        {label: locale?.searchPage.filter.tabs.all, id: '1'},
        {label: locale?.searchPage.filter.tabs.near, id: '2'},
        {label: locale?.searchPage.filter.tabs.new, id: '3'},
        {label: locale?.searchPage.filter.tabs.online, id: '4'},
    ]
    
    
    useEffect(() => {
        if(activeId && setIsNear && setIsOnline && setIsNew) {
            switch(activeId) {
                case '1':
                    setIsNear(0)
                    setIsOnline(0)
                    setIsNew(0)
                    break;
                case '2':
                    setIsNear(1)
                    setIsOnline(0)
                    setIsNew(0)
                    break;
                case '3':
                    setIsNear(0)
                    setIsOnline(0)
                    setIsNew(1)
                    break;
                case '4':
                    setIsNear(0)
                    setIsOnline(1)
                    setIsNew(0)
                    break;
                default:
                    setIsNear(0)
                    setIsOnline(0)
                    setIsNew(0)
                    break;
            }
        }
    }, [activeId, setIsNear, setIsNew, setIsOnline])


    return (
        <div className={styles.wrapper}>
            <div className={styles.value}>
                {locale?.searchPage.filter.found}: {total}
            </div>
            <div className={styles.tabs}>
                {
                    tabs?.map((item, index) => (
                        <button 
                            key={index} 
                            onClick={() => setActiveId(item.id)}
                            className={`${styles.item} ${activeId === item.id ? styles.active : ''}`}>
                                {item.label}
                            </button>
                    ))
                }
            </div>
        </div>
    )
}

export default SearchInfo;