import { StaticImageData } from "next/image";

interface IFeedCard {
    age?: number,
    avatar_url?: string,
    avatar_url_thumbnail: string | StaticImageData
    birthday?: string,
    country?: string,
    id: number,
    name?: string,
    state?: string
}

export default IFeedCard;