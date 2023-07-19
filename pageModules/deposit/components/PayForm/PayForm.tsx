import { useState } from 'react';
import styles from './PayForm.module.scss';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { PaymentElement } from '@stripe/react-stripe-js';
import {Row, Col} from 'antd';
import Button from '@/components/Button/Button';

const PayForm = ({plan}: {plan?: any}) => {
    const [payLoad, setPayLoad] = useState<boolean>(false)
    const [message, setMessage] = useState<any>(null)
    const stripe = useStripe()
    const elements = useElements()


    const onPay = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(!stripe || !elements) {
            return;
        }

        setPayLoad(true)

        const {error} = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/pay_success`,
            },
            redirect: "if_required" 
        })
        const {payment_intent} = error || {}

        if(error) {
            setMessage(error)
        } else if(payment_intent && payment_intent?.status === 'succeeded') {
            setMessage("Payment status: " + payment_intent?.status + "")
        } else {
            setMessage('Unexpected state')
        }

        setPayLoad(false)
    }


    return (
        <div className={styles.wrapper}>
            <div className={styles.head}>
                <div className={styles.title}>
                Оплата
                </div>
                <div className={styles.subtitle}>
                Введите данные карты
                </div>
            </div>
            <form id='payment-form' onSubmit={onPay}>
                <Row gutter={[15,15]}>
                    <Col span={24}>
                        <PaymentElement/>
                    </Col>
                    <Col span={24} style={{display: 'flex', justifyContent: 'center'}}>
                        <Button
                            text={`Оплатить ${plan?.price}$`}
                            load={payLoad}

                            />
                    </Col>
                </Row>
            </form>
        </div>
    )
}


export default PayForm;