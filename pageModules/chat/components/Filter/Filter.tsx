import styles from './Filter.module.scss';
import Tabs from '@/components/Tabs/Tabs';
import {useState, FC} from 'react';
import { IChatFilterType, chatTabsType } from '../../types';
import Router from 'next/router';
import { useAppSelector } from '@/hooks/useTypesRedux';


const tabsList = [
    {
        id: '1',
        // badge: 3,
        label: 'Все переписки'
    },
    {
        id: '3',
        // badge: 0,
        label: 'Избранные'
    },
    // {
    //     id: '2',
    //     // badge: 3,
    //     label: 'Непрочитанные'
    // },
    // {
    //     id: '4',
    //     // badge: 0,
    //     label: 'Игнорируемые'
    // }
]





const Filter:FC<IChatFilterType> = ({
    activeType,
    onTypeChange
}) => {
    const {locale} = useAppSelector(s => s)

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


    return (
        <div className={styles.wrapper}>
            <div className={styles.body}>
                <div className={styles.part}>
                    {/* <Tabs
                        onChange={() => {}}
                        activeItem={'1'}
                        list={tabsList}
                        style={{backgroundColor: 'var(--light_purp_1)'}}
                        defaultColor="var(--light_purp_1)"
                        activeColor='#fff'
                        tabItemStyle={{
                            paddingTop: 10,
                            paddingBottom: 10
                        }}
                        /> */}
                </div>
                <div className={styles.part}>
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
                            border: '1px solid #ACA7F6'
                        }}
                        />
                </div>
            </div>
            
        </div>
    )
}

export default Filter;