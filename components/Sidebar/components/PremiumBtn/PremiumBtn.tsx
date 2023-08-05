import styles from './PremiumBtn.module.scss';
import {FC} from 'react';
import {motion} from 'framer-motion';
import { useAppSelector } from '@/hooks/useTypesRedux';
import Router, { useRouter } from 'next/router';
import { useAppDispatch } from '@/hooks/useTypesRedux';
import { updateSoonModal } from '@/store/actions';
const PremiumBtn:FC = ({
    
}) => {
    const dispatch = useAppDispatch()
    const {locale} = useAppSelector(s => s)

    return (
        <motion.button 
            
            whileTap={{
                scale: 0.9,
            }}
            onClick={() => Router.push('/premium')}
            //onClick={() => dispatch(updateSoonModal(true))}
            transition={{ type: "spring", stiffness: 400, damping: 17 }} 
            whileHover={{
                boxShadow: '0.872px 9.962px 20px rgba(148, 45, 217, 0.35)',
            }}
            className={styles.button}>
            <div className={styles.icon}></div>
            <div className={styles.text}>{locale?.global.menu.get_premium}</div>
        </motion.button>
    )

}

export default PremiumBtn;