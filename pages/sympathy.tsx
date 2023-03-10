import Container from "@/components/Container/Container";
import MainLayout from "@/components/MainLayout/MainLayout";
import Sidebar from "@/components/Sidebar/Sidebar";
import {Row, Col} from 'antd';



const SymPage = () => {

    return (
        <Container>
            <MainLayout>
                <Sidebar/>
                <div style={{width: '100%'}}></div>
            </MainLayout>
        </Container>
    )
}

export default SymPage;