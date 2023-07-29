import styles from './Navbar.module.scss';
import {FiSearch} from 'react-icons/fi';
import {IoChatbubblesOutline} from 'react-icons/io5';
import {FiUsers} from 'react-icons/fi'
import {AiOutlineHeart} from 'react-icons/ai'
import {BiStore} from 'react-icons/bi';
import Link from 'next/link';
import { useAppSelector } from '@/hooks/useTypesRedux';
import { useRouter } from 'next/router';



const Navbar = () => {
    const {unreadChatCount} = useAppSelector(s => s)
    const {pathname} = useRouter()

    return (
        <div className={styles.wrapper}>
            <div className={styles.in}>
                <div className={styles.item}>
                    <Link className={`${styles.btn} ${pathname?.includes('/search') ? styles.active : ''}`} href={'/search'}>
                        <FiSearch/>
                    </Link>
                </div>
                <div className={styles.item}>
                    <Link className={`${styles.btn} ${pathname?.includes('/chat') ? styles.active : ''}`} href={'/chat?type=chat'}>
                        <IoChatbubblesOutline/>
                        {
                            unreadChatCount === 0 && (
                                <div className={styles.badge}>{unreadChatCount > 99 ? '+99' : unreadChatCount}</div>
                            )
                        }
                    </Link>
                </div>
                <div className={styles.item}>
                    <Link className={`${styles.btn} ${pathname?.includes('/feed') ? styles.active : ''}`} href={'/feed'}>
                        <FiUsers/>
                    </Link>
                </div>
                <div className={styles.item}>
                    <Link className={`${styles.btn} ${pathname?.includes('/sympathy') ? styles.active : ''}`} href={'/sympathy'}>
                        <AiOutlineHeart/>
                    </Link>
                </div>
                <div className={styles.item}>
                    <Link className={`${styles.btn} ${pathname?.includes('/deposit')}`} href={'/deposit'}>
                        <BiStore/>
                    </Link>
                </div>
            </div>
        </div>
    )
}


export default Navbar;