import MainLayout from "@/components/MainLayout/MainLayout";
import Container from "@/components/Container/Container";
import Sidebar from "@/components/Sidebar/Sidebar";
import Main from "@/pageModules/premium/Main/Main";
import Navbar from "@/components/Navbar/Navbar";

const PremiumPage = () => {


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

export default PremiumPage;