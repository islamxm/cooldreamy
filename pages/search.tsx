import MainLayout from "@/components/MainLayout/MainLayout";
import Sidebar from "@/components/Sidebar/Sidebar";
import Container from "@/components/Container/Container";
import { Row, Col } from "antd";
import SearchBody from "@/pageModules/search/components/searchBody/SearchBody";
import PrivateRoute from "@/hoc/PrivateRoute";
// import { useAppSelector } from "@/hooks/useTypesRedux";
// import { useEffect, useState } from "react";

const SearchPage = () => {
    // const {userData} = useAppSelector(s => s)

    // const [modal, setModal] = useState(false)

    // useEffect(() => {
    //     if(userData?.hasOwnProperty('is_email_verified') && userData?.is_email_verified === 0) {
    //         setModal(true)
    //     } else {
    //         setModal(false)
    //     }
    // }, [userData])

    return (
        <PrivateRoute>
            <Container>
            {/* <VerifyEmailModal
                open={modal}
                // onCancel={() => Router.push('/feed')}
                onCancel={() => setModal(false)}
                /> */}
            {/* <Script
                id='fb-pixel-1'
                >
                {
                    `!function(f,b,e,v,n,t,s)
                    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                    n.queue=[];t=b.createElement(e);t.async=!0;
                    t.src=v;s=b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t,s)}(window,document,'script',
                    'https://connect.facebook.net/en_US/fbevents.js');; "‌")
                    fbq('init', '618085683724877');
                    fbq('track', 'PageView');
                    fbq('track', 'CompleteRegistration');`
                }
                </Script>
                <noscript>
                <img height="1" width="1"
                    src="https://www.facebook.com/tr?id=618085683724877&ev=PageView
                    &noscript=1"/>
                </noscript> */}
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
        </PrivateRoute>
    )

}

export default SearchPage;