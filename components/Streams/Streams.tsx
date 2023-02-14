import styles from './Streams.module.scss';
import {FC} from 'react';
import { Row, Col } from 'antd';
import StreamItem from './components/StreamItem/StreamItem';
import { streamItemType } from './types';
import img from '@/public/assets/images/girl.png';

const streamsList:streamItemType[] = [
    {
        image: img,
        index: 0,
        id: ''
    },
    {
        image: img,
        index: 0,
        id: ''
    },
    {
        image: img,
        index: 0,
        id: ''
    },
    {
        image: img,
        index: 0,
        id: ''
    },
    {
        image: img,
        index: 0,
        id: ''
    },
]


const Streams:FC = () => {

    return (
        <div className={styles.wrapper}>
            <Col span={24}>
                <Row gutter={[10,10]}>
                    <Col span={24}>
                        <h3 className={styles.head}>Стримы</h3>
                    </Col>
                    <Col span={24}>
                        <div className={styles.body}>
                            {
                                streamsList?.map((item,index) => (
                                    <div className={styles.item} key={index}>
                                        <StreamItem
                                            {...item}
                                            />
                                    </div>
                                ))
                            }
                        </div>
                    </Col>
                </Row>
            </Col>
        </div>
    )
}

export default Streams;
