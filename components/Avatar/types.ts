import { StaticImageData } from "next/image"

export type avatarPropsTypes = {
    image?: StaticImageData,
    size?: number,
    round?: boolean,
    wrapperStyle?: React.CSSProperties,
    style?: React.CSSProperties,
    verified?: boolean
}