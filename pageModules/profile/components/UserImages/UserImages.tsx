import styles from './UserImages.module.scss';
import UserImageItem from '../UserImageItem/UserImageItem';
import {BsCamera} from 'react-icons/bs';
import {motion} from 'framer-motion';
import img from '@/public/assets/images/my-img.png';

const list = [
    {image: img},
    {image: img},
    {image: img},
]


const UserImages = () => {

    return (
        <div className={styles.wrapper}>
            <motion.button 
                whileTap={{scale: 0.9}}
                transition={{type: 'spring', stiffness: 400, damping: 17}}
                className={styles.add}>
                <BsCamera/>
                <div className={styles.label}>Добавить фото</div>
            </motion.button>
            {
                list?.map((item, index) => (
                    <UserImageItem
                        key={index}
                        image={item.image}
                        />
                ))
            }
        </div>
    )
}

export default UserImages;