import styles from './Filter.module.scss';
import Tabs from '@/components/Tabs/Tabs';
import {useState, FC, useEffect} from 'react';
import { IChatFilterType, chatTabsType } from '../../types';
import Router from 'next/router';
import { useAppSelector } from '@/hooks/useTypesRedux';
import { useWindowSize } from 'usehooks-ts';
import ApiService from '@/service/apiService';


interface I {
    tabsBadgeCount?: any
}

const service = new ApiService()


const Filter:FC<IChatFilterType & I> = ({
    activeType,
    onTypeChange,

    activeFilter,
    onFilterChange
}) => {
    const {locale, unreadChatCount, token} = useAppSelector(s => s)
    const {width} = useWindowSize()
    const [countData, setCountData] = useState<any>()
    const [filterTabs, setFilterTabs] = useState<any[]>([
        {
            id: 'all',
            label: locale?.chatPage?.filter_tabs?.all,
            badge: unreadChatCount
            
        },
        {
            id: 'unread',
            label: locale?.chatPage?.filter_tabs?.notread,
            badge: unreadChatCount
        },
        {
            id: 'favorite',
            label: locale?.chatPage?.filter_tabs?.favs,
            
        },
        {
            id: 'ignored',
            label: locale?.chatPage?.filter_tabs?.ignored
        }
    ])

    const modeTabs = [
        {
            id: '1',
            // badge: 3,
            label: locale?.chatPage.type_tabs.chat ?? ''
        },
        {
            id: '2',
            // badge: 3,
            label: locale?.chatPage.type_tabs.mail ?? ''
        }
    ]




    // useEffect(() => {
    //     if(countData) {
    //         setFilterTabs(s => {
    //             const m = [...s]
    //             const rm = m.splice(2,1,{...s[2], badge: countData?.favorites})
    //             return [...m]
    //         })
    //     }
    // }, [countData])

    const switchActiveType = (type?: chatTabsType) => {
        switch(type) {
            case 'chat':
                return {
                    value: '1',
                    type: 'chat'
                }
            case 'mail':
                return {
                    value: '2',
                    type: 'mail'
                }
            default:
                return {
                    value: '',
                    type: ''
                }
        }
    }

    useEffect(() => {
        token && service.getChatFilterCount(token).then(res => {
            setCountData(res)
        })
    }, [token])


    return (
        <div className={styles.wrapper}>
            <div className={styles.body}>
                <div className={styles.part}>
                    <Tabs
                        onChange={onFilterChange}
                        activeItem={activeFilter}
                        list={filterTabs}
                        style={{backgroundColor: 'var(--light_purp_1)'}}
                        defaultColor="var(--light_purp_1)"
                        activeColor='#fff'
                        tabItemStyle={{
                            paddingTop: 10,
                            paddingBottom: 10
                        }}
                        />
                </div>
                {/* <div className={styles.part}>
                    <Tabs
                        
                        list={modeTabs}
                        onChange={(e) => {
                            if(e == '1') {
                                Router.push('/chat?type=chat')
                            }
                            if(e == '2') {
                                Router.push('/chat?type=mail')
                            }
                            
                        }}
                        activeItem={switchActiveType(activeType).value}
                        style={{backgroundColor: 'var(--light_purp_1)'}}
                        defaultColor="var(--light_purp_1)"
                        activeColor='#fff'
                        tabItemStyle={{
                            padding: '8px 50px',
                            border: '2px solid #ACA7F6',
                            width: width <= 1000 ? 'calc((100% / 2) - 8px)' : 'auto'
                        }}
                        />
                </div> */}
            </div>
            
        </div>
    )
}

export default Filter;