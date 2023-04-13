import { StaticImageData } from "next/image"

export type avatarPropsTypes = {
    image?: string,
    size?: number,
    round?: boolean,
    wrapperStyle?: React.CSSProperties,
    style?: React.CSSProperties,
    verified?: boolean
}