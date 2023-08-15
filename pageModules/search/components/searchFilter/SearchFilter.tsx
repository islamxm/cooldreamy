import styles from './SearchFilter.module.scss';
import SelectDef from '@/components/SelectDef/SelectDef';
import Button from '@/components/Button/Button';
import {GoSettings} from 'react-icons/go';
import { useState } from 'react';
import { Row, Col } from 'antd';
import RangeSlider from '@/components/RangeSlider/RangeSlider';
import {FC, useEffect} from 'react';
import { searchFilterType } from './types';
import { useWindowSize } from 'usehooks-ts';
import { useAppSelector } from '@/hooks/useTypesRedux';
import LimitModal from '@/popups/LimitModal/LimitModal';




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
    onToggleDrawer,

    setCurrentPage
}) => {

    const [showAll, setShowAll] = useState<boolean>(false);
    const {width} = useWindowSize()
    const {locale, userData, premiumData} = useAppSelector(s => s)
    const [limitModal, setLimitModal] = useState(false)
    
    const toggleFilter = () => {
        setShowAll(s => !s)
    }

    useEffect(() => {
        if(width <= 768) {
            setShowAll(false)
        }
    }, [width])


    useEffect(() => console.log(countries), [countries])
    


    return (
        <div className={styles.wrapper}>
             <LimitModal
                open={limitModal}
                onCancel={() => setLimitModal(false)}
                head="Limitation"
                text="Functionality available only in 'Premium subscription'"
                />
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
                                    value={country?.value}
                                    // list={countries}
                                    list={countries}
                                    />
                            </div>
                            {
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
                            }
                            <div className={styles.item}>
                                <SelectDef
                                    // disabled={premiumData?.is_premium === 1}
                                    list={targetList}
                                    onChange={(e, v) => {
                                        premiumData?.is_premium === true ? 
                                        setprompt_target_id && setprompt_target_id(e) :
                                        setLimitModal(true)
                                    }}
                                    placeholder={'Не указано'}
                                    label={locale?.searchPage.filter.list.filter_target.label}
                                    width={230}
                                    multiple
                                    customIcon={true}
                                    />
                            </div>
                            <div className={styles.item}>
                                <SelectDef
                                    list={financeList}
                                    onChange={(e, v) => {
                                        premiumData?.is_premium === true ? 
                                        setprompt_finance_state_id && setprompt_finance_state_id(e) :
                                        setLimitModal(true)
                                    }}
                                    
                                    placeholder={'Не указано'}
                                    label={locale?.searchPage.filter.list.filter_finance.label}
                                    width={230}
                                    multiple
                                    customIcon={true}
                                    />  
                            </div>
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
                            
                            {/* <div className={styles.action_item}>
                                <Button
                                    load={load}
                                    onClick={() => {
                                        // onSearch && onSearch()
                                        // console.log(onSearch)
                                        setCurrentPage && setCurrentPage(0)
                                    }} 
                                    style={{padding: '8px 35px', fontSize: '18px', lineHeight: '27px'}} 
                                    text={locale?.searchPage.filter.action.search_btn ?? ''}/>
                            </div> */}
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