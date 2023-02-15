import styles from './SearchBody.module.scss';
import SearchFilter from '../searchFilter/SearchFilter';
import SearchInfo from '../searchInfo/SearchInfo';
import {Row, Col} from 'antd';
import { girlCardType } from '@/components/GirlCard/types';
import GirlCard from '@/components/GirlCard/GirlCard';
import img from '@/public/assets/images/girl.png';
import Pagination from '@/components/Pagination/Pagination';


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
    return (
        <div className={styles.wrapper}>
            <Row gutter={[10,10]}>
                <Col span={24}>
                    <SearchFilter/>
                </Col>
                <Col span={24}>
                    <SearchInfo/>
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