import styles from './UserInfoAction.module.scss';
import {FC} from 'react';
import {RiPencilLine} from 'react-icons/ri';
import UserTitle from '@/components/UserTitle/UserTitle';

const UserInfoAction:FC<{
    name?: string,
    age?: number,
    state?: string,
    credits?: number
}> = ({
    name,
    age,
    state,
    credits
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
                    {state}
                </div>
            </div>
            <div className={styles.action}>
                Баланс: {credits} кредитов
            </div>
        </div>
    )
}

export default UserInfoAction;