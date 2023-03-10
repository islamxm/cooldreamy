import MainLayout from "@/components/MainLayout/MainLayout";
import Sidebar from "@/components/Sidebar/Sidebar";
import Container from "@/components/Container/Container";
import { Row, Col } from "antd";
import Streams from "@/components/Streams/Streams";
import SearchBody from "@/pageModules/search/components/searchBody/SearchBody";



const SearchPage = () => {
    
    return (
        <Container>
            <MainLayout>
                <Sidebar/>
                <div style={{width: '100%'}}>
                    <Col span={24}>
                        <Row gutter={[15, 15]}>
                            <Col span={24}>
                                <Streams/>
                            </Col>
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