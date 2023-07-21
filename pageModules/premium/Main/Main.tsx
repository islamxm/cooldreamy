import styles from './Main.module.scss';
import CardPremium from '../CardPremium/CardPremium';
import CardBalance from '../CardBalance/CardBalance';
import CardAdv from '../CardAdv/CardAdv';
import { useAppSelector } from '@/hooks/useTypesRedux';
import { useEffect, useState } from 'react';
import ApiService from '@/service/apiService';


const service = new ApiService()


const Main = () => {
    const {token} = useAppSelector(s => s)

    const [listPrem, setListPrem] = useState<any[]>([])
    const [listSub, setListSub] = useState<any[]>([])
    const [listCred, setListCred] = useState<any[]>([])
    

    const getPrem = () => {
        if(token) {
            service.getPayPrems(token).then(res => {
                setListPrem(res)
            })
        }
    }
    const getSub = () => {
        if(token) {
            service.getPaySubs(token).then(res => {
                setListSub(res)
            })
        }
    }
    const getCred = () => {
        if(token) {
            service.getPayPlans(token).then(res => {
                setListCred(res)
            })
        }
    }


    useEffect(() => {
        if(token) {
            getPrem()
            getSub()
            getCred()
        }
    }, [token])


    return (
        <div className={`${styles.wrapper}`}>
            <div className={styles.in}>
                <div className={styles.item}>
                    <CardPremium list={listPrem}/>
                </div>
                <div className={styles.item}>
                    <CardBalance/>
                </div>
                <div className={styles.item}>
                    {/* <CardAdv/> */}
                    <CardPremium/>
                </div>
            </div>
        </div>
    )
}


export default Main;