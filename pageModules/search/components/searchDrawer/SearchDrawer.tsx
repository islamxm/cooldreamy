import styles from './SearchDrawer.module.scss';
import {FC, useState, useEffect, useRef} from 'react'
import IconButton from '@/components/IconButton/IconButton';
import {GrClose} from 'react-icons/gr';
import { searchDrawerPropsType } from './types';
import { useAnimation, motion } from 'framer-motion';
import {Row, Col} from 'antd';
import SelectDef from '@/components/SelectDef/SelectDef';
import RangeSlider from '@/components/RangeSlider/RangeSlider';
import Button from '@/components/Button/Button';
import { searchFilterType } from '../searchFilter/types';
import OnlyPremium from '@/components/OnlyPremium/OnlyPremium';
import { useAppSelector } from '@/hooks/useTypesRedux';
import LimitModal from '@/popups/LimitModal/LimitModal';
import defCountryList from '@/helpers/defCountryList';


interface I extends searchFilterType {
    isOpen: boolean,
    onClose: (...args: any[]) => any
    onOpen: (...args: any[]) => any,

    setCurrentPage?: (...args: any[]) => any
}

const SearchDrawer:FC<I> = ({
    isOpen,
    onClose,
    onOpen,

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
    const {locale, premiumData} = useAppSelector(s => s)
    const [limitModal, setLimitModal] = useState(false)

    const onLayerClick = (e: any) => {
        if(e.target.dataset.layer === 'true') {
            onClose()
        }
    }

    return (
        <div data-layer onClick={onLayerClick} className={`${styles.wrapper} ${isOpen ? styles.active : ''}`}>
             <LimitModal
                open={limitModal}
                onCancel={() => setLimitModal(false)}
                head="Limitation"
                text="Functionality available only in 'Premium subscription'"
                />
            <div className={styles.in}>
                <div className={styles.head}>
                    <div className={styles.title}>{locale?.searchPage?.filter?.title}</div>
                    <div className={styles.close}>
                        <IconButton
                            onClick={onClose}
                            size={15}
                            icon={<GrClose/>}
                            variant={'transparent'}
                            />
                    </div>
                </div>
                <div className={styles.main}>
                    <div className={styles.body}>
                        <Row gutter={[10,10]}>
                            <Col span={12}>
                                <SelectDef
                                    label={locale?.searchPage.filter.list.filter_country.label}
                                    placeholder={locale?.searchPage.filter.list.filter_country.placeholder ?? ''}
                                    onChange={(e,v) => {
                                        setCountry(v)
                                    }}
                                    onClear={clearStates}
                                    // list={countries}
                                    list={defCountryList}
                                    />
                            </Col>
                            <Col span={12}>
                                {/* {
                                    states?.length > 0 ? (
                                        <SelectDef
                                                label='Город'
                                    
                                                onChange={(e, v) => {
                                                    setState(v)
                                                }}
                                                placeholder='Город'
                                                list={states}
                                                />
                                    ) : null
                                } */}
                                {
                                    states?.length > 0 ? (
                                        <div className={styles.item}>
                                            <SelectDef
                                                label={locale?.searchPage.filter.list.filter_state.label}
                                                // width={230}
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
                            </Col>
                            <Col span={12}>
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
                                    // width={230}
                                    multiple
                                    customIcon={true}
                                    />
                            </Col>
                            <Col span={12}>
                                <SelectDef
                                    list={financeList}
                                    onChange={(e, v) => {
                                        premiumData?.is_premium === true ? 
                                        setprompt_finance_state_id && setprompt_finance_state_id(e) :
                                        setLimitModal(true)
                                    }}
                                    
                                    placeholder={'Не указано'}
                                    label={locale?.searchPage.filter.list.filter_finance.label}
                                    // width={230}
                                    multiple
                                    customIcon={true}
                                    /> 
                            </Col>
                            <Col span={12}>
                                <RangeSlider
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
                            </Col>
                        </Row>
                    </div>
                    <div className={styles.action}>
                        <Row gutter={[10,10]}>
                            <Col span={24}>
                                <div className={styles.item}>
                                    <Button
                                        text={locale?.searchPage.filter.action.search_btn ?? ''}
                                        middle
                                        onClick={() => {
                                            // onSearch && onSearch()
                                            setCurrentPage && setCurrentPage(0)
                                            onClose()
                                        }}
                                        load={load}
                                        />
                                </div>
                            </Col>
                            <Col span={24}>
                                <div className={styles.item}>
                                    <Button
                                        onClick={clearFilter}
                                        text={locale?.searchPage.filter.action.clear ?? ''}
                                        middle
                                        variant={'bordered'}
                                        />
                                </div>
                            </Col>
                            
                        </Row>
                    </div>
                </div>
            </div>
        </div>  
    )
}

export default SearchDrawer;


