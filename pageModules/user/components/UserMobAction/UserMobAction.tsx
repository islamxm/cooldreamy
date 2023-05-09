import styles from './UserMobAction.module.scss';
import ApiService from '@/service/apiService';
import { useAppSelector } from '@/hooks/useTypesRedux';
import Router from 'next/router';
import Button from '@/components/Button/Button';
import { useWindowSize } from 'usehooks-ts';
const service = new ApiService()



const UserMobAction = ({id}: {id?: number}) => {
    const {width} = useWindowSize()

    return (
        <div className={styles.wrapper}>
            <div className={styles.main}>
                <div className={styles.item}></div>
            </div>
            <div className={styles.ex}>
                <Button small={width <= 500} middle={width > 500} text='Сообщение'/>
            </div>
        </div>
    )
}

export default UserMobAction;