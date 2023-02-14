import styles from './SearchFilter.module.scss';
import SelectDef from '@/components/SelectDef/SelectDef';
import Button from '@/components/Button/Button';
import {GoSettings} from 'react-icons/go';
import { useState } from 'react';
import {motion} from 'framer-motion';

const mock = [
    {
        label: 'select 1',
        value: '1',
    },
    {
        label: 'select 2',
        value: '2',
    },
    {
        label: 'select 3',
        value: '3',
    },
]

const years = [
    {
        label: '18',
        value: '18'
    },
    {
        label: '19',
        value: '19'
    }
]


const SearchFilter = () => {

    const [showAll, setShowAll] = useState<boolean>(false);

    const toggleFilter = () => {
        setShowAll(s => !s)
    }


    return (
        <div className={styles.wrapper}>
            <div className={styles.main}>
                <div className={styles.list}>
                    <div className={styles.item}>
                        <SelectDef
                            label='Страна'
                            width={230}
                            placeholder='Страна'
                            value=''
                            list={mock}
                            />
                    </div>
                    <div className={styles.item}>
                        <SelectDef
                            label='Возраст'
                            width={70}
                            placeholder=''
                            value=""
                            list={years}
                            />
                    </div>
                </div>
                <div className={styles.action}>
                    <div className={styles.action_item}>
                        <Button
                            before={<GoSettings/>}
                            variant={'simple'}
                            text={showAll ? 'Скрыть' : 'Все фильтры'}
                            style={{padding: '8px 35px', fontSize: '18px', lineHeight: '27px', boxShadow: 'none !important'}}
                            onClick={toggleFilter}
                            />
                    </div>
                    <div className={styles.action_item}>
                        <Button style={{padding: '8px 35px', fontSize: '18px', lineHeight: '27px'}} text='Найти'/>
                    </div>
                </div>
            </div>
            {
                showAll ? (
                    <div
                        className={styles.ex}>
                        <div className={styles.list}>
                            <div className={styles.item}>
                                <SelectDef
                                    list={years}
                                    value={""}
                                    placeholder={'Город'}
                                    label={'Город'}
                                    width={230}
                                    />
                            </div>
                            <div className={styles.item}>
                                <SelectDef
                                    list={years}
                                    value={""}
                                    placeholder={'Не указано'}
                                    label={'Цель знакомства'}
                                    width={230}
                                    />
                            </div>
                        </div>
                        <div className={styles.action}>
                            <div className={styles.item}>
                                <button className={styles.reset}>
                                    Очистить
                                </button>
                            </div>
                        </div>
                    </div>
                ) : null
            }
        </div>
    )
}

export default SearchFilter;