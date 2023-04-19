import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
import {FC} from 'react';
import styles from './BthPicker.module.scss';



const BthPicker:FC<DatePickerProps> = (props) => {


    return (
        <div className={styles.wrapper}>
            <DatePicker
                {...props}
                className={styles.picker}
                placeholder='День рождения'
                format={'DD-MM-YYYY'}
                />
        </div>
    )
}


export default BthPicker;
