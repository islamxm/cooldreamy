import styles from './MainLayout.module.scss';
import {FC} from 'react';


const MainLayout = ({children}:{
    children: React.ReactNode
}) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}

export default MainLayout;