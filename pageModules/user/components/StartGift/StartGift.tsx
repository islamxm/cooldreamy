import styles from './StartGift.module.scss';
import { Row, Col } from 'antd';
import GiftCard from '@/components/GiftCard/GiftCard';
import {FC, useState, useEffect} from 'react';
import { startGiftPropsType } from './types';
import Button from '@/components/Button/Button';
import {HiOutlineGift} from 'react-icons/hi';
import { useAppSelector } from '@/hooks/useTypesRedux';
import ApiService from '@/service/apiService';

const service = new ApiService()
const StartGift:FC<startGiftPropsType> = () => {
    const {locale, token} = useAppSelector(s => s)
    const [gift, setGift] = useState<any>(null)

    useEffect(() => {
        if(token) {
            service.getGifts(token).then(res => {
                setGift(res?.find((i: any) => i.id == 12))
            })
        }
    }, [token])

    const sendGift = () => {
        
    }

    return (
        <div className={styles.card}>
            <Row gutter={[12,12]}>
                <Col span={24}>
                    <div className={styles.head}>
                        {locale?.global?.start_gift.title}
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.body}>
                        <GiftCard
                            price={gift?.credits}
                            image={gift?.picture_url}
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
                            text={locale?.global?.start_gift.btn}
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