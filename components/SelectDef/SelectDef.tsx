import styles from './SelectDef.module.scss';
import {Select} from 'antd';
import {FC} from 'react';
import { selectDefType } from './types';


const SelectDef:FC<selectDefType> = ({
    placeholder,
    list,
    value,
    width,
    label,
    onChange
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
                defaultValue={value}
                onChange={onChange}
                options={list}
                value={value}
                />
        </div>
    )
}

export default SelectDef;