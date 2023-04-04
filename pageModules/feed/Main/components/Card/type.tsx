import IFeedCard from "@/models/IFeedCard";
import { CSSProperties } from "react";

export interface cardPropsType extends IFeedCard {
    //setLiked: (...args: any[]) => any,
    onLike?: (...args: any[]) => any,
    onCancel?: (...args: any[]) => any,
    zindex: number
}