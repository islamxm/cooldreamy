import { HTMLProps } from "react";


export type ButtonVariants = 'default' | 'danger'; 


export type ButtonPropsTypes = {
    text: string,
    variant?: ButtonVariants,
    onClick?: React.ReactEventHandler | (() => void) | undefined;
    disabled?: boolean,
}

