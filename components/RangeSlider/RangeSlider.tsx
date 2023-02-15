import styles from './RangeSlider.module.scss';
import {FC} from 'react';
import { Slider } from 'antd';
import { rangeSliderPropsTypes } from './rangeTypes';


const RangeSlider:FC<rangeSliderPropsTypes> = (props) => {

    return (
        <div className={styles.wrapper}>
            {
                props?.label ? (
                    <div className={styles.label}>
                        {props.label}
                    </div>
                ) : null
            }
            <div className={styles.body}>
                <Slider {...props}/>
            </div>
            <div className={styles.info}>
                <div className={styles.item}>{props?.min}{props?.unit}</div>
                <div className={styles.item}>{props?.max}{props?.unit}</div>
            </div>
        </div>
    )
}

export default RangeSlider;