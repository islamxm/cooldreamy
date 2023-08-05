import styles from './CardBalance.module.scss';
import Button from '@/components/Button/Button';


const CardBalance = ({list, selected, onSelect}: {list?: any[], selected: any, onSelect: any}) => {


    return (
        <div className={styles.wrapper}>
            <div className={styles.in}>
                <div className={styles.title}>Баланс кредитов</div>
                <div className={styles.icon}>
                    <div className={styles.icon_img}></div>
                </div>
                <div className={styles.body}>
                    <div className={styles.head}>Покупки на сервисе</div>
                    <div className={styles.text}>
                    За кредиты Вы можете дарить подарки, присылать стикеры и многое другое...
                    </div>
                    <div className={styles.list}>
                        {
                            (list && list?.length > 0) && list?.map(i => (
                                <div
                                    onClick={() => onSelect({value: i?.id, type: 'credit'})}
                                    className={styles.item} key={i?.id}>
                                    <input type="radio" checked={i?.id == selected?.value && selected?.type == 'credit'}/>
                                    <label className={styles.label}>
                                        <div className={styles.value}><span>{i?.credits}</span> кредитов</div>
                                        <div className={styles.price}>${i?.price}</div>
                                    </label>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className={styles.action}>
                    <Button
                        text='Пополнить'
                        fill
                        />    
                </div> 
            </div>
        </div>
    )
}

export default CardBalance;