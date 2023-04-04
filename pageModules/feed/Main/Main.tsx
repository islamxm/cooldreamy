import styles from './Main.module.scss';
import IFeedCard from '@/models/IFeedCard';
import IconButton from '@/components/IconButton/IconButton';
import {CgClose} from 'react-icons/cg';
import {HiHeart} from 'react-icons/hi';
import {useEffect, useState, useCallback} from 'react';
import Card from './components/Card/Card';
import ApiService from '@/service/apiService';
import { reverse } from 'dns';
const service = new ApiService()

const Main = ({data}: {data: IFeedCard[]}) => {
    const [currentCard, setCurrentCard] = useState<number>(0);
    const [list, setList] = useState<IFeedCard[]>([])
    
    const onLike = () => {
        if(currentCard) {
            service.feedItemLike(currentCard).then(res => {
                console.log(res)
                console.log(currentCard)
                if(res?.message == 'success') {
                    setList(s => s.filter((i, index) => index !== 0))
                }
            })
        } 
    }

    const onCancel = () => {
        if(currentCard) {
            service.feedItemSkip(currentCard).then(res => {
                console.log(res)
                console.log(currentCard)
                if(res?.message == 'success') {
                    setList(s => s.filter((i, index) => index !== 0))
                }
            })
        }
    } 

    useEffect(() => {
        if(data) {
            setList(data)
        }
    }, [data])

    useEffect(() => {
        if(list && list.length > 0) {
            console.log(list)
            setCurrentCard(list[0].id)
        }
    }, [list])


    return (
        <div className={styles.wrapper}>
            <div className={styles.slider}>
    
                {
                    list?.map((item, index) => (
                        <Card
                            onLike={onLike}
                            onCancel={onCancel} 
                            {...item} 
                            key={index}
                            zindex={index + 1}
                            />
                    ))
                }
            </div>
            <div className={styles.action}>
                <div className={styles.item}>
                    <IconButton
                        variant={'danger'}
                        icon={<CgClose size={40} color='#fff'/>}
                        />
                </div>
                {/* <div className={styles.item}></div> */}
                <div className={styles.item}>
                    <IconButton
                        icon={<HiHeart size={35}/>}
                        />
                </div>
            </div>
        </div>
    )
}


export default Main;