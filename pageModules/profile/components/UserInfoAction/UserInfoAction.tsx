import styles from './UserInfoAction.module.scss';
import {FC} from 'react';
import {RiPencilLine} from 'react-icons/ri';


const UserInfoAction:FC = () => {
    
    return (
        <div className={styles.wrapper}>
            <div className={styles.main}>
                <div className={styles.name}>
                    Александр, 26
                    <button>
                        <RiPencilLine/>
                    </button>
                </div>
                <div className={styles.location}>Киев, Украина</div>
            </div>
            <div className={styles.action}>
                Баланс: 5 кредитов
            </div>
        </div>
    )
}

export default UserInfoAction;