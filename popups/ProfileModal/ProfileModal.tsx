import { IUser } from '@/models/IUser';
import styles from './ProfileModal.module.scss';
import { Modal, ModalFuncProps, Row, Col } from 'antd';
import {FC, useEffect, useState, useRef} from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/useTypesRedux';
import { Swiper as SwiperWrap, SwiperSlide } from 'swiper/react';
import Swiper , {Thumbs} from 'swiper';
import Skeleton from './components/Skeleton/Skeleton';
import { updateCurrentProfileId } from '@/store/actions';
import Image from 'next/image';
import ApiService from '@/service/apiService';
import UserTitle from '@/components/UserTitle/UserTitle';
import UserLocation from '@/components/UserLocation/UserLocation';
import Textarea from '@/components/Textarea/Textarea';
import Button from '@/components/Button/Button';
import Router from 'next/router';
const service = new ApiService()


const ProfileModal:FC<ModalFuncProps> = (props) => {
    
    const {currentProfileId, token} = useAppSelector(s => s)
    const dispatch = useAppDispatch()
    const {onCancel} = props
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    const [load, setLoad] = useState(true)
    const [data, setData] = useState<IUser | null>(null)

    const {
        profile_photo, 
        name,
        age,
        country,
        state,
        about_self,
        id
    } = data || {}

    const onClose = () => {
        onCancel && onCancel()
    }


    useEffect(() => {
        if(currentProfileId && token) {
            setLoad(true)
            service.getProfile({user_id: currentProfileId}, token).then(res => {
                console.log(res)
                if(res) {
                    setData(res)
                }
            }).finally(() => {
                setLoad(false)
            })
        }
    }, [currentProfileId, token])


    return (
        <Modal
            {...props}
            width={800}
            footer={false}
            onCancel={onClose}
            className={`modal purp ${styles.wrapper}`}
            >
            {
                !load ? (    
                    <div className={styles.in}>
                        <div className={styles.main}>
                            {
                                thumbsSwiper && (
                                    <div className={styles.slider}>
                                        <SwiperWrap
                                            modules={[Thumbs]}
                                            thumbs={{swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null}}
                                            className={styles.slider_body}
                                            spaceBetween={10}
                                            >
                                            {
                                                profile_photo?.map(i => (
                                                    <SwiperSlide className={styles.slider_item} key={i.id}>
                                                        <Image
                                                            width={300}
                                                            height={300}
                                                            src={i.image_url}
                                                            alt=''
                                                            loader={p => p?.src && typeof p?.src === 'string' ? p?.src : ''}
                                                            />
                                                    </SwiperSlide>
                                                ))
                                            }
                                        </SwiperWrap>
                                    </div>
                                ) 
                            }
                            <div className={styles.thumbs}>
                                <SwiperWrap
                                    modules={[Thumbs]}
                                    className={styles.thumbs_body}
                                    slidesPerView={3}
                                    watchSlidesProgress
                                    onSwiper={setThumbsSwiper}
                                    spaceBetween={10}
                                    >
                                    {
                                        profile_photo?.map(i => (
                                            <SwiperSlide className={styles.thumbs_item} key={i.id}>
                                                <Image
                                                    src={i.thumbnail_url}
                                                    alt=''
                                                    width={70}
                                                    height={70}
                                                    loader={p => p?.src && typeof p?.src === 'string' ? p?.src : ''}
                                                    />
                                            </SwiperSlide>
                                        ))
                                    }
                                </SwiperWrap>
                            </div>
                        </div>
                        <div className={styles.body}>
                            <Row gutter={[15,15]}>
                                <Col span={24}>
                                    <UserTitle
                                        isOnline
                                        username={name}
                                        age={age ? age.toString() : ''}
                                        style={{fontSize: 20}}
                                        />
                                </Col>
                                <Col span={24}>
                                    <UserLocation
                                        state={state}
                                        country={country}
                                        />
                                </Col>
                                {
                                    about_self ? (
                                        <Col span={24}>
                                            <div className={styles.part}>
                                                <div className={styles.label}>О себе</div>
                                                <div className={styles.value}>{about_self}</div>
                                            </div>
                                        </Col>
                                    ) : null
                                }
                                <Col span={24}>
                                    <div className={styles.action}>
                                        <Button onClick={() => {
                                            onClose()
                                            Router.push(`/users/${id}`)
                                        }} middle text='Открыть профиль'/>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                ) : <Skeleton/> 
            }
            
        </Modal>
    )
}

export default ProfileModal;