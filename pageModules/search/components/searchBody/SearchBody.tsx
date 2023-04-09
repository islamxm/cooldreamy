import styles from './SearchBody.module.scss';
import SearchFilter from '../searchFilter/SearchFilter';
import SearchInfo from '../searchInfo/SearchInfo';
import {Row, Col} from 'antd';
import { girlCardType } from '@/components/GirlCard/types';
import GirlCard from '@/components/GirlCard/GirlCard';
import img from '@/public/assets/images/girl.png';
import Pagination from '@/components/Pagination/Pagination';
import { useState, useEffect } from 'react';
import { tabItemPropsTypes } from '../../types';
import ApiService from '@/service/apiService';

const service = new ApiService();

const tabs:tabItemPropsTypes[] = [
    {label: 'Все', id: '1'},
    {label: 'Рядом', id: '2'},
    {label: 'Новые', id: '3'},
    {label: 'Онлайн', id: '4'},
]


const list:girlCardType[] = [
    {name:"Ксения", age: "19", verified: true, online: true, location: 'Киев', image: img, photoCount: 10},
    {name:"Ксения", age: "19", verified: true, online: true, location: 'Киев', image: img, photoCount: 10},
    {name:"Ксения", age: "19", verified: true, online: true, location: 'Киев', image: img, photoCount: 10},
    {name:"Ксения", age: "19", verified: true, online: true, location: 'Киев', image: img, photoCount: 10},
    {name:"Ксения", age: "19", verified: true, online: true, location: 'Киев', image: img, photoCount: 10},
    {name:"Ксения", age: "19", verified: true, online: true, location: 'Киев', image: img, photoCount: 10},
    {name:"Ксения", age: "19", verified: true, online: true, location: 'Киев', image: img, photoCount: 10},
]


const SearchBody = () => {
    const [activeTab, setActiveTab] = useState('1');

    const [targetList, setTargetList] = useState([])
    const [financeList, setFinanceList] = useState([])

    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [age_range_start, setage_range_start] = useState(0)
    const [age_range_end, setage_range_end] = useState(100)
    const [prompt_target_id, setprompt_target_id] = useState(0)
    const [prompt_finance_state_id, setprompt_finance_state_id] = useState(0)
    const [isNew, setIsNew] = useState(0)
    const [isOnline, setIsOnline] = useState(0)
    const [isNear, setIsNear] = useState(0)


    useEffect(() => {
        service.getPromptTargets().then(res => {
            setTargetList(res)
        })   
        service.getPromptFinanceState().then(res => {
            setFinanceList(res)
        })
        service.search(
            'Балашиха',
            'Россия',
            0,
            50,
            2,
            3  
        ).then(res => {
            // console.log(res?.data)
        })
    }, [])


    return (    
        <div className={styles.wrapper}>
            <Row gutter={[10,10]}>
                <Col span={24}>
                    <SearchFilter
                        targetList={targetList}
                        financeList={financeList}
                        />
                </Col>
                <Col span={24}>
                    <SearchInfo
                        tabs={tabs}
                        activeTab={activeTab}
                        onChange={setActiveTab}
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
                <Col span={24}>
                    <Pagination
                        total={10}
                        defaultPageSize={1}
                        showTitle={false}
                        />
                </Col>
            </Row>
            
            
            
        </div>  
    )
}

export default SearchBody;