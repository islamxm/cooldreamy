import styles from './SearchInfo.module.scss';

const SearchInfo = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.value}>
                Найдено: 221
            </div>
            <div className={styles.tabs}>
                <button className={`${styles.item} ${styles.active}`}>Все</button>
                <button className={styles.item}>Рядом</button>
                <button className={styles.item}>Новые</button>
                <button className={styles.item}>Онлайн</button>
            </div>
        </div>
    )
}

export default SearchInfo;