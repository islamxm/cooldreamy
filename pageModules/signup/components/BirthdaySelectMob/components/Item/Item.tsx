import styles from './Item.module.scss';
import { useSwiper } from 'swiper/react';

const Item = ({value, index, label} : {value: any, index: any, label: any}) => {
    const swiper = useSwiper()


    return (
        <div className={styles.wrapper}>
            {label}
        </div>
    )
}


export default Item;