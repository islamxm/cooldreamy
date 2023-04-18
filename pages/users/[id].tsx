import {FC, useEffect, useState} from 'react';
import Container from '@/components/Container/Container';
import MainLayout from '@/components/MainLayout/MainLayout';
import Sidebar from '@/components/Sidebar/Sidebar';
import { Row, Col } from 'antd';
import UserCard from '@/pageModules/user/components/UserCard/UserCard';
import UserLayout from '@/components/UserLayout/UserLayout';
import img from '@/public/assets/images/girl-big.png';
import Button from '@/components/Button/Button';
import StartGift from '@/pageModules/user/components/StartGift/StartGift';
import giftImg from '@/public/assets/images/gift-1.png';
import {GoMail} from 'react-icons/go'
import UserInfo from '@/components/UserInfo/UserInfo';
import { useRouter } from 'next/router';
import ApiService from '@/service/apiService';
import { useAppSelector, useAppDispatch } from '@/hooks/useTypesRedux';
import { IUser } from '@/models/IUser';
import Router from 'next/router';


const service = new ApiService()

const UserPage:FC = () => {
    const [createChatLoad, setCreateChatLoad] = useState(false)
    const {query} = useRouter()
    const {token} = useAppSelector(s => s)
    const [data, setData] = useState<IUser | null>(null)


    useEffect(() => {
        if(query && query?.id && typeof query?.id === 'string' && token) {
            service.getProfile({user_id: Number(query?.id)}, token).then(res => {
                setData(res)
                console.log(res)
            })
        }
    }, [query, token])



    const createChat = () => {
        if(query && query?.id && typeof query?.id === 'string' && token) {
            setCreateChatLoad(true)
            service.createChat({user_id: Number(query?.id)}, token).then(res => {
                if(res?.chat_id) {
                    Router.push(`/chat/${res?.chat_id}`)
                }
            }).finally(() => {
                setCreateChatLoad(false)
            })
        }
    }


    return (
        <Container>
            <MainLayout>
                <Sidebar/>
                <UserLayout
                    side={
                        <Row gutter={[20,20]}>
                            <Col span={24}>
                                <UserCard
                                    {...data}
                                    >
                                    <Button
                                        onClick={createChat}
                                        load={createChatLoad}
                                        after={<GoMail/>}
                                        text='Написать'
                                        style={{
                                            padding: '8px 10px',
                                            fontSize: 18,
                                            lineHeight: '27px',
                                            width: '100%'
                                        }}
                                        />
                                </UserCard>
                            </Col>
                            {/* <Col span={24}>
                                <StartGift
                                    image={giftImg}
                                    />
                            </Col> */}
                        </Row>
                    }
                    main={
                        <UserInfo {...data}/>
                    }
                    />
            </MainLayout>
        </Container>
    )
}

export default UserPage;