import Container from "@/components/Container/Container";
import MainLayout from "@/components/MainLayout/MainLayout";
import Sidebar from "@/components/Sidebar/Sidebar";
import Main from '@/pageModules/deposit/components/Main/Main';

const DepositPage = () => {


    return (
        <Container>
            <MainLayout>
                <Sidebar/>
                <Main/>
            </MainLayout>
        </Container>
    )
}

export default DepositPage;