import MainLayout from "@/components/MainLayout/MainLayout";
import Sidebar from "@/components/Sidebar/Sidebar";
import Container from "@/components/Container/Container";
import { Row, Col } from "antd";
import SearchBody from "@/pageModules/search/components/searchBody/SearchBody";
import { useAppSelector } from "@/hooks/useTypesRedux";
import LimitModal from "@/popups/LimitModal/LimitModal";
import Router from "next/router";
import VerifyEmailModal from "@/popups/VerifyEmailModal/VerifyEmailModal";
const SearchPage = () => {
    const {userData} = useAppSelector(s => s)


    return (
        <Container>
            <VerifyEmailModal
                open={userData?.hasOwnProperty('is_email_verified') && userData?.is_email_verified === false}
                onCancel={() => Router.push('/feed')}
                />
            <MainLayout>
                <Sidebar/>
                <div style={{width: '100%'}}>
                    <Col span={24}>
                        <Row gutter={[15, 15]}>
                            <Col span={24}>
                                <SearchBody/>
                            </Col>
                        </Row>
                    </Col>
                </div>
                
            </MainLayout>
        </Container>
    )

}

export default SearchPage;