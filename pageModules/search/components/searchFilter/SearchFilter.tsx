import styles from './SearchFilter.module.scss';
import SelectDef from '@/components/SelectDef/SelectDef';
import Button from '@/components/Button/Button';
import {GoSettings} from 'react-icons/go';
import { useState } from 'react';
import {motion} from 'framer-motion';
import { Row, Col } from 'antd';
import RangeSlider from '@/components/RangeSlider/RangeSlider';
import {FC, useEffect} from 'react';
import { searchFilterType } from './types';
import { useWindowSize } from 'usehooks-ts';

const countryList = [
    {
        value: '1',
        label: 'Россия'
    }
]

const ageList = [
    {
        value: '1',
        label: '18'
    },
    {
        value: '2',
        label: '19'
    },
    {
        value: '3',
        label: '20'
    },
    {
        value: '4',
        label: '21'
    },
    {
        value: '5',
        label: '22'
    },
    {
        value: '6',
        label: '23'
    }
]


// const citiesList = [
//     {

//     }
// ]


const SearchFilter:FC<searchFilterType> = ({
    targetList, 
    financeList,
    age_range_start,
    age_range_end,
    prompt_target_id,
    prompt_finance_state_id,
    
    setage_range_start,
    setage_range_end,
    setprompt_target_id,
    setprompt_finance_state_id,

    onSearch,
    load,


    countries,
    country,
    setCountry,

    states,
    state,
    setState,
    clearStates,

    clearFilter,
    onToggleDrawer
    
}) => {

    const [showAll, setShowAll] = useState<boolean>(false);
    const {width} = useWindowSize()
    
    const toggleFilter = () => {
        setShowAll(s => !s)
    }



    


    return (
        <div className={styles.wrapper}>
            <Row gutter={[10,10]}>
                <Col span={24}>
                    <div className={styles.main}>
                        <div className={styles.list}>
                            <div className={styles.item}>
                                <SelectDef
                                    label='Страна'
                                    width={230}
                                    placeholder='Страна'
                                    onChange={(e,v) => {
                                        setCountry(v)
                                    }}
                                    onClear={clearStates}
                                    list={countries}
                                    />
                            </div>
                            {
                                states?.length > 0 ? (
                                    <div className={styles.item}>
                                        <SelectDef
                                            label='Город'
                                            width={230}
                                            onChange={(e, v) => {
                                                setState(v)
                                            }}
                                            placeholder='Город'
                                            list={states}
                                            />
                                    </div>
                                ) : null
                            }
                            
                        </div>
                        <div className={styles.action}>
                            {
                                width <= 768 ? (
                                    <div className={styles.action_item}>
                                        <Button
                                            before={<GoSettings/>}
                                            variant={'simple'}
                                            text={showAll ? 'Скрыть' : 'Все фильтры'}
                                            style={{padding: '8px 35px', fontSize: '18px', lineHeight: '27px', boxShadow: 'none !important'}}
                                            onClick={onToggleDrawer}
                                            />
                                    </div>
                                ) : (
                                    <div className={styles.action_item}>
                                        <Button
                                            before={<GoSettings/>}
                                            variant={'simple'}
                                            text={showAll ? 'Скрыть' : 'Все фильтры'}
                                            style={{padding: '8px 35px', fontSize: '18px', lineHeight: '27px', boxShadow: 'none !important'}}
                                            onClick={toggleFilter}
                                            />
                                    </div>
                                )
                            }
                            
                            <div className={styles.action_item}>
                                <Button
                                    load={load}
                                    onClick={() => onSearch && onSearch()} 
                                    style={{padding: '8px 35px', fontSize: '18px', lineHeight: '27px'}} 
                                    text='Найти'/>
                            </div>
                        </div>
                    </div>
                </Col>
                {
                    showAll ? (
                        <Col span={24}>
                            <div
                                className={styles.ex}>
                                <div className={styles.list}>
                                    {/* <div className={styles.item}>
                                        <SelectDef
                                            list={targetList}
                                            // value={prompt_target_id}
                                            onChange={setprompt_target_id}
                                            placeholder={'Не указано'}
                                            label={'Цель знакомства'}
                                            width={230}
                                            />
                                    </div>
                                    <div className={styles.item}>
                                        <SelectDef
                                            list={financeList}
                                            // value={country?.label}
                                            // value={prompt_finance_state_id}
                                            onChange={setprompt_finance_state_id}
                                            placeholder={'Не указано'}
                                            label={'Финансовые цели'}
                                            width={230}
                                            />
                                    </div> */}
                                    <div className={styles.item}>
                                        <RangeSlider
                                            style={{width: 140}}
                                            min={18}
                                            max={70}
                                            onChange={e => {
                                                setage_range_start && setage_range_start(e[0])
                                                setage_range_end && setage_range_end(e[1])
                                            }}
                                            range={true}
                                            value={[age_range_start,age_range_end]}    
                                            label={'Возраст'}
                                            // unit={'год'}
                                            />
                                    </div>
                                </div>
                                {/* <div className={styles.action}>
                                    <div className={styles.item}>
                                        <button 
                                            onClick={clearFilter}
                                            className={styles.reset}>
                                            Очистить
                                        </button>
                                    </div>
                                </div> */}
                            </div>
                        </Col>
                    ) : null
                }
            </Row>
            
            
        </div>
    )
}

export default SearchFilter;