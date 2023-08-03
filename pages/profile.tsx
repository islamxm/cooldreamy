import Container from "@/components/Container/Container"
import MainLayout from "@/components/MainLayout/MainLayout";
import Sidebar from "@/components/Sidebar/Sidebar";
import UserLayout from "@/components/UserLayout/UserLayout";
import UserCard from "@/pageModules/user/components/UserCard/UserCard";
import Button from "@/components/Button/Button";
import UserInfo from "@/pageModules/profile/components/UserInfo/UserInfo";
import { useAppSelector } from "@/hooks/useTypesRedux";
import UserCardMob from "@/pageModules/profile/components/UserCardMob/UserCardMob";
import { useWindowSize } from "usehooks-ts";
import Navbar from "@/components/Navbar/Navbar";

const Profile = () => {
    const {userData, locale} = useAppSelector(s => s)
    const {width} = useWindowSize()


    return (
        <Container>
            <MainLayout>
                <Sidebar/>
                <UserLayout
                    side={
                        width <= 1000 ? (
                            <UserCardMob {...userData}/>
                        ) : (
                            <UserCard
                                {...userData}
                                >
                                <Button
                                    disabled
                                    text={locale?.profilePage.images.verify_btn}
                                    style={{
                                        padding: '8px 10px',
                                        fontSize: 18,
                                        lineHeight: '27px',
                                        width: '100%'
                                    }}
                                    />
                            </UserCard>
                        )
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