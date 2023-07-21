import styles from './CardBalance.module.scss';
import Button from '@/components/Button/Button';


const CardBalance = () => {

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
                        <div className={styles.item}>
                            <input type="radio" />
                            <label className={styles.label}>
                                <div className={styles.value}><span>5</span> кредитов</div>
                                <div className={styles.price}>$19</div>
                            </label>
                        </div>
                        <div className={styles.item}>
                            <input checked type="radio" />
                            <label className={styles.label}>
                                <div className={styles.value}><span>5</span> кредитов</div>
                                <div className={styles.price}>$19</div>
                            </label>
                        </div>
                        <div className={styles.item}>
                            <input type="radio" />
                            <label className={styles.label}>
                                <div className={styles.value}><span>5</span> кредитов</div>
                                <div className={styles.price}>$19</div>
                            </label>
                        </div>
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