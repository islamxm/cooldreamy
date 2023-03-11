import styles from './List.module.scss';
import {Row, Col} from 'antd';
import { girlCardType } from '@/components/GirlCard/types';
import GirlCard from '@/components/GirlCard/GirlCard';

const List = ({list}: {list: any[]}) => {

    return (
        <div className={styles.wrapper}>
            <Row gutter={[12,12]}>
                {
                    list?.map((item,index) => (
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

export default List;