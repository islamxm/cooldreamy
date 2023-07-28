import {Modal, ModalFuncProps, Row, Col} from 'antd';
import {FC, useState, useEffect} from 'react';
import Button from '@/components/Button/Button';
import Image from 'next/image';
import Router from 'next/router';
import styles from './LimitModal.module.scss';
import img from '@/public/assets/images/limit-img.png';
import { useAppSelector } from '@/hooks/useTypesRedux';
// import { updateLimit } from '@/store/actions';
// import { useAppDispatch } from '@/hooks/useTypesRedux';
import ApiService from '@/service/apiService';
import PromoCard from './components/PromoCard/PromoCard';



interface I extends ModalFuncProps {
    head?: string,
    text?: string,
    action?: {
        link?: string,
        label?: string
    }
}

const service = new ApiService()

const LimitModal:FC<I> = (props) => {
    const {head, text, action, onCancel, open} = props;
    const {token, locale} = useAppSelector(s => s)
    const [promoData, setPromoData] = useState<any>(null)

    const onClose = () => {
        setPromoData(null)
        onCancel && onCancel()
    }

    useEffect(() => {
        if(token && open) {
            service.getPromo(token).then(res => {
                console.log(res)
                setPromoData(res)
            })
        } else {
            setPromoData(null)
        }
    }, [token, open])


    return (
        <Modal
            {...props}
            footer={false}
            onCancel={onClose}
            width={385}
            className={`modal ${styles.wrapper}`}
            >
            <Row gutter={[20,20]}>
                <Col span={24}>
                    <div className={styles.img}>
                        <Image src={img} alt='' width={172} height={172}/>
                    </div>
                </Col>
                <Col span={24}>
                    <h4 className={styles.title}>{head}</h4>
                </Col>
                <Col span={24}>
                    <div className={styles.text}>{text}</div>
                </Col>
                {
                    action?.label ? (
                        <Col span={24}>
                            <div className={styles.action}>
                                <Button
                                    text={action.label}
                                    small
                                    onClick={() => {
                                        if(action?.link) {
                                            Router.push(action.link)
                                            onClose()
                                        } else {
                                            onClose()
                                        }
                                    }}
                                    />
                            </div>
                        </Col>
                    ) : null
                }
                {
                    promoData && (
                        <>
                            <Col span={24}>
                                <PromoCard {...promoData} onClose={onClose}/>
                            </Col>
                            <Col span={24}>
                                <div className={styles.market}>
                                    <Button
                                        text={locale?.popups?.promo?.open_market}
                                        middle
                                        onClick={() => {
                                            Router.push('/deposit')
                                            onClose()
                                        }}
                                        />
                                </div>
                            </Col>
                        </>
                    )
                }
                
            </Row>
        </Modal>
    )
}


export default LimitModal