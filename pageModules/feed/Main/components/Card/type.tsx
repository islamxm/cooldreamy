import IFeedCard from "@/models/IFeedCard";
import { CSSProperties } from "react";

interface ICard extends IFeedCard {
    onLike?: (...args: any[]) => any,
    onCancel?: (...args: any[]) => any,
    zindex: number,
    setCanceling: (...args: any) => any
    setLiking: (...args: any) => any
}


export interface cardPropsType {
    //setLiked: (...args: any[]) => any,
    card: ICard

    // !! test
    active?: boolean,
    removeCard: (...args: any[]) => any
}