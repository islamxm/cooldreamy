import styles from './SearchInfo.module.scss';
import { tabsPropsTypes } from '../../types';


const SearchInfo = ({tabs, activeTab, onChange}:tabsPropsTypes) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.value}>
                Найдено: 221
            </div>
            <div className={styles.tabs}>
                {
                    tabs?.map((item, index) => (
                        <button 
                            key={index} 
                            onClick={() => onChange(item.id)}
                            className={`${styles.item} ${activeTab === item.id ? styles.active : ''}`}>
                                {item.label}
                            </button>
                    ))
                }
            </div>
        </div>
    )
}

export default SearchInfo;