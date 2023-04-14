import { MotionStyle, VariantLabels, TargetAndTransition } from "framer-motion";

export interface iconButtonPropsType {
    icon?: React.ReactNode,
    variant?: iconButtonVariants,
    size?: number,
    
    onClick?: (...args: any[]) => any,
    style?: CSSStyleSheet
    // hover?: VariantLabels | TargetAndTransition,
}

export type iconButtonVariants = 'danger' | 'default' | 'transparent' | 'bordered';