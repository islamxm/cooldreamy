import {FC} from 'react';
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

const UserPage:FC = () => {
    
    return (
        <Container>
            <MainLayout>
                <Sidebar/>
                <UserLayout
                    side={
                        <Row gutter={[20,20]}>
                            <Col span={24}>
                                <UserCard
                                    image={img}
                                    verify={true}
                                    >
                                    <Button
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
                            <Col span={24}>
                                <StartGift
                                    image={giftImg}
                                    />
                            </Col>
                        </Row>
                    }
                    main={
                        <UserInfo/>
                    }
                    />
            </MainLayout>
        </Container>
    )
}

export default UserPage;