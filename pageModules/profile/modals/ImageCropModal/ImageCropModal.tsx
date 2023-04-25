import styles from './ImageCropModal.module.scss';
import { Modal } from 'antd';
import Image from 'next/image';
import {FC, useState, useCallback, useEffect} from 'react';
import { modalPropsType } from '@/models/modalTypes';
import Button from '@/components/Button/Button';
import {Row, Col} from 'antd';
import getCroppedImg, { createFile, getBase64 } from '@/helpers/cropImage';
import Cropper from 'react-easy-crop'
import ApiService from '@/service/apiService';
import { useAppSelector, useAppDispatch } from '@/hooks/useTypesRedux';
import notify from '@/helpers/notify';
import { updateUserData } from '@/store/actions';
import SelectCard from '@/components/SelectCard/SelectCard';

const service = new ApiService()

interface cropModalPropsType extends modalPropsType {
    uploadedFile: File | null,
    onSave?: (file?: File | null, id?: number) => any,
    onAfterUpload?: (...args: any[]) => any
}


const imageCats:{id: number, text: string, disabled?: boolean}[] = [
    {id: 1, text: 'Аватар', disabled: true},
    {id: 2, text: 'Публичная картинка', disabled: false},
    // {id: 3, text: 'Приватная картинка', disabled: true},
    // {id: 4, text: '18+', disabled: true},
    // {id: 5, text: 'Профиль', disabled: true}
]


const ImageCropModal:FC<cropModalPropsType> = ({
    open,
    onClose,
    uploadedFile,
    onAfterUpload
}) => {
    const dispatch = useAppDispatch()
    const {token} = useAppSelector(s => s);
    

    const [category, setCategory] = useState<number>(0)
    const [srcImg, setSrcImg] = useState<string | null>(null)
    const [crop, setCrop] = useState({x: 0, y: 0})
    const [rotation, setRotation] = useState(0)
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null)
    const [croppedImage, setCroppedImage] = useState<any>(null)
    const [load, setLoad] = useState(false)

    const onCancel = () => {
        setSrcImg(null)
        setCrop({x: 0, y: 0})
        setRotation(0)
        setZoom(1)
        setCroppedAreaPixels(null)
        setCroppedImage(null)
        onClose()
    }


    useEffect(() => {
        if(uploadedFile) {
            setSrcImg(URL.createObjectURL(uploadedFile))
        }
    }, [uploadedFile])

    const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])


    const showCroppedImage = useCallback(async () => {
        if(srcImg) {

            try {
                const croppedImage = await getCroppedImg(
                    srcImg,
                    croppedAreaPixels,
                    rotation
                )

                setCroppedImage(croppedImage)

            } catch(err) {
                console.log(err)
            }
        }
        
    }, [croppedAreaPixels, rotation, srcImg])


    // !! upload test

    // const onSave = () => {

    //     if(token && croppedImage) {
    //         setLoad(true)
    //         const data = new FormData()
    //         createFile(croppedImage).then(res => {
    //             data.append('category_id', '5')
    //             data.append('image', res)

    //             service.addProfileImage(data, token).then(res => {
    //                 // console.log(res)
    //                 if(res?.id) {
    //                     service.getMyProfile(token).then(userData => {
    //                         if(userData) {
    //                             dispatch(updateUserData(userData))
    //                         }
    //                     })
    //                     notify('Фотография добавлена', 'SUCCESS')
    //                     onCancel()
    //                 }
    //             }).finally(() => {
    //                 setLoad(false)
                    
    //             })
    //         })
    //     }
    // }
    
    const onSave = () => {
        if(token && croppedImage) {
            setLoad(true)
            const data = new FormData()
            createFile(croppedImage).then(res => {
                data.append('category_id', category.toString())
                data.append('image', res)

                service.addProfileImage(data, token).then(res => {
                    if(res?.id) {
                        service.getMyProfile(token).then(userData => {
                            if(userData) {
                                dispatch(updateUserData(userData))
                            }
                        })
                        notify('Фотография добавлена', 'SUCCESS')
                        onCancel()
                        onAfterUpload && onAfterUpload()
                    }
                }).finally(() => {
                    setLoad(false)
                })
            })
        }
    }


    return (
        <Modal
            open={open}
            width={648}
            onCancel={onCancel}
            className={`${styles.wrapper} modal`}
            footer={false}
            >
            {
                !category ? (
                    <div className={styles.head}>Выберите категорию загружаемой картинки</div>
                ) : <div className={styles.head}>Выбранная область будет показана на Вашей странице</div>
            }
            {
                !category ? (
                    <div className={styles.list}>
                        {
                            imageCats?.map((item) => (
                                <div className={styles.item} key={item.id}>
                                    <SelectCard
                                        value={item.id.toString()}
                                        label={item.text}
                                        isSelect={category === item.id}
                                        onSelect={(e) => setCategory(Number(e))}
                                        // disabled={item.disabled}
                                        />
                                </div>
                            ))
                        }
                    </div>
                ) : (
                    <div className={styles.main}>
                        {
                            croppedImage ? (
                                <div className={styles.cropped_img}>
                                    <Image
                                        loader={p => p?.src && typeof p?.src === 'string' ? p.src : ''}
                                        unoptimized
                                        src={croppedImage}
                                        width={600}
                                        height={600}
                                        alt=''
                                        />
                                </div>
                            ) : (
                                srcImg ? (
                                    <Cropper
                                        classes={{
                                            containerClassName: 'crop'
                                        }}
                                        image={srcImg}
                                        crop={crop}
                                        rotation={rotation}
                                        zoom={zoom}
                                        aspect={1 / 1}
                                        onCropChange={setCrop}
                                        onRotationChange={setRotation}
                                        onCropComplete={onCropComplete}
                                        onZoomChange={setZoom}
                                        />
                                ) : null
                            )
                        }
                    </div>
                )
            }
            {
                category ? (
                    <div className={styles.action}>
                        <Row gutter={[10, 10]}>
                            
                            <Col span={12}>
                                {
                                    croppedImage && onSave ? (
                                        <Button
                                            load={load}
                                            onClick={onSave}
                                            fill
                                            text={croppedImage ? 'Загрузить' : 'Сохранить'}
                                            style={{padding: '8px 10px', fontSize: 18}}
                                            />
                                    ) : (
                                        <Button
                                            load={load}
                                            onClick={showCroppedImage}
                                            fill
                                            text={croppedImage ? 'Загрузить' : 'Сохранить'}
                                            style={{padding: '8px 10px', fontSize: 18}}
                                            />
                                    )
                                }
                                
                            </Col>
                            <Col span={12}>
                                <Button
                                    fill
                                    style={{padding: '8px 10px', fontSize: 18}}
                                    text='Отменить'
                                    onClick={onCancel}
                                    variant={'bordered'}
                                    />
                            </Col>
                        </Row>
                    </div>
                ) : null
            }
            
        </Modal>
    )
}

export default ImageCropModal;