import Container from "@/components/Container/Container";
import MainLayout from "@/components/MainLayout/MainLayout";
import Sidebar from "@/components/Sidebar/Sidebar";
import ChatLayout from "@/pageModules/chat/components/ChatLayout/ChatLayout";
import Navbar from "@/components/Navbar/Navbar";
const ChatPage = () => {


    return (
        <Container>
            <MainLayout>
                {/* <Sidebar/>
                <Navbar/> */}
                <ChatLayout/>
            </MainLayout>
        </Container>
    )
}

export default ChatPage;