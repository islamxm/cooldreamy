import { useRouter } from 'next/router';
import styles from './MainLayout.module.scss';
import {FC} from 'react';
import { useWindowSize } from 'usehooks-ts';

const MainLayout = ({children}:{
    children: React.ReactNode
}) => {
    const {width} = useWindowSize()
    const {pathname} = useRouter()

    return (
        <div className={`${styles.container} ${width <= 768 && (pathname && pathname?.includes('/chat')) ? styles.chat : ''}`}>
            {children}
        </div>
    )
}

export default MainLayout;