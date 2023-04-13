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



const service = new ApiService();



const SearchBody = () => {
    const [load, setLoad] = useState(false)
    const [searched, setSearched] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);

    
    const [targetList, setTargetList] = useState([])
    const [financeList, setFinanceList] = useState([])

    const [state, setState] = useState('Балашиха')
    const [country, setCountry] = useState('Россия')
    const [age_range_start, setage_range_start] = useState(18)
    const [age_range_end, setage_range_end] = useState(70)
    const [prompt_target_id, setprompt_target_id] = useState()
    const [prompt_finance_state_id, setprompt_finance_state_id] = useState()

    const [isNew, setIsNew] = useState<1 | 0>(0)
    const [isOnline, setIsOnline] = useState<1 | 0>(0)
    const [isNear, setIsNear] = useState<1 | 0>(0)

    const [totalFound, setTotalFound] = useState(0);

    const [list, setList] = useState<girlCardType[]>([])


    const getFinanceList = () => {
        service.getPromptFinanceState().then(res => {
            res && setFinanceList(res?.map((i: any) => ({...i, value: i.id, label: i.text})))
        })
    }

    const getTargetList = () => {
        service.getPromptTargets().then(res => {
            res && setTargetList(res?.map((i: any) => ({...i, value: i.id, label: i.text})))
        })
    }

    const getCountries = () => {
        service.getCountries().then(res => {
            console.log(res)
        })
    }

    const getStates = (id: number) => {
        service.getStates(id).then(res => {
            console.log(res)
        })
    }

    const onSearch = useCallback(() => {
        setCurrentPage(1)
        setLoad(true)
        setSearched(false)
        service.search(
            1,
            isNew, 
            isOnline, 
            isNear,
            state, 
            country, 
            age_range_start, 
            age_range_end,
            prompt_target_id, 
            prompt_finance_state_id, 
        ).then(res => {
            console.log(res)
            setTotalFound(res?.total)
            setList(res?.data)
        }).finally(() => {
            setLoad(false)
        })
    }, [currentPage, state, country, age_range_start, age_range_end, prompt_target_id, prompt_finance_state_id, isNew, isOnline, isNear])

    const updateList = useCallback(() => {
        service.search(
            currentPage,
            isNew, 
            isOnline, 
            isNear,
            state, 
            country, 
            age_range_start, 
            age_range_end,
            prompt_target_id, 
            prompt_finance_state_id, 
        ).then(res => {
            console.log(res)
            setTotalFound(res?.total)
            setList(res?.data)
        }).finally(() => {
            setLoad(false)
        })
    }, [currentPage, state, country, age_range_start, age_range_end, prompt_target_id, prompt_finance_state_id, isNew, isOnline, isNear])

    useEffect(() => {
        setSearched(true)
        if (searched && updateList) {
            updateList()
        }
    }, [currentPage])



    useEffect(() => {
        getFinanceList()
        getTargetList()
        // getCountries()
    }, [])



    return (    
        <div className={styles.wrapper}>
            <Row gutter={[10,10]}>
                <Col span={24}>
                    <SearchFilter
                        load={load}
                        targetList={targetList}
                        financeList={financeList}
                        prompt_target_id={prompt_target_id}
                        prompt_finance_state_id={prompt_finance_state_id}
                        age_range_end={age_range_end}
                        age_range_start={age_range_start}
                        setage_range_start={setage_range_start}
                        setage_range_end={setage_range_end}
                        setprompt_target_id={setprompt_target_id}
                        setprompt_finance_state_id={setprompt_finance_state_id}
                        onSearch={onSearch}
                        />


                </Col>
                <Col span={24}>


                    <SearchInfo
                        total={totalFound}
                        isNear={isNear}
                        isNew={isNew}
                        isOnline={isOnline}
                        setIsNear={setIsNear}
                        setIsNew={setIsNew}
                        setIsOnline={setIsOnline}
                        />


                </Col>
                <Col span={24}>
                    <Row gutter={[12,12]}>
                        {
                            list?.map((item, index) => (
                                <Col span={6} key={index}>
                                    <GirlCard
                                        {...item}
                                        />
                                </Col>
                            ))
                        }
                    </Row>
                </Col>
                {
                    list?.length > 0 && Math.floor(totalFound / 8) >= 2 ? (
                        <Col span={24}>
                            <Pagination
                                current={currentPage}
                                total={Math.floor(totalFound / 8)}
                                defaultPageSize={1}
                                showTitle={false}
                                onChange={e => setCurrentPage(e)}
                                />
                        </Col>
                    ) : null
                }
                
            </Row>
            
            
            
        </div>  
    )
}

export default SearchBody;