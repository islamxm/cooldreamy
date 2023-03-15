import styles from './Filter.module.scss';
import Tabs from '@/components/Tabs/Tabs';
import {useState} from 'react';

const tabsList = [
    {
        id: '1',
        badge: 3,
        label: 'Все переписки'
    },
    {
        id: '2',
        badge: 3,
        label: 'Непрочитанные'
    },
    {
        id: '3',
        badge: 0,
        label: 'Избранные'
    },
    {
        id: '4',
        badge: 0,
        label: 'Игнорируемые'
    }
]


const modeTabs = [
    {
        id: '1',
        badge: 3,
        label: 'Чат'
    },
    {
        id: '2',
        badge: 3,
        label: 'Письма'
    }
]


const Filter = () => {

    const [filterActiveTab, setFilterActiveTab] = useState()
    const [modeActiveTab, setModeActiveTab] = useState()



    return (
        <div className={styles.wrapper}>
            <div className={styles.body}>
                <div className={styles.part}>
                    <Tabs
                        onChange={setFilterActiveTab}
                        activeItem={filterActiveTab}
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
                        onChange={setModeActiveTab}
                        activeItem={modeActiveTab}
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