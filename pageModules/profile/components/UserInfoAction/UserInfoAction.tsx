import styles from './UserInfoAction.module.scss';
import {FC} from 'react';
import {RiPencilLine} from 'react-icons/ri';
import UserTitle from '@/components/UserTitle/UserTitle';
import { IUser } from '@/models/IUser';
import UserLocation from '@/components/UserLocation/UserLocation';
import { useAppSelector } from '@/hooks/useTypesRedux';
const UserInfoAction:FC<IUser> = ({
    name,
    age,
    state,
    credits,
    country
}) => {
    const {locale} = useAppSelector(s => s);


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
                {locale?.global.my_card.balance.title}: {credits ? credits: 0} {locale?.global.my_card.balance.label}
            </div>
        </div>
    )
}

export default UserInfoAction;