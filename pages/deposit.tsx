import Container from "@/components/Container/Container";
import MainLayout from "@/components/MainLayout/MainLayout";
import Sidebar from "@/components/Sidebar/Sidebar";
import Main from '@/pageModules/deposit/components/Main/Main';
import Navbar from "@/components/Navbar/Navbar";
const DepositPage = () => {


    return (
        <Container>
            <MainLayout>
                {/* <Sidebar/>
                <Navbar/> */}
                <Main/>
            </MainLayout>
        </Container>
    )
}

export default DepositPage;