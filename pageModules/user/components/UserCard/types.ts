import { StaticImageData } from "next/image";

export type userCardPropsTypes = {
    children?: React.ReactNode;
    image: StaticImageData,
    verify?: boolean
}