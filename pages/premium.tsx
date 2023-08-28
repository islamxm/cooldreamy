import MainLayout from "@/components/MainLayout/MainLayout";
import Container from "@/components/Container/Container";
import Sidebar from "@/components/Sidebar/Sidebar";
import Main from "@/pageModules/premium/Main/Main";
import { useWindowSize } from "usehooks-ts";
import { useEffect } from "react";
import Router from "next/router";
const PremiumPage = () => {
    const {width} = useWindowSize()

    useEffect(() => {
        if(width <= 768) {
            Router.replace('/deposit-mb')
        }
    }, [width])

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