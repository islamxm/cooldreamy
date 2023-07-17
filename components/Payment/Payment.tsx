import { useEffect, useState } from 'react';
import styles from './Payment.module.scss';

const PUBLIC_KEY = 'pk_live_51MzlPfFjkPZRdnX1xG5oZ2f5LVylisRVV2O6Ym7c20knPF5GsjuKfcdl6fE3oXmqLIKwjhNNw4id48bpOXOC4n3R00zouqX2k9';


const Payment = () => {
    const [stripePromise, setStripePromise] = useState<any>(null)

    useEffect(() => {

    }, [])

    return (
        <div className={styles.wrapper}>
            
        </div>
    )
}

export default Payment;