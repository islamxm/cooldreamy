import styles from './UserInfoAction.module.scss';
import {FiHeart} from 'react-icons/fi';
import {FaRegSmileWink} from 'react-icons/fa';
import {AiOutlineStar} from 'react-icons/ai';

const UserInfoAction = () => {
    return (
        <div className={`${styles.wrapper} ${styles.online}`}>
            <div className={styles.main}>
                <div className={styles.name}>
                    Виктория, 23
                </div>
                <div className={styles.location}>
                    Киев, Украина
                </div>
            </div>
            <div className={styles.action}>
                <button className={styles.item}>
                    <div className={styles.icon}>
                        <FiHeart/>
                    </div>
                    <div className={styles.text}>НРАВИТСЯ</div>
                </button>
                <button className={styles.item}>
                    <div className={styles.icon}>
                        <FaRegSmileWink/>
                    </div>
                    <div className={styles.text}>ПОДМИГНУТЬ</div>
                </button>
                <button className={styles.item}>
                    <div className={styles.icon}>
                        <AiOutlineStar/>
                    </div>
                    <div className={styles.text}>ИЗБРАННОЕ</div>
                </button>
            </div>
        </div>
    )
}

export default UserInfoAction;