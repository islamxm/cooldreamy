import {FC, useEffect, useState} from 'react';
import Container from '@/components/Container/Container';
import MainLayout from '@/components/MainLayout/MainLayout';
import Sidebar from '@/components/Sidebar/Sidebar';
import { Row, Col } from 'antd';
import UserCard from '@/pageModules/user/components/UserCard/UserCard';
import UserLayout from '@/components/UserLayout/UserLayout';

import Button from '@/components/Button/Button';
import StartGift from '@/pageModules/user/components/StartGift/StartGift';
import {GoMail} from 'react-icons/go'
import UserInfo from '@/components/UserInfo/UserInfo';
import { useRouter } from 'next/router';
import ApiService from '@/service/apiService';
import { useAppSelector, useAppDispatch } from '@/hooks/useTypesRedux';
import { IUser } from '@/models/IUser';
import Router from 'next/router';
import { useWindowSize } from 'usehooks-ts';
import UserCardMob from '@/pageModules/profile/components/UserCardMob/UserCardMob';
import UserMobAction from '@/pageModules/user/components/UserMobAction/UserMobAction';

const service = new ApiService()

const UserPage:FC = () => {
    const {width} = useWindowSize()
    const [createChatLoad, setCreateChatLoad] = useState(false)
    const {query} = useRouter()
    const {token} = useAppSelector(s => s)
    const [data, setData] = useState<IUser | null>(null)


    useEffect(() => {
        if(query && query?.id && typeof query?.id === 'string' && token) {
            service.getProfile({user_id: Number(query?.id)}, token).then(res => {
                setData(res)
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
                        width <= 1000 ? (
                            <UserCardMob
                                {...data}
                                >
                                <UserMobAction
                                    id={data?.id}
                                    />        
                            </UserCardMob>
                        ) : (
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
                        )
                        
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