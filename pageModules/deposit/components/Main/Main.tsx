import { useEffect, useState } from 'react';
import styles from './Main.module.scss';
import { useAppSelector } from '@/hooks/useTypesRedux';
import Image from 'next/image';
import mcafee from '@/public/assets/images/mcafee.svg';
import norton from '@/public/assets/images/norton.svg'
import ApiService from '@/service/apiService';
import PromptModal from '@/popups/PromptModal/PromptModal';
import * as _ from 'lodash'
const service = new ApiService()


const Main = () => {
    const {userData, token} = useAppSelector(s => s)
    const [list, setList] = useState<any[]>([])
    const [modal, setModal] = useState(false)
    const [selectedPlan, setSelectedPlan] = useState<any>(null)
    const [load, setLoad] = useState(false)




    const getPlans = () => {
        if(token) {
            service.getPayPlans(token).then(res => {
                console.log(res?.map((i: any) => i?.status))
                setList(res)
            })
        }
    }

    

    useEffect(() => {
        getPlans()
    }, [token])


    const onAccept = (plan: any) => {
        console.log(plan)
        console.log(token)
        if(token) {
            service.pay(token, {
                list_type: 'credit',
                list_id: plan?.id
            }).then(res => {
                console.log(res)
                if(res?.link) {
                    window.open(res?.link)
                }
            })
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
                                    <div 
                                        onClick={() => onAccept(i)}
                                        className={styles.item} key={index}>
                                        <div className={styles.price}>{i?.price}$</div>
                                        <div className={styles.credits}>
                                        <div className={styles.value}>{i?.credits}</div>
                                        <span>кредитов</span>
                                        </div>
                                    </div>
                                )
                            }
                            if(i?.status === 1) {
                                return (
                                    <div 
                                        onClick={() => onAccept(i)}
                                        className={`${styles.item} ${styles.pop}`} key={index}>
                                        <div className={styles.badge}>
                                        ПОПУЛЯРНЫЙ
                                        </div>
                                        <div className={styles.price}>{i?.price}$</div>
                                        <div className={styles.credits}>
                                        <div className={styles.value}>{i?.credits}</div>
                                        <span>кредитов</span>
                                        </div>
                                    </div>
                                )
                            }
                            if(i?.status === 2) {
                                return (
                                    <div 
                                        onClick={() => onAccept(i)}
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
                                )
                            }
                        })
                    }
                    
                    {/* <div className={styles.item}>
                        
                    <div className={styles.price}>559 грн</div>
                        <div className={styles.credits}>
                        <div className={styles.value}>50</div>
                        <span>кредитов</span>
                        </div>
                        <div className={styles.ex}>11 грн за 1 кредит</div>
                    </div>
                    <div className={styles.item}>
                        
                    <div className={styles.credits}>
                        <div className={styles.value}>50</div>
                        <span>кредитов</span>
                        </div>
                        <div className={styles.ex}>11 грн за 1 кредит</div>
                    </div> */}
                </div>
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
                <div className={styles.field}></div>
            </div>
        </div>
    )
}

export default Main;