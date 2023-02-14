import styles from './SelectDef.module.scss';
import {Select} from 'antd';
import {FC} from 'react';
import { selectDefType } from './types';


const SelectDef:FC<selectDefType> = ({
    placeholder,
    list,
    value    
}) => {
    return (
        <div className={styles.wrapper}>
            <Select
                style={{minWidth: 230}}
                placeholder={placeholder}
                defaultValue={value}
                options={list}
                />
        </div>
    )
}

export default SelectDef;