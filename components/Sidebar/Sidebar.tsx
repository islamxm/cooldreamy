import styles from './Sidebar.module.scss';
import { FC } from 'react';
import MyCard from './components/MyCard/MyCard';
import PremiumBtn from './components/PremiumBtn/PremiumBtn';
const Sidebar:FC = () => {
    return (
        <div className={styles.wrapper}>
            <div>
                <MyCard/>
            </div>
            <div>
                <PremiumBtn/>
            </div>
        </div>
    )
}

export default Sidebar;