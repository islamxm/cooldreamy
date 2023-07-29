import Container from "@/components/Container/Container";
import MainLayout from "@/components/MainLayout/MainLayout";
import Sidebar from "@/components/Sidebar/Sidebar";
import {Row, Col} from 'antd';
import Tabs from "@/components/Tabs/Tabs";
import { tabItemType } from "@/components/Tabs/types";
import { useEffect, useState } from "react";
import List from "@/pageModules/sympathy/components/List/List";
import Router, { useRouter } from "next/router";
import { sympGroupTypes } from "@/pageModules/sympathy/components/List/types";
import ApiService from "@/service/apiService";
import { useAppSelector } from "@/hooks/useTypesRedux";
import Loader from "@/components/Loader/Loader";
import Navbar from "@/components/Navbar/Navbar";

const service = new ApiService()


const SymPage = () => {
    const {token, locale} = useAppSelector(s => s)
    const {query} = useRouter()
    const [activeTab, setActiveTab] = useState<sympGroupTypes | any>('');
    const [load, setLoad] = useState(false)
    const [list, setList] = useState([])


    useEffect(() => {
        if(query?.type && typeof query?.type === 'string') {
            setActiveTab(query.type)
        }
    }, [query])

    const tabs: tabItemType[] = [
        {
            id: 'views',
            label: locale?.sympathyPage.tabs.views ?? ''
        },
        {
            id: 'matches',
            label: locale?.sympathyPage.tabs.matches ?? ''
        },
        {
            id: 'likes',
            label: locale?.sympathyPage.tabs.you_like ?? ''
        },
        {
            id: 'inlikes',
            label: locale?.sympathyPage.tabs.likes_you ?? ''
        }
    ]
    
    const switchDescr = (activeTab: sympGroupTypes) => {
        switch(activeTab) {
            case 'views':
                return locale?.sympathyPage.description.views
            case 'matches':
                return locale?.sympathyPage.description.matches
            case 'likes':
                return locale?.sympathyPage.description.you_like
            case 'inlikes':
                return locale?.sympathyPage.description.likes_you
            default:
                return ''
        }
    }

    const getData = () => {
        if(activeTab) {
            Router.push(`/sympathy?type=${activeTab}`)
            setLoad(true)
            if(token) {
                if(activeTab === 'views') {
                    service.getActivityViews(token).then(res => {
                        res?.data && setList(res?.data)
                    }).finally(() => setLoad(false))
                }
                if(activeTab )
                if(activeTab === 'likes') {
                    service.getActivityLikes(token).then(res => {
                        res?.data && setList(res?.data)
                    }).finally(() => setLoad(false))
                }
                if(activeTab === 'matches') {
                    service.getActivityMutualLikes(token).then(res => {
                        res?.data && setList(res?.data)
                    }).finally(() => setLoad(false))
                }
                if(activeTab === 'inlikes') {
                    service.getActivityInLikes(token).then(res => {
                        res?.data && setList(res?.data)
                    }).finally(() => setLoad(false))
                }
            }

        }
    }

    useEffect(() => {
        getData()
    }, [activeTab, token])



    useEffect(() => {
        const tm = setInterval(getData, 5000)
        return () => {
            tm && clearInterval(tm)
        }
    }, [])




    return (
        <Container>
            <MainLayout>
                <Navbar/>
                <Sidebar/>
                <div style={{width: '100%'}}>
                    <Row gutter={[15,15]}>
                        <Col span={24}>
                            <Tabs
                                list={tabs}
                                activeItem={activeTab}
                                onChange={setActiveTab}
                                />
                        </Col>  
                        <Col span={24}>
                            {switchDescr(activeTab)}
                        </Col>
                        <Col span={24}>
                            {
                                load ? <Loader/> : <List list={list}/>
                            }
                            
                        </Col>
                    </Row>
                </div>
            </MainLayout>
        </Container>
    )
}

export default SymPage;