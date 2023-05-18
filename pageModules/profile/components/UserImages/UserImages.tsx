import styles from './UserImages.module.scss';
import UserImageItem from '../UserImageItem/UserImageItem';
import {BsCamera} from 'react-icons/bs';
import {FC, useEffect, useState, useRef} from 'react';
import ImageCropModal from '../../modals/ImageCropModal/ImageCropModal';
import { createFile } from '@/helpers/cropImage';
import ApiService from '@/service/apiService';
import FancyboxWrapper from '@/components/FancyboxWrapper/FancyboxWrapper';
import { IUser } from '@/models/IUser';
import { useAppSelector } from '@/hooks/useTypesRedux';

const UserImages:FC<IUser> = ({
    profile_photo
}) => {
    const {locale} = useAppSelector(s => s)
    const [imageCropModal, setImageCropModal] = useState(false)
    const ref = useRef<HTMLInputElement>(null)
    const [uploadedFile, setUploadedFile] = useState<File | null>(null)


    const closeCropModal = () => {
        // if(ref) {
        //     ref?.current?.r
        // }
        setUploadedFile(null)
        setImageCropModal(false)
    }

    const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files !== null ) {
            setUploadedFile(e.target.files[0])
        }
    }

    useEffect(() => {
        if(uploadedFile) {
            setImageCropModal(true)
        }
    }, [uploadedFile])

    

    const onUpload = (image: any) => {

        if(image) {
            const data = new FormData()
            createFile(image).then(res => {
                data.append('category_id', '2')
                data.append('image', res)
            })
        }
    }



    return (
        <FancyboxWrapper>

            <div className={`${styles.wrapper} horizontal-scroll`}>
                <ImageCropModal
                    uploadedFile={uploadedFile}
                    open={imageCropModal}
                    onClose={closeCropModal}
                    onSave={onUpload}
                    />
                <div
                    className={styles.add}>
                    <input value={''} ref={ref} id='upload-photo' type="file" accept='.png, .jpg, .jpeg' onChange={uploadFile}/>
                    <label htmlFor='upload-photo' className={styles.label}>
                        <div className={styles.icon}><BsCamera/></div>
                        <div className={styles.text}>{locale?.profilePage.images.add_btn}</div>
                    </label>
                </div>
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

export default UserImages;