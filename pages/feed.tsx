import Container from "@/components/Container/Container";
import MainLayout from "@/components/MainLayout/MainLayout";
import Sidebar from "@/components/Sidebar/Sidebar";
import Main from "@/pageModules/feed/Main/Main";
import Navbar from "@/components/Navbar/Navbar";


const FeedPage = () => {

    return (
        <Container>
            <MainLayout>
                <Sidebar/>
                <Navbar/>
                <Main/>
            </MainLayout>
        </Container>

    )
}

export default FeedPage;