import styles from './SelectDef.module.scss';
import {Select} from 'antd';

import {FC, useRef, useEffect} from 'react';
import { selectDefType } from './types';


const SelectDef:FC<selectDefType> = ({
    placeholder,
    list,
    value,
    width,
    label,
    onChange,
    onClear
}) => {

    const ref = useRef<any>()

    

    return (
        <div className={styles.wrapper} style={{width: width}}>
            {
                label ? (
                    <div className={styles.label}>{label}</div>
                ) : null
            }
            <Select
                ref={ref}
                allowClear
                style={{width: '100%'}}
                placeholder={placeholder}
                defaultValue={value}
                onChange={onChange}
                onClear={onClear}
                options={list}
                value={value}
                />
        </div>
    )
}

export default SelectDef;