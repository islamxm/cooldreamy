import Container from "@/components/Container/Container";
import MainLayout from "@/components/MainLayout/MainLayout";
import Sidebar from "@/components/Sidebar/Sidebar";
import {Row, Col} from 'antd';
import Tabs from "@/components/Tabs/Tabs";
import { tabItemType } from "@/components/Tabs/types";
import { useEffect, useState } from "react";
import List from "@/pageModules/sympathy/components/List/List";
import { girlCardType } from "@/components/GirlCard/types";
import img from '@/public/assets/images/girl.png';
import Router, { useRouter } from "next/router";
import { sympGroupTypes } from "@/pageModules/sympathy/components/List/types";
import ApiService from "@/service/apiService";
import { useAppSelector } from "@/hooks/useTypesRedux";
import Loader from "@/components/Loader/Loader";

const service = new ApiService()



// const list:girlCardType[] = [
//     {name:"Ксения", age: 19, online: 1, image: img, photoCount: 10},
//     {name:"Ксения", age: 19, online: 1, image: img, photoCount: 10},
//     {name:"Ксения", age: 19, online: 1, image: img, photoCount: 10},
//     {name:"Ксения", age: 19, online: 1, image: img, photoCount: 10},
//     {name:"Ксения", age: 19, online: 1, image: img, photoCount: 10},
//     {name:"Ксения", age: 19, online: 1, image: img, photoCount: 10},
//     {name:"Ксения", age: 19, online: 1, image: img, photoCount: 10},
// ]

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
            // badge: 0,
            label: locale?.sympathyPage.tabs.views ?? ''
        },
        {
            id: 'matches',
            // badge: 3,
            label: locale?.sympathyPage.tabs.matches ?? ''
        },
        // {
        //     id: 'favs',
        //     // badge: 0,
        //     label: 'Избранные'
        // },
        // {
        //     id: 'infavs',
        //     // badge: 0,
        //     label: 'В избранных'
        // },
        {
            id: 'likes',
            // badge: 3,
            label: locale?.sympathyPage.tabs.you_like ?? ''
        },
        {
            id: 'inlikes',
            // badge: 3,
            label: locale?.sympathyPage.tabs.likes_you ?? ''
        }
    ]
    
    const switchDescr = (activeTab: sympGroupTypes) => {
        switch(activeTab) {
            case 'views':
                return 'Девушка просмотрела Вашу анету - считайте, она уже готова начать общение. Напишите ей!'
            case 'matches':
                return 'Вы поставили друг другу лайк в “Знакомства”. Начните общение прямо сейчас'
            case 'likes':
                return 'В этой вкладке находятся пользователи, которым Вы ставите лайк'
            case 'inlikes':
                return 'В этой вкладке находятся пользователи, которым Вы нравитесь'
            default:
                return ''
        }
    }

    useEffect(() => {
        if(activeTab) {
            Router.push(`/sympathy?type=${activeTab}`)
            setLoad(true)
            if(token) {
                if(activeTab === 'views') {
                    service.getActivityViews(token).then(res => {
                        console.log(res)
                        setList(res)
                    }).finally(() => setLoad(false))
                }
                if(activeTab )
                if(activeTab === 'likes') {
                    service.getActivityLikes(token).then(res => {
                        console.log(res)
                        setList(res)
                    }).finally(() => setLoad(false))
                }
                if(activeTab === 'matches') {
                    service.getActivityMutualLikes(token).then(res => {
                        setList(res)
                    }).finally(() => setLoad(false))
                }
                if(activeTab === 'inlikes') {
                    service.getActivityInLikes(token).then(res => {
                        console.log(res)
                        setList(res)
                    }).finally(() => setLoad(false))
                }
            }

        }
    }, [activeTab, token])




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