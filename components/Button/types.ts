import { MotionStyle, VariantLabels, TargetAndTransition } from "framer-motion";
import { HTMLProps } from "react";


export type ButtonVariants = 'default' | 'danger' | 'simple' | 'bordered'; 


export type ButtonPropsTypes = {
    text: string,
    variant?: ButtonVariants,
    onClick?: React.ReactEventHandler | (() => void) | undefined;
    disabled?: boolean,
    style?: MotionStyle,
    before?: React.ReactNode | undefined,
    after?: React.ReactNode | undefined,
    hover?: VariantLabels | TargetAndTransition
}

