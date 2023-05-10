import styles from './DialogEmpty.module.scss';
import Image from 'next/image';
// import img from '@/public/assets/images/'



const DialogEmpty = () => {


    return (
        <div className={styles.wrapper}>
            
            <div className={styles.body}>
                <div className={styles.image}>
                    {/* <Image/> */}
                </div>
            </div>

        </div>
    )
}


export default DialogEmpty;