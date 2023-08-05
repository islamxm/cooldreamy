import Button from '@/components/Button/Button';
import styles from './CardAdv.module.scss';
import {AiFillDollarCircle} from 'react-icons/ai'



const CardAdv = ({list, selected, onSelect, onAccept, load}: {list?: any[], selected: any, onSelect: any, onAccept: (...args: any[]) => any, load: boolean}) => {

    

    return (
        <div className={styles.wrapper}>
            <div className={styles.in}>
                <div className={styles.title}>
                Unlimited chat subscription
                </div>
                <div className={styles.icon}>
                    <div className={styles.icon_img}></div>
                </div>
                <div className={styles.body}>
                    {/* <div className={styles.head}>
                        Купите подписку и общайтесь 
                        на сайте без ограничений!
                    </div> */}
                    <div className={styles.text}>
                        With a subscription, you get unlimited chat access and free limits on sending photos and videos
                    </div>
                    <div className={styles.list}>
                        {
                            (list && list?.length > 0) && (
                                list?.map(i => (
                                    <div 
                                        onClick={() => onSelect({value: i?.id, type: 'subscription'})}
                                        className={styles.item} key={i?.id}>
                                        <input type="radio" checked={i?.id == selected?.value && selected?.type == 'subscription'}/>
                                        <label className={styles.label} htmlFor="">
                                            <div className={styles.value}>
                                            {i?.duration} <br/>
                                            hours
                                            </div>
                                            <div className={styles.info}>
                                                <span>Photos: {i?.count_watch_or_send_photos}</span>
                                                <span>Videos: {i?.count_watch_or_send_video}</span>
                                            </div>
                                            <div className={styles.price}>
                                            {i?.price} <span><AiFillDollarCircle/></span>
                                            </div>
                                            {/* <div className={styles.dsc}>
                                            Экономия 36%
                                            </div> */}
                                        </label>
                                    </div>
                                ))
                            )
                        }
                    </div>
                </div>
                <div className={styles.action}>
                    <Button
                        load={load && selected?.type === 'subscription'}
                        variant={'default'}
                        onClick={onAccept}
                        fill
                        disabled={selected?.type !== 'subscription'}
                        text={'Subscribe'}
                        />
                </div>
            </div>
        </div>
    )
}


export default CardAdv;