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
                    <Main/>
                    {/* <Navbar/> */}
                    {/* <div
                        style={{display: 'flex', flexDirection: 'column', width: '100%', height: '100%'}}
                        >
                        
                        <Navbar
                        style={{position: 'static', flex: '0 0 auto'}}
                        />
                    </div> */}

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