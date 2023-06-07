import Button from '@/components/Button/Button';
import styles from './CardAdv.module.scss';




const CardAdv = () => {

    return (
        <div className={styles.wrapper}>
            <div className={styles.in}>
                <div className={styles.title}>Подписка</div>
                <div className={styles.body}>
                    <div className={styles.head}></div>
                </div>
                <div className={styles.action}>
                    <Button
                        variant={'gold'}
                        fill
                        text='Подписаться'
                        />
                </div>
            </div>
        </div>
    )
}


export default CardAdv;