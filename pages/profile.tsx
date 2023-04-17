import Container from "@/components/Container/Container"
import MainLayout from "@/components/MainLayout/MainLayout";
import Sidebar from "@/components/Sidebar/Sidebar";
import UserLayout from "@/components/UserLayout/UserLayout";
import UserCard from "@/pageModules/user/components/UserCard/UserCard";
import { Row, Col } from "antd";
import img from '@/public/assets/images/my-img.png';
import Button from "@/components/Button/Button";
import UserInfo from "@/pageModules/profile/components/UserInfo/UserInfo";
import ImageCropModal from "@/pageModules/profile/modals/ImageCropModal/ImageCropModal";
import {useEffect, useState} from 'react';
import ApiService from "@/service/apiService";
import { useAppSelector } from "@/hooks/useTypesRedux";
import { IUser } from "@/models/IUser";


const service = new ApiService()

const Profile = () => {
    const {token} = useAppSelector(s => s)

    //userCard data
    const [data, setData] = useState<IUser | null>()



    useEffect(() => {
        if(token) {
            service.getMyProfile(token).then(res => {
                console.log(res)
                setData(res)
            })

            service.getAllPrompts(token).then(res => {
                console.log(res)
            })
        }
    }, [token])

    const [imageEditModal, setImageEditModal] = useState(false)

    const closeImageEditModal = () => setImageEditModal(false)
    const openImageEditModal = () => setImageEditModal(true)





    return (
        <Container>

            {/* edit image */}
            <ImageCropModal open={imageEditModal} onClose={closeImageEditModal}/>
            {/* edit image */}


            <MainLayout>
                <Sidebar/>
                <UserLayout
                    side={
                        <UserCard
                            image={data?.avatar_url_big_thumbnail ? data?.avatar_url_big_thumbnail : ''}
                            verify={false}
                            >
                            <Button
                                disabled
                                text='Подтвердить фото'
                                style={{
                                    padding: '8px 10px',
                                    fontSize: 18,
                                    lineHeight: '27px',
                                    width: '100%'
                                }}
                                />
                        </UserCard>
                    }
                    main={
                        <UserInfo
                            {...data}
                            />
                    }
                    />
            </MainLayout>
        </Container>
    )
}

export default Profile;