import IFeedCard from "@/models/IFeedCard";
import { CSSProperties } from "react";

interface ICard extends IFeedCard {
    onLike?: (...args: any[]) => any,
    onCancel?: (...args: any[]) => any,
    index: number,
    setCanceling: (...args: any) => any
    setLiking: (...args: any) => any,
    liking: boolean,
    canceling: boolean,
}


export interface cardPropsType {
    //setLiked: (...args: any[]) => any,
    card: ICard,
    leaveX: {id: any, x: any} | null,
    setLeaveX: (...args: any[]) => any

    // !! test
    active?: boolean,
    removeCard: (...args: any[]) => any
}