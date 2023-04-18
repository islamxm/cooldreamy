import styles from './UserImageSlider.module.scss';
import {FC} from 'react';
import { userImageSliderPropsType } from './types';
import Image from 'next/image';
import img from '@/public/assets/images/girl.png';
import { IUser } from '@/models/IUser';
import UserImageItem from '@/pageModules/profile/components/UserImageItem/UserImageItem';



const UserImageSlider:FC<IUser> = ({
    profile_photo
}) => {



    return (
        <div className={styles.wrapper}>
            {/* {
                list?.map((item, index) => (
                    <div className={styles.item} key={index}>
                        <Image
                            src={item.image}
                            alt=""
                            />
                    </div>
                ))
            } */}
            {
                profile_photo?.map((item, index) => (
                    <div className={styles.item} key={index}>
                        <UserImageItem
                            image={item?.thumbnail_url}
                        />
                    </div>
                ))
            }
        </div>
    )
}

export default UserImageSlider;