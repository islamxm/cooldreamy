import styles from './UserTitle.module.scss';
import { userTitlePropsTypes } from './types';

const UserTitle = ({
    username,
    age,
    isOnline,
    style,
    textBold
}: userTitlePropsTypes) => {

    return (
        <div className={`${styles.wrapper} ${isOnline ? styles.online : ''}`} style={{fontWeight: textBold ? 500 : 400, ...style}}>
            <div className={styles.badge}>{`${username} ${age ? ', ' + age : ''}`}</div>
        </div>
    )
}

export default UserTitle;