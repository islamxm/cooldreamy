import styles from './ChatMenu.module.scss';
import {FC} from 'react';
import {IoImagesOutline, IoCloseCircleOutline} from 'react-icons/io5'
import {FaRegSmileWink} from 'react-icons/fa'
import {AiOutlineStar} from 'react-icons/ai';
import {HiOutlineMinusCircle} from 'react-icons/hi';

interface I {
    onGetAllMedia?: (...args: any) => any,
    onWink?: (...args: any) => any,
    onFav?: (...args: any) => any,
    onIgnore?: (...args: any) => any,
    onReport?: (...args: any) => any
}


const ChatMenu:FC<I> = ({
    onGetAllMedia,
    onWink,
    onFav,
    onIgnore,
    onReport
}) => {


    return (
        <div className={styles.wrapper}>
            {/* <div 
                onClick={onGetAllMedia}
                className={styles.item}>
                <div className={styles.icon}><IoImagesOutline/></div>
                <div className={styles.label}>Все медиа файлы</div>
            </div> */}
            <div 
                onClick={onWink}
                className={styles.item}>
                <div className={styles.icon}><FaRegSmileWink/></div>
                <div className={styles.label}>Подмигнуть</div>
            </div>
            <div 
                onClick={onFav}
                className={styles.item}>
                <div className={styles.icon}><AiOutlineStar/></div>
                <div className={styles.label}>В избранное</div>
            </div>
            <div 
                onClick={onIgnore}
                className={styles.item}>
                <div className={styles.icon}><HiOutlineMinusCircle/></div>
                <div className={styles.label}>Игнорировать</div>
            </div>
            <div 
                onClick={onReport}
                className={styles.item}>
                <div className={styles.icon}><IoCloseCircleOutline/></div>
                <div className={styles.label}>Пожаловаться</div>
            </div>
        </div>
    )
}

export default ChatMenu;