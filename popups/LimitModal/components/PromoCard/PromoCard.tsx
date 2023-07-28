import styles from './PromoCard.module.scss';
import {FC} from 'react';
import {Row, Col} from 'antd';
import img from '@/public/assets/images/promo-img.svg';
import Image from 'next/image';
import Button from '@/components/Button/Button';
import Router from 'next/router';



const PromoCard:FC<any> = (props) => {

    const {
        activation_type_id,
        benefit,
        credits,
        hours,
        id,
        premium_id,
        price,
        status,
        subscription_id,
        type,
        updated_at,
        onClose
    } = props || {}



    return (
        <div className={styles.wrapper}>
            <Row gutter={[20,20]}>
                <Col span={24}>
                    <div className={styles.title}>Специальное предложение для Вас!</div>
                </Col>
                <Col span={24}>
                    <div className={styles.card}>
                        <div className={styles.main}>
                            <div className={styles.credits}>
                                {credits}
                            </div>
                            {
                                benefit && (
                                    <div className={styles.benefit}>Выгода {benefit}%</div>
                                )
                            }
                            <div className={styles.price}>
                                <span className={styles.actual}>${price}</span>
                                <span className={styles.old}></span>
                            </div>
                            <div className={styles.action}>
                                <Button
                                    text='Купить'
                                    middle
                                    onClick={() => {
                                        Router.push('/deposit')
                                        onClose && onClose()
                                    }}
                                    />
                            </div>
                        </div>
                        <div className={styles.image}>
                            <Image
                                src={img}
                                alt=""
                                width={170}
                                height={155}
                                />
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default PromoCard;