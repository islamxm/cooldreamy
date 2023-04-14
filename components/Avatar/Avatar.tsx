import Image from "next/image"
import { avatarPropsTypes } from "./types"
import styles from './Avatar.module.scss';
import placeholder from '@/public/assets/images/avatar-placeholder.png';
import {HiOutlineCheck} from 'react-icons/hi';
import {useEffect} from 'react';

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
                    loader={(p) => {
                        return p?.src && typeof p?.src === 'string' ? p?.src : '' 
                    }}
                    placeholder={!image ? 'blur' : 'empty'}
                    width={size}
                    height={size}
                    alt={'avatar'}
                    />

                
            </div>
            {
                verified ? (
                    <div className={styles.verified}>
                        <HiOutlineCheck/>
                    </div>
                ) : null
            }
        </div>
    )
}

export default Avatar;