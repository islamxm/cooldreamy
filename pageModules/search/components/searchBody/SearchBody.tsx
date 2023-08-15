import styles from './SearchBody.module.scss';
import SearchFilter from '../searchFilter/SearchFilter';
import SearchInfo from '../searchInfo/SearchInfo';
import {Row, Col} from 'antd';
import { girlCardType } from '@/components/GirlCard/types';
import GirlCard from '@/components/GirlCard/GirlCard';
import img from '@/public/assets/images/girl.png';
import Pagination from '@/components/Pagination/Pagination';
import { useState, useEffect, useCallback } from 'react';
import { tabItemPropsTypes } from '../../types';
import ApiService from '@/service/apiService';
import { useAppSelector } from '@/hooks/useTypesRedux';
import { selectOptionType } from '@/components/SelectDef/types';
import SearchDrawer from '../searchDrawer/SearchDrawer';
import { useWindowSize } from 'usehooks-ts';
import SkGirlCardList from '@/components/Skeleton/SkGirlCardList/SkGirlCardList';
import { IUser } from '@/models/IUser';



const service = new ApiService();





const SearchBody = () => {
    const {token} = useAppSelector(s => s)
    const [load, setLoad] = useState(false)
   
    const [searched, setSearched] = useState(false)
    const [currentPage, setCurrentPage] = useState(0);

    
    const [targetList, setTargetList] = useState([])
    const [financeList, setFinanceList] = useState([])
    const [careerList, setCareerList] = useState([])
    const [rlList, setRlList] = useState([])
    const [interestsList, setInterestsList] = useState([])
    const [kidsList, setKidsList] = useState([])

    const [state, setState] = useState<{value: string, id: string, label: string} | null>(null)
    const [country, setCountry] = useState<{value: string, id: string, label: string} | null>({value: 'All', id: 'All', label: 'All'})
    const [age_range_start, setage_range_start] = useState(18)
    const [age_range_end, setage_range_end] = useState(70)

    const [prompt_targets, setprompt_targets] = useState<number[]>([])
    const [prompt_finance_states, setprompt_finance_states] = useState<number[]>([])

    const [filter_type, setfilter_type] = useState<'all' | 'nearby' | 'online' | 'new'>()

    const [totalFound, setTotalFound] = useState(0);

    const [list, setList] = useState<IUser[]>([])

    const [countriesList, setCountriesList] = useState<selectOptionType[]>([])
    const [statesList, setStatesList] = useState<selectOptionType[]>([])

    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const [isFilterChanged, setIsFilterChanged] = useState(false)


    useEffect(() => {
        if(token) {
            service.getAllPrompts(token).then(res => {
                if(res) {
                    setFinanceList(res?.prompt_finance_states?.map((i: any) => ({...i, value: i.id, label: i.text})))
                    setTargetList(res?.prompt_targets?.map((i: any) => ({...i, value: i.id, label: i.text})))
                }
            })
        }
    }, [token])

    const getCountries = () => {
        if(token) {
            service.getCountries().then(res => {
                setCountriesList(res?.map((i: any) => ({value: i?.id, id: i.id, label: i?.title})))
            })
        }
    }

    const getStates = (id: number) => {
        if(token) {
            service.getStates(id).then(res => {
                setStatesList(res?.map((i: any) => ({value: i?.id, id: i?.id, label: i?.title})))
            })
        }
       
    }

    useEffect(() => {
        if(country?.id && country?.id !== 'All' && token) {
            getStates && getStates(Number(country?.id))
        }
    }, [token, country])    

  




    const onSearch = () => {
        
        if(token && currentPage > 0 && country && age_range_end && age_range_start && filter_type) {
            // setCurrentPage(1)
            setLoad(true)
            service.search({
                page: 1,
                filter_type: filter_type === 'all' ? undefined : filter_type, 
                state: state?.label, 
                country: country?.label == 'All' ? '' : country?.label, 
                age_range_start, 
                age_range_end,
                prompt_targets: `[${prompt_targets?.join(',')}]`, 
                prompt_finance_states: `[${prompt_finance_states?.join(',')}]`, 
                per_page: 25
            }, token
            ).then(res => {
                setTotalFound(res?.total)
                setList(res?.data)
            }).finally(() => {
                setLoad(false)
                setIsFilterChanged(true)
            })
        }
    }

    useEffect(() => {
        onSearch()
    }, [currentPage])

    useEffect(() => {
        if(currentPage === 0 || currentPage > 1) {
            setCurrentPage(1)
        } 
        if(currentPage === 1) {
            onSearch()
        } 
        if(currentPage > 1) {
            setCurrentPage(1)
        }
    }, [token, country, age_range_end, age_range_start, filter_type, currentPage, state])



    useEffect(() => {
        getCountries()
    }, [token])

    const clearFilter = () => {
        setState(null)
        setCountry(null)
        setStatesList([])
        setage_range_start(18)
        setage_range_end(70)
        setprompt_targets([])
        setprompt_finance_states([])
    }


    


    return (    
        <div className={styles.wrapper}>
            <Row gutter={[10,10]}>
                <Col span={24}>
                    <SearchFilter
                        load={load}
                        targetList={targetList}
                        financeList={financeList}
                        prompt_target_id={prompt_targets}
                        age_range_end={age_range_end}
                        age_range_start={age_range_start}
                        setage_range_start={setage_range_start}
                        setage_range_end={setage_range_end}
                        setprompt_target_id={setprompt_targets}
                        setprompt_finance_state_id={setprompt_finance_states}
                        onSearch={onSearch}
                        countries={countriesList}
                        country={country}
                        setCountry={setCountry}
                        states={statesList}
                        clearStates={() => setStatesList([])}
                        state={state}
                        setState={setState}
                        clearFilter={clearFilter}
                        onToggleDrawer={() => setIsDrawerOpen(s => !s)}
                        setCurrentPage={setCurrentPage}
                        />
                </Col>
                <Col span={24}>
                    <SearchInfo
                        total={totalFound}
                        filter_type={filter_type}
                        setfilter_type={setfilter_type}
                        setCurrentPage={setCurrentPage}
                        />
                </Col>
                <Col span={24}>
                    {
                        load ? (
                            <SkGirlCardList count={25}/>
                        ) : (
                            <div className={styles.body}>
                                {
                                    list?.map((item, index) => (
                                        <div
                                            className={styles.item}
                                            key={index}>
                                            <GirlCard
                                                {...item}
                                                />
                                        </div>
                                    ))
                                }
                            </div>
                        )
                    }
                </Col>
                {
                    list?.length > 0 && Math.ceil(totalFound / 25) >= 2 ? (
                        <Col span={24}>
                            <Pagination
                                showQuickJumper={false}
                                current={currentPage}
                                total={Math.ceil(totalFound / 25)}
                                defaultPageSize={1}
                                showTitle={false}
                                onChange={e => setCurrentPage(e)}
                                />
                        </Col>
                    ) : null
                }
            </Row>
            <SearchDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                onOpen={() => setIsDrawerOpen(true)}
                load={load}
                targetList={targetList}
                financeList={financeList}
                age_range_end={age_range_end}
                age_range_start={age_range_start}
                setage_range_start={setage_range_start}
                setage_range_end={setage_range_end}
                onSearch={onSearch}
                countries={countriesList}
                country={country}
                setCountry={setCountry}
                states={statesList}
                clearStates={() => setStatesList([])}
                state={state}
                setState={setState}
                clearFilter={clearFilter}
                onToggleDrawer={() => setIsDrawerOpen(s => !s)}
                setCurrentPage={setCurrentPage}
                />
        </div>  
    )
}

export default SearchBody;