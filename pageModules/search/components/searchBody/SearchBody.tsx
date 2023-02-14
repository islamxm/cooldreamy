import styles from './SearchBody.module.scss';
import SearchFilter from '../searchFilter/SearchFilter';
import SearchInfo from '../searchInfo/SearchInfo';
import {Row, Col} from 'antd';
import { girlCardType } from '@/components/GirlCard/types';
import GirlCard from '@/components/GirlCard/GirlCard';
import img from '@/public/assets/images/girl.png';

const list:girlCardType[] = [
    {name:"Ксения", age: "19", verified: true, online: true, location: 'Киев', image: img},
    {name:"Ксения", age: "19", verified: true, online: true, location: 'Киев', image: img},
    {name:"Ксения", age: "19", verified: true, online: true, location: 'Киев', image: img},
    {name:"Ксения", age: "19", verified: true, online: true, location: 'Киев', image: img},
    {name:"Ксения", age: "19", verified: true, online: true, location: 'Киев', image: img},
    {name:"Ксения", age: "19", verified: true, online: true, location: 'Киев', image: img},
    {name:"Ксения", age: "19", verified: true, online: true, location: 'Киев', image: img},
]


const SearchBody = () => {
    return (
        <div className={styles.wrapper}>
            <SearchFilter/>
            <SearchInfo/>
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
        </div>
    )
}

export default SearchBody;