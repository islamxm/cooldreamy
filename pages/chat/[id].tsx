import Container from "@/components/Container/Container";
import MainLayout from "@/components/MainLayout/MainLayout";
import Sidebar from "@/components/Sidebar/Sidebar";
import ChatLayout from "@/pageModules/chat/components/ChatLayout/ChatLayout";
import { useRouter } from "next/router";
import {useEffect} from 'react';







const ChatPage = () => {


    return (
        <Container>
            <MainLayout>
                <Sidebar/>
                <ChatLayout/>
            </MainLayout>
        </Container>
    )
}


export default ChatPage;