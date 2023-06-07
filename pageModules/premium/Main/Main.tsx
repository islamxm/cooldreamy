import styles from './Main.module.scss';
import CardPremium from '../CardPremium/CardPremium';
import CardBalance from '../CardBalance/CardBalance';
import CardAdv from '../CardAdv/CardAdv';



const Main = () => {

    return (
        <div className={`${styles.wrapper}`}>
            <div className={styles.in}>
                <div className={styles.item}>
                    <CardPremium/>
                </div>
                <div className={styles.item}>
                    <CardBalance/>
                </div>
                <div className={styles.item}>
                    <CardAdv/>
                </div>
            </div>
        </div>
    )
}


export default Main;