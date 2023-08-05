import Button from '@/components/Button/Button';
import styles from './CardPremium.module.scss';
import { useEffect } from 'react';


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
                <div className={styles.title}>Премиум статус</div>
                <div className={styles.icon}><div className={styles.icon_img}></div></div>
                <div className={styles.body}>
                    <div className={styles.head}>Получите все возможности сайта</div>
                    <div className={styles.text}>
                    Эксклюзивное предложение. Ваш профиль может быть все время в ТОП или стать Инкогнито, персональный менеджер службы поддержки, 
                    а также все преимущества Премиум статуса.
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
                                                {i?.duration === 4 && 'месяц'}
                                                {i?.duration > 4 && 'месяцев'}
                                                {(i?.duration < 4 && i?.duration > 1) && 'недели'}
                                                {(i?.duration === 1) && 'неделя'}
                                            </div>
                                            <div className={styles.price}>${i?.price}</div>
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
                        text='Стать Премиум'
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