import Button from '@/components/Button/Button';
import styles from './CardPremium.module.scss';



const CardPremium = () => {


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
                        <div className={styles.item}>
                            <input type="checkbox" />
                            <label className={styles.label}>
                                <div className={styles.date}>
                                    <span>12</span>
                                    месяцев
                                </div>
                                <div className={styles.price}>$7</div>
                            </label>
                        </div>
                        <div className={`${styles.item}`}>
                            <input type="checkbox" />
                            <label className={`${styles.label} ${styles.top}`}>
                                <div className={styles.date}>
                                    <span>6</span>
                                    месяцев
                                </div>
                                <div className={styles.price}>$10</div>
                                <div className={styles.ex}>Экономия 36%</div>
                            </label>
                        </div>
                        <div className={styles.item}>
                            <input type="checkbox" />
                            <label className={styles.label}>
                                <div className={styles.date}>
                                    <span>1</span>
                                    месяц
                                </div>
                                <div className={styles.price}>$19</div>
                            </label>
                        </div>
                    </div>
                </div>
                <div className={styles.action}>
                    <Button 
                        // hover={{boxShadow: '0.872px 9.962px 20px rgba(255, 199, 0, 0.15)'}}
                        // hover={null}
                        variant={'gold'}
                        text='Стать Премиум'
                        fill
                        />
                </div>
            </div>
        </div>
    )
}


export default CardPremium;