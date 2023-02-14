import styles from './SearchBody.module.scss';
import SearchFilter from '../searchFilter/SearchFilter';
import SearchInfo from '../searchInfo/SearchInfo';
import {Row, Col} from 'antd';


const SearchBody = () => {
    return (
        <div className={styles.wrapper}>
            <SearchFilter/>
        </div>
    )
}

export default SearchBody;