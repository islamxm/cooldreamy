import Container from "@/components/Container/Container";
import MainLayout from "@/components/MainLayout/MainLayout";
import { useAppSelector } from "@/hooks/useTypesRedux";
import Main from "@/pageModules/pay_success/components/Main/Main";
import ApiService from "@/service/apiService";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Script from "next/script";
const service = new ApiService()

const PaySuccess = () => {
    const {token} = useAppSelector(s => s)    
    const {query} = useRouter()


    useEffect(() => {
        if(query && query?.user_promotion_id && typeof query?.user_promotion_id === 'string' && token) {
            service.activatePay(token, {user_promotion_id: query?.user_promotion_id})
        }
    }, [query, token])


    return (
        <Container>
            <Script
                id='fb-pixel-1'>
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
                    fbq('track', 'Purchase', {value: 1.00, currency: 'USD'});`
                }
            </Script>
                <noscript>
                <img height="1" width="1"
                    src="https://www.facebook.com/tr?id=618085683724877&ev=PageView
                    &noscript=1"/>
                </noscript>
            <MainLayout>
                <div style={{width: '100%'}}>
                    <Main/>
                </div>
            </MainLayout>
        </Container>
    )
}

export default PaySuccess;