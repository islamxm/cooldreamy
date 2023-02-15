import styles from './UserImageSlider.module.scss';
import {FC} from 'react';
import { userImageSliderPropsType } from './types';
import Image from 'next/image';
import img from '@/public/assets/images/girl.png';

const mock = [
    {image:img },
    {image:img },
    {image:img },
    {image:img },
]



const UserImageSlider:FC<userImageSliderPropsType> = ({
    list = mock
}) => {
    return (
        <div className={styles.wrapper}>
            {
                list?.map((item, index) => (
                    <div className={styles.item} key={index}>
                        <Image
                            src={item.image}
                            alt=""
                            />
                    </div>
                ))
            }
        </div>
    )
}

export default UserImageSlider;