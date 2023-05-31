import { useAppSelector } from "@/hooks/useTypesRedux";
import { useEffect, useState } from "react";
import styles from './OnlyPremium.module.scss';
import LimitModal from "@/popups/LimitModal/LimitModal";



const OnlyPremium = ({
    children,
}: {
    children?: React.ReactNode
}) => {
    const {userData} = useAppSelector(s => s)
    const [modal, setModal] = useState(false)


    const onClick = () => {
        console.log('clicked')
        if(userData?.is_premium === 1) {
            return;
        } else {
            setModal(true)
        }
    }

    return (
        <>
            <LimitModal
                open={modal}
                onCancel={() => setModal(false)}
                head="Ограничение"
                text="Функционал доступен только в 'Премиум подписке'"
                />
            <div className={styles.wrapper} onClick={onClick}>
            
            {
                userData?.is_premium !== 1 ? (
                    <div className={styles.blocked}></div>
                ) : null
            }
            {children}
        </div>
        </>
        
    )
}

export default OnlyPremium;