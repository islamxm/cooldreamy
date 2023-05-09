import styles from './UserImageSlider.module.scss';
import {FC} from 'react';
import { userImageSliderPropsType } from './types';
import Image from 'next/image';
import img from '@/public/assets/images/girl.png';
import { IUser } from '@/models/IUser';
import UserImageItem from '@/pageModules/profile/components/UserImageItem/UserImageItem';
import {useEffect} from 'react';
import FancyboxWrapper from '@/components/FancyboxWrapper/FancyboxWrapper';

const UserImageSlider:FC<IUser> = ({
    profile_photo
}) => {

    useEffect(() => {
        console.log(profile_photo)
    }, [profile_photo])

    return (
        <FancyboxWrapper>
            <div className={`${styles.wrapper} horizontal-scroll`}>
                {
                    profile_photo?.map((item, index) => (
                        <a data-fancybox="gallery" href={item.image_url} className={styles.item} key={index}>
                            <UserImageItem
                                image={item?.thumbnail_url}
                            />
                        </a>
                    ))
                }
            </div>
        </FancyboxWrapper>
    )
}

export default UserImageSlider;