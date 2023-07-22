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
import { useAppSelector } from '@/hooks/useTypesRedux';
import OnlyPremium from '@/components/OnlyPremium/OnlyPremium';
import defCountryList from '@/helpers/defCountryList';


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
    const {locale, userData} = useAppSelector(s => s)
    
    const toggleFilter = () => {
        setShowAll(s => !s)
    }

    useEffect(() => {
        if(width <= 768) {
            setShowAll(false)
        }
    }, [width])

    


    return (
        <div className={styles.wrapper}>
            <Row gutter={[10,10]}>
                <Col span={24}>
                    <div className={styles.main}>
                        <div className={styles.list}>
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
                                    label={locale?.searchPage.filter.list.filter_age.label}
                                    />
                            </div>
                            <div className={styles.item}>
                                <SelectDef
                                    label={locale?.searchPage.filter.list.filter_country.label}
                                    width={230}
                                    placeholder={locale?.searchPage.filter.list.filter_country.placeholder ?? ''}
                                    onChange={(e,v) => {
                                        setCountry(v)
                                    }}
                                    onClear={() => {
                                        clearStates()
                                        setCountry('')
                                        setState('')
                                    }}
                                    // list={countries}
                                    list={defCountryList}
                                    />
                            </div>
                            {/* {
                                states?.length > 0 ? (
                                    <div className={styles.item}>
                                        <SelectDef
                                            label={locale?.searchPage.filter.list.filter_state.label}
                                            width={230}
                                            onChange={(e, v) => {
                                                setState(v)
                                            }}
                                            placeholder={locale?.searchPage.filter.list.filter_state.placeholder ?? ''}
                                            list={states}
                                            onClear={() => {
                                                setState('')
                                            }}
                                            />
                                    </div>
                                   
                                ) : null
                            } */}
                            {/* <div className={styles.item}>
                                <OnlyPremium>
                                    <SelectDef
                                        disabled={userData?.is_premium !== 1}
                                        list={targetList}
                                        onChange={(e, v) => {
                                            setprompt_target_id && setprompt_target_id(e)
                                        }}
                                        placeholder={'Не указано'}
                                        label={locale?.searchPage.filter.list.filter_target.label}
                                        width={230}
                                        multiple
                                        
                                        />
                                </OnlyPremium>
                            </div>
                            <div className={styles.item}>
                                <OnlyPremium>
                                    <SelectDef
                                        list={financeList}
                                        onChange={(e, v) => {
                                            setprompt_finance_state_id && setprompt_finance_state_id(e)
                                        }}
                                        placeholder={'Не указано'}
                                        label={locale?.searchPage.filter.list.filter_finance.label}
                                        width={230}
                                        multiple
                                        />  
                                </OnlyPremium>
                            </div> */}
                            
                        </div>
                        <div className={styles.action}>
                            {
                                width <= 768 ? (
                                    <div className={styles.action_item}>
                                        <Button
                                            before={<GoSettings/>}
                                            variant={'simple'}
                                            text={locale?.searchPage.filter.action.mobile_filter_btn ?? ''}
                                            style={{padding: '8px 35px', fontSize: '18px', lineHeight: '27px', boxShadow: 'none !important'}}
                                            onClick={onToggleDrawer}
                                            />
                                    </div>
                                ) : null
                            }
                            
                            <div className={styles.action_item}>
                                <Button
                                    load={load}
                                    onClick={() => onSearch && onSearch()} 
                                    style={{padding: '8px 35px', fontSize: '18px', lineHeight: '27px'}} 
                                    text={locale?.searchPage.filter.action.search_btn ?? ''}/>
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