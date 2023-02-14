import styles from './Menu.module.scss';
import { menuItemType } from './types';
import MenuItem from './components/MenuItem/MenuItem';

import {FiSearch} from 'react-icons/fi';
import {IoChatbubblesOutline} from 'react-icons/io5';
import {FiUsers, FiHeart, FiSettings} from 'react-icons/fi';
import {RxExit} from 'react-icons/rx';


const menuList:menuItemType[] = [
    {
        label: 'Поиск',
        link: '/search',
        icon: <FiSearch/>,
        badge: 0,
        onClick: () => {},
        isActive: false
    },
    {
        label: 'Мои переписки',
        link: '/',
        icon: <IoChatbubblesOutline/>,
        badge: 3,
        onClick: () => {},
        isActive: false
    },
    {
        label: 'Знакомства',
        link: '/',
        icon: <FiUsers/>,
        badge: 0,
        onClick: () => {},
        isActive: false
    },
    {
        label: 'Симпатии',
        link: '/',
        icon: <FiHeart/>,
        badge: 21,
        onClick: () => {},
        isActive: false
    },
    {
        label: 'Настройки',
        link: '/',
        icon: <FiSettings/>,
        badge: 0,
        onClick: () => {},
        isActive: false
    },
    {
        label: 'Выход',
        link: undefined,
        icon: <RxExit/>,
        badge: 0,
        onClick: () => {},
        isActive: false
    },
    
]


const Menu = () => {

    return (
        <div className={styles.menu}>
            {
                menuList?.map((item, index) => (
                    <div className={styles.item} key={index}>
                        <MenuItem
                            {...item}
                            />
                    </div>
                ))
            }
        </div>
    )
}

export default Menu;