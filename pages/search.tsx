import MainLayout from "@/components/MainLayout/MainLayout";
import Sidebar from "@/components/Sidebar/Sidebar";
import Container from "@/components/Container/Container";
import { Row, Col } from "antd";
import SearchBody from "@/pageModules/search/components/searchBody/SearchBody";
import { useAppSelector } from "@/hooks/useTypesRedux";
import LimitModal from "@/popups/LimitModal/LimitModal";
import Router from "next/router";
import VerifyEmailModal from "@/popups/VerifyEmailModal/VerifyEmailModal";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
const SearchPage = () => {
    const {userData} = useAppSelector(s => s)

    const [modal, setModal] = useState(false)

    useEffect(() => {
        if(userData?.hasOwnProperty('is_email_verified') && userData?.is_email_verified === 0) {
            setModal(true)
        } else {
            setModal(false)
        }
    }, [userData])

    return (
        <Container>
            {/* <VerifyEmailModal
                open={modal}
                // onCancel={() => Router.push('/feed')}
                onCancel={() => setModal(false)}
                /> */}
            <MainLayout>
                <Sidebar/>
                <Navbar/>
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