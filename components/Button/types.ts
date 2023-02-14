import { MotionStyle } from "framer-motion";
import { HTMLProps } from "react";


export type ButtonVariants = 'default' | 'danger' | 'simple'; 


export type ButtonPropsTypes = {
    text: string,
    variant?: ButtonVariants,
    onClick?: React.ReactEventHandler | (() => void) | undefined;
    disabled?: boolean,
    style?: MotionStyle,
    before?: React.ReactNode | undefined
}

