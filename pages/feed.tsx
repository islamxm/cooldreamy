import Container from "@/components/Container/Container";
import MainLayout from "@/components/MainLayout/MainLayout";

import {useEffect, useState} from 'react';
import ApiService from "@/service/apiService";
import Image from "next/image";
import IFeedCard from "@/models/IFeedCard";
import Sidebar from "@/components/Sidebar/Sidebar";
import Main from "@/pageModules/feed/Main/Main";

const service = new ApiService();


// export const getServerSideProps = async (context: any) => {
    
//     const data = await service.getFeed();

//     //console.log(data)

//     return {
//         props: {
//             data,
//         }
//     }
// }


const FeedPage = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        service.getFeed().then(res => {
            setData(res?.data)
        })
    }, [])

    return (
        <Container>
            <MainLayout>
                <Sidebar/>
                <Main data={data}/>
            </MainLayout>
        </Container>

    )
}

export default FeedPage;