import Container from "@/components/Container/Container";
import MainLayout from "@/components/MainLayout/MainLayout";
import Sidebar from "@/components/Sidebar/Sidebar";
import Main from "@/pageModules/feed/Main/Main";
import Navbar from "@/components/Navbar/Navbar";
import { useWindowSize } from "usehooks-ts";
import Div100vh from 'react-div-100vh'

const FeedPage = () => {
    const {width} = useWindowSize()


    if(width <= 768) {
        return (
            <Container style={{padding: 0}}>
                <MainLayout style={{padding: 0}}>
                    {/* <Sidebar/> */}
                    <Navbar/>
                    <Div100vh style={{width: '100%'}}>
                        <Main/>
                    </Div100vh>
                </MainLayout>
            </Container>
        )
    }

    return (
        <Container>
            <MainLayout>
                {/* <Sidebar/> */}
                <Navbar/>
                <Main/>
            </MainLayout>
        </Container>

    )
}

export default FeedPage;