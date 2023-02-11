import styles from './Input.module.scss';
import { InputPropsTypes } from './types';

const Input: React.FC<InputPropsTypes> = ({error}) => {
    return (
        <input type="text" />
    )
}

export default Input;