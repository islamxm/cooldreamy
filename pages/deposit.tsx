import Container from "@/components/Container/Container";
import MainLayout from "@/components/MainLayout/MainLayout";
import Sidebar from "@/components/Sidebar/Sidebar";
import Main from '@/pageModules/deposit/components/Main/Main';
import { useWindowSize } from "usehooks-ts";
import Router from "next/router";
import { useEffect } from "react";

const DepositPage = () => {
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

export default DepositPage;