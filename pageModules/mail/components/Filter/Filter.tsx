import styles from './Filter.module.scss';
import Tabs from '@/components/Tabs/Tabs';
import {useState, FC} from 'react';
import { IChatFilterType, chatTabsType } from '../../types';
import Router from 'next/router';

const tabsList = [
    {
        id: '1',
        // badge: 3,
        label: 'Все переписки'
    },
    {
        id: '2',
        // badge: 3,
        label: 'Непрочитанные'
    },
    {
        id: '3',
        // badge: 0,
        label: 'Избранные'
    },
    {
        id: '4',
        // badge: 0,
        label: 'Игнорируемые'
    }
]


const modeTabs = [
    {
        id: '1',
        // badge: 3,
        label: 'Чат'
    },
    {
        id: '2',
        // badge: 3,
        label: 'Письма'
    }
]


const Filter:FC<IChatFilterType> = ({
    // activeType,
    // onTypeChange
}) => {


    const switchActiveType = (type: chatTabsType) => {
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
        }
    }


    return (
        <div className={styles.wrapper}>
            <div className={styles.body}>
                <div className={styles.part}>
                    <Tabs
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
                        />
                </div>
                <div className={styles.part}>
                    <Tabs
                        list={modeTabs}
                        // onChange={(e) => {
                        //     if(e == '1') {
                        //         onTypeChange('chat')
                        //         Router.push('/chat?chat_type=chat')
                        //     }
                        //     if(e == '2') {
                        //         onTypeChange('mail')
                        //         Router.push('/chat?chat_type=mail')
                        //     }
                            
                        // }}
                        onChange={() => {}}
                        // activeItem={switchActiveType(activeType).value}
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