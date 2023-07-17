import { useEffect, useState } from 'react';
import styles from './Main.module.scss';
import { useAppSelector } from '@/hooks/useTypesRedux';
import Image from 'next/image';
import mcafee from '@/public/assets/images/mcafee.svg';
import norton from '@/public/assets/images/norton.svg'
import ApiService from '@/service/apiService';
import PromptModal from '@/popups/PromptModal/PromptModal';
import * as _ from 'lodash'
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import {Row, Col} from 'antd';
import Button from '@/components/Button/Button';
import PayForm from '../PayForm/PayForm';
import Loader from '@/components/Loader/Loader';
import { PulseLoader } from 'react-spinners';

const service = new ApiService()
const PUBLIC_KEY = 'pk_live_51MzlPfFjkPZRdnX1xG5oZ2f5LVylisRVV2O6Ym7c20knPF5GsjuKfcdl6fE3oXmqLIKwjhNNw4id48bpOXOC4n3R00zouqX2k9';


const Main = () => {
    const {userData, token} = useAppSelector(s => s)
    const [list, setList] = useState<any[]>([])
    const [modal, setModal] = useState(false)
    const [selectedPlan, setSelectedPlan] = useState<any>(null)
    const [load, setLoad] = useState(false)

    const [stripePromise, setStripePromise] = useState<any>(loadStripe(PUBLIC_KEY))

    
    const [secretKey, setSecretKey] = useState<string>('')
    const [payLoad, setPayLoad] = useState<boolean>(false)




    





    const getPlans = () => {
        if(token) {
            service.getPayPlans(token).then(res => {
                console.log(res)
                setList(res)
            })
        }
    }

    useEffect(() => {
        setSecretKey('')
    }, [selectedPlan])

    // useEffect(() => {
    //     console.log(secretKey)
    //     console.log(stripePromise)
    // }, [secretKey, stripePromise])

    

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
                console.log(res)
                const clientSecret = res?.clientSecret;
                setSecretKey(clientSecret)
            }).finally(() => setLoad(false))
        }
    }




    return (
        <div className={styles.wrapper}>
            {/* <PromptModal
                open={modal}
                onCancel={() => setModal(false)}
                title={`Пополнение баланса`}
                text='Вы уверены что хот'
                /> */}
            <div className={styles.top}>
                <div className={styles.head}>Пополнение баланса</div>
                <div className={styles.balance}>Ваш баланс: <span>{userData?.credits} кредита</span></div>
                <div className={styles.list}>
                    {
                        list?.map((i, index) => {
                            if(i?.status === 0) {
                                return (
                                    <div className={`${styles.item_wr} ${selectedPlan?.id == i?.id ? styles?.active : ''}`} key={i?.id}>
                                        <div 
                                            onClick={() => {
                                                
                                                setSelectedPlan(i)
                                            }}
                                            className={`${styles.item}`} key={index}>
                                            <div className={styles.price}>{i?.price}$</div>
                                            <div className={styles.credits}>
                                            <div className={styles.value}>{i?.credits}</div>
                                            <span>кредитов</span>
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
                                            <div className={styles.badge}>
                                            ПОПУЛЯРНЫЙ
                                            </div>
                                            <div className={styles.price}>{i?.price}$</div>
                                            <div className={styles.credits}>
                                            <div className={styles.value}>{i?.credits}</div>
                                            <span>кредитов</span>
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
                                            <div className={styles.badge}>
                                                ВЫГОДНЫЙ
                                            </div>
                                            <div className={styles.price}>{i?.price}$</div>
                                            <div className={styles.credits}>
                                            <div className={styles.value}>{i?.credits}</div>
                                            <span>кредитов</span>
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
                                onClick={() => onAccept(selectedPlan)}
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
                <div className={styles.field}>
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