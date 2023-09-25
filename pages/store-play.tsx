import Container from "@/components/Container/Container";
import MainLayout from "@/components/MainLayout/MainLayout";
import Main from "@/pageModules/store-play/components/main/Main";
const StorePage = () => {
  return (
    <Container>
      <MainLayout>
        <Main/>
      </MainLayout>
    </Container>
  )
}

export default StorePage;