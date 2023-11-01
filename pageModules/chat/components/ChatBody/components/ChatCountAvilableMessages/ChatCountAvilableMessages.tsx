import styles from './styles.module.scss';
import {FC, useEffect, useState} from 'react';
import {FcInfo} from 'react-icons/fc';
import { useAppSelector } from '@/hooks/useTypesRedux';
import PromptModal from '@/popups/PromptModal/PromptModal';
const ChatCountAvilableMessages:FC = () => {
    const {userData} = useAppSelector(s => s)
    const [modal, setModal] = useState(false)

    return (
        <div className={styles.wrapper}>
            <PromptModal
                open={modal}
                text="When the credits are spent, you'll need to buy a paid subscription"
                onAccept={() => setModal(false)}
                onReject={() => setModal(false)}
                onCancel={() => setModal(false)}
                />
            <div className={styles.badge}>
                <div className={styles.label}>Доступно сообщений: {userData?.free_credits ? Math.floor(userData?.free_credits / 3) : 0} </div>
                <div className={styles.info} onClick={() => setModal(true)}>
                    <FcInfo/>
                </div>
            </div>
        </div>
    )
}

export default ChatCountAvilableMessages;