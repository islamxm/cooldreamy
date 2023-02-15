import styles from './StartGift.module.scss';
import { Row, Col } from 'antd';
import GiftCard from '@/components/GiftCard/GiftCard';
import giftImg from '@/public/assets/images/gift-1.png';
import {FC} from 'react';
import { startGiftPropsType } from './types';
import Button from '@/components/Button/Button';
import {HiOutlineGift} from 'react-icons/hi';

const StartGift:FC<startGiftPropsType> = ({
    image
}) => {
    
    return (
        <div className={styles.card}>
            <Row gutter={[12,12]}>
                <Col span={24}>
                    <div className={styles.head}>
                        Начните общение с подарка!
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.body}>
                        <GiftCard
                            image={image}
                            />
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.action}>
                        <Button
                            style={{
                                padding: '8px 10px',
                                fontSize: 18,
                                lineHeight: '27px',
                                width: '100%'
                            }}
                            text={'Подарить'}
                            variant={'bordered'}
                            hover={{
                                backgroundColor: 'var(--violet)',color: '#fff'
                            }}
                            after={<HiOutlineGift/>}
                            />
                    </div>
                </Col>
            </Row>
            
        </div>
    )
}

export default StartGift;