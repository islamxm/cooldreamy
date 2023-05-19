import styles from './Skeleton.module.scss';


const Skeleton = () => {

    return (
        <div className={styles.wrapper}>
            <div className={styles.item}></div>
            <div className={styles.item}></div>
            <div className={styles.item}></div>
            <div className={styles.item}></div>
            {/* <div className={styles.item}></div>
            <div className={styles.item}></div>
            <div className={styles.item}></div>
            <div className={styles.item}></div>
            <div className={styles.item}></div>
            <div className={styles.item}></div> */}
        </div>
    )
}

export default Skeleton;