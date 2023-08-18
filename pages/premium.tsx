import MainLayout from "@/components/MainLayout/MainLayout";
import Container from "@/components/Container/Container";
import Sidebar from "@/components/Sidebar/Sidebar";
import Main from "@/pageModules/premium/Main/Main";

const PremiumPage = () => {


    return (
        <Container>
            <MainLayout>
                <Sidebar/>
                <Main/>
            </MainLayout>
        </Container>
    )
}

export default PremiumPage;