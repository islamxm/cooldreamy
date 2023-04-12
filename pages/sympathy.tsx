import Container from "@/components/Container/Container";
import MainLayout from "@/components/MainLayout/MainLayout";
import Sidebar from "@/components/Sidebar/Sidebar";
import {Row, Col} from 'antd';
import Tabs from "@/components/Tabs/Tabs";
import { tabItemType } from "@/components/Tabs/types";
import { useState } from "react";
import List from "@/pageModules/sympathy/components/List/List";
import { girlCardType } from "@/components/GirlCard/types";
import img from '@/public/assets/images/girl.png';

const tabs: tabItemType[] = [
    {
        id: '1',
        badge: 0,
        label: 'Просмотр'
    },
    {
        id: '2',
        badge: 3,
        label: 'Совпадения'
    },
    {
        id: '3',
        badge: 0,
        label: 'Избранные'
    },
    {
        id: '4',
        badge: 0,
        label: 'В избранных'
    },
    {
        id: '5',
        badge: 3,
        label: 'Вам нравятся'
    },
    {
        id: '6',
        badge: 3,
        label: 'Вы нравитесь'
    }
]

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
    const [activeTab, setActiveTab] = useState('1');


    
    const switchDescr = (activeTab: string) => {
        switch(activeTab) {
            case '1':
                return 'Девушка просмотрела Вашу анету - считайте, она уже готова начать общение. Напишите ей!'
            case '2':
                return 'Вы поставили друг другу лайк в “Знакомства”. Начните общение прямо сейчас'
            case '3':
                return ''
            case '3':
                return ''
            case '4':
                return 'В этой вкладке находятся пользователи, которым Вы ставите лайк'
            case '5':
                return 'В этой вкладке находятся пользователи, которым Вы нравитесь'
            default:
                return ''
        }
    }

    

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
                            <List
                                list={[]}
                                />
                        </Col>
                    </Row>
                </div>
            </MainLayout>
        </Container>
    )
}

export default SymPage;