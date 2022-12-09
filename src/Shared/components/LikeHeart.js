import { ReactComponent as Heart } from "../../Image/heart.svg";


export const LikeHeart = () => {
    return(
        <Heart
        width="50px"
        height="50px"
        fill="#ffb800"
        opacity="60%"
        />
    )
}

export const LikedHeart = () => {
    return(
        <Heart
        width="50px"
        height="50px"
        fill="#ffb800"
        opacity="100%"
        />
    )
}
