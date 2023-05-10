import styles from './SkGirlCardList.module.scss';
import { Row, Col } from 'antd';
import {useState, useEffect} from 'react';


const SkGirlCardList = ({count}: {count: number}) => {
    const [array, setArray] = useState<any[]>([])

    useEffect(() => {
        setArray(Array(count).fill(1))
    }, [count])

    return (
        <div className={styles.wrapper}>
            <Row gutter={[12,12]}>
                {
                    array?.map((i, index) => (
                        <Col 
                        key={index}
                            span={12}
                            md={8} 
                            lg={6}
                            >
                            <div className={styles.item}>

                            </div>
                        </Col>
                    ))
                }
            </Row>
        </div>
    )
}

export default SkGirlCardList;