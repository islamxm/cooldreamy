import styles from './UserInfoAction.module.scss';
import {FC} from 'react';
import {RiPencilLine} from 'react-icons/ri';
import UserTitle from '@/components/UserTitle/UserTitle';
import { IUser } from '@/models/IUser';
import UserLocation from '@/components/UserLocation/UserLocation';

const UserInfoAction:FC<IUser> = ({
    name,
    age,
    state,
    credits,
    country
}) => {
    
    return (
        <div className={styles.wrapper}>
            <div className={styles.main}>
                <div className={styles.name}>
                    <UserTitle
                        username={name}
                        age={age ? age?.toString() : ''}
                        style={{fontSize: 24}}
                        />
                    {/* <button>
                        <RiPencilLine/>
                    </button> */}
                </div>
                <div className={styles.location}>
                    <UserLocation
                        country={country}
                        state={state}
                        
                        />
                </div>
            </div>
            <div className={styles.action}>
                Баланс: {credits ? credits: 0} кредитов
            </div>
        </div>
    )
}

export default UserInfoAction;