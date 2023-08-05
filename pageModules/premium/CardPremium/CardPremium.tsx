import Button from '@/components/Button/Button';
import styles from './CardPremium.module.scss';
import { useEffect } from 'react';
import {AiFillDollarCircle} from 'react-icons/ai'


interface I {
    list?: any[],
    selected: any,
    onSelect: any,
    onAccept: (...args: any[]) => any,
    load: boolean
}


const CardPremium = ({
    list,
    selected,
    onSelect,

    load,
    onAccept
}: I) => {  


    return (
        <div className={styles.wrapper}>
            <div className={styles.in}>
                <div className={styles.title}>Premium status</div>
                <div className={styles.icon}><div className={styles.icon_img}></div></div>
                <div className={styles.body}>
                    <div className={styles.head}>Unlock all site features:</div>
                    <div className={styles.text}>
                    <ul>
                        <li>Exclusive avatar badge</li>
                        <li>Female search filters</li>
                        <li>View profiles that added you to favorites</li>
                        <li>View profiles that liked you back</li>
                    </ul>
                    </div>
                    <div className={styles.pricing}>

                        {
                            (list && list?.length > 0) && (
                                list?.map(i => (
                                    <div 
                                        onClick={() => onSelect({value: i?.id, type: 'premium'})}
                                        className={styles.item} key={i?.id}>
                                        <input type="radio" checked={selected?.value == i?.id && selected?.type == 'premium'}/>
                                        <label className={styles.label}>
                                            <div className={styles.date}>
                                                <span>
                                                    {i?.duration === 4 && i?.duration / 4}
                                                    {i?.duration < 4 && i?.duration}
                                                    {i?.duration > 4 && i?.duration / 4}
                                                </span>
                                                {i?.duration === 4 && 'month'}
                                                {i?.duration > 4 && 'months'}
                                                {(i?.duration < 4 && i?.duration > 1) && 'weeks'}
                                                {(i?.duration === 1) && 'week'}
                                            </div>
                                            <div className={styles.price}>{i?.price}
                                                <span><AiFillDollarCircle/></span>
                                            </div>
                                        </label>
                                    </div>
                                ))
                            )
                        }
                    </div>
                </div>
                <div className={styles.action}>
                    <Button 
                        // hover={{boxShadow: '0.872px 9.962px 20px rgba(255, 199, 0, 0.15)'}}
                        // hover={null}
                        variant={'gold'}
                        text='Become Premium'
                        load={load && selected?.type === 'premium'}
                        onClick={onAccept}
                        disabled={selected?.type !== 'premium'}
                        fill
                        />
                </div>
            </div>
        </div>
    )
}


export default CardPremium;