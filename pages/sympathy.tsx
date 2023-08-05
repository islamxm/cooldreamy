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
import { useAppDispatch } from "@/hooks/useTypesRedux";
import { decSympLikes, decSympWathces } from "@/store/actions";
const service = new ApiService()


const SymPage = () => {
    const dispatch = useAppDispatch()
    const {token, locale, sympCountData} = useAppSelector(s => s)
    const {query} = useRouter()
    const [activeTab, setActiveTab] = useState<sympGroupTypes | any>('');
    const [load, setLoad] = useState(false)
    const [list, setList] = useState<any[]>([])
    const [page, setPage] = useState<number>(0)
    const [total, setTotal] = useState(0)
    const [tabs, setTabs] = useState<tabItemType[] | any[]>([
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
    ])


    useEffect(() => {
        if(query?.type && typeof query?.type === 'string') {
            setActiveTab(query.type)
        } else {
            Router.push(`/sympathy?type=views`)
        }
    }, [query])




    


    useEffect(() => {
        sympCountData && setTabs([
            {
                id: 'views',
                label: locale?.sympathyPage.tabs.views ?? '',
                badge: sympCountData.count_watches
            },
            {
                id: 'matches',
                label: locale?.sympathyPage.tabs.matches ?? '',
                badge: sympCountData.count_mutual
            },
            {
                id: 'likes',
                label: locale?.sympathyPage.tabs.you_like ?? '',
                badge: sympCountData.count_my_likes
            },
            {
                id: 'inlikes',
                label: locale?.sympathyPage.tabs.likes_you ?? '',
                badge: sympCountData.count_likes
            }
        ])
    }, [sympCountData])
    
    
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
            if(token && page) {
                if(activeTab === 'views') {
                    service.getActivityViews(token,{page}).then(res => {
                        setTotal(res?.data?.total)
                        if(res?.data?.data) {
                            if(page === 1) {
                                setList(res?.data?.data)
                            } else {
                                setList(s => [...s, ...res?.data?.data])
                            }
                        } 
                    }).finally(() => setLoad(false))
                }
                if(activeTab === 'likes') {
                    service.getActivityLikes(token, {page}).then(res => {
                        setTotal(res?.data?.total)
                        if(res?.data?.data) {
                            if(page === 1) {
                                setList(res?.data?.data)
                            } else {
                                setList(s => [...s, ...res?.data?.data])
                            }
                        } 
                    }).finally(() => setLoad(false))
                }
                if(activeTab === 'matches') {
                    service.getActivityMutualLikes(token).then(res => {
                        res?.data && setList(res?.data)
                    }).finally(() => setLoad(false))
                }
                if(activeTab === 'inlikes') {
                    service.getActivityInLikes(token, {page}).then(res => {
                        setTotal(res?.data?.total)
                        if(res?.data?.data) {
                            if(page === 1) {
                                setList(res?.data?.data)
                            } else {
                                setList(s => [...s, ...res?.data?.data])
                            }
                        } 
                    }).finally(() => setLoad(false))
                }
            }
        }
    }

    useEffect(() => {
        setPage(1)
        if(page === 1) {
            getData()
        }
    }, [activeTab, token])


    useEffect(() => {
        getData()
    }, [page])


    useEffect(() => {
        if(token) {
            if(activeTab === 'views') {
                service.readProfile(token, 'WATCH').then(res => res?.message === 'success' && dispatch(decSympWathces()))
            }
            if(activeTab === 'inlikes') {
                service.readProfile(token, 'LIKE').then(res => res?.message === 'success' && dispatch(decSympLikes()))
            }
            // if(activeTab === 'matches') {
            //     service.readProfile(token, '').then(res => dispatch())
            // }
        }
    }, [activeTab])

    useEffect(() => console.log(token), [token])
    return (
        <Container>
            <MainLayout>
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
                                load ? <Loader/> : <List total={total} setPage={setPage} type={activeTab} list={list}/>
                            }
                            
                        </Col>
                    </Row>
                </div>
            </MainLayout>
        </Container>
    )
}

export default SymPage;