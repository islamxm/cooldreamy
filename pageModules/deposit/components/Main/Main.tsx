import { useEffect, useState } from 'react';
import styles from './Main.module.scss';
import { useAppSelector } from '@/hooks/useTypesRedux';
import Image from 'next/image';
import mcafee from '@/public/assets/images/mcafee.svg';
import norton from '@/public/assets/images/norton.svg'
import ApiService from '@/service/apiService';


const service = new ApiService()


const Main = () => {
    const {userData, token} = useAppSelector(s => s)
    const [list, setList] = useState<any[]>([])

    useEffect(() => console.log(userData) , [userData])


    const getPlans = () => {
        if(token) {
            service.getPayPlans(token).then(res => {
                console.log(res)
                setList(res)
            })
        }
    }

    

    useEffect(() => {
        getPlans()
    }, [token])


    return (
        <div className={styles.wrapper}>
            <div className={styles.top}>
                <div className={styles.head}>Пополнение баланса</div>
                <div className={styles.balance}>Ваш баланс: <span>{userData?.credits} кредита</span></div>
                <div className={styles.list}>
                    {
                        list?.map((i, index) => (
                            <div className={styles.item} key={index}>
                                <div className={styles.price}>{i?.price} грн</div>
                                <div className={styles.credits}>
                                <div className={styles.value}>{i?.credits}</div>
                                <span>кредитов</span>
                                </div>
                                <div className={styles.ex}>11 грн за 1 кредит</div>
                            </div>
                        ))
                    }
                    
                    {/* <div className={styles.item}>
                        <div className={styles.badge}>
                        ПОПУЛЯРНЫЙ
                        </div>
                    <div className={styles.price}>559 грн</div>
                        <div className={styles.credits}>
                        <div className={styles.value}>50</div>
                        <span>кредитов</span>
                        </div>
                        <div className={styles.ex}>11 грн за 1 кредит</div>
                    </div>
                    <div className={styles.item}>
                    <div className={styles.badge}>
                    ВЫГОДНЫЙ
                        </div>
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