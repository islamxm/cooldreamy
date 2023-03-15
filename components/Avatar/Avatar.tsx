import Image from "next/image"
import { avatarPropsTypes } from "./types"
import styles from './Avatar.module.scss';
import placeholder from '@/public/assets/images/avatar-placeholder.png';


const Avatar = ({
    image,
    size = 45,
    wrapperStyle,
    style,
    round,
    verified
}: avatarPropsTypes) => {

    return (
        <div className={`${styles.wrapper} ${round ? styles.round : ''}`} style={{...wrapperStyle}}>
            <div className={styles.in} style={{width: size, height: size, ...style}}>
                <Image
                    src={image ? image : placeholder}
                    placeholder={'blur'}
                    width={size}
                    height={size}
                    alt={'avatar'}
                    />

                {
                    verified ? (
                        <div className={styles.verified}>
                            
                        </div>
                    ) : null
                }
            </div>
        </div>
    )
}