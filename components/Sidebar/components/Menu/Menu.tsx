import styles from './Menu.module.scss';
import { menuItemType } from './types';
import MenuItem from './components/MenuItem/MenuItem';

import {FiSearch} from 'react-icons/fi';
import {IoChatbubblesOutline, IoMailOutline} from 'react-icons/io5';
import {FiUsers, FiHeart, FiSettings} from 'react-icons/fi';
import {RxExit} from 'react-icons/rx';
import { useRouter } from 'next/router';
import { Cookies } from 'typescript-cookie';
import { useAppSelector } from '@/hooks/useTypesRedux';
import { useEffect } from 'react';




const Menu = () => {
    const {locale, unreadChatCount} = useAppSelector(s => s)
    const router  = useRouter()

    const {pathname} = router


    const menuList:menuItemType[] = [
        {
            label: locale?.global.menu.search ?? '',
            link: '/search',
            root: '/search',
            icon: <FiSearch/>,
            badge: 0,
            onClick: () => {},
        },
        {
            label: locale?.global.menu.chats ?? '',
            link: '/chat?type=chat',
            root: '/chat',
            icon: <IoChatbubblesOutline/>,
            badge: unreadChatCount,
            onClick: () => {},
        },
        {
            label: 'My Mails',
            link: '/chat?type=mail',
            root: '/chat',
            icon: <IoMailOutline/>,
            onClick: () => {},
            badge: 0
        },
        {
            label: locale?.global.menu.feed ?? '',
            link: '/feed',
            root: '/feed',
            icon: <FiUsers/>,
            badge: 0,
            onClick: () => {},
        },
        {
            label: locale?.global.menu.sympathy ?? '',
            link: '/sympathy?type=views',
            root: '/sympathy',
            icon: <FiHeart/>,
            badge: 0,
            onClick: () => {},
        },
        // {
        //     label: 'Настройки',
        //     link: '/settings',
        //     icon: <FiSettings/>,
        //     badge: 0,
        //     onClick: () => {},
        // },
        // {
        //     label: 'Выход',
        //     link: undefined,
        //     icon: <RxExit/>,
        //     badge: 0,
        //     onClick: () => {
        //         process?.browser && Cookies.remove('cooldate-web-user-id')
        //         process?.browser && Cookies.remove('cooldate-web-token')
        //         process?.browser && window.location.replace('/start')
        //     },
        // },
    ]

    // useEffect(() => {
    //     console.log(router)
    // }, [router])


    return (
        <div className={styles.menu}>
            {
                menuList?.map((item, index) => (
                    <div className={styles.item} key={index}>
                        {
                            index === 2 && (
                                <MenuItem
                                    {...item}
                                    isActive={router?.query?.type === 'mail' ? true : false}
                                    />
                            )
                        }
                        {
                            index === 1 && (
                                <MenuItem
                                    {...item}
                                    isActive={router?.query?.type === 'chat' ? true : false}
                                    />
                            )
                        }
                        {
                            (index !== 1 && index !== 2) && (
                                <MenuItem
                                    {...item}
                                    isActive={item?.root && pathname?.includes(item.root) ? true : false}
                                    />
                            )
                        }
                    </div>
                ))
            }
        </div>
    )
}

export default Menu;