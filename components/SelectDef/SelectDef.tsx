import styles from './SelectDef.module.scss';
import {Select} from 'antd';

import {FC, useRef, useEffect} from 'react';
import { selectDefType } from './types';


interface test {
    open?: boolean
}

const SelectDef:FC<selectDefType & test> = ({
    placeholder,
    list,
    value,
    width,
    label,
    onChange,
    onClear,
    multiple,
    disabled,
    clearIcon,
    isRound,

    open
}) => {

    const ref = useRef<any>()

    

    return (
        <div className={`${styles.wrapper} ${!label ? styles.nonlabel : ''}`} style={{width: width}}>
            {
                label ? (
                    <div className={styles.label}>{label}</div>
                ) : null
            }
            {
                multiple ? (
                    <Select
                        clearIcon={clearIcon}
                        mode='multiple'
                        ref={ref}
                        allowClear
                        style={{width: '100%'}}
                        placeholder={placeholder}
                        defaultValue={value}
                        onChange={onChange}
                        onClear={onClear}
                        options={list}
                        value={value}
                        disabled={disabled}
                        className={isRound ? 'round' : ''}
                        
                        virtual={false}
                        
                        
                        />
                ) : (
                    <Select
                        clearIcon={clearIcon}
                        ref={ref}
                        allowClear
                        style={{width: '100%'}}
                        placeholder={placeholder}
                        defaultValue={value}
                        onChange={onChange}
                        onClear={onClear}
                        options={list}
                        value={value}
                        disabled={disabled}
                        className={isRound ? 'round' : ''}

                        open={open}
                        
                        />
                )
            }
        </div>
    )
}

export default SelectDef;