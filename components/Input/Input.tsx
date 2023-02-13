import styles from './Input.module.scss';
import { InputPropsTypes } from './types';
import {HiOutlineCheckCircle} from 'react-icons/hi';


const Input: React.FC<InputPropsTypes> = ({
    error,
    type,
    value,
    valid,
    beforeIcon,
    placeholder,
    onChange
}) => {
    return (
        <div className={`${styles.wrapper} ${error ? styles.error : ''} ${beforeIcon ? styles.before : ''}`}>
            <div className={styles.input_wrapper}>
                {
                    valid && (
                        <div className={styles.valid_icon}>
                            <HiOutlineCheckCircle/>
                        </div>
                    )
                }
                {
                    beforeIcon && (
                        <div className={styles.before_icon}>
                            {beforeIcon}
                        </div>
                    )
                }
                <input 
                    onChange={onChange} 
                    value={value} 
                    type={type} 
                    placeholder={placeholder}
                    className={styles.input}
                    />
            </div>
            {
                error && (
                    <div className={styles.error}>
                        {error}
                    </div>
                )
            }
        </div>
    )
}

export default Input;