import styles from './SelectDef.module.scss';
import {Select} from 'antd';
import {FC} from 'react';
import { selectDefType } from './types';


const SelectDef:FC<selectDefType> = ({
    placeholder,
    list,
    value,
    width,
    label
}) => {

    return (
        <div className={styles.wrapper} style={{width: width}}>
            {
                label ? (
                    <div className={styles.label}>{label}</div>
                ) : null
            }
            <Select
                style={{width: '100%'}}
                placeholder={placeholder}
                // defaultValue={value}
                options={list}
                // value={value ? value : placeholder}
                />
        </div>
    )
}

export default SelectDef;