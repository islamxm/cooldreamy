import styles from './SelectDef.module.scss';
import {RefSelectProps, Select} from 'antd';

import {FC, useEffect, useRef} from 'react';
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

    open,

    customIcon
}) => {

    const ref = useRef<RefSelectProps>(null)

    const test = () => {
        if(ref?.current) {
            ref?.current?.blur()
        }
    }

    

    return (
        <div className={`${styles.wrapper} ${!label ? styles.nonlabel : ''}`} style={{width: width}}>
            {
                label && (
                    <div className={styles.label}>{label}</div>
                ) 
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
                        onChange={(e,v) => {
                            onChange && onChange(e,v)
                            test()
                        }}
                        onClear={onClear}
                        options={list}
                        value={value}
                        disabled={disabled}
                        className={`${isRound ? 'round' : ''} ${customIcon ? 'custom-icon' : ''}`}
                        virtual={false}
                        showSearch={false}
                        
                        />
                ) : (
                    <Select
                        clearIcon={clearIcon}
                        ref={ref}
                        allowClear
                        style={{width: '100%'}}
                        placeholder={placeholder}
                        defaultValue={value}
                        onChange={(e,v) => {
                            onChange && onChange(e,v)
                            test()
                        }}
                        onClear={onClear}
                        options={list}
                        showSearch={false}
                        value={value}
                        disabled={disabled}
                        className={isRound ? 'round' : ''}
                        virtual={false}
                        />
                )
            }
        </div>
    )
}

export default SelectDef;