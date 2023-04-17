import styles from './Menu.module.scss';
import { menuItemType } from './types';
import MenuItem from './components/MenuItem/MenuItem';

import {FiSearch} from 'react-icons/fi';
import {IoChatbubblesOutline} from 'react-icons/io5';
import {FiUsers, FiHeart, FiSettings} from 'react-icons/fi';
import {RxExit} from 'react-icons/rx';
import { useRouter } from 'next/router';

const menuList:menuItemType[] = [
    {
        label: 'Поиск',
        link: '/search',
        icon: <FiSearch/>,
        badge: 0,
        onClick: () => {},
    },
    {
        label: 'Мои переписки',
        link: '/chat',
        icon: <IoChatbubblesOutline/>,
        badge: 0,
        onClick: () => {},
    },
    {
        label: 'Знакомства',
        link: '/feed',
        icon: <FiUsers/>,
        badge: 0,
        onClick: () => {},
    },
    {
        label: 'Симпатии',
        link: '/sympathy',
        icon: <FiHeart/>,
        badge: 0,
        onClick: () => {},
    },
    {
        label: 'Настройки',
        link: '/settings',
        icon: <FiSettings/>,
        badge: 0,
        onClick: () => {},
    },
    {
        label: 'Выход',
        link: undefined,
        icon: <RxExit/>,
        badge: 0,
        onClick: () => {},
    },
    
]


const Menu = () => {
    const {pathname} = useRouter()


    return (
        <div className={styles.menu}>
            {
                menuList?.map((item, index) => (
                    <div className={styles.item} key={index}>
                        <MenuItem
                            {...item}
                            isActive={pathname === item.link}
                            />
                    </div>
                ))
            }
        </div>
    )
}

export default Menu;