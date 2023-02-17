import styles from './UserImageItem.module.scss';
import Image, { StaticImageData } from 'next/image';


const UserImageItem = ({
    image
}: {
    image: StaticImageData
}) => {


    return (
        <div className={styles.item}>
            <Image src={image} alt=""/>
        </div>
    )
}

export default UserImageItem;