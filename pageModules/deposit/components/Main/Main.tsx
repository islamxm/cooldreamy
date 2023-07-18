import { useEffect, useRef, useState } from 'react';
import styles from './Main.module.scss';
import { useAppSelector } from '@/hooks/useTypesRedux';
import Image from 'next/image';
import mcafee from '@/public/assets/images/mcafee.svg';
import norton from '@/public/assets/images/norton.svg'
import ApiService from '@/service/apiService';
import * as _ from 'lodash'
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import Button from '@/components/Button/Button';
import PayForm from '../PayForm/PayForm';
import { useWindowSize } from 'usehooks-ts';
import { PulseLoader } from 'react-spinners';

const service = new ApiService()
const PUBLIC_KEY = 'pk_live_51MzlPfFjkPZRdnX1xG5oZ2f5LVylisRVV2O6Ym7c20knPF5GsjuKfcdl6fE3oXmqLIKwjhNNw4id48bpOXOC4n3R00zouqX2k9';


const Main = () => {
    const {width} = useWindowSize()
    const payRef = useRef<HTMLDivElement>(null)
    const {userData, token} = useAppSelector(s => s)
    const [list, setList] = useState<any[]>([])
    const [selectedPlan, setSelectedPlan] = useState<any>(null)
    const [load, setLoad] = useState(false)

    const [stripePromise, setStripePromise] = useState<any>(loadStripe(PUBLIC_KEY))

    
    const [secretKey, setSecretKey] = useState<string>('')


    const getPlans = () => {
        if(token) {
            service.getPayPlans(token).then(res => {
                setList(res)
            })
        }
    }

    useEffect(() => {
        setSecretKey('')
    }, [selectedPlan])


    const goToPayment = () => {
        if(width <= 768) {
            const top = payRef?.current?.getBoundingClientRect()?.top;
            if(typeof top === 'number') {
                document.documentElement.scrollTo(0, top)
            }
        }
    }
    

    useEffect(() => {
        getPlans()
    }, [token])


    const onAccept = (plan: any) => {
        if(token) {
            setLoad(true)
            service.pay(token, {
                list_type: 'credit',
                list_id: plan?.id
            }).then(res => {
                const clientSecret = res?.clientSecret;
                setSecretKey(clientSecret)
            }).finally(() => setLoad(false))
        }
    }


    return (
        <div className={styles.wrapper}>
            <div className={styles.top}>
                <div className={styles.head}>Пополнение баланса</div>
                <div className={styles.balance}>Ваш баланс: <span>{userData?.credits} кредита</span></div>
                <div className={styles.list}>
                    {
                        list?.map((i, index) => {
                            if(i?.id === 1) {
                                return null
                            }
                            if(i?.status === 0) {
                                return (
                                    <div className={`${styles.item_wr} ${selectedPlan?.id == i?.id ? styles?.active : ''}`} key={i?.id}>
                                        <div 
                                            onClick={() => {
                                                setSelectedPlan(i)
                                            }}
                                            className={`${styles.item}`} key={index}>
                                            <div className={styles.adds}>
                                            {
                                                i?.discount !== 0 && (
                                                    <div className={styles.discount}>
                                                        -{i?.discount}%
                                                        <span>скидка</span>
                                                    </div>
                                                )
                                            }
                                            </div>
                                            <div className={styles.credits}>
                                                <div className={styles.value}>{i?.credits}</div>
                                                <span>кредитов</span>
                                            </div>
                                            <div className={styles.item_body}>
                                                {
                                                    i?.discount !== 0 && (
                                                        <div className={styles.part}>
                                                            <div className={styles.label}>цена</div>
                                                            <div className={`${styles.value} ${styles.old}`}>{_.round(i?.price + (i?.price / 100 * i?.discount), 2)}$</div>
                                                        </div>
                                                    )
                                                }
                                                <div className={styles.part}>
                                                    <div className={styles.label}>
                                                        {
                                                            i?.discount !== 0 ? (
                                                                'со скидкой'
                                                            ) : 'цена'
                                                        }
                                                    </div>
                                                    <div className={styles.value}>{i?.price}$</div>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                )
                            }
                            if(i?.status === 1) {
                                return (
                                    <div className={`${styles.item_wr} ${selectedPlan?.id == i?.id ? styles?.active : ''}`} key={i?.id}>
                                        <div 
                                            onClick={() => {
                                                
                                                setSelectedPlan(i)
                                            }}
                                            className={`${styles.item} ${styles.pop}`}>
                                            <div className={styles.adds}>
                                                {
                                                    i?.discount !== 0 && (
                                                        <div className={styles.discount}>
                                                            -{i?.discount}%
                                                            <span>скидка</span>
                                                        </div>
                                                    )
                                                }
                                                <div className={styles.badge}>
                                                ПОПУЛЯРНЫЙ
                                                </div>
                                            </div>
                                            <div className={styles.credits}>
                                                <div className={styles.value}>{i?.credits}</div>
                                                <span>кредитов</span>
                                            </div>
                                            <div className={styles.item_body}>
                                                {
                                                    i?.discount !== 0 && (
                                                        <div className={styles.part}>
                                                            <div className={styles.label}>цена</div>
                                                            <div className={`${styles.value} ${styles.old}`}>{_.round(i?.price + (i?.price / 100 * i?.discount), 2)}$</div>
                                                        </div>
                                                    )
                                                }
                                                <div className={styles.part}>
                                                    <div className={styles.label}>со скидкой</div>
                                                    <div className={styles.value}>{i?.price}$</div>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                )
                            }
                            if(i?.status === 2) {
                                return (
                                    <div className={`${styles.item_wr} ${selectedPlan?.id == i?.id ? styles?.active : ''}`} key={i?.id}>
                                        <div 
                                            onClick={() => {
                                                
                                                setSelectedPlan(i)
                                            }}
                                            className={`${styles.item} ${styles.dsc}`} key={index}>
                                            
                                            <div className={styles.adds}>
                                            {
                                                i?.discount !== 0 && (
                                                    <div className={styles.discount}>
                                                        -{i?.discount}%
                                                        <span>скидка</span>
                                                    </div>
                                                )
                                            }
                                            <div className={styles.badge}>
                                                ВЫГОДНЫЙ
                                            </div>
                                            </div>
                                            <div className={styles.credits}>
                                                <div className={styles.value}>{i?.credits}</div>
                                                <span>кредитов</span>
                                            </div>
                                            <div className={styles.item_body}>
                                                {
                                                    i?.discount !== 0 && (
                                                        <div className={styles.part}>
                                                            <div className={styles.label}>цена</div>
                                                            <div className={`${styles.value} ${styles.old}`}>{_.round(i?.price + (i?.price / 100 * i?.discount), 2)}$</div>
                                                        </div>
                                                    )
                                                }
                                                
                                                <div className={styles.part}>
                                                    <div className={styles.label}>со скидкой</div>
                                                    <div className={styles.value}>{i?.price}$</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        })
                    }
                    
                </div>
                {
                    selectedPlan && !secretKey && (
                        <div className={styles.buy}>
                            <Button
                                text={`Купить тариф за ${selectedPlan?.price}$`}
                                onClick={() => {
                                    onAccept(selectedPlan)
                                    goToPayment()
                                }}
                                variant={width <= 1200 ? 'gold' : 'default'}
                                />
                        </div>
                    )
                }
                
            </div>
            <div className={styles.main}>
                <div className={styles.adv}>
                    <div className={styles.fr}>
                        <b>Secure credit card payment</b>
                        This is a secure 128-bit SSL payment
                    </div>
                    <div className={styles.av}>
                        <div className={styles.item}>
                            <Image
                                src={mcafee}
                                width={152}
                                height={69}
                                alt='mcafee'
                                />
                        </div>
                        <div className={styles.item}>
                            <Image
                                src={norton}
                                width={152}
                                height={69}
                                alt='norton'
                                />
                        </div>
                    </div>
                </div>
                <div ref={payRef} className={styles.field}>
                    {
                        load ? (
                            <div className={styles.load}>
                                <PulseLoader color='var(--violet)'/>
                            </div>
                        ) : (
                            (secretKey && stripePromise) && (
                                <Elements
                                    stripe={stripePromise}
                                    options={{clientSecret: secretKey}}
                                    >
                                    <PayForm plan={selectedPlan}/>
                                </Elements>
                            ) 
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Main;