import styles from './Main.module.scss';
import img from '@/public/assets/images/logo-animate.svg'
import Image from 'next/image';

const Main = () => {

    return (
        <div className={styles.wrapper}>
            <div className={styles.img}><Image src={img} alt=''/></div>
            <div className={styles.label}>Проходят технические работы, подождите не много</div>
        </div>
    )
}


export default Main;