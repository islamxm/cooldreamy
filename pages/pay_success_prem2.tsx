import Container from "@/components/Container/Container";
import MainLayout from "@/components/MainLayout/MainLayout";
import Sidebar from "@/components/Sidebar/Sidebar";
import Main from "@/pageModules/pay_success/components/Main/Main";

const PaySuccess = () => {

    return (
        <Container>
            <MainLayout>
                <div style={{width: '100%'}}>
                    <Main/>
                </div>
            </MainLayout>
        </Container>
    )
}

export default PaySuccess;