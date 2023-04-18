import Container from "@/components/Container/Container"
import MainLayout from "@/components/MainLayout/MainLayout";
import Sidebar from "@/components/Sidebar/Sidebar";
import UserLayout from "@/components/UserLayout/UserLayout";
import UserCard from "@/pageModules/user/components/UserCard/UserCard";
import { Row, Col } from "antd";
import Button from "@/components/Button/Button";
import UserInfo from "@/pageModules/profile/components/UserInfo/UserInfo";
import ImageCropModal from "@/pageModules/profile/modals/ImageCropModal/ImageCropModal";
import {useEffect, useState} from 'react';
import ApiService from "@/service/apiService";
import { useAppSelector } from "@/hooks/useTypesRedux";
import { IUser } from "@/models/IUser";


const service = new ApiService()

const Profile = () => {
    const {token, userData} = useAppSelector(s => s)

    //userCard data
    // const [data, setData] = useState<IUser | null>()


    const [imageEditModal, setImageEditModal] = useState(false)

    const closeImageEditModal = () => setImageEditModal(false)
    const openImageEditModal = () => setImageEditModal(true)





    return (
        <Container>

            {/* edit image */}
            {/* <ImageCropModal open={imageEditModal} onClose={closeImageEditModal}/> */}
            {/* edit image */}


            <MainLayout>
                <Sidebar/>
                <UserLayout
                    side={
                        <UserCard
                            {...userData}
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
                            {...userData}
                            />
                    }
                    />
            </MainLayout>
        </Container>
    )
}

export default Profile;